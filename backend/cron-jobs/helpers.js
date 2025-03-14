/**
 * sanitizeTeams:
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

/**
 * filterByeWeekGameIDs:
 * Filters game IDs of 0 (Bye Weeks) from an array of NFL games.
 *
 * @param {Array} gamesArr - An array of NFL games.
 * @returns {Array} - A filtered array of NFL games, without bye weeks.
 *
 * @example
 * data = filterByeWeekGameIDs([{GlobalGameID: 0},{GlobalGameID: 112020}]);
 * console.log(data); //Prints [{GlobalGameID: 112020}]
 */
export const filterByeWeekGameIDs = (gamesArr) =>
  gamesArr.filter((game) => game.GlobalGameID != 0);

/**
 * apiObjectToArr:
 * Converts an object from the SportsData.io API to an array.
 *
 * @param {Object} apiObject - Any API object containing an array.
 * @returns {Array} - The array from within the API object.
 *
 * @example
 * const data = apiObjectToArr({[{data: 1}, {data: 2}]});
 * console.log(data); //Prints [{data: 1}, {data: 2}]
 */
export const apiObjectToArr = (apiObject) => apiObject.data;

/**
 * getFirstMondayOfSeptember:
 * Finds September's first Monday of a given year (Monday before the first NFL game).
 *
 * @param {Integer} year - The year for which you are retrieving the Monday.
 * @returns {Date} - A date object of the first Monday of September.
 */
export function getFirstMondayOfSeptember(year) {
  const septemberFirst = new Date(year, 8, 1);
  const dayOfWeek = septemberFirst.getDay();
  const offsetToMonday =
    dayOfWeek === 0 ? 1 : dayOfWeek <= 1 ? 0 : 8 - dayOfWeek;
  const firstMonday = new Date(year, 8, 1 + offsetToMonday);
  // const firstGame = new Date(year, 8, firstMonday.getDate() + 3);

  return firstMonday;
}
