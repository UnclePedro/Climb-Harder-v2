import { endpointUrl } from "../config/userManagementConig";
import Icon from "./Icon";
import logo from "/src/assets/climb-harder-logo.svg";

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center pt-5">
    <div className="w-[350px] mt-2 sm:mt-0">
      <Icon iconImg={logo} alt={"climb-harder"} />
    </div>

    {/* <img src="/src/assets/climb-harder-landing-page.png" /> */}

    <div className="bg-amber-200 rounded-lg shadow-md p-6 w-11/12 max-w-lg">
      <h2 className="text-xl font-semibold  mb-4">Features of Climb Harder</h2>
      <ul className="space-y-3 list-disc pl-5">
        <li>
          Save workouts with common climbing training types such as strength,
          power, and power endurance
        </li>
        <li>Add details, duration, and dates to your workouts</li>
        <li>
          Easily view how many workouts you’ve completed each week, and what
          training type they were
        </li>
        <li>
          Create multiple training “seasons” for when you finish a training
          block and start a new one
        </li>
      </ul>
    </div>

    <a
      href={`${endpointUrl}/login`}
      className=" bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 transition-all font-bold rounded-lg px-2 py-1 mt-4"
    >
      Sign in
    </a>
  </div>
);

export default LandingPage;
