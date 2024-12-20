import { Workout, TrainingType } from "../models/Workout.ts";
import { deleteWorkout, saveWorkout } from "../helpers/workoutStorageHelper.ts";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { formatDateForInput } from "../utils/helpers.ts";
import UserConfirmation from "./UserConfirmation.tsx";
import Icon from "./Icon.tsx";
import close from "/src/assets/iconography/close.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
  workoutId: number; // Loads either a new workoutId if one doesn't exist, or uses the workoutId of existing workout
  seasonId: number;
  workouts: Workout[];
}

const EditWorkout = ({ onClose, workoutId, workouts, seasonId }: Props) => {
  // Used to prefill new workout with last added or edited workout details
  const lastWorkout = workouts[workouts.length - 1] as Workout | undefined;

  const newWorkout: Workout = {
    id: workoutId,
    name: lastWorkout?.name ?? "Workout Name",
    trainingType: lastWorkout?.trainingType ?? TrainingType.Base,
    details: "",
    duration: 0,
    date: new Date(),
    seasonId: seasonId,
  };

  // Check if workout being edited exists. If true, delete button is rendered
  const isExistingWorkout = workouts.some(
    (existingWorkout: Workout) => existingWorkout.id === workoutId
  );

  // If the workoutId matches an existingWorkout.id from the workouts array, fill form state with that data. Or, display a new workout
  const workoutToEdit =
    workouts.find(
      (existingWorkout: Workout) => existingWorkout.id === workoutId
    ) || newWorkout;

  // Used to hold data of the new or existing workout being edited, then passed to onSave
  const [workoutData, setWorkoutData] = useState<Workout>(workoutToEdit);
  const [displayUserConfirmation, setDisplayUserConfirmation] = useState(false);

  const queryClient = useQueryClient();
  const saveWorkoutMutation = useMutation<Workout, Error, Workout>({
    mutationFn: saveWorkout,
    onMutate: async (newWorkout) => {
      queryClient.setQueryData<Workout[]>(["workouts"], (oldWorkouts = []) => {
        if (newWorkout.id === -1) {
          return [...oldWorkouts, { ...newWorkout, id: -1 }];
        } else {
          return oldWorkouts.map((workout) =>
            workout.id === newWorkout.id
              ? { ...workout, ...newWorkout }
              : workout
          );
        }
      });
    },
    onError: (error) => {
      console.error("Failed to save workout", error);
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  const deleteWorkoutMutation = useMutation<Workout, Error, Workout["id"]>({
    mutationFn: deleteWorkout,
    onMutate: async (workoutId) => {
      queryClient.setQueryData<Workout[]>(["workouts"], (oldWorkouts) =>
        oldWorkouts?.filter((workout) => workout.id !== workoutId)
      );
    },

    onError: (error) => {
      console.error("Failed to delete workout", error);
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workouts"] });
    },
  });

  return (
    <>
      <Fade>
        <div className="flex justify-center items-center">
          <div className="p-3 sm:p-6 font-roboto w-11/12 sm:w-4/5 lg:w-1/2">
            <div className="flex justify-end">
              <button className="w-12 mt-3 -mr-2" onClick={onClose}>
                <Icon iconImg={close} alt={"close"} />
              </button>
            </div>
            <div>
              <p className="font-bold text-lg text-left">Workout Name</p>
              <input
                onChange={(element) => {
                  setWorkoutData({
                    ...workoutData,
                    name: element.target.value,
                  });
                }}
                className="w-full h-11  bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-amber-300 transition-all shadow-md p-3"
                value={workoutData.name}
                maxLength={30}
              />

              <p className="font-bold text-lg text-left mt-2">Training Type</p>
              <select
                name="training-type"
                id="training-type"
                value={workoutData.trainingType}
                className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-amber-300 transition-all drop-shadow-md resize-y px-3"
                onChange={(element) => {
                  setWorkoutData({
                    ...workoutData,
                    trainingType: element.target.value as TrainingType,
                  });
                }}
              >
                <option value={TrainingType.Base}>Base Fitness</option>
                <option value={TrainingType.Strength}>Strength</option>
                <option value={TrainingType.Power}>Power</option>
                <option value={TrainingType.PowerEndurance}>
                  Power Endurance
                </option>
                <option value={TrainingType.Performance}>Performance</option>
              </select>

              <p className="font-bold text-lg text-left mt-2">Details</p>
              <textarea
                onChange={(element) => {
                  setWorkoutData({
                    ...workoutData,
                    details: element.target.value,
                  });
                }}
                className="w-full h-[38vh] sm:h-80 bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-amber-300 transition-all shadow-md resize-y p-3"
                value={workoutData.details}
              />

              <p className="font-bold text-lg text-left mt-2">
                Duration of Session (minutes)
              </p>
              <input
                type="number"
                onChange={(element) => {
                  const updatedDuration = parseInt(element.target.value);
                  setWorkoutData({
                    ...workoutData,
                    duration: updatedDuration,
                  });
                }}
                className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-amber-300 transition-all shadow-md resize-y p-3"
                value={workoutData.duration}
              />

              <div className="flex sm:block items-center justify-between">
                <div>
                  <p className="font-bold text-lg text-left mt-2 ">Date</p>
                  <input
                    type="date"
                    onChange={(element) => {
                      const dateTimestamp = new Date(element.target.value); // Convert to timestamp
                      setWorkoutData({
                        ...workoutData,
                        date: dateTimestamp,
                      });
                    }}
                    className="w-full sm:w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-amber-300 transition-all shadow-md resize-y p-3"
                    value={formatDateForInput(workoutData.date)} // Format the timestamp back to "YYYY-MM-DD" for display
                  />
                </div>

                <div className="mt-8 sm:mt-3">
                  <button
                    className="bg-amber-500 font-bold rounded-lg px-2 py-1 mt-2"
                    onClick={() => {
                      saveWorkoutMutation.mutate(workoutData);
                      onClose();
                    }}
                    disabled={saveWorkoutMutation.isPending} // Disable button while loading
                  >
                    {saveWorkoutMutation.isPending ? "Saving..." : "Save"}
                  </button>

                  {isExistingWorkout && (
                    <button
                      className="bg-amber-500 font-bold rounded-lg px-2 py-1 ml-4"
                      onClick={() => {
                        setDisplayUserConfirmation(true);
                      }}
                      disabled={deleteWorkoutMutation.isPending}
                    >
                      {deleteWorkoutMutation.isPending
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  )}
                  {displayUserConfirmation && (
                    <UserConfirmation
                      userYes={() => (
                        deleteWorkoutMutation.mutate(workoutId),
                        onClose(),
                        setDisplayUserConfirmation(false)
                      )}
                      userNo={() => setDisplayUserConfirmation(false)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default EditWorkout;
