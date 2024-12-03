import React, { useState, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { IoMdNotificationsOutline } from "react-icons/io";
import UserPicture from "../../../assets/loginPageImage/userAvatar.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = (event: MouseEvent) => {
    if (
      event.target instanceof HTMLElement &&
      !event.target.closest(".dropdown-menu") &&
      !event.target.closest(".profile-pic")
    ) {
      setDropdownOpen(false);
    }
  };

  const { t, i18n } = useTranslation();

  // Function to change language
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const user :any = JSON.parse(localStorage.getItem("customer_login_auth"))

  return (
    <header>
      <nav className="max-w-full flex items-center justify-between p-4 bg-white shadow">
        <Link to={"/admin"}>
        <div className="flex items-center">
          <div className="flex items-center">
            <span className="bg-[#FFCC1D] rounded-full h-8 w-8 flex items-center justify-center absolute -mt-3">
              <span className="text-white text-xl font-bold"></span>
            </span>
            <span className="text-teal-700 text-4xl font-bold ml-14 relative">
              LMS
            </span>
          </div>
        </div>
        </Link>
        <div className="flex items-center space-x-4">
          <IoMdNotificationsOutline className="text-gray-600 text-2xl mr-10" />



          <div className="flex flex-col  md:flex">
            <span className="text-teal-700 font-semibold text-right">
              {user?.user?.name}
            </span>
            <span className="text-gray-600 text-right">{user?.user?.organizationType}</span>
          </div>
          <div className="relative">
            <img
              src={UserPicture}
              alt="User"
              className="ml-2 h-14 w-14 rounded-full cursor-pointer profile-pic"
              onClick={toggleDropdown}
            />
            {isDropdownOpen && (
              <div className="dropdown-menu absolute top-16 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Settings
                </a>

                <button
                  onClick={() => changeLanguage("bn")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                   BN
                </button>

                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  EN
                </button>

                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
