import dotenv from 'dotenv';
import axios from 'axios';
import { insertNFLTeams } from './database.js';
import { sanitizeTeams } from './helpers.js';
dotenv.config();

async function fetchNFLTeams() {
  try {
    console.log('Fetching NFL teams...');
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/TeamsBasic?key=${process.env.NFL_API_KEY}`
    );
    const standing = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/Standings/2024?key=${process.env.NFL_API_KEY}`
    );
    console.log('NFL Teams fetched.');
    //TODO: Add NFL Teams to database. Poll teams basic and standings
    // console.log('NFL Teams:', response.data);
    // console.log('NFL Teams:', standing.data[0]);
    console.log(typeof response);
    const teams = sanitizeTeams(response);
    insertNFLTeams(teams);
  } catch (error) {
    console.error('Error in fetchNFLTeams: ', error.message);
  }
}

async function fetchTeamRecords() {}

fetchNFLTeams();
