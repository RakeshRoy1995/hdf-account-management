import { Collapse } from "@mui/material";
import { useState } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";

export default function Menu() {
  const [activeItem, setActiveItem] = useState(null);

  const handleActive = (item: any) => {
    setActiveItem(item); // Update the active item on click
  };

  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [loanMgtOpen, setLoanMgtOpen] = useState(false);
  const [generalSettingsOpen, setGeneralSettingsOpen] = useState(false);
  const [userOpen, setuserOpen] = useState(false);
  const [trainingMgtOpen, setTrainingMgtOpen] = useState(false);
  const [other, setOther] = useState(false);
  const [trainer, setTrainer] = useState(false);
  const [target, setTarget] = useState(false);
  const [participateOpen, setparticipateOpen] = useState(false);
  const [TargetOpen, setTargetOpen] = useState({});

  const menu = JSON.parse(localStorage.getItem("permission"));

  console.log(`menu`, menu, TargetOpen);

  return (
    <ul className="w-full">
      {menu.data.map((menu_data: any) => (
        <>
          {menu_data?.checked && (
            <>
              {menu_data.subMenu.length > 0 ? (
                <>
                  <li
                    className={`cursor-pointer flex items-center p-3 gap-2 ${
                      userOpen
                        ? "bg-primaryColor text-white font-bold" // Apply hover styles when userOpen is true
                        : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles only on hover when userOpen is false
                    }`}
                    onClick={() =>
                      setTargetOpen({
                        ...TargetOpen,
                        [menu_data?.name]: TargetOpen[menu_data?.name]
                          ? false
                          : true,
                      })
                    }
                  >
                    <svg
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 8.5V13.5M17.5 11H22.5M8 15C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15H12M12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11C14.2091 11 16 9.20914 16 7C16 6.27143 15.8052 5.58835 15.4649 5"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <span>{menu_data?.name}</span>
                    <AiOutlineRight
                      className={`custom-arrow ml-auto ${userOpen ? "rotate-90" : ""}`}
                    />
                  </li>

                  <Collapse in={TargetOpen[menu_data?.name]}>
                    <ul className="">
                      {menu_data.subMenu.map((d: any) => (
                        <li
                          className={`w-full my-5 cursor-pointer border-l-2 ${
                            activeItem === "role"
                              ? "border-l-primaryColor text-primaryColor font-bold"
                              : "border-transparent"
                          }`}
                          onClick={() => handleActive(d?.name)} // Set as active when clicked
                        >
                          <Link to={d?.name} className="ml-3 flex items-center">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M17.2308 8.76925H18.7693V7.23075H17.2308V8.76925ZM17.2308 12.7692H18.7693V11.2308H17.2308V12.7692ZM17.2308 16.7692H18.7693V15.2308H17.2308V16.7692ZM16 20V19H21V5H11.3845V7.1885L10.3845 6.46925V4H22V20H16ZM2 20V11.5L8 7.23075L14 11.5V20H9.26925V15.5H6.73075V20H2ZM3 19H5.73075V14.5H10.2692V19H13V12L8 8.4885L3 12V19Z"
                                fill="currentColor"
                              />
                            </svg>

                            <span className="ml-4">{d?.name}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                </>
              ) : (
                <li className="cursor-pointer flex items-center p-3 hover:bg-primaryColor hover:text-white gap-2 hover:font-bold">
                  <Link to={menu_data?.route} className="flex items-center">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.2308 8.76925H18.7693V7.23075H17.2308V8.76925ZM17.2308 12.7692H18.7693V11.2308H17.2308V12.7692ZM17.2308 16.7692H18.7693V15.2308H17.2308V16.7692ZM16 20V19H21V5H11.3845V7.1885L10.3845 6.46925V4H22V20H16ZM2 20V11.5L8 7.23075L14 11.5V20H9.26925V15.5H6.73075V20H2ZM3 19H5.73075V14.5H10.2692V19H13V12L8 8.4885L3 12V19Z"
                        fill="currentColor"
                      />
                    </svg>

                    <span className="ml-2">{menu_data?.name}</span>
                  </Link>
                </li>
              )}
            </>
          )}
        </>
      ))}
    </ul>
  );
}
