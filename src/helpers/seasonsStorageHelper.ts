import { Season } from "../models/Season";
import { newId } from "../utils/helpers";
import axios from "axios";
import { getUser } from "./userHelper";

// https://climb-harder-api.vercel.app
// http://localhost:8080
const url = "https://random-quote-generator-api.vercel.app";

// Returns seasons array if exists, if null creates new empty season
// export const getSeasons = (): Season[] => {
//   if (localStorage.getItem("seasons") === null) {
//     localStorage.setItem("seasons", JSON.stringify(defaultSeasons));
//   }
//   const seasonsLocal = localStorage.getItem("seasons") as string;
//   const seasons = JSON.parse(seasonsLocal) as Season[];
//   return seasons;
// };

const defaultSeasons: Season[] = [
  {
    id: newId(),
    name: `Season 1 - ${new Date().toLocaleString("default", {
      month: "long",
    })} ${new Date().getFullYear()}`,
    workouts: [],
    seasonNotes: {
      trainingFocuses: "",
      goals: "",
      achievements: "",
    },
  },
];

export const getSeasons = async (): Promise<Season[]> => {
  const user = await getUser();

  // try to set axios headers with API key instead of doing it in this request
  const seasons: Season[] = await axios.post(`${url}/getSeasons`, {
    id: user.id,
    apiKey: user.apiKey,
  });

  if (!seasons) {
    throw new Error("Failed to fetch seasons");
  }

  return seasons;
};

// Selects specific season within the seasons array by filtering by ID
export const getSeason = async (seasonId: string) => {
  return (await getSeasons()).find((season) => season.id === seasonId);
};

// Called when user updates data within the season
export const updateSeason = (updatedSeason: Season) => {
  const updatedSeasons = getSeasons().map((season) => {
    if (season.id === updatedSeason.id) {
      return updatedSeason;
    } else return season;
  });
  localStorage.setItem("seasons", JSON.stringify(updatedSeasons));
};

// Creates new blank season for the user
export const addSeason = () => {
  const newSeason: Season = {
    id: newId(),
    name: `Season ${getSeasons().length + 1} - ${new Date().toLocaleString(
      "default",
      { month: "long" }
    )} ${new Date().getFullYear()}`,
    workouts: [],
    seasonNotes: {
      trainingFocuses: "",
      goals: "",
      achievements: "",
    },
  };

  const updatedSeasons = [...getSeasons(), newSeason];
  localStorage.setItem("seasons", JSON.stringify(updatedSeasons));
  return updatedSeasons;
};

export const deleteSeason = (seasonId: string) => {
  let updatedSeasons = getSeasons().filter(
    (existingSeason: Season) => existingSeason.id !== seasonId
  );
  if (updatedSeasons.length === 0) {
    updatedSeasons = defaultSeasons;
  }
  localStorage.setItem("seasons", JSON.stringify(updatedSeasons));
};
