import { Season } from "../models/Season";
import { SeasonNotes } from "../models/SeasonNotes";
import { updateSeason } from "./seasonsStorageHelper";

export const getSeasonNotes = (currentSeason: Season) => {
  const seasonNotes = currentSeason.seasonNotes as SeasonNotes;
  return seasonNotes;
};

export const saveSeasonNotes = (
  updatedSeasonNotes: SeasonNotes,
  currentSeason: Season
) => {
  currentSeason.seasonNotes = updatedSeasonNotes;
  updateSeason(currentSeason);
};
