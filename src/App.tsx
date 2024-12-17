import { useEffect, useState } from "react";
import Home from "./components/Home.tsx";
import EditSeasonNotes from "./components/EditSeasonNotes.tsx";
import EditWorkout from "./components/EditWorkout.tsx";
import { getSeasons } from "./helpers/seasonsStorageHelper.ts";
import { Analytics } from "@vercel/analytics/react";
import { getWorkouts } from "./helpers/workoutStorageHelper.ts";
import { useQuery } from "@tanstack/react-query";
import { getUser } from "./helpers/userHelper.ts";
import { getSeasonNotes } from "./helpers/seasonNotesStorageHelper.ts";
import { defaultSeasonNotes } from "./models/SeasonNotes.ts";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Season } from "./models/Season.ts";

function App() {
  useQuery({ queryKey: ["user"], queryFn: getUser });

  const { data: seasons = [] } = useQuery({
    queryKey: ["seasons"],
    queryFn: getSeasons,
  });

  const { data: seasonNotes = defaultSeasonNotes } = useQuery({
    queryKey: ["seasonNotes"],
    queryFn: getSeasonNotes,
  });

  const { data: workouts = [] } = useQuery({
    queryKey: ["workouts"],
    queryFn: getWorkouts,
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

  return (
    <>
      {!viewingSeason ? (
        <p>Loading...</p>
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
          workouts={workouts}
          onClose={() => {
            setEditingWorkoutId(undefined);
            setViewingSeason(viewingSeason);
          }}
        />
      ) : (
        <Home
          workouts={workouts}
          seasons={seasons}
          seasonNotesOpen={() => setDisplaySeasonNotes(true)}
          onEditWorkout={(workoutId) => setEditingWorkoutId(workoutId)}
          setViewingSeason={() => setViewingSeason(viewingSeason)}
          viewingSeason={viewingSeason}
        />
      )}
      <Analytics />
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );
}

export default App;
