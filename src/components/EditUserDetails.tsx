import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/climbing-edited.svg";
import { getUserFromLocalStorage } from "../helpers/userHelper";
import { useQueryClient } from "@tanstack/react-query";

export const EditUserDetails = () => {
  const [editUser, setEditUser] = useState(false);
  const [user, setUser] = useState(getUserFromLocalStorage());

  const queryClient = useQueryClient();
  const refreshData = () => {
    queryClient.invalidateQueries({ queryKey: ["seasons"] });
    queryClient.invalidateQueries({ queryKey: ["seasonNotes"] });
    queryClient.invalidateQueries({ queryKey: ["workouts"] });
  };

  return (
    <div className="justify-end items-start">
      <button
        onClick={() => setEditUser(true)}
        className="-mt-28 -mr-18 transition"
      >
        <div className="w-11 sm:w-14">
          <Icon iconImg={userIcon} alt={"open edit modal"} />
        </div>
      </button>

      {editUser && (
        <Fade duration={300} triggerOnce={true}>
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center z-50 font-roboto">
            <div
              className={`bg-topography bg-[#FDF1D3] bg-cover rounded-lg p-5 flex flex-col items-center w-fit drop-shadow-lg`}
            >
              <button
                onClick={() => setEditUser(false)}
                className="absolute top-2 right-2 text-black"
              >
                ✖
              </button>
              <p className="mb-2 font-bold text-xl">Account Key:</p>
              <input
                type="text"
                value={user.apiKey} // Access the `apiKey` value
                onChange={(e) => {
                  const updatedApiKey = { apiKey: e.target.value };
                  setUser(updatedApiKey);
                  localStorage.setItem("user", JSON.stringify(updatedApiKey));
                }}
                placeholder="Enter your API key"
                className="p-3 rounded-lg text-black bg-amber-200 border border-amber-300 focus:outline-none focus:ring focus:border-amber-500"
              />
              <button
                onClick={refreshData}
                className="bg-amber-500 font-medium text-sm rounded-lg px-2 py-1 flex my-3"
              >
                Refresh Data
              </button>

              <div className="italic text-xs text-center">
                <p>
                  Copy this key to other devices and
                  <br />
                  press refresh to view your training.
                </p>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default EditUserDetails;
