import { Season } from "../models/Season";
import { newId } from "../utils/helpers";
import axios from "axios";

// Returns seasons array if exists, if null creates new empty season
// export const getSeasons = (): Season[] => {
//   if (localStorage.getItem("seasons") === null) {
//     localStorage.setItem("seasons", JSON.stringify(defaultSeasons));
//   }
//   const seasonsLocal = localStorage.getItem("seasons") as string;
//   const seasons = JSON.parse(seasonsLocal) as Season[];
//   return seasons;
// };

// I think this needs to be used on the backend now... if getSeasons returns no season, initialise a default season to the new user
const defaultSeasons: Season[] = [
  {
    id: newId(),
    name: `Season 1 - ${new Date().toLocaleString("default", {
      month: "long",
    })} ${new Date().getFullYear()}`,
    number: 0,
    workouts: [],
    seasonNotes: {
      trainingFocuses: "",
      goals: "",
      achievements: "",
    },
  },
];

export const getSeasons = async (): Promise<Season[]> => {
  try {
    const seasons = await axios.get<Season[]>("/getSeasons");
    return seasons.data;
  } catch {
    throw new Error("Failed to fetch seasons");
  }
};

// Selects specific season within the seasons array by filtering by ID, used to setViewingSeason in App.tsx, which is then used in Home in the seasons dropdown list
export const getSeason = (seasons: Season[], seasonId: string) => {
  return seasons.find((season) => season.id === seasonId);
};

// Creates new blank season for the user
export const addSeason = async () => {
  try {
    const seasons = await axios.post<Season[]>("/addSeason");
    return seasons.data;
  } catch {
    throw new Error("Failed to add season");
  }
};

export const deleteSeason = async (seasonId: string) => {
  let updatedSeasons = (await getSeasons()).filter(
    (existingSeason: Season) => existingSeason.id !== seasonId
  );
  if (updatedSeasons.length === 0) {
    updatedSeasons = defaultSeasons;
  }
  localStorage.setItem("seasons", JSON.stringify(updatedSeasons));
};
