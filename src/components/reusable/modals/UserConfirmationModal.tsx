import { useEffect, useState } from "react";
import Button from "../Button";

interface Props {
  userYes: () => void;
  userNo: () => void;
}

const UserConfirmation = ({ userYes, userNo }: Props) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay fade-in slightly after mount
    const timeout = setTimeout(() => setVisible(true), 1);
    return () => clearTimeout(timeout);
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(userNo, 300); // match transition duration
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-topography bg-[#FDF1D3] bg-cover font-bold rounded-lg p-5 w-fit drop-shadow-lg transition-all duration-300 ${
          visible ? "scale-100" : "scale-90"
        }`}
      >
        <p className="mb-4 text-center">You sure you wanna send it?</p>
        <div className="flex space-x-4 justify-center">
          <Button
            onClick={() => {
              userYes();
              handleClose();
            }}
          >
            Yes
          </Button>
          <Button onClick={handleClose}>No</Button>
        </div>
      </div>
    </div>
  );
};

export default UserConfirmation;
