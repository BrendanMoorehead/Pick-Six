export function sanitizeTeams(teamsObj) {
  if (typeof teamsObj !== 'object' || teamsObj === null) {
    throw new Error('Invalid input: teamsObj must be a non-null object.');
  }

  // Extract the array of team objects
  const teamsArr = teamsObj.data;

  if (!Array.isArray(teamsArr)) {
    throw new Error(
      'Invalid input: teamsObj.teams must be an array of objects.'
    );
  }

  // Sanitize each team object
  const sanitizedTeams = teamsArr.map((team, index) => {
    if (!team.TeamID || !team.FullName || !team.Conference || !team.Division) {
      throw new Error(`Missing required fields for team at index ${index}.`);
    }

    return {
      team_id: team.TeamID, // Ensure TeamID exists
      name: team.FullName.trim(), // Remove extra spaces from FullName
      conference: team.Conference.trim(), // Remove extra spaces
      division: team.Division.trim(), // Remove extra spaces
      primary_color: team.PrimaryColor ? team.PrimaryColor.trim() : null, // Default to null if missing
      secondary_color: team.SecondaryColor ? team.SecondaryColor.trim() : null, // Default to null if missing
      tertiary_color: team.TertiaryColor ? team.TertiaryColor.trim() : null, // Default to null if missing
    };
  });

  console.log(sanitizedTeams);
  return sanitizedTeams;
}
