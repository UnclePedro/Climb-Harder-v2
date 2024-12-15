export interface Workout {
  id: number;
  name: string;
  trainingType: TrainingType;
  details: string;
  duration: number; // recieved as minutes
  date: Date;
  seasonId: number;
}

export enum TrainingType {
  Base = "Base",
  Strength = "Strength",
  Power = "Power",
  PowerEndurance = "PowerEndurance",
  Performance = "Performance",
}
