// import { Collapse } from "@mui/material";
// import { useState } from "react";

// import { Link, Outlet } from "react-router-dom";
// import Menu from "./Menu";

// function Layout() {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleClose = () => setIsOpen(false);





//   return (
//     <div className="flex">
//       {/* Button to open the drawer - Visible only on sm and md screens */}
//       <button
//         onClick={() => setIsOpen(true)}
//         className="lg:hidden  text-white bg-white rounded-md  top-8  left-28 z-50  h-1 absolute"
//       >

//         <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//           <path d="M4 7L7 7M20 7L11 7" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//           <path d="M20 17H17M4 17L13 17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//           <path d="M4 12H7L20 12" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
//         </svg>
//       </button>

//       {/* Drawer Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={handleClose}
//         ></div>
//       )}

//       {/* Drawer */}
//       <div
//         className={`fixed top-0 left-0 h-full bg-white shadow-lg z-50 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
//           } transition-transform duration-300 sm:w-[120px] md:w-[200px] lg:w-[263px]`}
//       >
//         {/* Drawer Header */}
//         <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">MENU</h2>
//           <button onClick={handleClose} className="text-gray-600">
//             &times;
//           </button>
//         </div>

//         {/* Drawer Content */}
//         <div className="flex flex-col justify-between h-full py-2">
//           <div className="px-4">
//             <Menu />
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex flex-col lg:flex-row w-full">
//         {/* Sidebar for large screens */}
//         <div className="hidden lg:flex  sm:w-[120px] md:w-[200px] lg:w-[263px] shadow-lg bg-white mt-[2px] font-sans text-sm font-normal">
//           <div className="px-4 py-5">
//           <Menu />
//           </div>
//         </div>

//         {/* Content Area */}
//         <div className="container mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-[1200px] p-5">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Layout;


import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Menu from "./Menu";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 640);

  // Update state on resize to handle initial screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsSidebarOpen(true); // Open sidebar for sm and larger
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle sidebar open/close
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-Shadesblack shadow-lg transition-all duration-300 ${
          isSidebarOpen
            ? "w-screen xs:w-screen sm:w-64" // Full-screen on xs, regular width on sm+
            : "w-0 sm:w-16"
        } sm:${isSidebarOpen ? "w-64" : "w-16"} z-50`}
      >
        {/* Sidebar Header with Toggle Button */}
        <div className="flex items-center justify-between p-4 border-gray-700">
          <h2
            className={`text-QuinaryColor text-lg font-semibold ${
              isSidebarOpen ? "block" : "hidden xs:block sm:block md:hidden lg:hidden xl:hidden"
            }`}
          >
            MENU
          </h2>
          <button
            onClick={toggleSidebar}
            className="text-QuinaryColor hover:text-QuinaryColor focus:outline-none"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 7L20 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 12L20 12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M4 17L20 17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-col h-full overflow-y-auto py-2"> {/* Fix applied here */}
          <div className="px-4">
            <Menu isSidebarOpen={isSidebarOpen} />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {/* Add an overlay for xs if sidebar is open */}
      {isSidebarOpen && window.innerWidth < 640 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 sm:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
      <div
        className={`flex flex-col w-full ${
          isSidebarOpen ? "ml-0 sm:ml-64" : "ml-0 sm:ml-16"
        } transition-all duration-300`}
      >
        <div className="container mx-auto p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
