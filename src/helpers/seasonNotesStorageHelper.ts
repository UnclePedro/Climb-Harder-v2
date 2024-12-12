import axios from "../config/axiosConfig";
import { SeasonNotes } from "../models/SeasonNotes";

export const getSeasonNotes = async (): Promise<SeasonNotes> => {
  try {
    const seasonNotes = await axios.get<SeasonNotes>("/getSeasonNotes");
    return seasonNotes.data;
  } catch {
    throw new Error("Failed to get season notes");
  }
};

export const saveSeasonNotes = async (
  viewingSeasonId: number,
  seasonNotes: SeasonNotes
) => {
  try {
    const updatedSeasonNotes = await axios.put<SeasonNotes>(
      "/saveSeasonNotes",
      {
        seasonId: viewingSeasonId,
        seasonNotes,
      }
    );

    return updatedSeasonNotes.data;
  } catch {
    throw new Error("Failed to save season notes");
  }
};
