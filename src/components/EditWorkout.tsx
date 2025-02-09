import { Workout, TrainingType } from "../models/Workout.ts";
import { deleteWorkout, saveWorkout } from "../helpers/workoutStorageHelper.ts";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { formatDateForInput } from "../utils/helpers.ts";
import UserConfirmation from "./UserConfirmation.tsx";
import Icon from "./Icon.tsx";
import close from "/src/assets/iconography/close.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toolbarOptions } from "../config/quillConfig.ts";

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
    <Fade>
      <div className="flex justify-center items-center min-h-screen">
        <div className="p-4 my-8 mx-6 sm:p-5 w-11/12 sm:w-4/5 lg:w-3/5 xl:w-2/5 bg-amber-100 bg-opacity-80 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.1),0px_-3px_20px_rgba(0,0,0,0.15)] flex flex-col min-h-[92vh] sm:min-h-[80vh]">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="w-10 -mr-3 -mt-1 sm:w-12 hover:scale-105"
              onClick={onClose}
            >
              <Icon iconImg={close} alt="close" />
            </button>
          </div>

          {/* Workout Name */}
          <p className="font-bold text-md mb-1 -mt-3 sm:-mt-0 w-fit">
            Workout Name
          </p>
          <input
            onChange={(element) => {
              setWorkoutData({
                ...workoutData,
                name: element.target.value,
              });
            }}
            className="w-full h-11  bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-[#fadf73] transition-all shadow p-3"
            value={workoutData.name}
            maxLength={30}
          />

          {/* Training Type */}
          <p className="font-bold text-md mt-2 sm:mt-3 mb-1">Training Type</p>
          <select
            name="training-type"
            id="training-type"
            value={workoutData.trainingType}
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none sm:hover:bg-[#fadf73] transition-all drop-shadow resize-y px-3"
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
            <option value={TrainingType.PowerEndurance}>Power Endurance</option>
            <option value={TrainingType.Performance}>Performance</option>
          </select>

          {/* Details */}
          <p className="font-bold text-md mt-2 sm:mt-3 mb-1">Details</p>
          <div className="flex flex-col flex-grow">
            <ReactQuill
              value={workoutData.details}
              onChange={(details) => {
                setWorkoutData({
                  ...workoutData,
                  details,
                });
              }}
              className="ql-border w-full flex-grow bg-amber-200 rounded-lg hover:bg-[#fadf73] transition shadow"
              modules={{
                toolbar: toolbarOptions,
              }}
            />
          </div>

          {/* Duration */}
          <p className="font-bold text-md mt-2 sm:mt-3 mb-1">
            Duration (minutes)
          </p>
          <input
            type="number"
            onChange={(element) => {
              setWorkoutData({
                ...workoutData,
                duration: parseInt(element.target.value),
              });
            }}
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow p-3"
            value={workoutData.duration}
          />

          {/* Date, Save & Delete Row */}
          <div className="flex gap-2 mt-2 sm:mt-3 items-center">
            {/* Date Input */}
            <div className="flex-1">
              <p className="font-bold text-md mb-1">Date</p>
              <input
                type="date"
                onChange={(element) => {
                  setWorkoutData({
                    ...workoutData,
                    date: new Date(element.target.value), // Convert to timestamp
                  });
                }}
                className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow p-3"
                value={formatDateForInput(workoutData.date)} // Format the timestamp back to "YYYY-MM-DD" for display
              />
            </div>

            {/* Save Button */}
            <button
              className="bg-amber-500 hover:bg-amber-400 active:scale-95 transition font-bold rounded-lg text-sm xs:text-base h-11 px-2 xs:h-11 xs:px-4 mt-7"
              onClick={() => {
                saveWorkoutMutation.mutate(workoutData);
                onClose();
              }}
              disabled={saveWorkoutMutation.isPending}
            >
              {saveWorkoutMutation.isPending ? "Saving..." : "Save"}
            </button>

            {/* Delete Button (Only if existing workout) */}
            {isExistingWorkout && (
              <button
                className="bg-red-500 hover:bg-red-400 active:scale-95 transition font-bold rounded-lg text-sm xs:text-base h-11 px-2 xs:h-11 xs:px-4 mt-7"
                onClick={() => setDisplayUserConfirmation(true)}
                disabled={deleteWorkoutMutation.isPending}
              >
                {deleteWorkoutMutation.isPending ? "Deleting..." : "Delete"}
              </button>
            )}
          </div>

          {displayUserConfirmation && (
            <UserConfirmation
              userYes={() => {
                deleteWorkoutMutation.mutate(workoutId);
                onClose();
                setDisplayUserConfirmation(false);
              }}
              userNo={() => setDisplayUserConfirmation(false)}
            />
          )}
        </div>
      </div>
    </Fade>
  );
};

export default EditWorkout;
