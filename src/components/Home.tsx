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
      <div className="absolute top-0 right-0 sm:mt-12 mt-5 sm:mr-5 z-50">
        <EditUserDetails />
      </div>
      <Fade>
        <div className="flex justify-center pt-4 sm:pt-8">
          <div className="w-[350px] mt-2 sm:mt-0">
            <Icon iconImg={logo} alt={"climb-harder"} />
          </div>
        </div>
        <div className="flex flex-col items-center space-y-6 font-roboto">
          <div className="flex flex-col items-center space-y-4">
            <select
              name="select-season"
              id="select-season"
              className="font-bold text-2xl flex h-15 pl-2 bg-opacity-0 bg-slate-50"
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

            <div className="space-x-4">
              <button
                className="bg-amber-500 hover:bg-amber-400  transition-all font-medium rounded-lg px-2 py-1"
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
                    <div className="bg-amber-500 transition-all font-medium rounded-lg px-2 py-1">
                      Creating...
                    </div>
                  ) : (
                    <div className="bg-amber-500 transition-all font-medium rounded-lg px-2 py-1">
                      New Season
                    </div>
                  )}
                </button>
              )}
            </div>
          </div>

          <div className="px-5">
            <WorkoutList
              workouts={workouts}
              onEditWorkout={onEditWorkout}
              viewingSeason={viewingSeason}
            />
          </div>

          <button
            className="bg-[#cf5630] font-bold text-xs rounded-lg px-2 py-1 mt-4"
            onClick={() => {
              setDisplayUserConfirmation(true);
            }}
            disabled={deleteSeasonMutation.isPending}
          >
            Delete Season
          </button>

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
