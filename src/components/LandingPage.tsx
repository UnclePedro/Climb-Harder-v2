import { endpointUrl } from "../config/endpointConfig";
import Icon from "./Icon";
import logo from "/src/assets/climb-harder-logo.svg";

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center min-h-screen px-4 mx-4">
    {/* Logo */}
    <div className="w-[350px] mt-2 sm:mt-0">
      <Icon iconImg={logo} alt="climb-harder" />
    </div>

    {/* Features Section */}
    <div className="bg-amber-200 bg-opacity-80 rounded-2xl shadow-lg p-6 w-full max-w-xl mt-3">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Why Use Climb Harder?
      </h2>
      <ul className="space-y-3 list-disc pl-6 leading-relaxed">
        <li>
          Save workouts with common climbing training types such as strength,
          power, and endurance.
        </li>
        <li>Add details, duration, and dates to your workouts.</li>
        <li>
          Easily track how many workouts you’ve completed each week and their
          training type.
        </li>
        <li>
          Create multiple training “seasons” to track different training cycles.
        </li>
        <li>
          All data is saved securely in the cloud, and CSV export is enabled for
          peace of mind.
        </li>
      </ul>
    </div>

    {/* Sign-in*/}
    <div className="flex flex-col  items-center mt-6">
      <a
        href={`${endpointUrl}/login`}
        className="bg-amber-500 font-semibold rounded-lg px-4 py-2 transition-all hover:bg-amber-400 active:bg-amber-500 active:ring-4 active:ring-amber-300 shadow-md"
      >
        Sign In
      </a>

      <div className="flex mt-4 space-x-2">
        <img
          src="/assets/social-icons/google.svg"
          alt="Google"
          className="w-6 h-6"
        />
        <img
          src="/assets/social-icons/microsoft.svg"
          alt="Google"
          className="w-6 h-6"
        />
        <img
          src="/assets/social-icons/apple.svg"
          alt="Google"
          className="w-6 h-6"
        />
        <img
          src="/assets/social-icons/github.svg"
          alt="Google"
          className="w-6 h-6"
        />
      </div>
    </div>
  </div>
);

export default LandingPage;
