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
  const BATCH_SIZE = 50;
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
        throw new Error(error.message);
      }
    }
  } catch (error) {
    console.error('Error in insertNFLSchedules:', error.message);
    throw error;
  }
}

export async function insertNFLFinalScores(scoresArr) {
  try {
    const { data, error } = await supabase.from('nfl_scores').upsert(
      scoresArr.map((score) => ({
        game_id: score.GlobalGameID,
        score_id: score.ScoreID,
        away_team_id: score.GlobalAwayTeamID,
        home_team_id: score.GlobalHomeTeamID,
        status: score.Status,
        date: score.Date,
        game_end_datetime: score.GameEndDateTime,
        game_key: score.GameKey,
        away_score: score.AwayScore,
        home_score: score.HomeScore,
        winner:
          score.AwayScore > score.HomeScore
            ? score.GlobalAwayTeamID
            : score.AwayScore < score.HomeScore
            ? score.GlobalHomeTeamID
            : null,
      })),
      { onConflict: ['score_id'] }
    );
    if (error) {
      console.error('Failed to upsert NFL final scores: ', error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}
export async function insertTimeframes(timeframeData) {
  try {
    const { data, error } = await supabase.from('timeframes').upsert(
      timeframeData.map((timeframe) => ({
        season_type: timeframe.SeasonType,
        name: timeframe.Name,
        start_date: timeframe.StartDate,
        end_date: timeframe.EndDate,
        first_game_start: timeframe.FirstGameStart,
        first_game_end: timeframe.FirstGameEnd,
        last_game_end: timeframe.LastGameEnd,
        has_started: timeframe.HasStarted,
        has_ended: timeframe.HasEnded,
        week: timeframe.Week,
        season: timeframe.Season,
      })),
      { onConflict: ['week', 'season', 'season_type'] }
    );
    if (error) {
      console.error('Failed to upsert NFL timeframes: ', error.message);
      throw new Error(error.message);
    }
  } catch (error) {
    throw error;
  }
}

export async function queryWeeklyMatches(season, week) {
  try {
    const { data, error } = await supabase.rpc('fetch_nfl_games', {
      week,
      season,
    });
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function queryUnresolvedPicks() {
  try {
    const { data, error } = await supabase
      .from('user_picks')
      .select()
      .is('result', null);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function queryScores() {
  try {
    const { data, error } = await supabase.from('nfl_scores').select();
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
}
