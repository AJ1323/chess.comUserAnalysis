import requests
import json

#headers for PubAPI
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
        return stats_response.json()
    else:
        print(f"Error: {stats_response.status_code}")
#This is an array of live games played by username.
def get_games_archives(username) :
    games_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/archives',
                                  headers=headers)
    if games_response.status_code == 200:
        return games_response.json()
    else:
        print(f"Error: {games_response.status_code}")
#Array of games for a specific month and year.
def get_games_month(username, MM, YYYY) :
    month_year_games_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/{YYYY}/{MM}',
                                             headers= headers)
    if month_year_games_response.status_code == 200:
        return month_year_games_response.json()
    else:
        print(f"Error: {month_year_games_response.status_code}")
#Time controlled games e.g. 5 minute(blitz). BASETIME is the time in seconds,
#so for 5 minute BASETIME = 300 and INCREMENT is the number of seconds added after each move
#for normal blits this will be 0
def get_time_control_games(username, BASETIME, INCREMENT) :
    games_time_control_response = requests.get(f'https://api.chess.com/pub/player/{username}/games/live/{BASETIME}/{INCREMENT}',
                                      headers=headers)
    if games_time_control_response.status_code == 200:
        return json.loads(games_time_control_response.json)
    else:
        print(f"Error: {games_time_control_response.status_code}")

def main():
    stats = get_games_month("erikstransen", "03", "2025")

    for game in stats.get("games") :
        url = game.get('url')
        opening = game.get('eco')
        white = game.get('white')
        black = game.get('black')
        white_player = white.get("@id")
        white_result = white.get("result")
        black_player = black.get("@id")
        black_result = black.get("result")
        print(url, white_player, white_result, black_player, black_result, opening+"\n")

    
   

if __name__ == "__main__":
    main()