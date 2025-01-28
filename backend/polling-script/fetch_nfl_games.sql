CREATE OR REPLACE FUNCTION fetch_nfl_games_for_week(season INT, week INT)
RETURNS TABLE (
    week INT,
    year INT,
    home_team_name TEXT,
    away_team_name TEXT,
    score_data JSONB
)
LANGUAGE SQL
AS $$
SELECT
    nfl_games.week,
    nfl_games.season AS year,
    home_team.name AS home_team_name,
    away_team.name AS away_team_name,
    to_jsonb(nfl_scores) AS score_data
FROM
    nfl_games
    JOIN nfl_teams AS home_team ON nfl_games.home_team_id = home_team.team_id
    JOIN nfl_teams AS away_team ON nfl_games.away_team_id = away_team.team_id
    LEFT JOIN nfl_scores ON nfl_games.score_id = nfl_scores.score_id
WHERE
    nfl_games.week = week
    AND nfl_games.season = season;
$$;
