import SettingsComponent from "../components/settings";
import Navbar from "../navbar/Navbar";
import Navbar2 from "../navbar/Navbar2";

const Settings = () => {
  return (
    <div className="bg-[#F6F7F9] dark:bg-gray-900 min-h-screen">
      <Navbar />
      <Navbar2 />
      <div className="flex justify-center mx-auto">
        <div className="p-4 bg-white dark:bg-gray-800 h-fit w-full mx-10 my-5 shadow-sm rounded-xl">
          <SettingsComponent />
        </div>
      </div>
    </div>
  );
};

export default Settings;