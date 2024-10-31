import { SeasonNotes } from "../models/SeasonNotes";
import { saveSeasonNotes } from "../helpers/seasonNotesStorageHelper";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import { Season } from "../models/Season";
import Icon from "./Icon";
import close from "/src/assets/iconography/close.svg";

interface Props {
  onClose: () => void;
  seasonNotes: SeasonNotes;
  currentSeason: Season;
}

const EditSeasonNotes = ({ onClose, seasonNotes, currentSeason }: Props) => {
  const [seasonNotesData, setSeasonNotesData] = useState(seasonNotes);

  return (
    <>
      <Fade>
        <div className="flex justify-center items-center">
          <div className="p-3 sm:p-6 font-roboto h-11/12 w-11/12 sm:w-4/5 lg:w-1/2">
            <div className="flex justify-end">
              <button className="w-12 mt-3 -mr-2" onClick={onClose}>
                <Icon iconImg={close} alt={"close"} />
              </button>
            </div>
            <p className="font-bold text-lg text-left">Training Focuses</p>

            <textarea
              onChange={(element) => {
                setSeasonNotesData({
                  ...seasonNotesData,
                  trainingFocuses: element.target.value,
                });
              }}
              className="w-full h-[18vh] sm:h-52 bg-amber-200 rounded-lg shadow-md resize-y p-3"
              value={seasonNotesData.trainingFocuses}
            />
            <p className="font-bold text-lg text-left mt-2">Goals</p>
            <textarea
              onChange={(element) => {
                setSeasonNotesData({
                  ...seasonNotesData,
                  goals: element.target.value,
                });
              }}
              className="w-full h-[18vh] sm:h-52 bg-amber-200 rounded-lg shadow-md resize-y p-3"
              value={seasonNotesData.goals}
            />

            <p className="font-bold text-lg text-left mt-2">Achievements</p>
            <textarea
              onChange={(element) => {
                setSeasonNotesData({
                  ...seasonNotesData,
                  achievements: element.target.value,
                });
              }}
              className="w-full h-[18vh] sm:h-52  bg-amber-200 rounded-lg shadow-md resize-y p-3"
              value={seasonNotesData.achievements}
            />
            <button
              className="bg-amber-500 font-bold rounded-lg px-2 py-1 mt-3 "
              onClick={() => {
                saveSeasonNotes(seasonNotesData, currentSeason);
                onClose();
              }}
            >
              Save
            </button>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default EditSeasonNotes;
