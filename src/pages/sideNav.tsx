import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoMdClose } from "react-icons/io";
import { useGetTotalUnreadCountQuery } from "../apis/messages";
import io from 'socket.io-client';
import { useGetPerformerProfileQuery } from "../apis/profile";

interface MessagesReadEvent {
  chatId: string;
  unreadCount: number;
}

interface TotalUnreadCountEvent {
  totalUnreadCount: number;
}

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
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { data: unreadCount, refetch: refetchUnreadCount } = useGetTotalUnreadCountQuery({});
  const { data: profileData } = useGetPerformerProfileQuery({});

  useEffect(() => {
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000', {
      transports: ['websocket'],
      reconnection: true,
      timeout: 10000
    });

    socket.on('connect', () => {
      console.log('Socket connected in SideNav');
      if (profileData?.user?._id) {
        socket.emit('join', profileData.user._id);
        socket.emit('get-unread-counts', { userId: profileData.user._id });
      }
    });

    socket.on('new-message', () => {
      if (profileData?.user?._id) {
        socket.emit('get-unread-counts', { userId: profileData.user._id });
      }
    });

    socket.on('total-unread-count', (data: TotalUnreadCountEvent) => {
      console.log('Total unread count received:', data);
      refetchUnreadCount();
    });

    return () => {
      socket.off('connect');
      socket.off('new-message');
      socket.off('total-unread-count');
      socket.disconnect();
    };
  }, [refetchUnreadCount, profileData?.user?._id]);

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.removeItem("token");
      setIsLogoutModalOpen(false);
      setIsLoggingOut(false);
      navigate("/");
    }, 2000);
  };

  return (
    <>
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
                  className={({ isActive }) => {
                    const pathWithoutSlash = item.path.substring(1);
                    const isPathActive = location.pathname.includes(pathWithoutSlash.replace('s', ''));
                    return `block px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle ${
                      isActive || isPathActive ? "text-[#FFFFFF]" : "text-[#888888]"
                    } ${item.name === "Messages" ? "flex items-center justify-between" : ""}`;
                  }}
                >
                  {item.name}
                  {item.name === "Messages" && unreadCount?.totalUnreadCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5 ml-2">
                      {unreadCount?.totalUnreadCount}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
            {isSidebarOpen && (
              <li className="mt-8">
                <button
                  onClick={() => setIsLogoutModalOpen(true)}
                  className="w-full px-4 py-2 font-['Space_Grotesk'] text-[16px] leading-[100%] align-middle text-[#888888] flex items-center gap-2 hover:text-white transition-colors"
                >
                  <img
                    src="/login.svg"
                    alt="Logout"
                    className="w-[19px] h-[20px]"
                  />
                  <span>Logout</span>
                </button>
              </li>
            )}
          </ul>
          {/* {location.pathname === "/profile" && (
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
          )} */}
        </nav>
      </aside>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="relative w-full max-w-md mx-4 bg-black rounded-lg p-8">
            <button 
              onClick={() => setIsLogoutModalOpen(false)}
              className="absolute right-4 top-4 bg-[#747372] hover:bg-gray-700 rounded-full p-1.5 text-gray-300 hover:text-white transition-colors"
            >
              <IoMdClose size={20} />
            </button>

            <h2 className="text-center text-2xl font-bold text-white mb-8 font-['Space_Grotesk']">
              Are you sure you want to logout?
            </h2>

            <div className="flex gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)}
                className="flex-1 h-12 rounded-lg border border-gray-300 text-white font-['Space_Grotesk'] hover:bg-gray-800"
                disabled={isLoggingOut}
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 h-12 rounded-lg bg-white text-black font-['Space_Grotesk'] hover:bg-gray-100 flex items-center justify-center"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging Out...
                  </>
                ) : (
                  "Logout"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideNav;