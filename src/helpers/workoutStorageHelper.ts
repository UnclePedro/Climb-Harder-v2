import axios from "axios";
import { TrainingType, Workout } from "../models/Workout";

export const getWorkouts = async (): Promise<Workout[]> => {
  try {
    const workouts = await axios.get<Workout[]>("/getWorkouts");
    return workouts.data;
  } catch {
    throw new Error("Failed to fetch workouts");
  }
};

// WHen you create the api function for saveWorkout, include the workoutId in the URL
export const saveWorkout = async (workout: Workout) => {
  try {
    const updatedWorkouts = await axios.post<Workout>("/saveWorkout", {
      workout,
    });
    return updatedWorkouts.data;
  } catch {
    throw new Error("Failed to save workout");
  }
};

export const deleteWorkout = async (workoutId: string) => {
  try {
    const updatedWorkouts = await axios.delete<Workout>("/deleteWorkout", {
      data: { workoutId },
    });
    return updatedWorkouts.data;
  } catch {
    throw new Error("Failed to delete workout");
  }
};

// Calculate total workout time from all workouts
export const totalWorkoutTime = (workouts: Workout[]) => {
  return workouts
    .reduce((accumulator: number, { duration }) => {
      return accumulator + duration / 60;
    }, 0)
    .toFixed(2);
};

// Filter workouts based on TrainingType
export const filterWorkouts = (
  workouts: Workout[],
  trainingTypeFilter: TrainingType | string
) => {
  if (trainingTypeFilter === "") {
    return workouts;
  }

  return workouts.filter(
    (workout) => workout.trainingType === trainingTypeFilter
  );
};

// Calculate week number between first and subsequent workouts
export const getWeekNumber = (workouts: Workout[], workout: Workout) => {
  // Find the earliest workout and normalize its date to full days
  const firstWorkoutDay = Math.floor(
    Math.min(...workouts.map((workout) => workout.date)) / (1000 * 60 * 60 * 24)
  );

  // Normalize the current workout date to full days
  const currentWorkoutDay = Math.floor(workout.date / (1000 * 60 * 60 * 24));

  // Calculate the number of full 7-day periods between the workouts
  const weekNumber = Math.floor((currentWorkoutDay - firstWorkoutDay) / 7) + 1;

  return `Week ${weekNumber}`;
};

// Create array of workouts grouped by week, as their own nested array, then sort workouts by date within their week groups
export const workoutsByWeek = (
  workouts: Workout[],
  trainingTypeFilter: TrainingType | string
): { week: string; workouts: Workout[] }[] => {
  return filterWorkouts(workouts, trainingTypeFilter)
    .reduce((acc, workout) => {
      const week = getWeekNumber(workouts, workout);
      let workoutsWeekGroup = acc.find((group) => group.week === week);
      if (!workoutsWeekGroup) {
        workoutsWeekGroup = { week, workouts: [] };
        acc.push(workoutsWeekGroup);
      }
      workoutsWeekGroup.workouts.push(workout);

      // Sort workouts within the current week in reverse chronological order
      workoutsWeekGroup.workouts.sort(
        (workoutA, workoutB) => workoutB.date - workoutA.date
      );

      return acc;
    }, [] as { week: string; workouts: Workout[] }[])
    .sort((a, b) => b.workouts[0].date - a.workouts[0].date);
};
