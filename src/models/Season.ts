import { SeasonNotes } from "./SeasonNotes";
import { Workout } from "./Workout";

export interface Season {
  id: number;
  name: string;
  number: number;
  workouts: Workout[];
  seasonNotes: SeasonNotes;
}
