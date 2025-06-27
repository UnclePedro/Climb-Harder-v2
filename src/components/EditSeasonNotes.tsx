import { SeasonNotes } from "../models/SeasonNotes";
import { saveSeasonNotes } from "../helpers/seasonNotesStorageHelper";
import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import close from "/src/assets/iconography/close.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ReactQuill from "react-quill";
import { toolbarOptions } from "../config/quillConfig";
import Button from "./reusable/button";

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
    seasonNotes.find(
      (existingSeasonNotes: SeasonNotes) =>
        existingSeasonNotes.seasonId === seasonId
    ) || newSeasonNotes;

  const [seasonNotesData, setSeasonNotesData] = useState(seasonNotesToEdit);

  const queryClient = useQueryClient();
  const saveSeasonNotesMutation = useMutation<SeasonNotes, Error, SeasonNotes>({
    mutationFn: saveSeasonNotes,
    onError: (error) => {
      console.error("Failed to save season", error);
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
          <div className="flex flex-col min-h-[85vh] sm:min-h-[80vh] p-4 my-8 mx-6 sm:p-5 w-11/12 sm:w-4/5 lg:w-3/5 xl:w-2/5 bg-amber-100 bg-opacity-80 rounded-lg shadow-[0px_10px_20px_rgba(0,0,0,0.1),0px_-3px_20px_rgba(0,0,0,0.15)]">
            {/* Close Button */}
            <div className="flex justify-end">
              <Button onClick={onClose} iconOnly>
                <Icon className="w-8" iconImg={close} alt="close" />
              </Button>
            </div>

            {/* Form Container */}
            <div className="flex flex-col flex-grow">
              {/* Training Focuses */}
              <p className="font-bold text-md mt-2 sm:mt-3 mb-1">
                Training Focuses
              </p>
              <div className="flex flex-col flex-grow">
                <ReactQuill
                  value={seasonNotesData.trainingFocuses}
                  onChange={(trainingFocuses) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      trainingFocuses,
                    })
                  }
                  className="w-full flex-grow bg-amber-200 rounded-lg active:bg-[#fadf73] transition shadow"
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                />
              </div>

              {/* Goals */}
              <p className="font-bold text-md mt-2 sm:mt-3 mb-1">Goals</p>
              <div className="flex flex-col flex-grow">
                <ReactQuill
                  value={seasonNotesData.goals}
                  onChange={(goals) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      goals,
                    })
                  }
                  className="w-full flex-grow bg-amber-200 rounded-lg active:bg-[#fadf73] transition shadow"
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                />
              </div>

              {/* Achievements */}
              <p className="font-bold text-md mt-2 sm:mt-3 mb-1">
                Achievements
              </p>
              <div className="flex flex-col flex-grow">
                <ReactQuill
                  value={seasonNotesData.achievements}
                  onChange={(achievements) =>
                    setSeasonNotesData({
                      ...seasonNotesData,
                      achievements,
                    })
                  }
                  className="w-full flex-grow bg-amber-200 rounded-lg active:bg-[#fadf73] transition shadow"
                  modules={{
                    toolbar: toolbarOptions,
                  }}
                />
              </div>
            </div>

            {/* Save Button */}
            <Button
              onClick={() => {
                saveSeasonNotesMutation.mutate(seasonNotesData);
                onClose();
              }}
              className="mt-4"
            >
              Save
            </Button>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default EditSeasonNotes;
