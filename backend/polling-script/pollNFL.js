import dotenv from 'dotenv';
import axios from 'axios';
import {
  insertNFLFinalScores,
  insertNFLSchedules,
  insertNFLTeamRecords,
  insertNFLTeams,
  queryWeeklyMatches,
} from './database.js';
import {
  sanitizeTeams,
  apiObjectToArr,
  filterByeWeekGameIDs,
} from './helpers.js';
dotenv.config();
/**
 * fetchNFLTeams:
 * Fetches NFL team data from the API and inserts it into the database.
 */
async function fetchNFLTeams() {
  try {
    console.log('Fetching NFL teams...');
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/TeamsBasic?key=${process.env.NFL_API_KEY}`
    );
    console.log('NFL Teams fetched.');
    const teams = sanitizeTeams(response);
    insertNFLTeams(teams);
  } catch (error) {
    console.error('Error in fetchNFLTeams: ', error.message);
  }
}
/**
 * fetchTeamRecords:
 * Fetches NFL team record data from the API and inserts it into the database.
 * @param {Integer} year - The calendar year to fetch team records for.
 */
async function fetchTeamRecords(year) {
  try {
    console.log(`Fetching NFL team records for ${year}...`);
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Standings/${year}?key=${process.env.NFL_API_KEY}`
    );
    console.log(`${year} NFL records fetched.`);
    const teamRecordsArr = apiObjectToArr(response);
    insertNFLTeamRecords(teamRecordsArr);
  } catch (error) {
    console.error('Earror in fetchTeamRecords: ', error.message);
  }
}
/**
 * fetchNFLSeasonSchedule:
 * Fetches NFL schedule for a given year and inserts it into the database.
 * @param {Integer} year - The calendar year to fetch game records for.
 */
async function fetchNFLSeasonSchedule(year) {
  try {
    console.log('Fetching current NFL season schedule...');
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Schedules/${year}?key=${process.env.NFL_API_KEY}`
    );
    console.log(`${year} NFL season schedule fetched.`);
    const seasonScheduleArr = filterByeWeekGameIDs(apiObjectToArr(response));
    insertNFLSchedules(seasonScheduleArr);
  } catch (error) {
    console.error('Error in fetchCurrentNFLSeason: ', error.message);
  }
}

async function fetchNFLFinalScores(year, week) {
  try {
    console.log(`Fetching NFL scores for ${year}: Week ${week}.`);
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/ScoresBasicFinal/${year}/${week}?key=${process.env.NFL_API_KEY}`
    );
    console.log(`NFL scores for ${year}: Week ${week} fetched successfully.`);
    const scoresArr = apiObjectToArr(response);
    insertNFLFinalScores(scoresArr);
  } catch (error) {
    console.error('Error in fetchNFLFinalScores: ', error.message);
  }
}

/**
 * getCompletedWeek:
 * Gets the "ApiSeason" and "ApiWeek" of the most completed week.
 * These are used in fetching final scores for the current week.
 */
async function getCompletedWeek() {
  try {
    console.log('Fetching most recently completed week.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Timeframes/completed?key=${process.env.NFL_API_KEY}`
    );
    return {
      api_season: response.data[0].ApiSeason,
      api_week: response.data[0].ApiWeek,
      has_last_game_ended: response.data[0].HasLastGameEnded,
    };
  } catch (error) {
    console.error('Error in getCompletedWeek: ', error.message);
  }
}

/**
 * populateWeeklyScores
 * Retrieves the completed season and week id and fetches the completed match scores and populates the nfl_scores table.
 */
export async function populateWeeklyScores() {
  try {
    const timeframeData = await getCompletedWeek();
    await fetchNFLFinalScores(timeframeData.api_season, timeframeData.api_week);
  } catch (error) {
    console.error('Error in populateWeeklyScores: ', error.message);
  }
}
// await populateWeeklyScores();
// const data = await getCompletedWeek();
// console.log(data);
// const season = await fetchCurrentNFLSeason();
// const lastWeek = await fetchLastCompletedWeek();
// console.log(season.data);
// console.log(lastWeek.data);

// for (let i = 1; i < 19; i++) {
//   fetchNFLFinalScores(2024, i);
// }
// fetchNFLFinalScores(2024, 2);
// fetchNFLSeasonSchedule(2024);
// fetchNFLSeasonSchedule(2024);
// fetchTeamRecords(2024);
// fetchCurrentNFLSeason();
// fetchNFLTeams();
// queryMatches(2024, 1);
// queryWeeklyMatches(2024, 12);

for (let i = 1; i < 5; i++) {
  fetchNFLFinalScores(`2024POST`, i);
}

//GETS POST SEASON GAMERS
//fetchNFLSeasonSchedule(`2024POST`);
