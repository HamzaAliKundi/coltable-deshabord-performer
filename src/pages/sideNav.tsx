import { NavLink, useLocation } from "react-router-dom";

const navItems = [
  { name: "My Profile", path: "/profile" },
  { name: "Messages", path: "/messages" },
  { name: "Review", path: "/review" },
  { name: "Events", path: "/events" },
  { name: "Helpful Tools", path: "/tools" },
  { name: "Settings", path: "/settings" }
];

interface SideNavProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const SideNav = ({ isSidebarOpen, toggleSidebar }: SideNavProps) => {
  const location = useLocation();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-20 w-[300px] bg-black shadow-md transform ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 md:translate-x-0 md:relative`}
    >
      <nav className="pt-28 md:pt-12 lg:pt-20 sticky -top-16 mb-6">
        <ul className="space-y-2 pl-4 md:pl-12 lg:pl-24">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `block px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle ${
                    isActive ? "text-[#FFFFFF]" : "text-[#888888]"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          {isSidebarOpen && (
            <li className="mt-8">
              <NavLink
                to="#"
                className="px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle text-[#888888] flex items-center gap-2"
              >
                <img
                  src="/login.svg"
                  alt="Logout"
                  className="w-[19px] h-[20px]"
                />
                <span>Logout</span>
              </NavLink>
            </li>
          )}
        </ul>
        {location.pathname === "/profile" && (
          <div className="mt-8 ml-4 md:ml-12 ml:pl-24 relative w-full max-w-[276px] h-[400px] md:h-[588px] bg-[#1A1A1A] rounded-lg mx-auto">
            <div className="flex justify-between px-4 py-2">
              <span className="text-[#888888] text-sm md:text-base">Advertisement</span>
              <button className="text-[#888888]">✕</button>
            </div>
            <div className="w-full h-[calc(100%-40px)] flex flex-col items-center justify-center text-[#888888] text-sm md:text-base">
              Ad Space
              <br />
              276 x 588
            </div>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default SideNav;