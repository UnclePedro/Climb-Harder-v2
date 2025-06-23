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
import Button from "./reusable/button";

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
              <Button colour={"primary"} onClick={() => seasonNotesOpen()}>
                Goals & Achievements
              </Button>

              {workouts.length > 0 && (
                <Button
                  onClick={() => {
                    newSeasonMutation.mutate();
                  }}
                  colour={"primary"}
                  isDisabled={newSeasonMutation.isPending}
                >
                  {newSeasonMutation.isPending ? "Creating..." : "New Season"}
                </Button>
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

          <div className="mt-4">
            <Button
              colour={"delete"}
              size="sm"
              onClick={() => setDisplayUserConfirmation(true)}
              isDisabled={deleteSeasonMutation.isPending}
            >
              Delete Season
            </Button>
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
      </Fade>
    </>
  );
};

export default Home;
