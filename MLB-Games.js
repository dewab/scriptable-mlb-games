// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: baseball-ball;

const sportId = 1;
const teamId = 112; // Chicago Cubs
const todaysDate = new Date().toISOString().split('T')[0];

const apiUrl = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=${sportId}&teamId=${teamId}&date=${todaysDate}`;
const futureApiUrl = `http://statsapi.mlb.com/api/v1/schedule/games/?sportId=${sportId}&teamId=${teamId}&startDate=${todaysDate}&endDate=${new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]}`;
const standingsUrl = `http://statsapi.mlb.com/api/v1/standings?leagueId=104&season=${new Date().getFullYear()}&standingsTypes=regularSeason`;
const teamsUrl = `http://statsapi.mlb.com/api/v1/teams/${teamId}`;

function gameTime(utcTimeString) {
    return new Date(utcTimeString).toLocaleTimeString([], {
        hour12: true,
        hour: 'numeric',
        minute: 'numeric'
    });
}

function ordinalSuffix(i) {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) return i + "st";
    if (j == 2 && k != 12) return i + "nd";
    if (j == 3 && k != 13) return i + "rd";
    return i + "th";
}

async function fetchJson(url) {
    return await new Request(url).loadJSON();
}

let [teamDetails, data, standingsData] = await Promise.all([
    fetchJson(teamsUrl),
    fetchJson(apiUrl),
    fetchJson(standingsUrl)
]);

const teamName = teamDetails.teams[0].name;
const teamDivisionId = teamDetails.teams[0].division.id;
const teamDivisionName = teamDetails.teams[0].division.name;

let outputText = "";

if (data.dates.length === 0) {
    let futureData = await fetchJson(futureApiUrl);
    if (futureData.totalGames > 0) {
        const nextGameDate = new Date(futureData.dates[0].date);
        const daysUntilNextGame = Math.ceil((nextGameDate - new Date(todaysDate)) / (1000 * 60 * 60 * 24));
        outputText = `There are no ${teamName} games today. The next ${teamName} game is in ${daysUntilNextGame} days. `;
    } else {
        outputText = `There are no ${teamName} games scheduled in the near future.`;
    }
} else {
    if (data.totalGames > 1) {
        outputText = "There is a double header today! ";
    }
    const todaysGames = data.dates[0].games;
    todaysGames.forEach(game => {
        const awayTeam = game.teams.away.team.name;
        const homeTeam = game.teams.home.team.name;
        const gameLocation = game.venue.name;
        const gameDate = gameTime(game.gameDate);
        outputText += `The ${awayTeam} play the ${homeTeam} at ${gameLocation} at ${gameDate}. `;
    });
}

const teamDivision = standingsData.records.find(division => division.division.id === teamDivisionId);
const teamRecord = teamDivision.teamRecords.find(team => team.team.id === teamId);

if (teamRecord) {
    const teamPlace = ordinalSuffix(parseInt(teamRecord.divisionRank));
    const teamWins = teamRecord.wins;
    const teamLosses = teamRecord.losses;
    outputText += `The ${teamName} are currently in ${teamPlace} place in ${teamDivisionName} with a record of ${teamWins} wins and ${teamLosses} losses.`;
}

// Uncomment if opponent details are needed
// if (data.dates.length > 0 && data.dates[0].games.length > 0) {
//     const opponentTeamId = data.dates[0].games[0].teams.away.team.id === teamId ? data.dates[0].games[0].teams.home.team.id : data.dates[0].games[0].teams.away.team.id;

//     let opponentRecord;
//     let opponentDivisionName;
//     standingsData.records.forEach(division => {
//         const foundRecord = division.teamRecords.find(team => team.team.id === opponentTeamId);
//         if (foundRecord) {
//             opponentRecord = foundRecord;
//             opponentDivisionName = division.division.name;
//         }
//     });

//     if (opponentRecord) {
//         const opponentPlace = ordinalSuffix(parseInt(opponentRecord.divisionRank));
//         const opponentWins = opponentRecord.wins;
//         const opponentLosses = opponentRecord.losses;
//         outputText += ` Their opponent, the ${opponentRecord.team.name}, are in ${opponentPlace} place in the ${opponentDivisionName} with a record of ${opponentWins} wins and ${opponentLosses} losses.`;
//     }
// }

console.log(outputText);
Script.setShortcutOutput(outputText);
Script.complete();
