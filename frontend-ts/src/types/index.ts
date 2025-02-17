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
