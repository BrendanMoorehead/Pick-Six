import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

async function fetchNFLTeams() {
  try {
    console.log('Fetching NFL teams...');
    if (!process.env.NFL_API_KEY)
      throw new Error('NFL API key is missing. Check .env file.');
    const response = await axios.get(
      `https://api.sportsdata.io/v3/nfl/scores/json/TeamsBasic?key=${process.env.NFL_API_KEY}`
    );
    console.log('NFL Teams fetched.');
    //TODO: Add NFL Teams to database
    console.log('NFL Teams:', response.data);
  } catch (error) {
    console.error('Error in fetchNFLTeams: ', error.message);
  }
}
fetchNFLTeams();
