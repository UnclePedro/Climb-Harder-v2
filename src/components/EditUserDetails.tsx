import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/climbing-edited.svg";
// import LottieAnimation from "./LottieAnimation";
// import yellowDotLoadingSmall from "../assets/yellow-dot-loading-small.json";
import { endpointUrl } from "../config/userManagementConig";
import { useAuth } from "../hooks/AuthProvider";

export const EditUserDetails = () => {
  const [viewUser, setViewUser] = useState(false);
  const user = useAuth();

  return (
    <div className="justify-end items-start">
      <Fade duration={400} triggerOnce={true}>
        <button
          onClick={() => setViewUser(true)}
          className="-mt-28 -mr-18  sm:hover:scale-105 transition-all"
        >
          <div className="w-11 sm:w-14">
            <Icon
              iconImg={user?.profilePictureUrl || userIcon}
              alt={"open edit modal"}
            />
          </div>
        </button>
      </Fade>

      {viewUser && (
        <Fade duration={300} triggerOnce={true}>
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center h-screen font-roboto">
            <div
              className={`bg-topography bg-[#FDF1D3] bg-cover rounded-lg p-5 w-fit drop-shadow-lg relative`}
            >
              <button
                onClick={() => {
                  setViewUser(false);
                }}
                className="absolute top-2 right-2 text-black"
              >
                ✖
              </button>
              <div className="mt-6">
                {user && (
                  <div className="p-4 bg-amber-200 rounded-lg shadow-md text-center">
                    <p className="text-xs text-gray-800">You are signed in</p>
                    <p className="text-lg font-semibold text-gray-900">{`Hi ${user.firstName}!`}</p>
                  </div>
                )}

                <a
                  href={`${endpointUrl}/logout`}
                  className="flex items-center justify-center p-2 mt-3 bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 font-medium text-sm rounded-lg px-2 py-1 transition-all"
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default EditUserDetails;
