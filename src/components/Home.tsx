import { Fade } from "react-awesome-reveal";
import { Workout } from "../models/Workout";
import QuoteGenerator from "./QuoteGenerator";
import WorkoutList from "./WorkoutList";
import { Season } from "../models/Season";
import { deleteSeason, getSeasons } from "../helpers/seasonsStorageHelper";
import { useState } from "react";
import UserConfirmation from "./UserConfirmation";

interface Props {
  seasonNotesOpen: () => void;
  onEditWorkout: (workoutId: string) => void;
  workouts: Workout[];
  addSeason: () => void;
  viewingSeason: Season;
  setViewingSeason: (seasonId: string) => void;
}

const Home = ({
  seasonNotesOpen,
  onEditWorkout,
  workouts,
  addSeason,
  viewingSeason,
  setViewingSeason,
}: Props) => {
  const [displayUserConfirmation, setDisplayUserConfirmation] = useState(false);

  return (
    <>
      <Fade>
        <div className="sm:flex sm:justify-center">
          <div className="sm:p-8">
            <div className="p-6 font-roboto">
              <div className="w-72 sm:-mt-6">
                <QuoteGenerator />
              </div>
              <div className="flex">
                <div>
                  <h1 className="pt-6 text-2xl text-left font-bold">
                    Training Logbook
                  </h1>

                  <select
                    name="select-season"
                    id="select-season"
                    className="font-bold text-2xl flex h-12 bg-opacity-0 bg-slate-50"
                    value={viewingSeason.id}
                    onChange={(element) => {
                      setViewingSeason(element.target.value);
                    }}
                  >
                    {getSeasons().map((season: Season) => (
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
                    addSeason();
                    setViewingSeason(getSeasons()[getSeasons().length - 1].id); // Get updated list of seasons and set viewingSeason to the last season
                  }}
                >
                  New Season
                </button>
              )}
            </div>

            <div className="p-6 -mt-8">
              <WorkoutList workouts={workouts} onEditWorkout={onEditWorkout} />
            </div>

            <div className="ml-6 -mt-2">
              <button
                className="bg-[#cf5630] font-bold text-xs rounded-lg w-fit px-2 py-1 mb-4"
                onClick={() => {
                  setDisplayUserConfirmation(true);
                }}
              >
                Delete Season
              </button>
            </div>
            {displayUserConfirmation && (
              <UserConfirmation
                userYes={() => (
                  deleteSeason(viewingSeason.id),
                  setViewingSeason(getSeasons()[getSeasons().length - 1].id), // Get updated list of seasons and set viewingSeason to the last season
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
