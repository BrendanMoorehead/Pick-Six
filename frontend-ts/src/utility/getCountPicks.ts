import { Pick } from "@/types";
export const getCountPicks = (picks: Pick[]) => {
  const correctPicks = picks.filter((pick) => pick.result === true).length;
  return { correctPicks, totalPicks: picks.length };
};
