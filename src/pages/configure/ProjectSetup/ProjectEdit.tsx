import "react-datepicker/dist/react-datepicker.css";
import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { get_all_data } from "@/api/Reqest";
import Select from "react-select";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
import { customeMaxLength } from "../../../utils";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import DateFormate from "@/shared/date-formate/DateFormate";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const ProjectEdit = () => {
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
  } = useFetch(`${API_URL}/project`);
  const { projectId } = useParams();

  const [ministries, setMinistries] = useState<any>([]);
  const [component_List, setComponent_List] = useState<any>([]);
  const [sector_List, setSector_List] = useState<any>([]);
  const [donor_organization_List, setDonor_organization_List] = useState<any>([]);
  const [selectedSectors, setSelectedSectors] = useState<any>([]);
  const [selectedSectorsIDs, setSelectedSectorsIDs] = useState<any>([]);
  const [selectedLoanConditionalitiesIDs, setselectedLoanConditionalitiesIDs] = useState<any>([]);
  const [selectedLoanConditionalities, setSelectedLoanConditionalities] = useState<any>([]);

  const [financingMode, setFinancingMode] = useState(singleData?.financingMode || "");
  const [loanAmount, setLoanAmount] = useState(singleData?.loanAmt || "");
  const [grantAmount, setGrantAmount] = useState(singleData?.grantAmt || "");


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

// Fetch donor organization list
const donor_organization_List_API = async () => {
  const apiEndPoint = "donor-organization";
  const response_donor_organization = await get_all_data(apiEndPoint);
  const donor_organization_List = response_donor_organization?.data;
  setDonor_organization_List(donor_organization_List || []);
};

  const handleSectorChange = (selectedOptions: any) => {
    const sectorIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setSelectedSectors(selectedOptions);
    setSelectedSectorsIDs(sectorIds);
  };

  const handleLoanConditionChange = (selectedOptions: any) => {
    setSelectedLoanConditionalities(selectedOptions);
    const componentIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setselectedLoanConditionalitiesIDs(componentIds);
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};

    const sectorIDs: string[] = [];
    const components: string[] = [];

    for (const [key, value] of formData) {
      console.log(key, ":", value);
      if (key === "componentIds") {
        components.push(value as string);
      } else if (key === "sectorIds") {
        sectorIDs.push(value as string);
      } else {
        obj = { ...obj, [key]: value };
      }
    }

    // Assign processed components and sectors
    obj.componentIds = components;
    obj.sectorIds = sectorIDs;

    // Explicitly add donorOrganizationIds from singleData
    obj.donorOrganizationIds = singleData?.donorOrganizationIds || [];

    // Log the final payload for debugging
    // console.log("Final Payload:", obj);

    // Determine API endpoint and method
    let page_list = `${API_URL}/project`;
    let method = "POST";

    if (singleData?.projectId) {
      page_list = `${API_URL}/project/${singleData?.projectId}`;
      method = "PUT";
    }

    const options = {
      method,
      data: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    // Send API request
    fetchDataCommon(page_list, options);
  };

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const form: any = document.querySelector("form");
      form.reset();
      const page_list = `${API_URL}/project/${projectId}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetchSingleDataCommonByID(page_list, options);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/project/${id}`;
      deleteData(page_list);
    }
  };

  const fetchInitData = async () => {
    await fetchDataByID(projectId, "edit");
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
        title: "Project Successfully Updated!",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        window.location.assign("/project-setup");
      }, 1500);

      setcommon_Data(null);
    }

    if (error) {
      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "Close",
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

  useEffect(() => {
    const sector____DefaultValues = sector_List?.filter((sector: any) =>
      singleData?.sectorIds?.includes(sector?.value),
    );
    setSelectedSectors(sector____DefaultValues);

    const selectedLoanConditionalities____DefaultValue = component_List?.filter(
      (component: any) => singleData?.componentIds?.includes(component?.value),
    );

    setSelectedLoanConditionalities(
      selectedLoanConditionalities____DefaultValue,
    );
  }, [sector_List, component_List]);
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      height: "2px",
      border: 'none', // Remove the border
      boxShadow: 'none', // Remove shadow on focus
      backgroundColor: 'transparent', // Make background transparent if needed
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#5F6368', // Customize dropdown icon color
    }),
  };

  // Update state when `singleData` changes
  useEffect(() => {
    setFinancingMode(singleData?.financingMode || "");
    setLoanAmount(singleData?.loanAmt || "");
    setGrantAmount(singleData?.grantAmt || "");
  }, [singleData]);

  const handleModeChange = (e) => {
    const mode = e.target.value;
    setFinancingMode(mode);
  };

  const handleInput = (e, setter) => {
    // Custom max-length logic
    const maxLength = 10;
    const value = e.target.value.slice(0, maxLength);
    setter(value);
  };
  console.log(singleData);

  // console.log(singleData?.donorOrganizationIds);
  // console.log(donor_organization_List);
// Fetch donor organization list on mount
useEffect(() => {
  donor_organization_List_API();
}, []);
console.log("Updated singleData:", singleData);

  return (
    <div className="w-full bg-[#f6fcff] ">
      <div className="container mx-auto  w-full ">
        <Breadcrumb name1={"Projects"} name2={"Project Edit"} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <form className=" bg-white rounded-2xl p-5 space-y-5 " onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            {/* Project Code */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="projectName"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Project Code
              </label>
              <input
                name="code"
                id="code"
                type="text"
                placeholder="Write Project Code here"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write a project Code"
                defaultValue={singleData?.code}
                onInput={(e) => {
                  customeMaxLength(e, 50);
                }}
                required
              />
            </div>
            {/*  Project Name */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="projectName"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Project Name
              </label>
              <input
                name="name"
                id="projectName"
                type="text"
                placeholder="Write Project name here"
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write a project Name"
                defaultValue={singleData?.name}
                onInput={(e) => {
                  customeMaxLength(e, 100);
                }}
                required
              />
            </div>
          </div>
          {/*   Project Description */}
          <div className="flex flex-col relative">
            <label
              htmlFor="projectDescription"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Project Description
            </label>
            <textarea
              name="description"
              id="description"
              className="border p-5 rounded h-14 resize-none"
              data-tooltip="Write short description about this project"
              defaultValue={singleData?.description}
              onInput={(e) => {
                customeMaxLength(e, 100);
              }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/*    Implementing Ministries */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="implementingMinistry"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Implementing Ministries
              </label>
              <select
                name="ministryId"
                id="implementingMinistry"
                className="border p-4 rounded appearance-none h-14"
                data-tooltip="Plese Select Ministry"
                required
              >
                {ministries?.map((ministry: any, index: number) => (
                  <option
                    key={index}
                    value={ministry?.ministryId}
                    selected={
                      singleData?.ministryId == ministry?.ministryId
                    }
                  >
                    {ministry?.ministryName}
                  </option>
                ))}
              </select>

              <DropDownIcon />
            </div>
            {/* Executing Agency */}
            <div className="flex flex-col relative">
              <label
                htmlFor="executingAgency"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Executing Agency
              </label>
              <input
                name="executingAgency"
                id="executingAgency"
                type="text"
                placeholder="Write..."
                className="w-full border p-4 rounded h-14 text-sm"
                data-tooltip="Write Executing Agency Name"
                defaultValue={singleData?.executingAgency}
                onInput={(e) => {
                  customeMaxLength(e, 60);
                }}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="dateOfSigning"
                className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Date of Signing
              </label>
              <DateFormate
                name="signingDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
                label="Date of Signing" className={"w-full border p-4 rounded h-14 text-lg relative "}
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="dateOfEffectiveness"
                className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Date of Effectiveness
              </label>

              <DateFormate
                name="effectiveDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
                label="Date of Effectiveness"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col relative w-full">
              <label
                htmlFor="projectStartDate"
                className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Project Start Date
              </label>
              <DateFormate
                name="startDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label
                htmlFor="projectEndDate"
                className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Project End Date
              </label>
              <DateFormate
                name="endDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
              />
            </div>

            {/*   Loan (Million) */}
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
                defaultValue={singleData?.loanAmt}
                onInput={(e) => {
                  customeMaxLength(e, 9);
                }}

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
                defaultValue={singleData?.objective}
                onInput={(e) => {
                  customeMaxLength(e, 500);
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
                defaultValue={singleData?.keyDeliverable}
                onInput={(e) => {
                  customeMaxLength(e, 500);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col relative ">
            <label
              htmlFor="projectName"
              className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
            >
              Project Area
            </label>
            <input
              name="projectArea"
              id="projectArea"
              type="text"
              placeholder="Write Project Area here"
              className="w-full border p-4 rounded h-14 text-sm"
              data-tooltip="Write Project Area Name"
              defaultValue={singleData?.projectArea}
              onInput={(e) => {
                customeMaxLength(e, 110);
              }}
              required
            />
          </div>
          {/* <div className="grid grid-cols-2 gap-5">
            <div className="relative  h-14">
              <label className="block  font-normal  text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Mode of Financing
              </label>
              <input
                name="financingMode"
                type="text"
                className="block w-full  p-4 border border-gray-300 rounded-md shadow-sm"
                placeholder="Write"
                data-tooltip="Write Mode of Financing Name"
                defaultValue={singleData?.financingMode}
                onInput={(e) => {
                  customeMaxLength(e, 60);
                }}
                required
              />
            </div>
          </div> */}
          <div className="flex items-center space-x-4">
            {/* Financing Mode Dropdown */}
            <div
              className={`relative ${financingMode ? "w-[560px]" : "md:w-[180px] lg:w-[315px] xl:w-full"}`}>
              <label className="block font-normal xs:text-xs sm:text-xs md:text-xs lg:text-sm xl:text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor text-wrap">
                Financing Mode<span className="required_field">*</span>
              </label>
              <select
                name="financingMode"
                className="block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                value={financingMode}
                onChange={handleModeChange}
                required
              >
                <option value="">Select</option>
                <option value="Loan">Loan</option>
                <option value="Grant">Grant</option>
                <option value="Both">Both</option>
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

            {/* Conditionally render fields */}
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
                  value={loanAmount}
                  onInput={(e) => handleInput(e, setLoanAmount)}
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
                  value={grantAmount}
                  onInput={(e) => handleInput(e, setGrantAmount)}
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
                    value={loanAmount}
                    onInput={(e) => handleInput(e, setLoanAmount)}
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
                    value={grantAmount}
                    onInput={(e) => handleInput(e, setGrantAmount)}
                    required
                  />
                </div>
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                Board Approval
              </label>
              <DateFormate
                name="wbApprovalDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
                className="w-full border p-4 rounded h-14 text-lg relative "
              />
            </div>


            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                DPP/TAPP (Approved/Revision on)
              </label>

              <DateFormate
                name="dppDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
                className="w-full border p-4 rounded h-14 text-lg relative "
              />
            </div>
            <div className="relative border-[#D9D9D9] h-14">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white z-10">
                Total Project Cost (Million US$)
              </label>
              <input
                name="totalProjectCost"
                type="number"
                className="block w-full  border border-gray-300 rounded-md shadow-sm  p-3.5  h-14 text-lg relative"
                data-tooltip="Write Total Project Cost Amount"
                defaultValue={singleData?.totalProjectCost}
                onInput={(e) => {
                  customeMaxLength(e, 60);
                }}
                required
              />
            </div>
          </div>


          <div className="grid grid-cols-3 gap-4">

            <div className="flex flex-col relative w-full">
              <label className="z-10 text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                DPA/RPA
              </label>
              <DateFormate
                name="wbApprovalDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
              />
            </div>

            <div className="flex flex-col relative w-full">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white z-10">
                Sector Of Planning Commission
              </label>
              <input
                name="planningCommission"
                defaultValue={singleData?.planningCommission}
                id="wbApprovalDate"
                type="text"
                className="block w-full  border border-gray-300 rounded-md shadow-sm  p-4  h-14 text-lg relative"
                data-tooltip="Write Sector Of Planning Commission (if needed)"
              />
            </div>

          </div>

          {/* Financing Organization */}
          <div className="flex items-center w-full border border-gray-300 rounded-md shadow-sm">
      <label
        htmlFor="financingOrganization"
        className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
      >
        Financing Organization<span className="required_field">*</span>
      </label>
      <div className="relative flex-grow">
        {donor_organization_List?.length > 0 ? (
          <Select
            isMulti
            options={donor_organization_List?.map((donor_organization) => ({
              value: donor_organization?.donorOrganizationId,
              label: donor_organization?.donorOrganizationName,
            }))}
            value={donor_organization_List
              ?.filter((donor) =>
                singleData?.donorOrganizationIds?.includes(donor?.donorOrganizationId)
              )
              ?.map((donor) => ({
                value: donor.donorOrganizationId,
                label: donor.donorOrganizationName,
              }))}
            onChange={(selectedOptions) => {
              const selectedIds = selectedOptions?.map((option) => option.value) || [];
              setsingleData({
                ...singleData,
                donorOrganizationIds: selectedIds,
              });
            }}
            placeholder="Select donor organizations"
            className="appearance-none bg-transparent outline-none text-gray-800 w-full"
            styles={customStyles}
            isClearable
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>

          {/* Sector */}
          <div className="flex items-center   w-full border border-gray-300 rounded-md shadow-sm">
            <label
              htmlFor="financingOrganization"
              className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
            >Sector Name<span className="required_field">*</span>
            </label>
            <div className="relative flex-grow">
              <Select
                isMulti
                name="sectorIds"
                className=""
                closeMenuOnSelect={false}
                value={selectedSectors}
                options={sector_List}
                onChange={handleSectorChange}
                data-tooltip="Select Sector Name"
                required
                styles={customStyles}
              />
            </div>
          </div>

          <div className="flex items-center   w-full border border-gray-300 rounded-md shadow-sm">
            <label
              htmlFor="financingOrganization"
              className="block font-normal text-gray-700 text-sm absolute -mt-8 ml-2 mb-2 bg-white"
            >Component Name<span className="required_field">*</span>
            </label>
            <div className="relative flex-grow">
              <Select
                isMulti
                name="componentIds"
                className=""
                closeMenuOnSelect={false}
                // defaultValue={[options[1], options[2]]}
                value={selectedLoanConditionalities}
                options={component_List}
                onChange={handleLoanConditionChange}
                data-tooltip="Select Loan Conditionalities"
                required
                styles={customStyles}
              />
            </div>
          </div>
          <div className="relative grid grid-cols-3">
            <div className="relative">
              <label className="block  font-normal text-gray-700 text-sm  absolute -mt-2 ml-4 mb-2 bg-white">
                Status
              </label>
              <select
                data-tooltip="Select Project Status"
                name="projectRecStatus"
                id="projectRecStatus"
                className="block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              >
                <option
                  value="A"
                  selected={singleData?.projectRecStatus == "A"}
                >
                  Active
                </option>
                <option
                  value="I"
                  selected={singleData?.projectRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
              <DropDownIcon />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-10">
            {singleData ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
          </div>
        </form>


      </motion.div>
    </div>
  );
};

export default ProjectEdit;
