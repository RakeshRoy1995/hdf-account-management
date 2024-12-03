import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import { get_all_data } from "@/api/Reqest";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const Employee = () => {
  const [po, setpo] = useState<any>([]);
  const [department, setdepartment] = useState<any>([]);
  const [designation, setdesignation] = useState<any>([]);

  const [render, setrender] = useState(true);
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
  } = useFetch(`${API_URL}/employee?currentPage=1&pageSize=10000`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: "Name",
      selector: (row: any) => row.firstName + " " + row.lastName,
      sortable: true,
    },

    {
      name: "Father Name",
      selector: (row: any) => row.fatherName,
      sortable: true,
    },

    {
      name: "phone",
      selector: (row: any) => row.phone,
      sortable: true,
    },

    {
      name: "organization type",
      selector: (row: any) => row.organizationType,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.employeeId)}</>,
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    let page_list = `${API_URL}/employee`;
    let method = "POST";

    if (singleData?.employeeId) {
      page_list = `${API_URL}/employee/${singleData?.employeeId}`;
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
    setsingleData(null);
  };

  const po_list_api = async () => {
    const apiEndPoint =
      "partner-organization?currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setpo(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const department_list_api = async () => {
    const apiEndPoint = "department?currentPage=1&pageSize=5";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setdepartment(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const designation_list_api = async () => {
    const apiEndPoint = "designation";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setdesignation(ministry_List_Array?.data);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/employee/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetchSingleDataCommonByID(page_list, options);
      setrender(true);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/employee/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const fetchInitData = async () => {
    fetchData();
    po_list_api();
    department_list_api();
    designation_list_api();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      fetchData();
    }

    if (error) {
      //show error message
      Swal.fire({
        icon: "error",
        text: error?.data?.message ? error?.data?.message : error,
        confirmButtonText: "Close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (deleteMsg) {
      //show success message
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  return (
    <>
      <BreadcumbWithButton name={"Employee"} url={"/#"} />

      <form
        action="submit"
        className="p-4 space-y-6 shadow-lg rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <input type="hidden" name="callForApplicationId" value={"0"} />
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <label
              htmlFor="partnerOrganizationId"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Partner Organization
            </label>

            <select
              value={singleData?.partnerOrganizationId}
              onChange={(e) =>
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                })
              }
              id="partnerOrganizationId"
              name="partnerOrganizationId"
              className="border p-4 rounded h-14"
            >
              <option value={""}>Select Partner Organization </option>
              {po.map((d: any) => (
                <option key={d.partnerId} value={d.partnerId}>
                  {" "}
                  {d.nameBn} - {d.code}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="departmentId"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Department
            </label>

            <select
              id="departmentId"
              value={singleData?.departmentId}
              onChange={(e) =>
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                })
              }
              name="departmentId"
              className="border p-4 rounded h-14"
            >
              <option value={""}>Select Department </option>
              {department.map((d: any) => (
                <option value={d.deptId}>
                  {" "}
                  {d.deptName} - {d.deptCode}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="designationId"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Designation
            </label>

            <select
              id="designationId"
              name="designationId"
              value={singleData?.designationId}
              onChange={(e) =>
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                })
              }
              className="border p-4 rounded h-14"
            >
              <option value={""}>Select Designation </option>
              {designation.map((d: any) => (
                <option key={d.designId} value={d.designId}>
                  {" "}
                  {d.designName} - {d.designCode}{" "}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="firstName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              First Name
            </label>
            <input
              required
              maxLength={50}
              name="firstName"
              id="firstName"
              defaultValue={singleData?.firstName}
              type="text"
              placeholder="First Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="lastName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Last Name
            </label>
            <input
              required
              maxLength={50}
              name="lastName"
              id="lastName"
              defaultValue={singleData?.lastName}
              type="text"
              placeholder="Last Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="fatherName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Father Name
            </label>
            <input
              required
              maxLength={50}
              name="fatherName"
              id="fatherName"
              defaultValue={singleData?.fatherName}
              type="text"
              placeholder="Father Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="motherName"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Mother Name
            </label>
            <input
              required
              maxLength={50}
              name="motherName"
              id="motherName"
              defaultValue={singleData?.motherName}
              type="text"
              placeholder="Mother Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="code"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Code
            </label>
            <input
              required
              maxLength={50}
              name="code"
              id="code"
              defaultValue={singleData?.code}
              type="text"
              placeholder="Last Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="nidNo"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              NID
            </label>
            <input
              required
              maxLength={50}
              name="nidNo"
              id="nidNo"
              // onChange={(e) =>
              //   setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              // }
              defaultValue={singleData?.nidNo}
              type="text"
              placeholder="Nid here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="brNo"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Birth Certificate
            </label>
            <input
              required
              maxLength={50}
              name="brNo"
              id="brNo"
              // onChange={(e) =>
              //   setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              // }
              defaultValue={singleData?.brNo}
              type="text"
              placeholder="Birth Certificate here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="birthDate"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Date of Birth
            </label>
            <input
              id="birthDate"
              defaultValue={singleData?.birthDate}
              type="date"
              name="birthDate"
              className="border p-4 rounded appearance-none h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="phone"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Phone
            </label>
            <input
              required
              maxLength={50}
              name="phone"
              id="phone"
              // onChange={(e) =>
              //   setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              // }
              defaultValue={singleData?.phone}
              type="text"
              placeholder="phone here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative mb-5">
            <label
              htmlFor="type"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Organization type
            </label>

            <select
              name="OrganizationType"
              value={singleData?.OrganizationType}
              className="border p-4 rounded-md h-14 text-sm"
              onChange={(e) =>
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                })
              }
            >
              <option value={"PMU"}>PMU</option>
              <option value={"PO"}>PO</option>
              <option value={"BRANCH"}>BRANCH</option>
            </select>
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="joiningDate"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Join of Birth
            </label>
            <input
              id="joiningDate"
              defaultValue={singleData?.joiningDate}
              type="date"
              name="joiningDate"
              className="border p-4 rounded appearance-none h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="joiningDate"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Is trainer ?
            </label>
            <label className="flex items-center mt-2">
              <input
                defaultChecked={singleData?.trainer}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.checked,
                  })
                }
                name="trainer"
                id="trainer"
                type="checkbox"
                className="mr-2 " // Use a custom class
              />
              Yes
            </label>
          </div>

          <div className="relative">
            <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
              Status
            </label>
            <select
              data-tooltip="Select Project Status"
              name="empRecStatus"
              id="empRecStatus"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
            >
              <option value="A" selected={singleData?.empRecStatus == "A"}>
                Active
              </option>
              <option value="I" selected={singleData?.empRecStatus == "I"}>
                Inactive
              </option>
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

          {singleData?.employeeId ? <UpdateButton /> : <AddButton />}
        </div>
      </form>

      <Table
        rows={data?.content || []}
        column={column}
        getheaderColor={getheaderColor}
      />
    </>
  );
};

export default Employee;
