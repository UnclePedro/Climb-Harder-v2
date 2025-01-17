import { Fade } from "react-awesome-reveal";
import { Workout } from "../models/Workout";
// import QuoteGenerator from "./QuoteGenerator";
import WorkoutList from "./WorkoutList";
import { Season } from "../models/Season";
import { deleteSeason, newSeason } from "../helpers/seasonsStorageHelper";
import { useState } from "react";
import UserConfirmation from "./UserConfirmation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Icon from "./Icon";
import logo from "/src/assets/climb-harder-logo.svg";
// import deleteIcon from "/src/assets/iconography/delete.svg";

import EditUserDetails from "./EditUserDetails";

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
    onSuccess: (newSeasons) => {
      queryClient.invalidateQueries({ queryKey: ["seasons"] });
      setViewingSeason(newSeasons[newSeasons.length - 1]);
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
      <div className="absolute top-0 right-0 sm:mt-12 mt-6 sm:mr-5 mr-2 z-50">
        <EditUserDetails />
      </div>

      <Fade>
        <div className="flex justify-center pt-5 sm:pt-8">
          <div className="w-[350px] mt-2 sm:mt-0">
            <Icon iconImg={logo} alt={"climb-harder"} />
          </div>
        </div>
        <div className="flex flex-col items-center font-roboto">
          <div className="flex flex-col items-center">
            <select
              name="select-season"
              id="select-season"
              className="font-bold text-2xl flex h-15 pl-1 bg-opacity-0 bg-slate-50  rounded-lg border-none focus:outline-none"
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

            <div className="space-x-4 mt-4">
              <button
                className="bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400  transition-all font-medium rounded-lg px-2 py-1"
                onClick={() => seasonNotesOpen()}
              >
                Goals & Achievements
              </button>
              {workouts.length > 0 && (
                <button
                  className=""
                  onClick={() => {
                    newSeasonMutation.mutate();
                  }}
                  disabled={newSeasonMutation.isPending}
                >
                  {newSeasonMutation.isPending ? (
                    // <LottieAnimation
                    //   animationData={yellowDotLoadingSmall}
                    //   height={20}
                    //   width={105}
                    // />
                    <button className="bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 transition-all font-medium rounded-lg px-2 py-1">
                      Creating...
                    </button>
                  ) : (
                    <button className="bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 transition-all font-medium rounded-lg px-2 py-1">
                      New Season
                    </button>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="px-5 mt-4">
            <WorkoutList
              workouts={workouts}
              onEditWorkout={onEditWorkout}
              viewingSeason={viewingSeason}
            />
          </div>

          <button
            className="bg-[#cf5630] sm:hover:bg-[#c9431a] focus:bg-[#c9431a] sm:focus:scale-95 transition-all font-bold text-xs rounded-lg px-2 py-1 mt-4 mb-6"
            onClick={() => {
              setDisplayUserConfirmation(true);
            }}
            disabled={deleteSeasonMutation.isPending}
          >
            Delete Season
          </button>
          {/* <button
            className="w-12 mt-3 sm:hover:scale-105 sm:focus:scale-100 transition-all"
            onClick={() => {
              setDisplayUserConfirmation(true);
            }}
            disabled={deleteSeasonMutation.isPending}
          >
            <Icon iconImg={deleteIcon} alt={"delete-season"} />
          </button> */}

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
      </Fade>
    </>
  );
};

export default Home;
