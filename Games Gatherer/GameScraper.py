import requests

#headers for API
headers = {
    'User-Agent': 'Chess.com stats displayer(catchy I know)',
    'Accept': 'application/json'
}

##functions for calling API for whichever information is wanted.
#This one is for broad states
def get_stats(username) :
    stats_response = requests.get(f'https://api.chess.com/pub/player/{username}/stats', 
                                  headers= headers) 
    if stats_response.status_code == 200:
        return stats_response.json
    else:
        print(f"Error: {stats_response.status_code}")
#This is an array of live games played by username.
def get_games_archives(username) :
    games_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/archives',
                                  headers=headers)
    if games_response.status_code == 200:
        return games_response.json
    else:
        print(f"Error: {games_response.status_code}")
#Array of games for a specific month and year.
def get_games_month(username, MM, YYYY) :
    month_year_games_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}',
                                             headers= headers)
    if month_year_games_response.status_code == 200:
        return month_year_games_response.json
    else:
        print(f"Error: {month_year_games_response.status_code}")

def get_time_control_games(username, BASETIME, INCREMENT) :
    games_time_control_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/live/{BASETIME}/{INCREMENT}',
                                      headers=headers)
    if games_time_control_response.status_code == 200:
        return games_time_control_response.json
    else:
        print(f"Error: {games_time_control_response.status_code}")