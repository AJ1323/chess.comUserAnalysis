

async function Archives(name) {
    try {
      const response = await fetch(`https://api.chess.com/pub/player/${name}/games/archives`);
      const archiveJSON = await response.json();
      const archive = archiveJSON.archives;
      
      // Create a Map to store combined results from all months
      let combinedOpenings = new Map();
      
      // Process each month
      for (const monthURL of archive) {
        const monthResponse = await fetch(monthURL);
        const monthJSON = await monthResponse.json();
        const games = monthJSON.games;
        
        // Get results from this month
        const monthResults = parseGames(games, name);
        
        // Merge this month's results into the combined results
        mergeOpeningMaps(combinedOpenings, monthResults);
      }
      
      return combinedOpenings;
    } catch (error) {
      console.log(error.message);
      return new Map(); // Return empty map on error
    }
    
    // Helper function to merge two Maps of openings
    function mergeOpeningMaps(targetMap, sourceMap) {
      sourceMap.forEach((values, eco) => {
        if (!targetMap.has(eco)) {
          targetMap.set(eco, [0, 0, 0]);
        }
        
        const targetValues = targetMap.get(eco);
        targetMap.set(eco, [
          targetValues[0] + values[0], // Wins
          targetValues[1] + values[1], // Losses
          targetValues[2] + values[2]  // Draws
        ]);
      });
    }
    
    function parseGames(games, playerName) {
      let openings = new Map();
      
      for (const game of games) {
        // Skip games that don't have ECO code
        if (!game.eco) continue;
        
        const opening = game.eco;
        
        if (!openings.has(opening)) {
          openings.set(opening, [0, 0, 0]);
        }
        
        const wins = openings.get(opening)[0];
        const losses = openings.get(opening)[1];
        const draws = openings.get(opening)[2];
        
        if (game.white.username === playerName) {
          switch (game.white.result) {
            case 'checkmated':
            case 'timeout':
            case 'resigned':
            case 'lose':
            case 'abandoned':
              openings.set(opening, [wins, losses + 1, draws]);
              break;
            case 'agreed':
            case 'repetition':
            case 'stalemate':
            case 'insufficient':
            case '50move':
            case 'timevsinsufficient':
              openings.set(opening, [wins, losses, draws + 1]);
              break;
            default:
              openings.set(opening, [wins + 1, losses, draws]);
          }
        } else {
          switch (game.black.result) {
            case 'checkmated':
            case 'timeout':
            case 'resigned':
            case 'lose':
            case 'abandoned':
              openings.set(opening, [wins, losses + 1, draws]);
              break;
            case 'agreed':
            case 'repetition':
            case 'stalemate':
            case 'insufficient':
            case '50move':
            case 'timevsinsufficient':
              openings.set(opening, [wins, losses, draws + 1]);
              break;
            default:
              openings.set(opening, [wins + 1, losses, draws]);
          }
        }
      }
      
      return openings;
    }
  }
  
  export default Archives;