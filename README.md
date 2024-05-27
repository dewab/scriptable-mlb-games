# MLB Team Game and Standings Script

This script fetches and displays information about the Chicago Cubs' games and their standings in the MLB. It uses the MLB API to get details on today's game, upcoming games, and current standings.  The script is written in JavaScript and is designed to run in the [Scriptable](https://scriptable.app) app on iOS devices.  This script was written to be included with a custom "Daily Briefing" apple shortcut that runs each morning to provide a summary of todays game(s) and standings.

## Overview

The script performs the following tasks:

1. Fetches today's game details for your team of choice.
2. If there are no games today, it fetches the next scheduled game.
3. Retrieves the current standings of your team in their division.
4. Formats and outputs the information.

## Prerequisites

To run this script, you need:

- Scriptable app installed on your iOS device.
- An internet connection to fetch data from the MLB API.

## API Endpoints

The script uses the following MLB API endpoints:

1. **Game Schedule for Today**: `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&teamId=112&date=YYYY-MM-DD`
2. **Future Game Schedule**: `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&teamId=112&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD`
3. **Standings**: `http://statsapi.mlb.com/api/v1/standings?leagueId=104&season=YYYY&standingsTypes=regularSeason`
4. **Team Details**: `http://statsapi.mlb.com/api/v1/teams/112`

## Variables

The script uses the following variables:

- `sportId`: Sport identifier (1 for MLB).
- `teamId`: Team identifier (112 for Chicago Cubs).

## Script Execution

1. Fetch team details, today's game data, and current standings.
2. Check if there are games today:
   - If yes, display details of today's games.
   - If no, fetch and display the next scheduled game.
3. Retrieve and display your teams current standings in their division.
4. Output the formatted information.

## Example Output

```text
There are no Chicago Cubs games today. The next Chicago Cubs game is in 2 days. The Chicago Cubs are currently in 3rd place in the National League Central with a record of 25 wins and 20 losses.
```

## Usage

1. Copy the script into the Scriptable app.
2. Run the script to fetch and display the Chicago Cubs' game and standings information.

## License

This script is open-source and available under the MIT License. You are free to use, modify, and distribute it as per the license terms.

## Author

This script is developed and maintained by Daniel Whicker.

---

For any questions or contributions, please feel free to open an issue or submit a pull request on the repository.
