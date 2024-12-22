import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/climbing-edited.svg";
import { getUserFromLocalStorage, validateUser } from "../helpers/userHelper";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LottieAnimation from "./LottieAnimation";
import yellowDotLoadingSmall from "../assets/yellow-dot-loading-small.json";
import { User } from "../models/User";

export const EditUserDetails = () => {
  const [editUser, setEditUser] = useState(false);
  const [previousUser] = useState(getUserFromLocalStorage());
  const [userInput, setUserInput] = useState(getUserFromLocalStorage());

  const queryClient = useQueryClient();
  const changeUserMutation = useMutation<User, Error, User>({
    mutationFn: validateUser,

    onError: () => {
      localStorage.setItem("user", JSON.stringify(previousUser));
      setUserInput(previousUser);
    },

    onSuccess: async (validatedNewUser) => {
      localStorage.setItem("user", JSON.stringify(validatedNewUser));
      await queryClient.invalidateQueries({ queryKey: ["seasons"] });
      await queryClient.invalidateQueries({ queryKey: ["seasonNotes"] });
      await queryClient.invalidateQueries({ queryKey: ["workouts"] });
      setEditUser(false);
    },
  });

  return (
    <div className="justify-end items-start">
      <Fade duration={400} triggerOnce={true}>
        <button
          onClick={() => setEditUser(true)}
          className="-mt-28 -mr-18  sm:hover:scale-105 transition-all"
        >
          <div className="w-11 sm:w-14">
            <Icon iconImg={userIcon} alt={"open edit modal"} />
          </div>
        </button>
      </Fade>

      {editUser && (
        <Fade duration={300} triggerOnce={true}>
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center h-screen items-center font-roboto">
            <div
              className={`bg-topography bg-[#FDF1D3] bg-cover rounded-lg p-5 flex flex-col items-center w-fit drop-shadow-lg relative`}
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
                value={userInput.apiKey} // Access the `apiKey` value
                onChange={(e) => {
                  setUserInput({ apiKey: e.target.value });
                }}
                placeholder="Enter your API key"
                className="p-3 rounded-lg text-black bg-amber-200 sm:hover:bg-[#fadf73] shadow-md border-none focus:outline-none transition-all placeholder-black placeholder-opacity-30"
              />
              <button
                onClick={() => {
                  changeUserMutation.mutate(userInput);
                }}
                className="my-3"
              >
                {changeUserMutation.isPending ? (
                  <LottieAnimation
                    animationData={yellowDotLoadingSmall}
                    height={28}
                    width={81}
                  />
                ) : (
                  <button className="bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 font-medium text-sm rounded-lg px-2 py-1 transition-all">
                    Refresh Data
                  </button>
                )}
              </button>

              <div className="italic text-xs text-center">
                <p>
                  Copy this key to other devices and
                  <br />
                  tap refresh to view your training
                </p>
                {changeUserMutation.isError && (
                  <p className="mt-3">The user you entered is invalid</p>
                )}
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default EditUserDetails;
