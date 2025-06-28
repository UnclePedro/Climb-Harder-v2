import { useState } from "react";
import { Fade } from "react-awesome-reveal";
import Icon from "./Icon";
import userIcon from "/src/assets/climbing-edited.svg";
import { endpointUrl } from "../config/endpointConfig";
import { useAuth } from "../hooks/AuthProvider";
import { exportCsv } from "../helpers/exportDataHelper";
import Button from "./reusable/Button";

export const EditUserDetails = () => {
  const [viewUser, setViewUser] = useState(false);
  const user = useAuth();

  return (
    <div className="justify-end items-start">
      <Fade duration={400} triggerOnce={true}>
        <Button onClick={() => setViewUser(true)} iconOnly>
          <Icon
            className="w-8 sm:w-12 mt-2 sm:mt-6 sm:mr-5 mr-2"
            iconImg={user?.profilePictureUrl || userIcon}
            alt={"edit-user-details"}
          />
        </Button>
      </Fade>

      {viewUser && (
        <Fade duration={300} triggerOnce={true}>
          {/* TODO: Convert this to Modal component */}
          <div className="fixed inset-0 bg-black bg-opacity-65 flex justify-center items-center p-3">
            <div
              className={`bg-topography bg-[#FDF1D3] bg-cover rounded-lg drop-shadow-lg relative`}
            >
              <div className="flex justify-end">
                <Button
                  onClick={() => {
                    setViewUser(false);
                  }}
                  variant="none"
                >
                  ✖
                </Button>
              </div>

              <div className="p-3">
                {user && (
                  <div className="p-4 bg-amber-200 rounded-lg shadow-md text-center">
                    <p className="text-xs text-gray-800">You are signed in</p>
                    <p className="text-lg font-semibold text-gray-900">{`Hi ${user.firstName}!`}</p>
                  </div>
                )}
                <div className="flex flex-col">
                  <Button
                    onClick={() => {
                      if (user) exportCsv(`${user.firstName} ${user.lastName}`);
                    }}
                    className="mt-2"
                    size="sm"
                  >
                    Download CSV
                  </Button>
                  <a href={`${endpointUrl}/logout`}>
                    <Button className="mt-2 w-full" size="sm">
                      Sign out
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      )}
    </div>
  );
};

export default EditUserDetails;
