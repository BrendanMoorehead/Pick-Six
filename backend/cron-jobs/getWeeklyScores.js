import dotenv from 'dotenv';
import axios from 'axios';
import { insertNFLFinalScores } from './database.js';
import { apiObjectToArr } from './helpers.js';
dotenv.config();
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
const year = process.argv[2]; // First argument
const week = process.argv[3]; // Second argument

if (!year || !week) {
  console.error('Usage: node fetchScores.js <year> <week>');
  process.exit(1);
}

// Run the function
fetchNFLFinalScores(year, week);
