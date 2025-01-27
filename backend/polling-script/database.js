import supabase from '../db.js';
/**
 * insertNFLTeams
 * Inserts a list of NFL teams into the supabase DB.
 *
 * @param {Array} teamsArr - An array of objects containing NFL team data.
 *
 * @example
 * insertNFLTeams(teamsArr);
 * Creates a row in the nfl_teams table for each team in teamsArr.
 */
export async function insertNFLTeams(teamsArr) {
  try {
    const { data, error } = await supabase.from('nfl_teams').upsert(
      teamsArr.map((team) => ({
        team_id: team.team_id,
        name: team.name,
        conference: team.conference,
        division: team.division,
        primary_color: team.primary_color,
        secondary_color: team.secondary_color,
        tertiary_color: team.tertiary_color,
      })),
      { onConflict: ['team_id'] }
    );

    if (error) {
      console.error('Failed to insert teams into database:', error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * insertNFLTeamRecords
 * Inserts all current records for a given season for every team into the supabase DB.
 *
 * @param {Array} recordsArr - An array of objects containing NFL team records data.
 *
 * @example
 * insertNFLTeamRecords(recordsArr);
 * Creates a row in the season_teams table for each team in recordsArr.
 */

export async function insertNFLTeamRecords(recordsArr) {
  try {
    const { data, error } = await supabase.from('season_teams').upsert(
      recordsArr.map((team) => ({
        season_type: team.SeasonType,
        season: team.Season,
        team_id: team.TeamID,
        wins: team.Wins,
        losses: team.Losses,
      })),
      { onConflict: ['team_id'] }
    );
    if (error) {
      console.error('Failed to upsert team records: ', error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function insertNFLSchedules(schedulesArr) {
  const BATCH_SIZE = 10; // Adjust this based on performance
  try {
    for (let i = 0; i < schedulesArr.length; i += BATCH_SIZE) {
      const batch = schedulesArr.slice(i, i + BATCH_SIZE);

      const { data, error } = await supabase.from('nfl_games').upsert(
        batch.map((game) => ({
          game_key: game.GameKey,
          season_type: game.SeasonType,
          season: game.Season,
          week: game.Week,
          date: game.Date,
          home_team_id: game.GlobalHomeTeamID,
          away_team_id: game.GlobalAwayTeamID,
          score_id: game.ScoreID,
          status: game.Status,
          game_id: game.GlobalGameID,
        })),
        { onConflict: ['game_id'] }
      );

      if (error) {
        console.error(
          `Failed to upsert batch starting at index ${i}:`,
          error.message
        );
        // console.error('Batch data:', batch);
        throw new Error(error.message);
      }

      console.log(`Successfully upserted batch ${i / BATCH_SIZE + 1}`);
    }
  } catch (error) {
    console.error('Error in insertNFLSchedules:', error.message);
    throw error;
  }
}
