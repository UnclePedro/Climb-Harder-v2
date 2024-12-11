import { Season } from "../models/Season";
import axios from "axios";

export const getSeasons = async (): Promise<Season[]> => {
  try {
    const seasons = await axios.get<Season[]>(
      "http://localhost:8080/getSeasons"
    );
    return seasons.data;
  } catch {
    throw new Error("Failed to fetch seasons");
  }
};

// Selects specific season within the seasons array by filtering by ID, used to setViewingSeason in App.tsx, which is then used in Home in the seasons dropdown list
export const getSeason = (seasons: Season[], seasonId: number) => {
  return seasons.find((season) => season.id === seasonId);
};

// Creates new blank season for the user
export const newSeason = async () => {
  try {
    const seasons = await axios.post<Season[]>("/newSeason");
    return seasons.data;
  } catch {
    throw new Error("Failed to create new season");
  }
};

export const deleteSeason = async (seasonId: number) => {
  try {
    const updatedSeasons = await axios.delete<Season[]>("/deleteSeason", {
      data: { seasonId },
    });
    return updatedSeasons.data;
  } catch {
    throw new Error("Failed to delete season");
  }
};
