/**
 * sanitizeTeams
 * Ensures team fields exist and sanitizes the data.
 *
 * @param {Object} teamsObj - An object containing an array, with a list of team objects inside.
 * @returns {Array} - An array of sanitzed teams objects.
 *
 * @example
 * const teams = sanitizeTeams(teamsObj);
 * console.log(teams); //prints [{team1}, {team2}, ...]
 */

export function sanitizeTeams(teamsObj) {
  if (typeof teamsObj !== 'object' || teamsObj === null) {
    throw new Error('Invalid input: teamsObj must be a non-null object.');
  }
  const teamsArr = apiObjectToArr(teamsObj);

  if (!Array.isArray(teamsArr)) {
    throw new Error(
      'Invalid input: teamsObj.teams must be an array of objects.'
    );
  }
  const sanitizedTeams = teamsArr.map((team, index) => {
    if (!team.TeamID || !team.FullName || !team.Conference || !team.Division) {
      throw new Error(`Missing required fields for team at index ${index}.`);
    }

    return {
      team_id: team.TeamID,
      name: team.FullName.trim(),
      conference: team.Conference.trim(),
      division: team.Division.trim(),
      primary_color: team.PrimaryColor ? team.PrimaryColor.trim() : null,
      secondary_color: team.SecondaryColor ? team.SecondaryColor.trim() : null,
      tertiary_color: team.TertiaryColor ? team.TertiaryColor.trim() : null,
    };
  });
  return sanitizedTeams;
}

export const apiObjectToArr = (apiObject) => apiObject.data;
