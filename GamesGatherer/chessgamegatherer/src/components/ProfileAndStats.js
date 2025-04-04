
async function ProfileAndStats( username ) {
    const profile = new Map();
    const stats = new Map();
    const daily = new Map();
    const blitz = new Map();
    const rapid = new Map();

    const profileResponse = await fetch( `https://api.chess.com/pub/player/${username}` );

    const profileJSON = await profileResponse.json();

    profile.set( 'url', profileJSON.url );
    profile.set( 'pic', profileJSON.avatar );
    profile.set( 'joined', profileJSON.joined );

    const statsResponse = await fetch( `https://api.chess.com/pub/player/${username}/stats` );

    const statsJSON = await statsResponse.json();

    daily.set('last', statsJSON.chess_daily.last.rating);
    daily.set('best', statsJSON.chess_daily.best.rating);
    daily.set('record', [ statsJSON.chess_daily.record.win, 
        statsJSON.chess_daily.record.loss, statsJSON.chess_daily.record.draw ] );

    stats.set( 'daily', daily );

    blitz.set('last', statsJSON.chess_blitz.last.rating);
    blitz.set('best', statsJSON.chess_blitz.best.rating);
    blitz.set('record', [ statsJSON.chess_blitz.record.win, 
        statsJSON.chess_blitz.record.loss, statsJSON.chess_blitz.record.draw ] );

    stats.set( 'blitz', blitz );

    rapid.set('last', statsJSON.chess_rapid.last.rating);
    rapid.set('best', statsJSON.chess_rapid.best.rating);
    rapid.set('record', [ statsJSON.chess_rapid.record.win, 
        statsJSON.chess_rapid.record.loss, statsJSON.chess_rapid.record.draw ] );

    stats.set( 'rapid', rapid );


  return {profile,  stats};


};

export default ProfileAndStats;
