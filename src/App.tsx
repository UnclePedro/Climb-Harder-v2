import { useEffect, useState } from "react";
import Home from "./components/Home.tsx";
import EditSeasonNotes from "./components/EditSeasonNotes.tsx";
import EditWorkout from "./components/EditWorkout.tsx";
import { getSeasons } from "./helpers/seasonsStorageHelper.ts";
import { Analytics } from "@vercel/analytics/react";
import { getWorkouts } from "./helpers/workoutStorageHelper.ts";
import { useQuery } from "@tanstack/react-query";
import { getSeasonNotes } from "./helpers/seasonNotesStorageHelper.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Season } from "./models/Season.ts";
import { useAuth } from "./hooks/AuthProvider.tsx";
import EditUserDetails from "./components/EditUserDetails.tsx";

function App() {
  const user = useAuth();

  const { data: seasons = [] } = useQuery({
    queryKey: ["seasons"],
    queryFn: getSeasons,
    enabled: !!user,
  });

  const { data: seasonNotes = [] } = useQuery({
    queryKey: ["seasonNotes"],
    queryFn: getSeasonNotes,
    enabled: !!user,
  });

  const { data: workouts = [] } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
    enabled: !!user,
  });

  const [displaySeasonNotes, setDisplaySeasonNotes] = useState(false);
  const [editingWorkoutId, setEditingWorkoutId] = useState<number>(); // This gets passed as props a lot, I need to investigate if I can make this whole thing simpler
  const [viewingSeason, setViewingSeason] = useState<Season>();

  // Would prefer not to use useEffect if I can. Find a workaround in future
  useEffect(() => {
    if (seasons.length > 0) {
      setViewingSeason(seasons[seasons.length - 1]);
    }
  }, [seasons]);

  const seasonWorkouts = workouts.filter(
    (workout) => workout.seasonId === viewingSeason?.id
  );

  return (
    <>
      {!viewingSeason ? (
        <p>Loading screen goes here...</p>
      ) : displaySeasonNotes ? (
        <EditSeasonNotes
          seasonId={viewingSeason.id}
          seasonNotes={seasonNotes}
          onClose={() => setDisplaySeasonNotes(false)}
        />
      ) : editingWorkoutId ? (
        <EditWorkout
          workoutId={editingWorkoutId}
          seasonId={viewingSeason.id}
          workouts={seasonWorkouts}
          onClose={() => {
            setEditingWorkoutId(undefined);
            setViewingSeason(viewingSeason);
          }}
        />
      ) : (
        <>
          <Home
            workouts={seasonWorkouts}
            seasons={seasons}
            seasonNotesOpen={() => setDisplaySeasonNotes(true)}
            onEditWorkout={(workoutId) => setEditingWorkoutId(workoutId)}
            setViewingSeason={setViewingSeason}
            viewingSeason={viewingSeason}
          />
          <div className="absolute top-0 right-0 mt-12 mr-5">
            <EditUserDetails />
          </div>
        </>
      )}
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
