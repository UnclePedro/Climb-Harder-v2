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
        seasonNotesData: {
          seasonId: viewingSeasonId,
          // Having to destructure like this seems wrong, and I should just be able to send seasonNotes. It works, but I'm not sure if it will with multiple seasonNotes in my frontend.
          // How did I handle multiple seasonNotes in the past? I'm not sure. The data is sent and processed by the backend correctly at the moment (based on seasonId), but will my frontend
          // handle displaying the correct seasonNotes with multiple?
          trainingFocuses: seasonNotes.trainingFocuses,
          achievements: seasonNotes.achievements,
          goals: seasonNotes.goals,
        },
      }
    );

    return updatedSeasonNotes.data;
  } catch {
    throw new Error("Failed to save season notes");
  }
};
