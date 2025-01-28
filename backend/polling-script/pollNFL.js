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
      `https://api.sportsdata.io/v3/nfl/scores/json/ScoresBasicFinal/${year}/${week}?key=df900cfa449c4629b7daf7ee36a6af69`
    );
    console.log(`NFL scores for ${year}: Week ${week} fetched successfully.`);
    const scoresArr = apiObjectToArr(response);
    insertNFLFinalScores(scoresArr);
  } catch (error) {
    console.error('Error in fetchNFLFinalScores: ', error.message);
  }
}

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
queryWeeklyMatches(2024, 12);
