import dotenv from 'dotenv';
import axios from 'axios';
import { insertNFLTeamRecords, insertNFLTeams } from './database.js';
import { sanitizeTeams, apiObjectToArr } from './helpers.js';
dotenv.config();
/**
 * fetchNFLTeams
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
    //TODO Insert into
  } catch (error) {
    console.error('Earror in fetchTeamRecords: ', error.message);
  }
}
async function fetchCurrentNFLSeason() {
  try {
    console.log('Fetching current NFL season...');
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2024?key=${process.env.NFL_API_KEY}`
    );
    console.log('Current NFL season fetched.');
    console.log(response);
  } catch (error) {
    console.error('Error in fetchCurrentNFLSeason: ', error.message);
  }
}
fetchTeamRecords(2024);
// fetchCurrentNFLSeason();
// fetchNFLTeams();
