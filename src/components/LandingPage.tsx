import { endpointUrl } from "../config/userManagementConig";
import Icon from "./Icon";
import logo from "/src/assets/climb-harder-logo.svg";

const LandingPage = () => (
  <div className="flex flex-col items-center justify-center pt-5">
    <div className="w-[350px] mt-2 sm:mt-0">
      <Icon iconImg={logo} alt={"climb-harder"} />
    </div>

    <a
      href={`${endpointUrl}/login`}
      className=" bg-amber-500 sm:focus:scale-95 sm:hover:bg-amber-400 focus:bg-amber-400 transition-all font-bold rounded-lg px-2 py-1"
    >
      Sign in
    </a>
  </div>
);

export default LandingPage;
