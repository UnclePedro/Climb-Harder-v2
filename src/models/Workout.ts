export interface Workout {
  id: string;
  name: string;
  trainingType: TrainingType;
  details: string;
  duration: number; // recieved as minutes
  date: number;
}

export enum TrainingType {
  Base = "Base Fitness",
  Strength = "Strength",
  Power = "Power",
  PowerEndurance = "Power Endurance",
  Performance = "Performance",
}
