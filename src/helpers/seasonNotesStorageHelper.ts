import axiosInstance from "../config/axiosConfig";
import { SeasonNotes } from "../models/SeasonNotes";

export const getSeasonNotes = async (): Promise<SeasonNotes[]> => {
  try {
    const seasonNotes = await axiosInstance.get<SeasonNotes[]>(
      "/getSeasonNotes"
    );
    return seasonNotes.data;
  } catch {
    throw new Error("Failed to get season notes");
  }
};

export const saveSeasonNotes = async (seasonNotes: SeasonNotes) => {
  try {
    const updatedSeasonNotes = await axiosInstance.put<SeasonNotes>(
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
