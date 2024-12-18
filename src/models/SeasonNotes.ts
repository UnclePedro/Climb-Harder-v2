export interface SeasonNotes {
  seasonId: number;
  trainingFocuses: string;
  goals: string;
  achievements: string;
}

export const defaultSeasonNotes: SeasonNotes = {
  seasonId: 0,
  trainingFocuses: "",
  goals: "",
  achievements: "",
};
