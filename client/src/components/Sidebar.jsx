import clsx from "clsx";
import { FaTasks } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
  {
    label: "Timesheets",
    link: "weekly-summary",
    icon: <MdOutlinePendingActions />,
  },
  {
    label: "Tasks",
    link: "tasks",
    icon: <FaTasks />,
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = linkData;

  const closeSidebar = () => {
    dispatch(setOpenSidebar(false));
  };

  const NavLink = ({ el }) => {
    return (
      <Link
        onClick={closeSidebar}
        to={el.link}
        className={clsx(
          "w-full lg:w-3/4 flex gap-2 px-3 py-2 rounded-xl items-center text-gray-800 dark:text-gray-400 text-base hover:bg-[#2564ed2d]",
          path === el.link.split("/")[0] ? "bg-blue-700 text-white" : ""
        )}
      >
        {el.icon}
        <span className="hover:text-[#2564ed] w-full">{el.label}</span>
      </Link>
    );
  };

  return (
    <div className="w-full h-full flex flex-col gap-6 p-5">
      <h1 className="flex gap-1 items-center">
        <span className="text-2xl font-bold text-black dark:text-white">
          TickTock
        </span>
      </h1>

      <div className="flex-1 flex flex-col gap-y-5 py-8 w-full">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
