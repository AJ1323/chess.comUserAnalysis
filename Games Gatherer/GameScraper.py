import requests

# Basic headers that are good practice
headers = {
    'User-Agent': 'GameScraper.py',  # Good etiquette to identify your app
    'Accept': 'application/json'   # Tell the server you want JSON response
}

#update the username to look up specific player.
username = 'hikaru'
# Get profile information (replace 'magnuscarlsen' with desired username)
response = requests.get(f'https://api.chess.com/pub/player/{username}', headers=headers)

if response.status_code == 200:
    profile_data = response.json()
    print(profile_data)
else:
    print(f"Error: {response.status_code}")