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
  const [other, setOther] = useState(false)
  const [trainer, setTrainer] = useState(false)
  const [target, setTarget] = useState(false)
  const [participateOpen, setparticipateOpen] = useState(false);
  const [TargetOpen, setTargetOpen] = useState(false);

  return (
    <ul className="w-full">
      {/* Dashboard */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${dashboardOpen
          ? "bg-primaryColor text-white font-bold" // Apply hover styles when dashboardOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles on hover when dashboardOpen is false
          }`}
        onClick={() => setDashboardOpen(!dashboardOpen)}
      >
        <svg
          className=""
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M3 20V19H21V20H3ZM4 17.2308V12H6V17.2308H4ZM8.65375 17.2308V7H10.6537V17.2308H8.65375ZM13.327 17.2308V10H15.327V17.2308H13.327ZM18 17.2308V4H20V17.2308H18Z" />
        </svg>
        <span>Dashboard</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${dashboardOpen ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={dashboardOpen}>
      </Collapse>
      {/* user role */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${userOpen
          ? "bg-primaryColor text-white font-bold" // Apply hover styles when userOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles only on hover when userOpen is false
          }`}
        onClick={() => setuserOpen(!userOpen)}
      >

        <svg width="20px" height="20px" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 8.5V13.5M17.5 11H22.5M8 15C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15H12M12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11C14.2091 11 16 9.20914 16 7C16 6.27143 15.8052 5.58835 15.4649 5" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
        <span>User Management</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${userOpen ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={userOpen}>
        <ul className="">
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'role' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('role')} // Set as active when clicked
          >
            <Link to="/dashboard/role" className="ml-3 flex items-center">

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

              <span className="ml-4">Role</span>
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Permission' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Permission')} // Set as active when clicked
          >
            <Link to="/dashboard/permission" className="ml-3 flex items-center">


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

              <span className="ml-4">Permission</span>
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Menu' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Menu')} // Set as active when clicked
          >
            <Link to="/dashboard/menu" className="ml-3 flex items-center">
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
              <span className="ml-4">Menu</span>
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'employee' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('employee')} // Set as active when clicked
          >
            <Link to="/dashboard/employee" className="ml-3 flex items-center">
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
              <span className="ml-4">Employee</span>
            </Link>
          </li>


          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'user' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('user')} // Set as active when clicked
          >
            <Link to="/dashboard/user" className="ml-3 flex items-center">
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
              <span className="ml-4">User</span>
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Role Permission' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Role Permission')} // Set as active when clicked
          >
            <Link to="/dashboard/role-permission" className="ml-3 flex items-center">
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
              <span className="ml-4">Role Permission</span>
            </Link>
          </li>

        </ul>
      </Collapse>

      {/* Profile */}
      <li className="cursor-pointer flex items-center p-3 hover:bg-primaryColor hover:text-white gap-2 hover:font-bold">
        <Link to="/profile" className="flex items-center">
          {/* <TfiMedall className="mr-2" /> */}
          {/* <img src={Profile} alt="" /> */}
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

          <span className="ml-2">Profile</span>
        </Link>
      </li>

      {/* Loan Mgt. */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${loanMgtOpen
          ? "bg-primaryColor text-white font-bold" // Apply hover styles when loanMgtOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles only on hover when loanMgtOpen is false
          }`}
        onClick={() => setLoanMgtOpen(!loanMgtOpen)}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.30775 17.6923H9.19225V15.6923H11.1923V14.8077H9.19225V12.8077H8.30775V14.8077H6.30775V15.6923H8.30775V17.6923ZM13.3077 16.9423H17.6923V16.0577H13.3077V16.9423ZM13.3077 14.4423H17.6923V13.5577H13.3077V14.4423ZM14.1 10.4885L15.5 9.0885L16.9 10.4885L17.527 9.8615L16.127 8.45L17.527 7.05L16.9 6.423L15.5 7.823L14.1 6.423L13.473 7.05L14.873 8.45L13.473 9.8615L14.1 10.4885ZM6.55775 8.89225H10.9423V8.00775H6.55775V8.89225ZM5.6155 20C5.15517 20 4.77083 19.8458 4.4625 19.5375C4.15417 19.2292 4 18.8448 4 18.3845V5.6155C4 5.15517 4.15417 4.77083 4.4625 4.4625C4.77083 4.15417 5.15517 4 5.6155 4H18.3845C18.8448 4 19.2292 4.15417 19.5375 4.4625C19.8458 4.77083 20 5.15517 20 5.6155V18.3845C20 18.8448 19.8458 19.2292 19.5375 19.5375C19.2292 19.8458 18.8448 20 18.3845 20H5.6155ZM5.6155 19H18.3845C18.5385 19 18.6796 18.9359 18.8077 18.8077C18.9359 18.6796 19 18.5385 19 18.3845V5.6155C19 5.4615 18.9359 5.32042 18.8077 5.19225C18.6796 5.06408 18.5385 5 18.3845 5H5.6155C5.4615 5 5.32042 5.06408 5.19225 5.19225C5.06408 5.32042 5 5.4615 5 5.6155V18.3845C5 18.5385 5.06408 18.6796 5.19225 18.8077C5.32042 18.9359 5.4615 19 5.6155 19Z"
            fill="currentColor"
          />
        </svg>
        <span className="flex items-center">Loan Mgt.</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${loanMgtOpen ? "rotate-90" : ""}`}
        />
      </li>


      {/* General Settings */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${generalSettingsOpen
          ? "bg-primaryColor text-white font-bold" // Apply hover styles when generalSettingsOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles only on hover when generalSettingsOpen is false
          }`}
        onClick={() => setGeneralSettingsOpen(!generalSettingsOpen)}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.1345 18L6.773 15.1077C6.45384 15.0116 6.10867 14.8603 5.7375 14.6538C5.36633 14.4474 5.05067 14.2263 4.7905 13.9905L2.123 15.125L0.257751 11.875L2.5635 10.1365C2.534 9.95583 2.50967 9.76967 2.4905 9.578C2.47117 9.38633 2.4615 9.20008 2.4615 9.01925C2.4615 8.85125 2.47117 8.67467 2.4905 8.4895C2.50967 8.30417 2.534 8.0955 2.5635 7.8635L0.257751 6.125L2.123 2.9135L4.77125 4.02875C5.06992 3.78008 5.393 3.55575 5.7405 3.35575C6.08783 3.15575 6.42558 3.00125 6.75375 2.89225L7.1345 0H10.8655L11.227 2.9115C11.6103 3.04617 11.9491 3.20067 12.2433 3.375C12.5374 3.54933 12.8403 3.76725 13.152 4.02875L15.877 2.9135L17.7423 6.125L15.3595 7.92125C15.4147 8.12758 15.4455 8.317 15.452 8.4895C15.4583 8.66183 15.4615 8.832 15.4615 9C15.4615 9.15517 15.4551 9.31892 15.4423 9.49125C15.4294 9.66375 15.3999 9.87242 15.3538 10.1173L17.698 11.875L15.8328 15.125L13.152 13.9712C12.8403 14.2327 12.5268 14.4571 12.2115 14.6443C11.8962 14.8314 11.568 14.9795 11.227 15.0885L10.8655 18H7.1345ZM8 17H9.95575L10.325 14.2923C10.8288 14.1589 11.2823 13.9759 11.6855 13.7432C12.0888 13.5106 12.4994 13.1917 12.9173 12.7865L15.4115 13.85L16.4058 12.15L14.2173 10.5058C14.3006 10.2211 14.3558 9.95925 14.3828 9.72025C14.4096 9.48108 14.423 9.241 14.423 9C14.423 8.74617 14.4096 8.50608 14.3828 8.27975C14.3558 8.05358 14.3006 7.80458 14.2173 7.53275L16.4443 5.85L15.45 4.15L12.898 5.21925C12.5955 4.88725 12.1978 4.576 11.7048 4.2855C11.2119 3.99517 10.7456 3.80258 10.3058 3.70775L10 1H8.00575L7.69425 3.6885C7.19042 3.79617 6.72725 3.96958 6.30475 4.20875C5.88242 4.44775 5.46225 4.77625 5.04425 5.19425L2.55 4.15L1.55575 5.85L3.725 7.46925C3.64167 7.69358 3.58333 7.93717 3.55 8.2C3.51667 8.46283 3.5 8.73592 3.5 9.01925C3.5 9.27308 3.51667 9.525 3.55 9.775C3.58333 10.025 3.63525 10.2686 3.70575 10.5058L1.55575 12.15L2.55 13.85L5.025 12.8C5.41734 13.1962 5.82467 13.5138 6.247 13.753C6.6695 13.992 7.1455 14.1782 7.675 14.3115L8 17ZM8.973 11.5C9.6705 11.5 10.2616 11.2577 10.7463 10.773C11.2308 10.2885 11.473 9.6975 11.473 9C11.473 8.3025 11.2308 7.7115 10.7463 7.227C10.2616 6.74233 9.6705 6.5 8.973 6.5C8.27184 6.5 7.67984 6.74233 7.197 7.227C6.71433 7.7115 6.473 8.3025 6.473 9C6.473 9.6975 6.71433 10.2885 7.197 10.773C7.67984 11.2577 8.27184 11.5 8.973 11.5Z"
            fill="currentColor"
          />
        </svg>

        <span className="ml-1.5">General Settings</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${generalSettingsOpen ? "rotate-90" : ""}`}
        />
      </li>

      <Collapse in={generalSettingsOpen}>
        <ul className="">

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'component-setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('component-setup')} // Set as active when clicked
          >
            <Link to="/component-add" className="ml-10">
              Component
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'project-setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('project-setup')} // Set as active when clicked
          >
            <Link to="/project-setup" className="ml-10">
              Project Setup
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'partner-organization-setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('partner-organization-setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/partner-organization-setup"
            >
              Partner Organization Setup
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Branch setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Branch setup')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/branch-add">
              Branch setup
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Project Wise Partner Organization Mapping' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Project Wise Partner Organization Mapping')} // Set as active when clicked
          >
            <Link
              className="ml-10   w-36 flex flex-wrap"
              to="/project-wise-partner-organization-mapping-add"
            >
              Project Wise Partner Organization Mapping
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Sector Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Sector Setup')} // Set as active when clicked
          >
            <Link className="ml-10" to="/sector-setup">
              Sector Setup
            </Link>
          </li>


          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Eligiblility Criteria Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Eligiblility Criteria Setup')} // Set as active when clicked
          >
            <Link
              className="ml-10   w-24 flex flex-wrap"
              to="/eligiblility-criteria-setup"
            >
              Eligiblility Criteria Setup
            </Link>
          </li> */}
          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Map Eligibility Criteria with PO' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Map Eligibility Criteria with PO')} // Set as active when clicked
          >
            <Link
              className="ml-10   w-36 flex flex-wrap"
              to="/map-eligibility-criteria-with-PO"
            >
              Map Eligibility Criteria with PO
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Bank' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Bank')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap" to="/bank-add">
              Bank
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Weekend Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Weekend Setup')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap" to="/weekend-setup">
              Weekend Setup
            </Link>
          </li>
          {/* holiday */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Holiday Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Holiday Setup')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap" to="/holiday-setup-add">
              Holiday Setup
            </Link>
          </li>
          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Form Builder' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Form Builder')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/form-builder">
              Form Builder
            </Link>
          </li> */}


          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Trainee Assessment Criteria' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Trainee Assessment Criteria')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/trainee-assessment-criteria"
            >
              Trainee Assessment Criteria
            </Link>
          </li> */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Ministry' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Ministry')} // Set as active when clicked
          >
            <Link className="ml-10" to="/ministry-add">
              Ministry
            </Link>
          </li>
        </ul>
      </Collapse>

      {/* Participant Mgt. */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${participateOpen
          ? "bg-primaryColor text-white font-bold" // Apply styles when participateOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles when participateOpen is false
          }`}
        onClick={() => setparticipateOpen(!participateOpen)}
      >
        {/* <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 18.6923L6 15.4308V10.5846L3.077 9.00006L12 4.15381L20.923 9.00006V15.3848H19.923V9.56156L18 10.5846V15.4308L12 18.6923ZM12 12.7001L18.8307 9.00006L12 5.30006L5.16925 9.00006L12 12.7001ZM12 17.5521L17 14.8521V11.1346L12 13.8426L7 11.1346V14.8521L12 17.5521Z"
            fill="currentColor"
          />
        </svg> */}

        <svg fill="currentColor" height="20px" width="20px" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256">
          <g>
            <circle cx="193.3" cy="113.5" r="16.8" />
            <circle cx="172.6" cy="155.3" r="16.8" />
            <path d="M145.8,175.2h-18.9h-18.9c-11.5,0-18.7,9.5-18.7,21.4v29.3h12.9V200c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5V200
		c0-1.2,1-2,2-2c1.2,0,2,1,2,2v25.8h12.9v-29.1C164.8,184.7,157.5,175.2,145.8,175.2z"/>
            <circle cx="150.5" cy="113.5" r="16.8" />
            <path d="M199.9,155.3c0,9.3,7.5,16.8,16.8,16.8c9.3,0,16.8-7.5,16.8-16.8c0-9.3-7.5-16.8-16.8-16.8
		C207.4,138.5,199.9,146,199.9,155.3z"/>
            <path d="M198.2,175.2c-11.5,0-18.7,9.5-18.7,21.4v29.3h12.9V200c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5V200c0-1.2,1-2,2-2
		c1.2,0,2,1,2,2v25.8h12.9v-29.1c0.2-12.1-7.1-21.6-18.7-21.6h-18.9H198.2z"/>
            <circle cx="40.6" cy="155.3" r="16.8" />
            <path d="M15.6,225.8V200c0-1.2,1-2,2-2c1.2,0,2,0.8,2,2v25.8h41.5V200c0-1.2,1-2,2-2c1.2,0,2,1,2,2v25.8h12.9v-29.1
		c0.2-12.1-7.1-21.6-18.7-21.6H40.4H21.5c-11.5,0-18.7,9.5-18.7,21.4v29.3H15.6z"/>
            <path d="M110.1,155.3c0,9.3,7.5,16.8,16.8,16.8c9.3,0,16.8-7.5,16.8-16.8c0-9.3-7.5-16.8-16.8-16.8
		C117.6,138.5,110.1,146,110.1,155.3z"/>
            <circle cx="62.1" cy="113.5" r="16.8" />
            <circle cx="107.5" cy="113.5" r="16.8" />
            <circle cx="171.5" cy="77.6" r="16.8" />
            <circle cx="83.1" cy="77.6" r="16.8" />
            <circle cx="128.4" cy="77.6" r="16.8" />
            <circle cx="84.9" cy="155.3" r="16.8" />
          </g>
        </svg>
        <span className="">Participant Mgt.</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${participateOpen ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={participateOpen}>
        <ul className="">
          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Call for Application Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Call for Application Setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/call-for-application-setup"
            >
              Call for Application Setup
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Eligible applicants list' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Eligible applicants list')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/eligible-applicants-list"
            >
              Eligible applicants list
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Participant Registration' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Participant Registration')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/participant-registration"
            >
              Participant Registration
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'MCP Registration' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('MCP Registration')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/mcp-registration"
            >
              MCP Registration
            </Link>
          </li>

          <li
            onClick={() => handleActive('Participant Enrolment')}
            className={`w-full mb-5 cursor-pointer  ${activeItem === 'Participant Enrolment' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
          >
            <Link className="ml-10" to="/participant-enrolment">
              Enrolment add
            </Link>
          </li>

          <li
            onClick={() => handleActive('Participant Enrolment list')}
            className={`w-full mb-5 cursor-pointer  ${activeItem === 'Participant Enrolment list' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
          >
            <Link className="ml-10" to="/participant-enrolment-list">
              Enrolment List
            </Link>
          </li>

          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/participant-enrolment-pending"
            >
              Participant Enrolment
            </Link>
          </li> */}
          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/participant-enrolment"
            >
              Participant Enrolment
            </Link>
          </li> */}

          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/participants">
              Participants
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Participant Attendance' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Participant Attendance')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36"
              to="/participant-attendance"
            >
              Participant Attendance
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === ' Applicant List' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive(' Applicant List')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36"
              to="/applicant-list"
            >
          Applicant List
            </Link>
          </li>





        </ul>
      </Collapse>

      {/* Training Mgt. */}
      <li
        className={`cursor-pointer flex items-center p-3 gap-2 ${trainingMgtOpen
          ? "bg-primaryColor text-white font-bold" // Apply styles when trainingMgtOpen is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles when trainingMgtOpen is false
          }`}
        onClick={() => setTrainingMgtOpen(!trainingMgtOpen)}
      >


        <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 256 256" id="Layer_1" version="1.1" xmlns="http://www.w3.org/2000/svg" >

          <g>

            <path d="M116.1,26.9h4.3v76.7c0,5.9,4.8,10.7,10.7,10.7H233c5.9,0,10.7-4.8,10.7-10.7V26.9h4.3c2.8,0,5-2.3,5-5s-2.3-5-5-5h-8.8   c-0.2,0-0.4-0.1-0.5-0.1c-0.2,0-0.4,0.1-0.5,0.1H126c-0.2,0-0.4-0.1-0.5-0.1c-0.2,0-0.4,0.1-0.5,0.1h-8.8c-2.8,0-5,2.3-5,5   S113.3,26.9,116.1,26.9z M233.7,103.6c0,0.4-0.3,0.7-0.7,0.7H131.1c-0.4,0-0.7-0.3-0.7-0.7V26.9h103.2V103.6z" />

            <path d="M243.7,206.3c-6.6-3.3-18.6-7.6-24.5-9.6v-0.2c3.1-2.8,5.3-6.4,6.6-10.4c3.2-1,5.9-3.4,7.3-6.6c0.9-1.8,1.4-3.8,1.4-5.8   c0-1.4-0.2-2.7-0.7-4c-0.4-1.6-1.2-3-2.3-4.1c1.2-7.2-0.6-14.5-5.1-20.2c-5.1-6.6-13-10.5-21.6-10.7c-0.4,0-0.8,0-1,0   c-0.4,0-0.8,0-1.3,0c-8.6,0.2-16.5,4.1-21.6,10.7c-4.5,5.8-6.3,13.1-5.1,20.2c-1.1,1.1-1.9,2.5-2.3,4.1c-0.5,1.3-0.7,2.6-0.7,4   c0,2,0.5,4,1.4,5.8c1.4,3.2,4.1,5.6,7.3,6.6c1.2,4,3.5,7.6,6.6,10.4v0.2c-5.2,1.8-15.3,5.4-22.3,8.6c-6.8-3.1-17-6.8-22.3-8.6v-0.2   c3.1-2.8,5.3-6.4,6.6-10.4c3.2-1,5.9-3.4,7.3-6.6c0.9-1.8,1.4-3.8,1.4-5.8c0-1.4-0.2-2.7-0.7-4c-0.4-1.6-1.2-3-2.3-4.1   c1.2-7.2-0.6-14.5-5.1-20.2c-5.1-6.6-13-10.5-21.6-10.7c-0.4,0-0.8,0-1,0c-0.4,0-0.8,0-1.3,0c-8.6,0.2-16.5,4.1-21.6,10.7   c-4.5,5.8-6.3,13.1-5.1,20.2c-1.1,1.1-1.9,2.5-2.3,4.1c-0.5,1.3-0.7,2.6-0.7,4c0,2,0.5,4,1.4,5.8c1.4,3.2,4.1,5.6,7.3,6.6   c1.2,4,3.5,7.6,6.6,10.4v0.2c-5.3,1.8-15.4,5.5-22.3,8.6c-6.8-3.1-17-6.8-22.3-8.6v-0.2c3.1-2.8,5.3-6.4,6.6-10.4   c3.2-1,5.9-3.4,7.3-6.6c0.9-1.8,1.4-3.8,1.4-5.8c0-1.4-0.2-2.7-0.7-4c-0.4-1.6-1.2-3-2.3-4.1c1.2-7.2-0.6-14.5-5.1-20.2   c-5.1-6.6-13-10.5-21.6-10.7c-0.4,0-0.8,0-1,0c-0.4,0-0.8,0-1.3,0c-8.6,0.2-16.5,4.1-21.6,10.7c-4.5,5.8-6.3,13.1-5.1,20.2   c-1.1,1.1-1.9,2.5-2.3,4.1c-0.5,1.3-0.7,2.6-0.7,4c0,2,0.5,4,1.4,5.8c1.4,3.2,4.1,5.6,7.3,6.6c1.2,4,3.5,7.6,6.6,10.4v0.2   c-5.9,2-17.9,6.4-24.5,9.6c-4,2-6.9,5.8-7.6,10.3c-1.5,8.8-1.8,23.1-1.8,23.7c0,2.8,2.2,5.1,5,5.1c0,0,0.1,0,0.1,0c2.7,0,5-2.2,5-5   c0-0.1,0.3-14.1,1.6-22.2c0.2-1.3,1-2.4,2.2-3c8.1-4,26.4-10.2,26.6-10.3c2.1-0.7,3.4-2.6,3.4-4.8v-6.2c0-1.6-0.7-3.1-2-4l-0.5-0.4   c-2.6-1.9-4.3-4.9-4.9-8.1l-0.1-0.7c-0.4-2.5-2.5-4.3-5-4.3h-0.5c-0.9,0-1.5-0.6-1.7-1.2c-0.1-0.2-0.2-0.4-0.3-0.5   c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.2,0-0.5,0.1-0.7c0-0.1,0.1-0.2,0.1-0.2l1-0.6c1.9-1.1,2.8-3.3,2.3-5.4l-0.4-1.9   c-1.1-4.7-0.1-9.5,2.9-13.3c3.2-4.2,8.3-6.6,13.9-6.8l1,0l0.8,0c5.6,0.1,10.6,2.6,13.9,6.8c3,3.8,4,8.5,2.9,13.3l-0.4,1.9   c-0.5,2.1,0.4,4.3,2.3,5.4l1,0.6c0,0.1,0.1,0.2,0.1,0.2c0.1,0.2,0.1,0.5,0.1,0.7c0,0.4-0.1,0.8-0.3,1.2c-0.1,0.2-0.2,0.4-0.3,0.5   c-0.2,0.5-0.8,1.2-1.7,1.2h-0.5c-2.5,0-4.6,1.8-5,4.3l-0.1,0.7c-0.5,3.2-2.3,6.2-4.8,8.1l-0.5,0.4c-1.3,1-2,2.4-2,4v6.2   c0,2.2,1.4,4.1,3.4,4.8c0.2,0.1,18.5,6.2,26.4,10.2c1.5,0.8,3.3,0.8,4.8,0.1c8.1-4,26.4-10.2,26.6-10.3c2.1-0.7,3.4-2.6,3.4-4.8   v-6.2c0-1.6-0.7-3.1-2-4l-0.5-0.4c-2.6-1.9-4.3-4.9-4.9-8.1l-0.1-0.7c-0.4-2.5-2.5-4.3-5-4.3h-0.5c-0.9,0-1.5-0.6-1.7-1.2   c-0.1-0.2-0.2-0.4-0.3-0.5c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.2,0-0.5,0.1-0.7c0-0.1,0.1-0.2,0.1-0.2l1-0.6c1.9-1.1,2.8-3.3,2.3-5.4   l-0.4-1.9c-1.1-4.7-0.1-9.5,2.9-13.3c3.2-4.2,8.3-6.6,13.9-6.8l1,0l0.8,0c5.6,0.1,10.6,2.6,13.9,6.8c3,3.8,4,8.5,2.9,13.3l-0.4,1.9   c-0.5,2.1,0.4,4.3,2.3,5.4l1,0.6c0,0.1,0.1,0.2,0.1,0.2c0.1,0.2,0.1,0.5,0.1,0.7c0,0.4-0.1,0.8-0.3,1.2c-0.1,0.2-0.2,0.3-0.3,0.5   c-0.2,0.5-0.8,1.2-1.7,1.2h-0.5c-2.5,0-4.6,1.8-5,4.3l-0.1,0.7c-0.5,3.2-2.3,6.2-4.9,8.1l-0.5,0.4c-1.3,1-2,2.4-2,4v6.2   c0,2.2,1.4,4.1,3.4,4.8c0.2,0.1,18.5,6.2,26.6,10.3c1.4,0.8,3.2,0.7,4.7,0c8.1-4,26.4-10.2,26.6-10.3c2.1-0.7,3.4-2.6,3.4-4.8v-6.2   c0-1.6-0.7-3.1-2-4l-0.5-0.4c-2.6-1.9-4.3-4.9-4.9-8.1l-0.1-0.7c-0.4-2.5-2.5-4.3-5-4.3h-0.5c-0.9,0-1.5-0.6-1.7-1.2   c-0.1-0.2-0.2-0.4-0.3-0.5c-0.2-0.4-0.3-0.8-0.3-1.2c0-0.2,0-0.5,0.1-0.7c0-0.1,0.1-0.2,0.1-0.2l1-0.6c1.9-1.1,2.8-3.3,2.3-5.4   l-0.4-1.9c-1.1-4.7-0.1-9.5,2.9-13.3c3.2-4.2,8.3-6.6,13.9-6.8l1,0l0.8,0c5.6,0.1,10.6,2.6,13.9,6.8c3,3.8,4,8.5,2.9,13.3l-0.4,1.9   c-0.5,2.1,0.4,4.3,2.3,5.4l1,0.6c0,0.1,0.1,0.2,0.1,0.2c0.1,0.2,0.1,0.5,0.1,0.7c0,0.4-0.1,0.8-0.3,1.2c-0.1,0.2-0.2,0.4-0.3,0.5   c-0.2,0.5-0.8,1.2-1.7,1.2h-0.5c-2.5,0-4.6,1.8-5,4.3l-0.1,0.7c-0.5,3.2-2.3,6.2-4.8,8.1l-0.5,0.4c-1.3,1-2,2.4-2,4v6.2   c0,2.2,1.4,4.1,3.4,4.8c0.2,0.1,18.5,6.2,26.6,10.3c1.2,0.6,2,1.7,2.2,2.9c1.4,8.1,1.6,22,1.6,22.2c0.1,2.8,2.5,5,5.1,5   c2.8-0.1,5-2.3,5-5.1c0-0.6-0.3-14.9-1.8-23.7C250.6,212.2,247.7,208.3,243.7,206.3z" />

            <path d="M7.9,125.6c2.7,0.1,5.1-2.1,5.2-4.9c0.1-4.2,0.6-17.1,1.6-23c0.2-1.4,1.1-2.6,2.4-3.2c8.5-4.3,27.7-10.7,27.9-10.8   c2.1-0.7,3.4-2.6,3.4-4.8v-6.5c0-1.5-0.7-3-1.9-4l-0.6-0.5c-2.7-2.1-4.6-5.3-5.2-8.8l-0.1-0.7c-0.4-2.4-2.5-4.2-5-4.2h-0.5   c-1.1,0-1.8-0.7-2.1-1.4c-0.1-0.1-0.1-0.3-0.2-0.4c-0.2-0.4-0.3-0.9-0.3-1.4c0-0.3,0.1-0.6,0.2-0.9c0-0.1,0.1-0.2,0.1-0.3l1.1-0.6   c1.9-1.1,2.8-3.3,2.3-5.4L35.7,42c-1.2-5.1-0.1-10.1,3.1-14.1c3.4-4.4,8.8-7,14.6-7.2h2.1c5.9,0.1,11.3,2.7,14.7,7.1   c3.2,4.1,4.3,9.1,3.1,14.2l-0.4,1.9c-0.5,2.1,0.5,4.3,2.3,5.4l1,0.6c0.1,0.2,0.1,0.3,0.2,0.5c0.1,0.2,0.1,0.4,0.1,0.7   c0,0.5-0.1,1-0.3,1.3c-0.1,0.2-0.2,0.4-0.3,0.6c-0.3,0.8-1.1,1.4-2,1.4h-0.6c-2.6,0-4.7,1.9-5,4.5l0,0.5c-0.6,3.4-2.4,6.6-5.3,8.8   l-0.6,0.4c-1.2,1-1.9,2.4-1.9,4V79c0,2.2,1.4,4.1,3.4,4.8c0.2,0.1,19.4,6.5,27.9,10.8c1.3,0.6,2.2,1.8,2.4,3.2   c1,5.9,1.4,18.8,1.6,23c0.1,2.7,2.3,4.9,5,4.9c0.1,0,0.1,0,0.2,0c2.8-0.1,5-2.4,4.9-5.2c-0.3-7.7-0.7-18.5-1.7-24.3   c-0.7-4.6-3.7-8.5-7.8-10.6c-6.9-3.5-19.7-8-25.8-10.2v-0.5c3.2-2.9,5.6-6.7,6.9-10.9c3.4-1,6.2-3.5,7.6-6.8c1-1.8,1.5-3.9,1.5-6   c0-1.5-0.2-2.9-0.7-4.2c-0.4-1.6-1.2-3.1-2.4-4.2c1.3-7.5-0.6-15.2-5.3-21.2c-5.3-6.8-13.5-10.8-22.5-11h-2.3   c-8.9,0.2-17.1,4.3-22.4,11.1c-4.7,6-6.5,13.6-5.2,21.1c-1.2,1.2-2,2.6-2.5,4.2c-0.4,1.3-0.7,2.7-0.7,4.1c0,2.1,0.5,4.2,1.4,6   c1.5,3.3,4.3,5.8,7.7,6.8c1.3,4.2,3.7,8,6.9,10.9v0.5c-6.1,2.1-18.8,6.7-25.8,10.1c-4.1,2-7.1,6-7.9,10.5c-1,5.9-1.5,16.7-1.7,24.4   C2.9,123.2,5.1,125.5,7.9,125.6z" />

          </g>

        </svg>

        <span className="ml-1.5">Training Mgt.</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${trainingMgtOpen ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={trainingMgtOpen}>
        <ul className="">
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Training Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Training Setup')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/training-setup">
              Training Setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Course Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Course Setup')} // Set as active when clicked
          >
            <Link className="ml-10" to="/course-add">
              Course Setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Competency Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Competency Setup')} // Set as active when clicked
          >
            <Link className="ml-10" to="/new-competencies-setup">
              Competency Setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Project wise Training setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Project wise Training setup')} // Set as active when clicked
          >
            <Link
              className="ml-10   w-36 flex flex-wrap"
              to="/project-wise-sector-setup-add"
            >
              Project wise Training setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Training Wise Course Mapping' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Training Wise Course Mapping')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap " to="/training-wise-course-mapping">Training Wise Course Mapping</Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Map Trainer With Course' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Map Trainer With Course')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap " to="/">Map Trainer With Course</Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Outreach Program Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Outreach Program Setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/outreach-program-setup"
            >
              Outreach Program Setup
            </Link>
          </li>
          {/* <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'PO Training Target' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('PO Training Target')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/PO-Training-Target"
            >
              PO Training Target
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'PO Outreach Target' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('PO Outreach Target')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/PO-Outreach-Target"
            >
              PO Outreach Target
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Branch Training Target' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Branch Training Target')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/Branch-Training-Target"
            >
              Branch Training Target
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Branch Outreach Target' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Branch Outreach Target')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/Branch-Outreach-Target"
            >
              Branch Outreach Target
            </Link>
          </li> */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Batch Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Batch Setup')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/batch-add">
              Training Batch Setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Batch Week Plan' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Batch Week Plan')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/batch-week-plan">
              Training Week Plan
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Batch Calendar' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Batch Calendar')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/batch-calendar-list">
              Training Calendar
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Assessment Type' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Assessment Type')} // Set as active when clicked
          >
            <Link className="ml-10   w-36 flex flex-wrap " to="/assessmentType">Assessment Type</Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Training Wise Assessment Type Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Training Wise Assessment Type Setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/Training-Wise-Assessment-Type-Setup"
            >
              Training Wise Assessment Type Setup
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === ' Assessment Score' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive(' Assessment Score')} // Set as active when clicked
          >
            <Link className="ml-10" to="/assessment-score">
              Assessment Score
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === ' Assessment Approval' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive(' Assessment Approval')} // Set as active when clicked
          >
            <Link className="ml-10" to="/assessment-approval">
              Assessment Approval
            </Link>
          </li>


          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === '  Question Bank' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('  Question Bank')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/add-question-setup">
              Question Bank
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === ' Question Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive(' Question Setup')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/question-add">
              Exam Question
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === '   Assessment Report' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('   Assessment Report')} // Set as active when clicked
          >
            <Link className="ml-10" to="/assesment-report">
              Assessment Report
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Certificate Management' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Certificate Management')} // Set as active when clicked
          >
            <Link className="ml-10" to="/certificate-mgt">
              Certificate Management
            </Link>
          </li>
          {/* Training Allowance */}
          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/training-allowance-training-mgt"
            >
              Training Allowance
            </Link>
          </li> */}
          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/sector-branch-setup"
            >
              Sector Branch Setup
            </Link>
          </li> */}


          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Map Eligibility Criteria with Course' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Map Eligibility Criteria with Course')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/map-eligibility-criteria"
            >
              Map Eligibility Criteria with Course
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'List of Course & Sector Mapping' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('List of Course & Sector Mapping')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/list-of-course&sector-mapping"
            >
              List of Course & Sector Mapping
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Course & Sector Mapping' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Course & Sector Mapping')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/courseAndSector-mapping"
            >
              Course & Sector Mapping
            </Link>
          </li>

          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/sector-target-setup"
            >
              Sector Target Setup
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Projects' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Projects')} // Set as active when clicked
          >
            <Link className="ml-10" to="/">
              Projects
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Course Target setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Course Target setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/course-target-setup"
            >
              Course Target setup
            </Link>
          </li>


          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/sector-progress-reporting-training-mgt"
            >
              Sector Progress Reporting
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Sector Progress Reporting' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Sector Progress Reporting')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/sector-progress-reporting"
            >
              Sector Progress Reporting
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Form builder' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Form builder')} // Set as active when clicked
          >
            <Link className="ml-10" to="/form-builder">
              Form builder
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Certificate Mgt.' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Certificate Mgt.')} // Set as active when clicked
          >
            <Link className="ml-10" to="/form-builder">
              Certificate Mgt.
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Trainee Assessment Criteria' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Trainee Assessment Criteria')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/Trainee-Assessment-Criteria"
            >
              Trainee Assessment Criteria
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Competencies Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Competencies Setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/competencies-setup"
            >
              Competencies Setup
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Course Target setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Course Target setup')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/course-target-setup"
            >
              Course Target setup
            </Link>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Training Calendar' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Training Calendar')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/training-calander-setup"
            >
              Training Calendar
            </Link>
          </li>
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Sector Calendar Setup' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Sector Calendar Setup')} // Set as active when clicked
          >
            <span className="ml-10">
              <Link to="/sector-calendar-setup">Sector Calendar Setup</Link>
            </span>
          </li>

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Training Calendar' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Training Calendar')} // Set as active when clicked
          >
            <Link
              to="/training-calander-setup"
              className="ml-10 w-36 flex flex-wrap"
            >
              Training Calendar
            </Link>
          </li>

          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/assessment-type-setup"
            >
              Assessment Type Setup
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Class Wise Assessment' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Class Wise Assessment')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/class-wise-assesment-type"
            >
              Class Wise Assessment
            </Link>
          </li>



          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Sector Progress Reporting' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Sector Progress Reporting')} // Set as active when clicked
          >
            <Link
              className="ml-10 w-36 flex flex-wrap"
              to="/sector-progress-reporting"
            >
              Sector Progress Reporting
            </Link>
          </li>



          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10" to="/participant">
              Participant
            </Link>
          </li> */}

          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10" to="/participant-tracker">
              Participant Tracker
            </Link>
          </li> */}

          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10" to="/participant-enrolment">
              Participant Enrolment
            </Link>
          </li> */}

          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Class Schedule' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Class Schedule')} // Set as active when clicked
          >
            <Link className="ml-10" to="/class-schedule">
              Class Schedule
            </Link>
          </li>
          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10" to="/participant-attendance">
              Participant Attendance
            </Link>
          </li> */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Questions' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Questions')} // Set as active when clicked
          >
            <Link className="ml-10" to="/questions">
              Questions
            </Link>
          </li>

          {/* <li
            className="w-full mb-5 cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10" to="/participant-attendance">
              Participant Attendance
            </Link>
          </li> */}


          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Certificate' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Certificate')} // Set as active when clicked
          >
            <Link className="ml-10" to="/training-mgt-certificate">
              Certificate
            </Link>
          </li>


        </ul>
      </Collapse>
      {/* Employee Management */}
      <li
        className={`cursor-pointer flex  items-center p-3 gap-2 ${other
          ? "bg-primaryColor text-white font-bold" // Apply styles when other is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold " // Apply hover styles when other is false
          }`}
        onClick={() => setOther(!other)}
      >

        <svg fill="currentColor" width="20px" height="20px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M65.3,51.5A14.25,14.25,0,1,0,79.5,65.8,14.32,14.32,0,0,0,65.3,51.5ZM67.8,67a3.09,3.09,0,0,1-1.1-.2l-5.4,5.4a1.71,1.71,0,0,1-1.1.5c-.5,0-.9-.1-1.1-.5a1.82,1.82,0,0,1,0-2.4l5.4-5.4a4.47,4.47,0,0,1,4-5.8,3.09,3.09,0,0,1,1.1.2c.2,0,.2.2.1.4l-2.5,2.4a.37.37,0,0,0,0,.6l1.6,1.6a.48.48,0,0,0,.7,0l2.4-2.4c.1-.1.5-.1.5.1a6.53,6.53,0,0,1,.2,1.1A4.47,4.47,0,0,1,67.8,67Z" /><circle cx="44.6" cy="36.1" r="16.1" /><path d="M48.9,79.7c2.7,0,1.2-1.9,1.2-1.9h0a19.58,19.58,0,0,1-2.5-20.1l.2-.4a1.17,1.17,0,0,0-.9-1.9h0a18.48,18.48,0,0,0-2.4-.1,24.54,24.54,0,0,0-24.2,21c0,1.2.4,3.5,4.2,3.5H48.4A1.75,1.75,0,0,1,48.9,79.7Z" /></svg>

        <span className="">Employee Mgt</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${other ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={other}>
        <ul className="">
          {/* Department */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Department' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Department')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/department">
              Department
            </Link>
          </li>
          {/* Designation */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Designation' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Designation')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/designation">
              Designation
            </Link>
          </li>

        </ul>
      </Collapse>

      {/* Trainer Mgt. */}
      <li
        className={`mt-2 cursor-pointer flex items-center p-3 gap-2 ${trainer
          ? "bg-primaryColor text-white font-bold" // Apply styles when trainer is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles when trainer is false
          }`}
        onClick={() => setTrainer(!trainer)}
      >

        <svg fill="currentColor" height="20px" width="20px" version="1.1" id="Layer_1"
          viewBox="0 0 511.999 511.999">
          <g>
            <g>
              <path d="M302.195,11.833H13.049C5.842,11.833,0,17.675,0,24.882v214.289c0,7.207,5.842,13.049,13.049,13.049h283.839
			l-34.352-21.329c-2.247-1.396-4.282-3.002-6.109-4.768H26.097V37.93h263.049v126.703c4.01,0.847,7.943,2.39,11.625,4.677
			l14.473,8.986V24.882C315.244,17.675,309.402,11.833,302.195,11.833z"/>
            </g>
          </g>
          <g>
            <g>
              <path d="M216.857,134.337c-4.352-3.43-10.665-2.685-14.097,1.668c-3.432,4.353-2.686,10.665,1.668,14.097l44.279,34.914
			c0.63-1.371,1.34-2.719,2.156-4.034c2.883-4.643,6.649-8.401,10.94-11.206L216.857,134.337z"/>
            </g>
          </g>
          <g>
            <g>
              <circle cx="419.71" cy="81.405" r="37.557" />
            </g>
          </g>
          <g>
            <g>
              <path d="M511.33,173.609c-0.118-23.528-19.355-42.67-42.884-42.67H450.26c-17.831,46.242-11.329,29.381-22.507,58.37l4.709-23.724
			c0.346-1.744,0.067-3.555-0.79-5.113l-7.381-13.424l6.551-11.914c0.454-0.826,0.438-1.829-0.041-2.64
			c-0.479-0.811-1.352-1.308-2.293-1.308h-17.96c-0.942,0-1.813,0.497-2.293,1.308s-0.495,1.815-0.041,2.64l6.537,11.889
			l-7.367,13.4c-0.873,1.589-1.147,3.438-0.77,5.211l5.438,23.675c-3.119-8.087-21.08-52.728-23.255-58.37h-17.83
			c-23.529,0-42.766,19.141-42.884,42.67c-0.098,19.565-0.016,3.179-0.17,33.884l-36.702-22.787
			c-8.501-5.28-19.674-2.667-24.953,5.836c-5.279,8.503-2.666,19.675,5.836,24.954l64.219,39.873
			c12.028,7.47,27.609-1.167,27.68-15.304c0.036-7.091,0.292-57.809,0.334-66.275c0.013-2.092,1.714-3.776,3.805-3.769
			c2.089,0.007,3.779,1.703,3.779,3.794c-0.018,87.323-0.394,111.735-0.394,304.606c0,12.01,9.736,21.746,21.746,21.746
			s21.746-9.736,21.746-21.746V304.604h9.388v173.817c0,12.01,9.736,21.746,21.746,21.746s21.746-9.736,21.746-21.746l0.008-304.612
			c0-1.981,1.604-3.589,3.586-3.595c1.981-0.006,3.595,1.594,3.605,3.577l0.669,133.132c0.05,9.977,8.154,18.03,18.119,18.03
			c0.031,0,0.062,0,0.094,0c10.007-0.05,18.081-8.205,18.03-18.212L511.33,173.609z"/>
            </g>
          </g>
        </svg>

        <span className="">Trainer Mgt.</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${trainer ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={trainer}>
        <ul className="">
          {/*  Trainers/Assessors */}
          <li
            className={`w-full my-5 cursor-pointer border-l-2 ${activeItem === 'Trainers/Assessors' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Trainers/Assessors')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/trainers-assessors">
              Trainers/Assessors
            </Link>
          </li>
          {/*  */}
          {/* <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/designation">

            </Link>
          </li> */}

        </ul>
      </Collapse>
      {/* Target Menu. */}
      <li
        className={`mt-2 cursor-pointer  flex items-center p-3 gap-2 ${trainer
          ? "bg-primaryColor text-white font-bold" // Apply styles when trainer is true
          : "hover:bg-primaryColor hover:text-white hover:font-bold" // Apply hover styles when trainer is false
          }`}
        onClick={() => setTarget(!target)}
      >

        <svg width="20px" height="20px" viewBox="0 0 1024 1024" fill="currentColor" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M512 711.948c-46.904 0-91.06-18.33-124.35-51.62-33.274-33.29-51.604-77.446-51.62-124.35 0-46.904 18.33-91.076 51.62-124.356 57.944-57.952 146.972-68.474 216.518-25.538a7.99 7.99 0 0 1 2.592 11 7.988 7.988 0 0 1-10.992 2.6c-63.206-38.988-144.13-29.456-196.812 23.242-30.26 30.268-46.936 70.418-46.936 113.052 0.016 42.626 16.676 82.786 46.936 113.044 30.276 30.26 70.418 46.936 113.044 46.936h0.016c42.64 0 82.784-16.676 113.058-46.936 52.698-52.682 62.236-133.592 23.218-196.79a7.996 7.996 0 0 1 2.608-11 7.966 7.966 0 0 1 10.992 2.6c42.938 69.536 32.446 158.566-25.514 216.494-33.288 33.29-77.458 51.62-124.364 51.62 0.002 0.002 0.002 0.002-0.014 0.002z" fill="" /><path d="M512.016 655.77c-30.698 0-61.378-11.68-84.736-35.04-46.716-46.748-46.716-122.78 0-169.496 38.348-38.356 97.852-46.216 144.662-19.112a7.986 7.986 0 0 1 2.92 10.922 8.014 8.014 0 0 1-10.93 2.912c-40.55-23.49-92.106-16.66-125.348 16.582-40.488 40.486-40.488 106.384 0 146.886 40.488 40.472 106.378 40.472 146.88 0 33.258-33.29 40.064-84.854 16.536-125.434a7.99 7.99 0 0 1 2.904-10.93 8.02 8.02 0 0 1 10.93 2.904c27.152 46.842 19.314 106.384-19.064 144.764-23.378 23.362-54.072 35.01-84.754 35.042z" fill="" /><path d="M512 599.872c-16.364 0-32.726-6.246-45.172-18.674-24.92-24.952-24.92-65.494 0-90.412 14.38-14.404 34.132-21.016 54.304-18.114 4.374 0.632 7.402 4.684 6.778 9.056s-4.592 7.4-9.056 6.776c-15.098-2.21-29.932 2.772-40.72 13.584-18.69 18.69-18.69 49.098 0 67.804 18.69 18.674 49.09 18.642 67.78 0 10.804-10.836 15.754-25.702 13.568-40.784a8.002 8.002 0 0 1 6.762-9.048c4.386-0.546 8.432 2.404 9.056 6.776 2.918 20.104-3.67 39.902-18.082 54.362-12.476 12.426-28.84 18.674-45.218 18.674zM615.926 967.672H408.074a7.982 7.982 0 0 1-5.652-2.344l-31.978-31.976a7.988 7.988 0 0 1-2.342-5.652v-111.92a7.98 7.98 0 0 1 7.994-7.994h271.806a7.978 7.978 0 0 1 7.994 7.994v111.92a7.992 7.992 0 0 1-2.342 5.652l-31.976 31.976a7.99 7.99 0 0 1-5.652 2.344z m-204.542-15.99h201.232l27.292-27.292v-100.616H384.09v100.616l27.294 27.292z" fill="" /><path d="M360.108 871.738a7.988 7.988 0 0 1-7.978-7.588c-0.234-4.402 3.154-8.15 7.556-8.4l303.784-15.988c4.374-0.562 8.166 3.154 8.4 7.558a7.98 7.98 0 0 1-7.556 8.398l-303.784 15.988c-0.142 0.032-0.282 0.032-0.422 0.032zM360.108 919.706a7.99 7.99 0 0 1-7.978-7.588c-0.234-4.404 3.154-8.15 7.556-8.4l303.784-15.988c4.374-0.532 8.166 3.154 8.4 7.556s-3.152 8.182-7.556 8.4l-303.784 15.988c-0.142 0.032-0.282 0.032-0.422 0.032zM647.902 823.774H376.096a8 8 0 0 1-7.994-7.994v-49.56c-80.176-50.122-127.908-135.84-127.908-230.242 0-149.892 121.928-271.83 271.806-271.83 149.876 0 271.804 121.936 271.804 271.83 0 94.402-47.73 180.152-127.908 230.242v49.558a8 8 0 0 1-7.994 7.996z m-263.812-15.988h255.818v-46.03c0-2.81 1.468-5.402 3.856-6.872 77.68-46.81 124.052-128.658 124.052-218.906 0-141.07-114.762-255.84-255.816-255.84-141.056 0-255.818 114.77-255.818 255.84 0 90.248 46.374 172.096 124.052 218.938a7.98 7.98 0 0 1 3.856 6.84v46.03zM512 999.648c-60.208 0-78.352-34.914-79.1-36.412a7.982 7.982 0 0 1 3.576-10.71 7.94 7.94 0 0 1 10.696 3.53c0.702 1.31 15.254 27.606 64.83 27.606 49.76 0 64.234-26.514 64.828-27.636 2.044-3.874 6.838-5.434 10.742-3.436s5.48 6.744 3.53 10.648c-0.752 1.496-18.894 36.41-79.102 36.41zM168.26 543.972H8.36a7.998 7.998 0 0 1-7.994-7.994 7.986 7.986 0 0 1 7.994-8.002h159.9a7.988 7.988 0 0 1 7.996 8.002 8 8 0 0 1-7.996 7.994zM1015.64 543.972h-159.886a8 8 0 0 1 0-15.996h159.886a8 8 0 0 1 0 15.996zM46.708 736.71a8.01 8.01 0 0 1-7.386-4.934 8.01 8.01 0 0 1 4.326-10.46l147.722-61.208a8 8 0 0 1 10.446 4.34 7.988 7.988 0 0 1-4.324 10.43l-147.724 61.208c-1 0.438-2.048 0.624-3.06 0.624zM829.586 412.402a7.98 7.98 0 0 1-7.386-4.934 8 8 0 0 1 4.326-10.446l147.708-61.176a8.008 8.008 0 0 1 10.446 4.326 8 8 0 0 1-4.324 10.446l-147.708 61.174a7.994 7.994 0 0 1-3.062 0.61zM155.878 900.094a7.97 7.97 0 0 1-5.652-2.342 7.988 7.988 0 0 1 0-11.304l113.06-113.076a7.992 7.992 0 1 1 11.304 11.304l-113.06 113.076a7.974 7.974 0 0 1-5.652 2.342zM643.56 226.378a7.998 7.998 0 0 1-7.384-11.054l61.176-147.708a7.992 7.992 0 1 1 14.772 6.122l-61.176 147.708a8.012 8.012 0 0 1-7.388 4.932zM512.016 200.21a7.99 7.99 0 0 1-7.996-7.994V32.346a7.99 7.99 0 0 1 7.996-7.994 7.99 7.99 0 0 1 7.994 7.994v159.872a7.99 7.99 0 0 1-7.994 7.992zM380.468 226.378a7.98 7.98 0 0 1-7.386-4.934l-61.174-147.708a8 8 0 0 1 4.324-10.446 8.006 8.006 0 0 1 10.446 4.324l61.174 147.708a8 8 0 0 1-7.384 11.056zM868.12 900.094a7.978 7.978 0 0 1-5.652-2.342l-113.074-113.076a7.992 7.992 0 1 1 11.304-11.304l113.074 113.076a7.988 7.988 0 0 1 0 11.304 7.974 7.974 0 0 1-5.652 2.342zM268.954 300.888a7.966 7.966 0 0 1-5.652-2.342L150.258 185.502a7.988 7.988 0 0 1 0-11.304 7.988 7.988 0 0 1 11.304 0l113.044 113.044a7.992 7.992 0 0 1-5.652 13.646zM977.292 736.71c-1.032 0-2.06-0.188-3.06-0.624l-147.738-61.208a7.988 7.988 0 0 1-4.326-10.43c1.688-4.09 6.386-6.058 10.448-4.34l147.738 61.208a8.012 8.012 0 0 1 4.324 10.46 8.04 8.04 0 0 1-7.386 4.934zM194.446 412.402a7.938 7.938 0 0 1-3.06-0.608L43.678 350.62a8 8 0 0 1-4.326-10.446 8.006 8.006 0 0 1 10.446-4.326l147.708 61.176a8 8 0 0 1 4.324 10.446 8.012 8.012 0 0 1-7.384 4.932z" fill="" /><path d="M512.046 543.972a7.97 7.97 0 0 1-5.652-2.342 7.988 7.988 0 0 1 0-11.304L866.09 170.608a7.988 7.988 0 0 1 11.304 0 7.988 7.988 0 0 1 0 11.304l-359.698 359.72a7.964 7.964 0 0 1-5.65 2.34z" fill="" /><path d="M769.83 286.118a7.986 7.986 0 0 1-7.992-7.986 7.992 7.992 0 0 1 7.976-8.002l41.94-0.032 65.954-65.96-23.374-4.012a7.982 7.982 0 0 1-6.528-9.228c0.75-4.348 4.902-7.284 9.226-6.526l38.598 6.62c2.954 0.5 5.372 2.608 6.278 5.458s0.14 5.958-1.966 8.072l-79.224 79.224a7.988 7.988 0 0 1-5.652 2.342l-45.236 0.03z" fill="" /><path d="M769.83 286.118a7.994 7.994 0 0 1-7.992-7.994l0.016-45.25c0-2.124 0.842-4.154 2.34-5.652l79.102-79.1a7.974 7.974 0 0 1 8.056-1.966 7.986 7.986 0 0 1 5.464 6.236l6.744 38.472a7.992 7.992 0 0 1-6.496 9.26c-4.324 0.718-8.492-2.146-9.258-6.496l-4.09-23.326-65.876 65.882-0.016 41.938a8 8 0 0 1-7.994 7.996z" fill="" /></svg>

        <span className="">Target</span>
        <AiOutlineRight
          className={`custom-arrow ml-auto ${target ? "rotate-90" : ""}`}
        />
      </li>


      <Collapse in={target}>
        <ul className="">
          {/*  Trainers/Assessors */}
          <li
            className={`w-full cursor-pointer border-l-2 ${activeItem === 'Target' ? 'border-l-primaryColor text-primaryColor font-bold' : 'border-transparent'
              }`}
            onClick={() => handleActive('Target')} // Set as active when clicked
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/">

            </Link>
          </li>
          {/*  */}
          <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/po-target-setup">
              PO Target Setup
            </Link>
          </li>
          <li
            className="w-full my-5  cursor-pointer  border-l-primaryColor
                                hover:text-primaryColor
                                 hover:font-bold"
          >
            <Link className="ml-10 w-36 flex flex-wrap" to="/branch-target-setup">
              Branch Target Setup
            </Link>
          </li>

        </ul>
      </Collapse>
    </ul>
  );
}
