import { Fade } from "react-awesome-reveal";
import { Workout } from "../models/Workout";
// import QuoteGenerator from "./QuoteGenerator";
import WorkoutList from "./WorkoutList";
import { Season } from "../models/Season";
import { deleteSeason, newSeason } from "../helpers/seasonsStorageHelper";
import { useState } from "react";
import UserConfirmation from "./UserConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  seasons: Season[];
  workouts: Workout[];
  seasonNotesOpen: () => void;
  onEditWorkout: (workoutId: number) => void;
  viewingSeason: Season;
  setViewingSeason: (season: Season) => void;
}

const Home = ({
  seasons,
  workouts,
  seasonNotesOpen,
  onEditWorkout,
  viewingSeason,
  setViewingSeason,
}: Props) => {
  const [displayUserConfirmation, setDisplayUserConfirmation] = useState(false);

  const queryClient = useQueryClient();

  const newSeasonMutation = useMutation<Season[], Error>({
    mutationFn: newSeason,
    onError: (error) => {
      console.error("Failed to create season", error);
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });

  const deleteSeasonMutation = useMutation<Season[], Error, Season["id"]>({
    mutationFn: deleteSeason,
    onMutate: async (seasonId) => {
      queryClient.setQueryData<Season[]>(["seasons"], (previousSeasons = []) =>
        previousSeasons.filter((season) => season.id !== seasonId)
      );
    },
    onError: (error) => {
      console.error("Failed to delete season", error);
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
    },
  });

  return (
    <>
      <Fade>
        <div className="sm:flex sm:justify-center">
          <div className="sm:p-8">
            <div className="p-6 font-roboto">
              <div className="flex">
                <div>
                  <h1 className="pt-6 text-2xl text-left font-bold">
                    Climb Harder
                  </h1>

                  <select
                    name="select-season"
                    id="select-season"
                    className="font-bold text-2xl flex h-12 bg-opacity-0 bg-slate-50"
                    value={viewingSeason.id}
                    onChange={(element) => {
                      const selectedSeason = seasons.find(
                        (season) => season.id === Number(element.target.value)
                      );
                      if (selectedSeason) {
                        setViewingSeason(selectedSeason);
                      }
                    }}
                  >
                    {seasons.map((season: Season) => (
                      <option key={season.id} value={season.id}>
                        {season.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                className="bg-amber-500 font-medium rounded-lg px-2 py-1 mt-1"
                onClick={() => seasonNotesOpen()}
              >
                Goals & Achievements
              </button>
              {workouts.length > 0 && (
                <button
                  className="bg-amber-500 font-medium rounded-lg px-2 py-1 ml-4"
                  onClick={() => {
                    newSeasonMutation.mutate();
                    setViewingSeason(seasons[seasons.length - 1]); // Set viewingSeason to the new season
                  }}
                  disabled={newSeasonMutation.isPending}
                >
                  {newSeasonMutation.isPending ? "Creating..." : "New Season"}
                </button>
              )}
            </div>

            <div className="p-6 -mt-8">
              <WorkoutList
                workouts={workouts}
                onEditWorkout={onEditWorkout}
                viewingSeason={viewingSeason}
              />
            </div>

            <div className="ml-6 -mt-2">
              <button
                className="bg-[#cf5630] font-bold text-xs rounded-lg w-fit px-2 py-1 mb-4"
                onClick={() => {
                  setDisplayUserConfirmation(true);
                }}
                disabled={deleteSeasonMutation.isPending}
              >
                Delete Season
              </button>
            </div>
            {displayUserConfirmation && (
              <UserConfirmation
                userYes={() => (
                  deleteSeasonMutation.mutate(viewingSeason.id),
                  setViewingSeason(seasons[seasons.length - 1]), // set viewingSeason to the previous season
                  setDisplayUserConfirmation(false)
                )}
                userNo={() => setDisplayUserConfirmation(false)}
              />
            )}
          </div>
        </div>
      </Fade>
    </>
  );
};

export default Home;
