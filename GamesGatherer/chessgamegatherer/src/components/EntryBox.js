import React from 'react';
import { useState } from 'react';




const EntryBox = () => {

 
    const [name, setName] = useState('');
    const [stats, setStats] = useState(null);
    // const[opponents, addOpponents] = useState([]);
    // const [openings, editOpenings] = useState(new Map());
    

     function parseGames( games ){
        var results = new Map();
        results.set( 'wins', 0 );
        results.set( 'losses', 0 );
        results.set('draws', 0 );
        
        for(const game of games){
            const wins = results.get('wins');
            const losses = results.get('losses');
            const draws = results.get('draws');

            if(game.white.username === name){

                switch( game.white.result ){
    
                    case 'checkmated':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'agreed':
                        results.set( 'draws', draws + 1 ) ;
                        break
                    case 'repetition':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case 'timeout':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'resigned':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'stalemate':
                        results.set( 'ldraws', draws + 1 ) ;
                        break;
                    case 'lose':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'insufficient':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case '50move':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case 'abandoned':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'timevsinsufficient':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    default:
                        results.set( 'wins', wins + 1 ) ;
                }
                //addOpponents( opponents.push(game.black.username) );
            }   
            else{
    
                switch( game.black.result ){
    
                    case 'checkmated':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'agreed':
                        results.set( 'draws', draws + 1 ) ;
                        break
                    case 'repetition':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case 'timeout':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'resigned':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'stalemate':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case 'lose':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'insufficient':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case '50move':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    case 'abandoned':
                        results.set( 'losses', losses + 1 ) ;
                        break;
                    case 'timevsinsufficient':
                        results.set( 'draws', draws + 1 ) ;
                        break;
                    default:
                        results.set( 'wins', wins + 1 ) ;
                }
            }

        }

       
        
        return results;
            
        
    }
      
  const handleClick = async () => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${name}/games/2025/03`)

            if(!response.ok)
            alert('invalid username');
            
            const statsJson = await response.json();
            let games = statsJson.games;
            
            
           // games.foreach( parseGames )

           

           
            const newStats = parseGames(games);
           

        //    for( let i = 0; i < games.length; i++)
        //     { 
                
        //         if(games[i].white.username === name){

        //             switch( games[i].white.result ){
        
        //                 case 'checkmated':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'agreed':
        //                     addDraw( draws + 1 );
        //                     break
        //                 case 'repetition':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'timeout':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'resigned':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'stalemate':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'lose':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'insufficient':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case '50move':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'abandoned':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'timevsinsufficient':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 default:
        //                     addWin( wins + 1 );
        //             }
        //             //addOpponents( opponents.push(game.black.username) );
        //         }   
        //         else{
        
        //             switch( games[i].black.result ){
        
        //                 case 'checkmated':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'agreed':
        //                     addDraw( draws + 1 );
        //                     break
        //                 case 'repetition':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'timeout':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'resigned':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'stalemate':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'lose':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'insufficient':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case '50move':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 case 'abandoned':
        //                     addLoss( losses + 1 );
        //                     break;
        //                 case 'timevsinsufficient':
        //                     addDraw( draws + 1 );
        //                     break;
        //                 default:
        //                     addWin( wins + 1 );
        //                     //addOpponents( opponents.push(game.white.username) );
        //             }
        
                    
        //         }

        //     }
                

            setStats( newStats );

        } catch (err) {
            console.log(err.message)
        }
    };



  return (
    
    <div>
        <input className='name_input' required="required" placeholder='Enter a UserName' value={name} onChange={e => setName(e.target.value)} />

        <button type="submit" onClick={handleClick} >Submit</button>

        <label className='stats_display' />
        { stats }
        <label/>
        
    </div>
      
  );
};



export default EntryBox;