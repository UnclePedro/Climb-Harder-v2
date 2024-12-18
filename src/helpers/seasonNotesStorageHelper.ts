import axios from "../config/axiosConfig";
import { SeasonNotes } from "../models/SeasonNotes";

export const getSeasonNotes = async (): Promise<SeasonNotes[]> => {
  try {
    const seasonNotes = await axios.get<SeasonNotes[]>("/getSeasonNotes");
    return seasonNotes.data;
  } catch {
    throw new Error("Failed to get season notes");
  }
};

export const saveSeasonNotes = async (seasonNotes: SeasonNotes) => {
  try {
    const updatedSeasonNotes = await axios.put<SeasonNotes>(
      "/saveSeasonNotes",
      {
        seasonNotes,
      }
    );

    return updatedSeasonNotes.data;
  } catch {
    throw new Error("Failed to save season notes");
  }
};
