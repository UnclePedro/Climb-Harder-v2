import { TrainingType } from "../models/Workout";

interface Props {
  name: string;
  trainingType: TrainingType;
  date: string;
  id: string;
}

const WorkoutTile = ({ name, trainingType, date }: Props) => {
  // Object using TrainingType as key paired to string value to be inserted to tailwind as template literal
  const colors = {
    [TrainingType.Base]: "bg-[#5395BE]",
    [TrainingType.Strength]: "bg-[#D9703D]",
    [TrainingType.Power]: "bg-[#F8D55A]",
    [TrainingType.PowerEndurance]: "bg-[#77AD62]",
    [TrainingType.Performance]: "bg-[#E27EAB]",
  };

  return (
    <div
      className={`${colors[trainingType]} p-2 mt-1 sm:m-1 rounded-lg justify-between shadow-md items-center flex sm:block  sm:p-3 sm:w-fit`}
    >
      <p className="text-xs sm:text-sm font-bold">{name}</p>
      <p className="hidden sm:block">{trainingType}</p>
      <p className="text-xs px-18">{date}</p>
    </div>
  );
};

export default WorkoutTile;
