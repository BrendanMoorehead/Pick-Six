export type Group = {
  id: bigint;
  group_name: string;
  created_at: string;
  created_by: string;
  members: Member[];
};

export type Member = {
  member_id: string;
  role: string;
  username: string;
  email: string;
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

export type Pick = {
  game_id: number;
  group_id: number;
  pick: number;
  result?: boolean;
  status: string;
  made_by?: string;
};

export type Timeframe = {
  season_type: number;
  week: number;
  season: number;
  name: string;
  start_date: string;
  end_date: string;
  first_game_start: string;
  first_game_end: string;
  last_game_end: string;
  has_started: boolean;
  has_ended: boolean;
};
