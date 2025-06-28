import { useState } from "react";
import { TrainingType, Workout } from "../models/Workout";
import WorkoutTile from "./WorkoutTile";
import {
  filterWorkouts,
  totalWorkoutTime,
  workoutsByWeek,
} from "../helpers/workoutStorageHelper";
import { formatDateForDisplay } from "../utils/helpers";
import add from "/src/assets/iconography/add.svg";
import Icon from "./Icon";
import { Season } from "../models/Season";
import Button from "./reusable/Button";

interface Props {
  workouts: Workout[];
  onEditWorkout: (workoutId: number) => void;
  viewingSeason: Season;
}

const WorkoutList = ({ workouts, onEditWorkout }: Props) => {
  const [trainingTypeFilter, setTrainingTypeFilter] = useState<
    TrainingType | ""
  >("");

  return (
    <>
      <div className="bg-amber-200 p-3 bg-opacity-65 shadow-md rounded-lg w-fit">
        <div className="flex place-content-between">
          <p className="text-sm italic text-center flex items-center">
            Total training time:{" "}
            {totalWorkoutTime(filterWorkouts(workouts, trainingTypeFilter))}{" "}
            hours
          </p>
          <Button
            onClick={() => {
              onEditWorkout(-1);
            }}
            iconOnly
          >
            <Icon className="w-8" iconImg={add} alt={"newWorkout"} />
          </Button>
        </div>

        <div className="pb-1">
          <select
            name="training-type"
            id="training-type"
            value={trainingTypeFilter}
            className="flex w-56 p-2 h-10 bg-amber-300 shadow-md rounded-lg "
            onChange={(element) => {
              setTrainingTypeFilter(element.target.value as TrainingType);
            }}
          >
            <option value={""}>All Workouts</option>
            <option value={TrainingType.Base}>Base Fitness</option>
            <option value={TrainingType.Strength}>Strength</option>
            <option value={TrainingType.Power}>Power</option>
            <option value={TrainingType.PowerEndurance}>Power Endurance</option>
            <option value={TrainingType.Performance}>Performance</option>
          </select>
        </div>

        {workoutsByWeek(workouts, trainingTypeFilter).map(
          (workoutsWeekGroup) => (
            <div key={workoutsWeekGroup.week}>
              <p className="text-sm font-bold mt-3 sm:pl-1 sm:w-18">
                {workoutsWeekGroup.week}
              </p>
              {workoutsWeekGroup.workouts.map((workout) => (
                <button
                  key={workout.id}
                  className="w-full sm:w-fit"
                  onClick={() => {
                    onEditWorkout(workout.id);
                  }}
                >
                  <WorkoutTile
                    name={workout.name}
                    trainingType={workout.trainingType}
                    date={formatDateForDisplay(workout.date)}
                    id={workout.id}
                  />
                </button>
              ))}
            </div>
          )
        )}
      </div>
    </>
  );
};

export default WorkoutList;
