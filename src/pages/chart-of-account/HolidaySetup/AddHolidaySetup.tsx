import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import SaveButton from "@/shared/components/ButttonsCollection/SaveButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import DateFormate from "@/shared/date-formate/DateFormate";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const AddHolidaySetup = () => {
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
  } = useFetch(`${API_URL}/holidays?currentPage=1&pageSize=200`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    let page_list = `${API_URL}/holidays`;
    let method = "POST";

    if (singleData?.holidayId) {
      page_list = `${API_URL}/holidays/${singleData?.holidayId}`;
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

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const form: any = document.querySelector("form");
      form.reset();
      const page_list = `${API_URL}/holidays/${id}`;
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
      const page_list = `${API_URL}/holidays/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const fetchInitData = async () => {
    fetchData();
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
        text: error?.data?.message,
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

  const columns = [
    {
      name: "Date Range",
      selector: (row) =>
        row.holidayStartDate !== row.holidayEndDate
          ? row.holidayStartDate + " - " + row.holidayEndDate
          : row.holidayStartDate,
      sortable: true,
    },
    {
      name: "Holiday Name",
      selector: (row) => row.holidayName,
      sortable: true,
    },
    {
      name: "action",
      value: "holidayId",
      onclickEvt: fetchDataByID,
      cell: (row) => <div>{ActionButton(fetchDataByID, row?.holidayId)}</div>,
    },
  ];

  return (
    <>
      <Breadcrumb name1={"Holiday"} name2={"Holiday Setup"} />
      <div className="mb-10 rounded-2xl bg-white shadow-md">
        <div className="p-5">
          <form className="p-4 space-y-6" onSubmit={handleSubmit}>
            <input
              type="hidden"
              name="holidayId"
              value={singleData?.holidayId}
            />
            {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
            <div className="grid grid-cols-3 gap-4">
              {/* Date */}

              <div className="flex flex-col relative">
                <label
                  htmlFor="holidayName"
                  className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Holiday Name <span className="required_field">*</span>
                </label>
                <input
                  required
                  id="holidayName"
                  name="holidayName"
                  placeholder="Holiday Name"
                  defaultValue={singleData?.holidayName}
                  // onChange={(e) => setDateOfSigning(e.target.value)}
                  className="border p-4 rounded appearance-none h-14"
                />
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="holidayStartDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Start Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="holidayStartDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="Start Date"
                />
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="holidayEndDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  End Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="holidayEndDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="End Date"
                />
              </div>
            </div>
            {/* Project Name */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="projectName"
                className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
              >
                Description
              </label>
              <input
                id="projectName"
                type="text"
                name="holidayDescription"
                defaultValue={singleData?.holidayDescription}
                // value={projectName}
                // onChange={(e) => setProjectName(e.target.value)}
                placeholder="Description here"
                className="w-full border p-4 rounded h-16 text-sm"
              />
            </div>
            {/* Status */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="implementingMinistry"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Status
              </label>
              <select
                id="implementingMinistry"
                name="holidayRecStatus"
                // value={implementingMinistry}
                // onChange={(e) => setImplementingMinistry(e.target.value)}
                className="lg:w-1/4 sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.holidayRecStatus == "A"}
                >
                  Active{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.holidayRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-48 mt-5">
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
            {singleData?.holidayId ? (
              <UpdateButton setsingleData={setsingleData} loading={loading} />
            ) : (
              <AddButton setsingleData={setsingleData} loading={loading} />
            )}
          </form>
        </div>
      </div>
      <Table
        rows={data?.content || []}
        column={columns}
        getheaderColor={getheaderColor}
      />
    </>
  );
};

export default AddHolidaySetup;
