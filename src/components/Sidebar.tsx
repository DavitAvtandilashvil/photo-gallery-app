import { FaHistory, FaHome, FaPhotoVideo } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="w-[250px] border-r-[1px] border-r-[#e1e7ef] h-[100vh] block fixed">
      <div className="flex items-center gap-[15px] mt-[10px] pb-[10px] border-b-[1px] border-b-[#e1e7ef] p-2">
        <FaPhotoVideo size={24} color="blue" />
        <p className="text-[17px] font-medium">ფოტო - გალერია</p>
      </div>
      <div className="mt-[20px] flex flex-col gap-[10px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-[15px] py-[8px] px-[10px] ml-[10px] no-underline ${
              isActive
                ? "border-b-2 border-b-blue-400"
                : "border-b-2 border-transparent"
            }`
          }
        >
          <FaHome size={18} />
          <p className="text-[16px] font-semibold">მთავარი</p>
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-[15px] py-[8px] px-[10px] ml-[10px] no-underline ${
              isActive
                ? "border-b-2 border-b-blue-400"
                : "border-b-2 border-transparent"
            }`
          }
        >
          <FaHistory size={18} />
          <p className="text-[16px] font-semibold">ისტორია</p>
        </NavLink>
      </div>
    </div>
  );
}
