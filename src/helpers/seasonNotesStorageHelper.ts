import axios from "axios";
import { SeasonNotes } from "../models/SeasonNotes";

export const getSeasonNotes = async () => {
  try {
    const seasonNotes = await axios.get<SeasonNotes>("/getSeasonNotes");
    return seasonNotes.data;
  } catch {
    throw new Error("Failed to get season notes");
  }
};

export const saveSeasonNotes = async (seasonNotes: SeasonNotes) => {
  try {
    const updatedSeasonNotes = await axios.post<SeasonNotes>(
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
