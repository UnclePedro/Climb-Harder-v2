export interface Workout {
  id: number;
  name: string;
  trainingType: TrainingType;
  details: string;
  duration: number; // recieved as minutes
  date: number;
  seasonId: number;
}

export enum TrainingType {
  Base = "Base Fitness",
  Strength = "Strength",
  Power = "Power",
  PowerEndurance = "Power Endurance",
  Performance = "Performance",
}
