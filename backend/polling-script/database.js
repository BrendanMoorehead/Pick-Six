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
//TODO: Update if team already exists.
export async function insertNFLTeams(teamsArr) {
  try {
    const { data, error } = await supabase.from('nfl_teams').insert(
      teamsArr.map((team) => ({
        team_id: team.team_id,
        name: team.name,
        conference: team.conference,
        division: team.division,
        primary_color: team.primary_color,
        secondary_color: team.secondary_color,
        tertiary_color: team.tertiary_color,
      }))
    );

    if (error) {
      console.error('Failed to insert teams into database:', error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

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
