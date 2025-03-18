import React from 'react';
import { useState, useEffect } from 'react';




const EntryBox = () => {

 
    const [name, setName] = useState('');
    const [stats, setStats] = useState(null);
    

  const handleClick = async () => {
        try {
            const response = await fetch(`https://api.chess.com/pub/player/${name}/games/live/300/0`)

            if(!response.ok)
            alert('invalid username');
            
            const statsJson = await response.json();
            
            const usedStats = [];


            for (let game in statsJson.games){
                console.log(game.white.username)
                usedStats.push( [game.url, game.white.username, game.accuracies.white, 
                    game.white.result, game.black.username, game.accuracies.black, 
                    game.black.result
                ] )

            }
                


            setStats( usedStats );

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