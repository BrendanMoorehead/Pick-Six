export type Group = {
  id: bigint;
  group_name: string;
  created_at: string;
  created_by: string;
};

export type Team = {
  id: number;
  team_id: number;
  name: string;
  conference: string;
  division: string;
  primary_color: string;
  secondary_color: string;
  tertiary_color?: string;
};

export type Game = {
  id: number;
  game_key: string;
  season_type: number;
  week: number;
  away_team_id: number;
  home_team_id: number;
  score_id: number;
  status: string;
  game_id: number;
};
