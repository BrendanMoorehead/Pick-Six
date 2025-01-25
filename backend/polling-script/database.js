import supabase from '../db.js'; // Supabase client instance

export async function insertNFLTeams(teamsArr) {
  try {
    // Log the input object for debugging
    // console.log('Teams Object:', teamsObj);

    // Perform the batch insert directly with teamsObj
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

    console.log('Inserted teams:', data);
    return data;
  } catch (error) {
    console.error('Failed to insert teams into database:', error.message);
    throw error;
  }
}
