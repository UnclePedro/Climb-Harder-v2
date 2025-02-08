import { SeasonNotes } from "../models/SeasonNotes";
import { saveSeasonNotes } from "../helpers/seasonNotesStorageHelper";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import close from "/src/assets/iconography/close.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface Props {
  onClose: () => void;
  seasonNotes: SeasonNotes[];
  seasonId: number;
}

const EditSeasonNotes = ({ onClose, seasonNotes, seasonId }: Props) => {
  const newSeasonNotes: SeasonNotes = {
    seasonId: seasonId,
    trainingFocuses: "",
    goals: "",
    achievements: "",
  };

  const seasonNotesToEdit =
    seasonNotes.find((s) => s.seasonId === seasonId) || newSeasonNotes;

  const [seasonNotesData, setSeasonNotesData] = useState(seasonNotesToEdit);
  const queryClient = useQueryClient();
  const saveSeasonNotesMutation = useMutation<SeasonNotes, Error, SeasonNotes>({
    mutationFn: saveSeasonNotes,
    onError: (error) => {
      console.error("Failed to save season notes", error);
      queryClient.invalidateQueries({ queryKey: ["seasonNotes"] });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["seasonNotes"] });
    },
  });

  return (
    <>
      <Fade>
        <div className="flex justify-center items-center min-h-screen">
          <div className="p-5 w-11/12 sm:w-4/5 lg:w-2/5 bg-amber-100 rounded-lg shadow-lg flex flex-col min-h-[90vh]">
            {/* Close Button */}
            <div className="flex justify-end">
              <button
                className="w-12 -mt-2 -mr-2 sm:hover:scale-105 transition-all"
                onClick={onClose}
              >
                <Icon iconImg={close} alt="close" />
              </button>
            </div>

            {/* Form Container */}
            <div className="flex flex-col flex-grow gap-4">
              {/** Training Focuses */}
              <div className="flex flex-col flex-grow">
                <p className="font-bold text-md mb-1 mt-3">Training Focuses</p>
                <textarea
                  onChange={(e) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      trainingFocuses: e.target.value,
                    })
                  }
                  className="flex-grow bg-amber-200 hover:bg-[#fadf73] rounded-lg border-none focus:outline-none transition-all shadow-md resize-none p-3 h-full"
                  value={seasonNotesData.trainingFocuses}
                />
              </div>

              {/** Goals */}
              <div className="flex flex-col flex-grow">
                <p className="font-bold text-md mb-1 mt-3">Goals</p>
                <textarea
                  onChange={(e) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      goals: e.target.value,
                    })
                  }
                  className="flex-grow bg-amber-200 hover:bg-[#fadf73] rounded-lg border-none focus:outline-none transition-all shadow-md resize-none p-3 h-full"
                  value={seasonNotesData.goals}
                />
              </div>

              {/** Achievements */}
              <div className="flex flex-col flex-grow">
                <p className="font-bold text-md mb-1 mt-3">Achievements</p>
                <textarea
                  onChange={(e) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      achievements: e.target.value,
                    })
                  }
                  className="flex-grow bg-amber-200 hover:bg-[#fadf73] rounded-lg border-none focus:outline-none transition-all shadow-md resize-none p-3 h-full"
                  value={seasonNotesData.achievements}
                />
              </div>
            </div>

            {/* Save Button */}
            <button
              className="bg-amber-500 font-bold rounded-lg px-4 py-2 mt-4 sm:active:scale-95 sm:hover:bg-amber-400 transition-all"
              onClick={() => {
                saveSeasonNotesMutation.mutate(seasonNotesData);
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
