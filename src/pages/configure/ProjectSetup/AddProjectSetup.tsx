import ResetButton from "@/shared/components/ButttonsCollection/CancelButton";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import SaveButton from "@/shared/components/ButttonsCollection/SaveButton";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { get_all_data } from "@/api/Reqest";
import Select from "react-select";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { customeMaxLength } from "../../../utils";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const ProjectSetup = () => {
  const [ministries, setMinistries] = useState<any>([]);
  const [component_List, setComponent_List] = useState<any>([]);
  const [sector_List, setSector_List] = useState<any>([]);
  const [donor_organization_List, setDonor_organization_List] = useState<any>(
    [],
  );
  const [selectedSectors, setSelectedSectors] = useState<any>([]);

  const [selectedLoanConditionalities, setSelectedLoanConditionalities] =
    useState<any>([]);
  const [financingMode, setFinancingMode] = useState(""); // State to hold the selected financing mode
  const [loanAmount, setLoanAmount] = useState(""); // State to hold the loan amount
  const [grantAmount, setGrantAmount] = useState(""); // State to hold the grant amount
  // State to hold selected donor organizations
  const [selectedDonors, setSelectedDonors] = useState([]);
  // date related state
  // date of signing
  const [DOS, setDOS] = useState(null);
  // date of effectiveness
  const [DOE, setDOE] = useState(null);
  //  project start date
  const [PSD, setPSD] = useState(null);
  //  project end date
  const [PED, setPED] = useState(null);
  // board approval
  const [BAD, setBAD] = useState(null);
  // dpp approval
  const [DPPD, setDPPD] = useState(null);
  // Date DPP
  const [DDPP, setDDPP] = useState(null);
  // Convert the donor organization list to the format that react-select expects
  console.log(donor_organization_List);

  const donorOptions = donor_organization_List?.map((donor_organization) => ({
    value: donor_organization?.donorOrganizationId,
    label: donor_organization?.donorOrganizationName,
  }));

  const {
    data,
    loading,
    error,
    fetchData,
    deleteData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    fetchSingleDataCommonByID,
    setsingleData,
    singleData,
    fetchDataCommonObj,
    common_dataObj,
  } = useFetch(`${API_URL}/project`);

  const ministry_List_API = async () => {
    const apiEndPoint = "ministry";
    const response_ministry_List = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setMinistries(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const component_List_API = async () => {
    const apiEndPoint = "component";
    const response_component_List = await get_all_data(apiEndPoint);
    const component_List = response_component_List?.data;

    const component_List_Arrays = component_List?.map((component: any) => ({
      value: component?.componentId,
      label: component?.componentName,
    }));

    setComponent_List(component_List_Arrays);
  };

  const sector_List_API = async () => {
    const apiEndPoint = "sector";
    const response_sector_List = await get_all_data(apiEndPoint);
    const sector_List = response_sector_List?.data;

    const sector_List_Arrays = sector_List?.map((sector: any) => ({
      value: sector?.sectorId,
      label: sector?.sectorName,
    }));

    setSector_List(sector_List_Arrays);
  };

  const donor_organization_List_API = async () => {
    const apiEndPoint = "donor-organization";
    const response_donor_organization = await get_all_data(apiEndPoint);
    console.log(response_donor_organization);
    const donor_organization_List = response_donor_organization?.data;

    // const donor_Organization_Arrays = donor_organization_List?.map((donor_organization:any) => ({
    //     value: donor_organization?.donorOrganizationId,
    //     label: donor_organization?.donorOrganizationName
    // }))

    setDonor_organization_List(donor_organization_List);

    // console.log('donor_organization_List', donor_organization_List);
  };

  console.log(donor_organization_List);
  const handleSectorChange = (selectedOptions: any) => {
    const sectorIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedSectors(sectorIds);
  };

  const handleLoanConditionChange = (selectedOptions: any) => {
    const componentIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedLoanConditionalities(componentIds);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      if (key == "componentIds") {
        obj = { ...obj, [key]: selectedLoanConditionalities };
      } else if (key == "sectorIds") {
        obj = { ...obj, [key]: selectedSectors };
      } else {
        obj = { ...obj, [key]: value };
      }
    }

    let page_list = `${API_URL}/project`;
    let method = "POST";

    if (singleData?.holidayId) {
      page_list = `${API_URL}/project/${singleData?.holidayId}`;
      method = "PUT";
    }
    const options = {
      method,
      data: obj,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetchDataCommon(page_list, options);
  };

  const fetchInitData = async () => {
    fetchData();
    ministry_List_API();
    component_List_API();
    sector_List_API();
    donor_organization_List_API();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (common_data) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Project Successfully Created!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.assign("/project-setup");
      }, 1500);

      setcommon_Data(null);
      fetchData();
    }

    if (error) {
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (deleteMsg) {
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  useEffect(() => {
    const elementWithDataTooltip = document.querySelectorAll("[data-tooltip ]");
    elementWithDataTooltip.forEach((element) => {
      tippy(element, {
        content: element.getAttribute("data-tooltip"),
      });
    });
  }, []);

  // Custom styles for react-select to remove border
  const customStyles = {
    control: (provided, state) => ({
      ...provided,

      border: "none", // Remove the border
      boxShadow: "none", // Remove shadow on focus
      backgroundColor: "transparent", // Make background transparent if needed
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#5F6368", // Customize dropdown icon color
    }),
  };

  return (
    <div className="w-full bg-[#f6fcff] ">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Breadcrumb name1={"Projects"} name2={"Project Setup"} />

        <form
          className="bg-white rounded-2xl p-5 drop-shadow-lg "
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-2 gap-5">
            {/*  Project Code */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="code"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Project Code <span className="required_field">*</span>
              </label>
              <input
                name="code"
                id="code"
                type="text"
                placeholder="Write Project Code here"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write a project Code"
                maxLength={4}
                onInput={(e) => {
                  customeMaxLength(e, 4);
                }}
                required
              />
            </div>
            {/*    Project Name * */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="projectName"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Project Name <span className="required_field">*</span>
              </label>
              <input
                name="name"
                id="projectName"
                type="text"
                placeholder="Write Project name here"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write a project Name"
                onInput={(e) => {
                  customeMaxLength(e, 100);
                }}
                required
              />
            </div>
          </div>

          {/* Project Description */}
          <div className="flex flex-col relative">
            <label
              htmlFor="projectDescription"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Project Description
            </label>
            <textarea
              name="description"
              id="projectDescription"
              className="border p-5 rounded h-14 resize-none"
              data-tooltip="Write short description about this project"
              onInput={(e) => {
                customeMaxLength(e, 5000);
              }}
            />
          </div>

          {/*    Implementing Ministries */}
          <div className="grid grid-cols-2 gap-4">
            {/* Implementing Ministries */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="implementingMinistry"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Implementing Ministries
                <span className="required_field">*</span>
              </label>
              <select
                name="ministryId"
                id="implementingMinistry"
                className="border p-4 rounded appearance-none h-14"
                data-tooltip="Plese Select Ministry"
                required
              >
                {ministries?.map((ministry, index) => (
                  <option key={index} value={ministry?.ministryId}>
                    {ministry?.ministryName}
                  </option>
                ))}
              </select>

              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                    fill="#5F6368"
                  />
                </svg>
              </div>
            </div>
            {/*  Executing Agency */}
            <div className="flex flex-col relative">
              <label
                htmlFor="executingAgency"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Executing Agency <span className="required_field">*</span>
              </label>
              <input
                name="executingAgency"
                id="projectName"
                type="text"
                placeholder="Write Executing Agency Name"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write Executing Agency Name"
                onInput={(e) => {
                  customeMaxLength(e, 60);
                }}
                required
              />
            </div>

            {/* Date of Signing */}
            {/* <div className="flex flex-col relative">
                  <label
                    htmlFor="dateOfSigning"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Date of Signing<span className="required_field">*</span>
                  </label>
                  <input
                    name="signingDate"
                    id="dateOfSigning"
                    type="date"
                    className="border p-4 rounded appearance-none h-14"
                    data-tooltip="Pick a project signing date"
                    required
                  />
                  <span className="open-button">
                    <button type="button">
                      <svg
                        width="15"
                        height="17"
                        viewBox="0 0 15 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.17364 16.1293C1.76687 16.1293 1.42725 15.9931 1.15479 15.7206C0.882325 15.4481 0.746094 15.1085 0.746094 14.7017V3.4183C0.746094 3.01153 0.882325 2.67191 1.15479 2.39945C1.42725 2.12698 1.76687 1.99075 2.17364 1.99075H3.73684V0.0195312H4.68854V1.99075H11.0102V0.0195312H11.8939V1.99075H13.4571C13.8639 1.99075 14.2035 2.12698 14.4759 2.39945C14.7484 2.67191 14.8846 3.01153 14.8846 3.4183V14.7017C14.8846 15.1085 14.7484 15.4481 14.4759 15.7206C14.2035 15.9931 13.8639 16.1293 13.4571 16.1293H2.17364ZM2.17364 15.2456H13.4571C13.5932 15.2456 13.7178 15.189 13.8311 15.0758C13.9444 14.9625 14.001 14.8378 14.001 14.7017V6.95294H1.62975V14.7017C1.62975 14.8378 1.68638 14.9625 1.79964 15.0758C1.91289 15.189 2.03756 15.2456 2.17364 15.2456ZM1.62975 6.06906H14.001V3.4183C14.001 3.28222 13.9444 3.15755 13.8311 3.0443C13.7178 2.93104 13.5932 2.87441 13.4571 2.87441H2.17364C2.03756 2.87441 1.91289 2.93104 1.79964 3.0443C1.68638 3.15755 1.62975 3.28222 1.62975 3.4183V6.06906ZM7.81537 10.0795C7.63304 10.0795 7.47413 10.0119 7.33863 9.87653C7.20329 9.74118 7.13561 9.58227 7.13561 9.39979C7.13561 9.21746 7.20329 9.05863 7.33863 8.92328C7.47413 8.78793 7.63304 8.72026 7.81537 8.72026C7.99769 8.72026 8.15661 8.78793 8.2921 8.92328C8.42745 9.05863 8.49512 9.21746 8.49512 9.39979C8.49512 9.58227 8.42745 9.74118 8.2921 9.87653C8.15661 10.0119 7.99769 10.0795 7.81537 10.0795ZM4.28073 10.0795C4.0984 10.0795 3.93949 10.0119 3.804 9.87653C3.66865 9.74118 3.60098 9.58227 3.60098 9.39979C3.60098 9.21746 3.66865 9.05863 3.804 8.92328C3.93949 8.78793 4.0984 8.72026 4.28073 8.72026C4.46306 8.72026 4.62197 8.78793 4.75746 8.92328C4.89281 9.05863 4.96048 9.21746 4.96048 9.39979C4.96048 9.58227 4.89281 9.74118 4.75746 9.87653C4.62197 10.0119 4.46306 10.0795 4.28073 10.0795ZM11.35 10.0795C11.1677 10.0795 11.0088 10.0119 10.8733 9.87653C10.7379 9.74118 10.6702 9.58227 10.6702 9.39979C10.6702 9.21746 10.7379 9.05863 10.8733 8.92328C11.0088 8.78793 11.1677 8.72026 11.35 8.72026C11.5323 8.72026 11.6912 8.78793 11.8267 8.92328C11.9621 9.05863 12.0298 9.21746 12.0298 9.39979C12.0298 9.58227 11.9621 9.74118 11.8267 9.87653C11.6912 10.0119 11.5323 10.0795 11.35 10.0795ZM7.81537 13.4783C7.63304 13.4783 7.47413 13.4106 7.33863 13.2753C7.20329 13.14 7.13561 12.981 7.13561 12.7986C7.13561 12.6162 7.20329 12.4573 7.33863 12.3218C7.47413 12.1865 7.63304 12.1188 7.81537 12.1188C7.99769 12.1188 8.15661 12.1865 8.2921 12.3218C8.42745 12.4573 8.49512 12.6162 8.49512 12.7986C8.49512 12.981 8.42745 13.14 8.2921 13.2753C8.15661 13.4106 7.99769 13.4783 7.81537 13.4783ZM4.28073 13.4783C4.0984 13.4783 3.93949 13.4106 3.804 13.2753C3.66865 13.14 3.60098 12.981 3.60098 12.7986C3.60098 12.6162 3.66865 12.4573 3.804 12.3218C3.93949 12.1865 4.0984 12.1188 4.28073 12.1188C4.46306 12.1188 4.62197 12.1865 4.75746 12.3218C4.89281 12.4573 4.96048 12.6162 4.96048 12.7986C4.96048 12.981 4.89281 13.14 4.75746 13.2753C4.62197 13.4106 4.46306 13.4783 4.28073 13.4783ZM11.35 13.4783C11.1677 13.4783 11.0088 13.4106 10.8733 13.2753C10.7379 13.14 10.6702 12.981 10.6702 12.7986C10.6702 12.6162 10.7379 12.4573 10.8733 12.3218C11.0088 12.1865 11.1677 12.1188 11.35 12.1188C11.5323 12.1188 11.6912 12.1865 11.8267 12.3218C11.9621 12.4573 12.0298 12.6162 12.0298 12.7986C12.0298 12.981 11.9621 13.14 11.8267 13.2753C11.6912 13.4106 11.5323 13.4783 11.35 13.4783Z"
                          fill="#5F6368"
                        />
                      </svg>
                    </button>
                  </span>
                </div> */}

            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Date of Signing<span className="required_field">*</span>
              </label>
              <DatePicker
                name="signingDate"
                selected={DOS}
                onChange={(date: any) => setDOS(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/*     Date of Effectiveness */}
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Date of Effectiveness <span className="required_field">*</span>
              </label>
              <DatePicker
                name="effectiveDate"
                selected={DOE}
                onChange={(date: any) => setDOE(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/*  Project Start Date */}
            {/* <div className="flex flex-col relative">
                  <label
                    htmlFor="projectStartDate"
                    className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Project Start Date<span className="required_field">*</span>
                  </label>
                  <input
                    name="startDate"
                    id="startDate"
                    type="date"
                    className="border p-4 rounded appearance-none h-14"
                    data-tooltip="Pick a project start date"
                    required
                  />
                  <span className="open-button">
                    <button type="button">
                      <svg
                        width="15"
                        height="17"
                        viewBox="0 0 15 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.17364 16.1293C1.76687 16.1293 1.42725 15.9931 1.15479 15.7206C0.882325 15.4481 0.746094 15.1085 0.746094 14.7017V3.4183C0.746094 3.01153 0.882325 2.67191 1.15479 2.39945C1.42725 2.12698 1.76687 1.99075 2.17364 1.99075H3.73684V0.0195312H4.68854V1.99075H11.0102V0.0195312H11.8939V1.99075H13.4571C13.8639 1.99075 14.2035 2.12698 14.4759 2.39945C14.7484 2.67191 14.8846 3.01153 14.8846 3.4183V14.7017C14.8846 15.1085 14.7484 15.4481 14.4759 15.7206C14.2035 15.9931 13.8639 16.1293 13.4571 16.1293H2.17364ZM2.17364 15.2456H13.4571C13.5932 15.2456 13.7178 15.189 13.8311 15.0758C13.9444 14.9625 14.001 14.8378 14.001 14.7017V6.95294H1.62975V14.7017C1.62975 14.8378 1.68638 14.9625 1.79964 15.0758C1.91289 15.189 2.03756 15.2456 2.17364 15.2456ZM1.62975 6.06906H14.001V3.4183C14.001 3.28222 13.9444 3.15755 13.8311 3.0443C13.7178 2.93104 13.5932 2.87441 13.4571 2.87441H2.17364C2.03756 2.87441 1.91289 2.93104 1.79964 3.0443C1.68638 3.15755 1.62975 3.28222 1.62975 3.4183V6.06906ZM7.81537 10.0795C7.63304 10.0795 7.47413 10.0119 7.33863 9.87653C7.20329 9.74118 7.13561 9.58227 7.13561 9.39979C7.13561 9.21746 7.20329 9.05863 7.33863 8.92328C7.47413 8.78793 7.63304 8.72026 7.81537 8.72026C7.99769 8.72026 8.15661 8.78793 8.2921 8.92328C8.42745 9.05863 8.49512 9.21746 8.49512 9.39979C8.49512 9.58227 8.42745 9.74118 8.2921 9.87653C8.15661 10.0119 7.99769 10.0795 7.81537 10.0795ZM4.28073 10.0795C4.0984 10.0795 3.93949 10.0119 3.804 9.87653C3.66865 9.74118 3.60098 9.58227 3.60098 9.39979C3.60098 9.21746 3.66865 9.05863 3.804 8.92328C3.93949 8.78793 4.0984 8.72026 4.28073 8.72026C4.46306 8.72026 4.62197 8.78793 4.75746 8.92328C4.89281 9.05863 4.96048 9.21746 4.96048 9.39979C4.96048 9.58227 4.89281 9.74118 4.75746 9.87653C4.62197 10.0119 4.46306 10.0795 4.28073 10.0795ZM11.35 10.0795C11.1677 10.0795 11.0088 10.0119 10.8733 9.87653C10.7379 9.74118 10.6702 9.58227 10.6702 9.39979C10.6702 9.21746 10.7379 9.05863 10.8733 8.92328C11.0088 8.78793 11.1677 8.72026 11.35 8.72026C11.5323 8.72026 11.6912 8.78793 11.8267 8.92328C11.9621 9.05863 12.0298 9.21746 12.0298 9.39979C12.0298 9.58227 11.9621 9.74118 11.8267 9.87653C11.6912 10.0119 11.5323 10.0795 11.35 10.0795ZM7.81537 13.4783C7.63304 13.4783 7.47413 13.4106 7.33863 13.2753C7.20329 13.14 7.13561 12.981 7.13561 12.7986C7.13561 12.6162 7.20329 12.4573 7.33863 12.3218C7.47413 12.1865 7.63304 12.1188 7.81537 12.1188C7.99769 12.1188 8.15661 12.1865 8.2921 12.3218C8.42745 12.4573 8.49512 12.6162 8.49512 12.7986C8.49512 12.981 8.42745 13.14 8.2921 13.2753C8.15661 13.4106 7.99769 13.4783 7.81537 13.4783ZM4.28073 13.4783C4.0984 13.4783 3.93949 13.4106 3.804 13.2753C3.66865 13.14 3.60098 12.981 3.60098 12.7986C3.60098 12.6162 3.66865 12.4573 3.804 12.3218C3.93949 12.1865 4.0984 12.1188 4.28073 12.1188C4.46306 12.1188 4.62197 12.1865 4.75746 12.3218C4.89281 12.4573 4.96048 12.6162 4.96048 12.7986C4.96048 12.981 4.89281 13.14 4.75746 13.2753C4.62197 13.4106 4.46306 13.4783 4.28073 13.4783ZM11.35 13.4783C11.1677 13.4783 11.0088 13.4106 10.8733 13.2753C10.7379 13.14 10.6702 12.981 10.6702 12.7986C10.6702 12.6162 10.7379 12.4573 10.8733 12.3218C11.0088 12.1865 11.1677 12.1188 11.35 12.1188C11.5323 12.1188 11.6912 12.1865 11.8267 12.3218C11.9621 12.4573 12.0298 12.6162 12.0298 12.7986C12.0298 12.981 11.9621 13.14 11.8267 13.2753C11.6912 13.4106 11.5323 13.4783 11.35 13.4783Z"
                          fill="#5F6368"
                        />
                      </svg>
                    </button>
                  </span>
                </div> */}
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Project Start Date<span className="required_field">*</span>
              </label>
              <DatePicker
                name="startDate"
                selected={PSD}
                onChange={(date: any) => setPSD(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>
            {/*   Project End Date */}
            {/* <div className="flex flex-col relative">
                  <label
                    htmlFor="projectEndDate"
                    className="text-sm   absolute -mt-2 ml-4 mb-2 bg-white"
                  >
                    Project End Date<span className="required_field">*</span>
                  </label>
                  <input
                    name="endDate"
                    id="endDate"
                    type="date"
                    className="border p-4 rounded h-14"
                    data-tooltip="Pick a project end date"
                    required
                  />
                  <span className="open-button">
                    <button type="button">
                      <svg
                        width="15"
                        height="17"
                        viewBox="0 0 15 17"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M2.17364 16.1293C1.76687 16.1293 1.42725 15.9931 1.15479 15.7206C0.882325 15.4481 0.746094 15.1085 0.746094 14.7017V3.4183C0.746094 3.01153 0.882325 2.67191 1.15479 2.39945C1.42725 2.12698 1.76687 1.99075 2.17364 1.99075H3.73684V0.0195312H4.68854V1.99075H11.0102V0.0195312H11.8939V1.99075H13.4571C13.8639 1.99075 14.2035 2.12698 14.4759 2.39945C14.7484 2.67191 14.8846 3.01153 14.8846 3.4183V14.7017C14.8846 15.1085 14.7484 15.4481 14.4759 15.7206C14.2035 15.9931 13.8639 16.1293 13.4571 16.1293H2.17364ZM2.17364 15.2456H13.4571C13.5932 15.2456 13.7178 15.189 13.8311 15.0758C13.9444 14.9625 14.001 14.8378 14.001 14.7017V6.95294H1.62975V14.7017C1.62975 14.8378 1.68638 14.9625 1.79964 15.0758C1.91289 15.189 2.03756 15.2456 2.17364 15.2456ZM1.62975 6.06906H14.001V3.4183C14.001 3.28222 13.9444 3.15755 13.8311 3.0443C13.7178 2.93104 13.5932 2.87441 13.4571 2.87441H2.17364C2.03756 2.87441 1.91289 2.93104 1.79964 3.0443C1.68638 3.15755 1.62975 3.28222 1.62975 3.4183V6.06906ZM7.81537 10.0795C7.63304 10.0795 7.47413 10.0119 7.33863 9.87653C7.20329 9.74118 7.13561 9.58227 7.13561 9.39979C7.13561 9.21746 7.20329 9.05863 7.33863 8.92328C7.47413 8.78793 7.63304 8.72026 7.81537 8.72026C7.99769 8.72026 8.15661 8.78793 8.2921 8.92328C8.42745 9.05863 8.49512 9.21746 8.49512 9.39979C8.49512 9.58227 8.42745 9.74118 8.2921 9.87653C8.15661 10.0119 7.99769 10.0795 7.81537 10.0795ZM4.28073 10.0795C4.0984 10.0795 3.93949 10.0119 3.804 9.87653C3.66865 9.74118 3.60098 9.58227 3.60098 9.39979C3.60098 9.21746 3.66865 9.05863 3.804 8.92328C3.93949 8.78793 4.0984 8.72026 4.28073 8.72026C4.46306 8.72026 4.62197 8.78793 4.75746 8.92328C4.89281 9.05863 4.96048 9.21746 4.96048 9.39979C4.96048 9.58227 4.89281 9.74118 4.75746 9.87653C4.62197 10.0119 4.46306 10.0795 4.28073 10.0795ZM11.35 10.0795C11.1677 10.0795 11.0088 10.0119 10.8733 9.87653C10.7379 9.74118 10.6702 9.58227 10.6702 9.39979C10.6702 9.21746 10.7379 9.05863 10.8733 8.92328C11.0088 8.78793 11.1677 8.72026 11.35 8.72026C11.5323 8.72026 11.6912 8.78793 11.8267 8.92328C11.9621 9.05863 12.0298 9.21746 12.0298 9.39979C12.0298 9.58227 11.9621 9.74118 11.8267 9.87653C11.6912 10.0119 11.5323 10.0795 11.35 10.0795ZM7.81537 13.4783C7.63304 13.4783 7.47413 13.4106 7.33863 13.2753C7.20329 13.14 7.13561 12.981 7.13561 12.7986C7.13561 12.6162 7.20329 12.4573 7.33863 12.3218C7.47413 12.1865 7.63304 12.1188 7.81537 12.1188C7.99769 12.1188 8.15661 12.1865 8.2921 12.3218C8.42745 12.4573 8.49512 12.6162 8.49512 12.7986C8.49512 12.981 8.42745 13.14 8.2921 13.2753C8.15661 13.4106 7.99769 13.4783 7.81537 13.4783ZM4.28073 13.4783C4.0984 13.4783 3.93949 13.4106 3.804 13.2753C3.66865 13.14 3.60098 12.981 3.60098 12.7986C3.60098 12.6162 3.66865 12.4573 3.804 12.3218C3.93949 12.1865 4.0984 12.1188 4.28073 12.1188C4.46306 12.1188 4.62197 12.1865 4.75746 12.3218C4.89281 12.4573 4.96048 12.6162 4.96048 12.7986C4.96048 12.981 4.89281 13.14 4.75746 13.2753C4.62197 13.4106 4.46306 13.4783 4.28073 13.4783ZM11.35 13.4783C11.1677 13.4783 11.0088 13.4106 10.8733 13.2753C10.7379 13.14 10.6702 12.981 10.6702 12.7986C10.6702 12.6162 10.7379 12.4573 10.8733 12.3218C11.0088 12.1865 11.1677 12.1188 11.35 12.1188C11.5323 12.1188 11.6912 12.1865 11.8267 12.3218C11.9621 12.4573 12.0298 12.6162 12.0298 12.7986C12.0298 12.981 11.9621 13.14 11.8267 13.2753C11.6912 13.4106 11.5323 13.4783 11.35 13.4783Z"
                          fill="#5F6368"
                        />
                      </svg>
                    </button>
                  </span>
                </div> */}
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Project End Date<span className="required_field">*</span>
              </label>
              <DatePicker
                name="endDate"
                selected={PED}
                onChange={(date: any) => setPED(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/* <div className="flex flex-col relative">
                  <label
                    htmlFor="projectEndDate"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Loan (Million)
                  </label>

                  <input
                    name="loanAmt"
                    id="loanAmt"
                    type="number"
                    className="border p-4 rounded"
                    placeholder="US$ 0000"
                    data-tooltip="Write Project Loan Amount"
                    onInput={(e) => {
                      customeMaxLength(e, 50);
                    }}
                    required
                    min={0}
                  />
                </div> */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/*  Project Objectives */}
            <div className="relative">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
                Project Objectives
              </label>
              <textarea
                name="objective"
                className="mt-1 block w-full h-14 p-2 border border-gray-300 rounded-md shadow-sm resize-none"
                data-tooltip="Write Your Project Objectives"
                onInput={(e) => {
                  customeMaxLength(e, 50);
                }}
              />
            </div>
            {/*  Key Deliverables */}
            <div className="relative">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
                Key Deliverables
              </label>
              <textarea
                name="keyDeliverable"
                className="mt-1 block w-full h-14 p-2 border border-gray-300 rounded-md shadow-sm resize-none"
                data-tooltip="Write Key Deliverables"
                onInput={(e) => {
                  customeMaxLength(e, 5000);
                }}
              />
            </div>
          </div>

          <div className="">
            {/* Project Area */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="projectName"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Project Area<span className="required_field">*</span>
              </label>
              <input
                name="projectArea"
                id="projectArea"
                type="text"
                placeholder="Write Project Area here"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write Project Area Name"
                onInput={(e) => {
                  customeMaxLength(e, 110);
                }}
                required
              />
            </div>
          </div>

          {/* Mode of Financing Dropdown */}
          <div className="flex items-center space-x-4">
            <div
              className={`relative ${financingMode ? "lg:w-[300px] xl:w-[500px]" : "md:w-[180px] lg:w-[200px] xl:w-[300px]"}`}
            >
              <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor text-wrap">
                Financing Mode<span className="required_field">*</span>
              </label>
              <select
                name="financingMode"
                className="block lg:w-[202px] xl:w-[369px] p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                value={financingMode}
                onChange={(e) => setFinancingMode(e.target.value)}
                required
              >
                <option value="">Select</option>
                <option value="Loan">Loan</option>
                <option value="Grant">Grant</option>
                <option value="Both">Both</option>
              </select>

              <DropDownIcon />
            </div>

            {/* Conditionally show inputs beside the Mode of Financing dropdown */}
            {financingMode === "Loan" && (
              <div className="relative w-full">
                <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                  Loan Amount
                </label>
                <input
                  type="number"
                  name="loanAmt"
                  className="block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Loan Amount"
                  // value={loanAmount}
                  onInput={(e) => {
                    customeMaxLength(e, 10);
                  }}
                  min={1}
                  // onInput={(e) => handleNumberInput(e, setLoanAmount)}
                  required
                />
              </div>
            )}

            {financingMode === "Grant" && (
              <div className="relative w-full">
                <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-xs xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                  Grant Amount
                </label>
                <input
                  type="number"
                  name="grantAmt"
                  className="block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                  placeholder="Enter Grant Amount"
                  // value={grantAmount}
                  // onInput={(e) => handleNumberInput(e, setGrantAmount)}
                  onInput={(e) => {
                    customeMaxLength(e, 10);
                  }}
                  required
                />
              </div>
            )}

            {financingMode === "Both" && (
              <div className="flex space-x-4 w-full">
                <div className="relative w-full">
                  <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                    Loan Amount
                  </label>
                  <input
                    type="number"
                    name="loanAmt"
                    className="block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter Loan Amount"
                    // value={loanAmount}
                    // onInput={(e) => handleNumberInput(e, setLoanAmount)}
                    onInput={(e) => {
                      customeMaxLength(e, 10);
                    }}
                    required
                  />
                </div>

                <div className="relative w-full">
                  <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                    Grant Amount
                  </label>
                  <input
                    type="number"
                    name="grantAmt"
                    className="block w-full p-4 border border-gray-300 rounded-md shadow-sm"
                    placeholder="Enter Grant Amount"
                    onInput={(e) => {
                      customeMaxLength(e, 10);
                    }}
                    // value={grantAmount}
                    // onInput={(e) => handleNumberInput(e, setGrantAmount)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-5">
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                {" "}
                Board Approval<span className="required_field">*</span>
              </label>
              <DatePicker
                name="wbApprovalDate"
                selected={BAD}
                onChange={(date: any) => setBAD(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/*    DPP/TAPP (Approved/Revision on) */}
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                DPP/TAPP<span className="required_field">*</span>
              </label>
              <DatePicker
                name="dppDate"
                selected={DPPD}
                onChange={(date: any) => setDPPD(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/* Total Project Cost (Million US$) */}
            <div className=" border-[#D9D9D9] h-14">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white z-10">
                Total Project Cost<span className="required_field">*</span>
              </label>
              <input
                name="totalProjectCost"
                placeholder="e.g 000000"
                type="number"
                className=" block w-full  border border-gray-300 rounded-md shadow-sm  p-3.5  h-14 text-lg relative"
                data-tooltip="Write Total Project Cost Amount"
                onInput={(e) => {
                  customeMaxLength(e, 8);
                }}
                required
              />
            </div>

            {/* DPA/RPA */}
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                {" "}
                DPA/RPA<span className="required_field">*</span>
              </label>
              <DatePicker
                name="wbApprovalDate"
                selected={DDPP}
                onChange={(date: any) => setDDPP(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="DD/MM/YYYY"
                showYearDropdown
                showMonthDropdown
                dropdownMode="select"
                className="w-full border p-4 rounded h-14 text-lg relative "
                required
              />
            </div>

            {/*  Sector Of Planning Commission */}
            <div className="relative">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white z-10">
                Sector Of Planning<span className="required_field">*</span>
              </label>
              <input
                name="planningCommission"
                id="wbApprovalDate"
                type="text"
                placeholder="Write sector of plan here"
                className=" block w-full  border border-gray-300 rounded-md shadow-sm  p-4  h-14 text-lg relative"
                data-tooltip="Write Sector Of Planning Commission (if needed)"
              />
            </div>
          </div>

          {/*  Financing Organization */}
          <div className="flex items-center   w-full border border-gray-300 rounded-md shadow-sm ">
            <label
              htmlFor="financingOrganization"
              className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
            >
              Financing Organization
              <span className="required_field">*</span>
            </label>
            <div className="relative flex-grow">
              <Select
                options={donorOptions}
                isMulti
                value={selectedDonors}
                onChange={(selected: any) => setSelectedDonors(selected)}
                placeholder="Select"
                name="donorOrganizationIds"
                styles={customStyles}
              />
            </div>
          </div>

          {/* Sector Name */}
          <div className="flex items-center   w-full border border-gray-300 rounded-md shadow-sm">
            <label
              htmlFor="financingOrganization"
              className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
            >
              Sector Name<span className="required_field">*</span>
            </label>
            <div className="relative flex-grow">
              <Select
                name="sectorIds"
                className="relative flex-grow"
                isMulti
                options={sector_List}
                onChange={handleSectorChange}
                data-tooltip="Select Sector Name"
                required
                styles={customStyles}
              />
            </div>
          </div>

          {/* Components */}
          <div className="flex items-center   w-full border border-gray-300 rounded-md shadow-sm">
            <label
              htmlFor="financingOrganization"
              className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
            >
              Component Name<span className="required_field">*</span>
            </label>
            <div className="relative flex-grow">
              <Select
                name="componentIds"
                className=""
                closeMenuOnSelect={false}
                isMulti
                options={component_List}
                onChange={handleLoanConditionChange}
                data-tooltip="Select Loan Conditionalities"
                required
                styles={customStyles}
              />
            </div>
          </div>

          {/* Status */}
          <div className="grid grid-cols-3">
            <div className="relative">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white">
                Status<span className="required_field">*</span>
              </label>
              <select
                data-tooltip="Select Project Status"
                name="projectRecStatus"
                id="projectRecStatus"
                className="block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
                <option value="A">Active</option>
                <option value="I">Inactive</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                    fill="#5F6368"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-10">
            {singleData ? (
              <UpdateButton setsingleData={setsingleData} loading={loading} />
            ) : (
              <AddButton setsingleData={setsingleData} loading={loading} />
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ProjectSetup;
