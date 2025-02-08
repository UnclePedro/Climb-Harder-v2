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
  workoutId: number;
  seasonId: number;
  workouts: Workout[];
}

const EditWorkout = ({ onClose, workoutId, workouts, seasonId }: Props) => {
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

  const isExistingWorkout = workouts.some(
    (existingWorkout: Workout) => existingWorkout.id === workoutId
  );

  const workoutToEdit =
    workouts.find(
      (existingWorkout: Workout) => existingWorkout.id === workoutId
    ) || newWorkout;

  const [workoutData, setWorkoutData] = useState<Workout>(workoutToEdit);
  const [displayUserConfirmation, setDisplayUserConfirmation] = useState(false);

  const queryClient = useQueryClient();
  const saveWorkoutMutation = useMutation<Workout, Error, Workout>({
    mutationFn: saveWorkout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workouts"] }),
  });

  const deleteWorkoutMutation = useMutation<Workout, Error, Workout["id"]>({
    mutationFn: deleteWorkout,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["workouts"] }),
  });

  return (
    <Fade>
      <div className="flex justify-center items-center min-h-screen p-4">
        <div className="bg-amber-100 shadow-lg rounded-xl p-6 w-full max-w-2xl flex flex-col">
          {/* Close Button */}
          <div className="flex justify-end">
            <button
              className="w-11 -mr-2 sm:w-12 transition-transform hover:scale-105"
              onClick={onClose}
            >
              <Icon iconImg={close} alt="close" />
            </button>
          </div>

          {/* Workout Name */}
          <label className="font-bold text-md mb-1">Workout Name</label>
          <input
            onChange={(e) =>
              setWorkoutData({ ...workoutData, name: e.target.value })
            }
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition p-3 shadow"
            value={workoutData.name}
            maxLength={30}
          />

          {/* Training Type */}
          <label className="font-bold text-md mt-3 mb-1">Training Type</label>
          <select
            value={workoutData.trainingType}
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow px-3"
            onChange={(e) =>
              setWorkoutData({
                ...workoutData,
                trainingType: e.target.value as TrainingType,
              })
            }
          >
            {Object.values(TrainingType).map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* Details */}
          <label className="font-bold text-md mt-3 mb-1">Details</label>
          <textarea
            onChange={(e) =>
              setWorkoutData({ ...workoutData, details: e.target.value })
            }
            className="w-full h-[40vh] sm:h-96 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow p-3 resize-y"
            value={workoutData.details}
          />

          {/* Duration */}
          <label className="font-bold text-md mt-3 mb-1">
            Duration (minutes)
          </label>
          <input
            type="number"
            onChange={(e) =>
              setWorkoutData({
                ...workoutData,
                duration: parseInt(e.target.value),
              })
            }
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow p-3"
            value={workoutData.duration}
          />

          {/* Date */}
          <label className="font-bold text-md mt-3 mb-1">Date</label>
          <input
            type="date"
            onChange={(e) =>
              setWorkoutData({ ...workoutData, date: new Date(e.target.value) })
            }
            className="w-full h-11 bg-amber-200 rounded-lg border-none focus:outline-none hover:bg-[#fadf73] transition shadow p-3"
            value={formatDateForInput(workoutData.date)}
          />

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              className={`bg-amber-500 hover:bg-amber-400 active:scale-95 transition font-bold rounded-lg px-4 py-2 w-full ${
                isExistingWorkout ? "flex-1" : ""
              }`}
              onClick={() => {
                saveWorkoutMutation.mutate(workoutData);
                onClose();
              }}
              disabled={saveWorkoutMutation.isPending}
            >
              {saveWorkoutMutation.isPending ? "Saving..." : "Save"}
            </button>

            {isExistingWorkout && (
              <button
                className="bg-red-500 hover:bg-red-400 active:scale-95 transition font-bold rounded-lg px-4 py-2 flex-1"
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
