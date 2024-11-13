import { SeasonNotes } from "./SeasonNotes";
import { Workout } from "./Workout";

export interface Season {
  id: string;
  name: string;
  number: number;
  workouts: Workout[];
  seasonNotes: SeasonNotes;
}
