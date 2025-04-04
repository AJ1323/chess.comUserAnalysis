import { useState } from 'react';
import ProfileAndStats from './ProfileAndStats';
import Archives from './Archives';
import OpeningsChart from './OpeningsChart';
import './EntryBox.css'

const EntryBox = () => {
  const [name, setName] = useState('');
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [openings, setOpenings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!name.trim()) {
      setError("Please enter a username");
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Get profile and stats
      const newProfAndStats = await ProfileAndStats(name);
      setProfile(newProfAndStats.profile);
      setStats(newProfAndStats.stats);
      
      // Get openings data (from all months)
      const openingResults = await Archives(name);
      setOpenings(openingResults);
      
      setLoading(false);
    } catch (err) {
      console.log(err.message);
      setError("Error fetching data. Please check the username and try again.");
      setLoading(false);
    }
  };

  const picClick = (e) => {
    e.preventDefault();

    window.open(profile.get('url'));
  }
  return (
    <div className="stats_profile_container">
      <h1>Chess.com Opening Analysis</h1>
      
      <div className="username_entry_container">
        <input 
          className="username_entry"
          required="required" 
          placeholder="Enter a chess.com username" 
          value={name}
          onChange={e => setName(e.target.value)} 
        />
        <button 
          type="submit" 
          onClick={handleClick}
          disabled={loading}
          className="search_btn"
        >
          {loading ? "Loading..." : "Search"}
        </button>
      </div>
      
      {error && (
        <div className="error">
          {error}
        </div>
      )}

        {profile && (
        <div className="profile_container">
            <h2>Profile</h2>
          <img className='profile_pic' src={profile.get('pic')} onClick={picClick} />
        </div>
      )}
      
      {stats && (
        <div className="stats_container">
          <div className='rapid_conatiner'>
            <h4>Rapid</h4>
            <ul className='stats_list'>
                <li>
                {'Current rating: ' + stats.get('rapid').get('last')}
                </li>

                <li>
                {'Best rating: ' + stats.get('rapid').get('best')}
                </li>

                <li>
                {'Overall Record: ' + 'wins: ' + stats.get('rapid').get('record')[0] + 
                ' losses: ' + stats.get('rapid').get('record')[1] + ' draws: ' + stats.get('rapid').get('record')[2]}
                </li>
            
            </ul>
          </div>

          <div className='blitz_container'>
          <h4>Blitz</h4>
            <ul>
                <li>
                {'Current rating: ' + stats.get('blitz').get('last')}
                </li>

                <li>
                {'Best rating: ' + stats.get('blitz').get('best')}
                </li>

                <li>
                {'Overall Record: ' + 'wins: ' + stats.get('blitz').get('record')[0] + 
                ' losses: ' + stats.get('blitz').get('record')[1] + ' draws: ' + stats.get('blitz').get('record')[2]}
                </li>
            
            </ul>
          </div>

          <div className='daily_container'>
          <h4>Daily</h4>
            <ul>
                <li>
                {'Current rating: ' + stats.get('daily').get('last')}
                </li>

                <li>
                {'Best rating: ' + stats.get('daily').get('best')}
                </li>

                <li>
                {'Overall Record: ' + 'wins: ' + stats.get('daily').get('record')[0] + 
                ' losses: ' + stats.get('daily').get('record')[1] + ' draws: ' + stats.get('daily').get('record')[2]}
                </li>
            
            </ul>
          </div>
          
        </div>
      )}
      
      
      
      {openings && <OpeningsChart username={name} openingsData={openings} />}
    </div>
  );
};

export default EntryBox;