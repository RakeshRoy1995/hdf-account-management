import useFetch from "@/hooks/useFetch";
import { motion } from "framer-motion";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const DonorOrganization = () => {
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
  } = useFetch(`${API_URL}/donor-organization`);

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

    let page_list = `${API_URL}/donor-organization`;
    let method = "POST";

    if (singleData?.donorOrganizationId) {
      page_list = `${API_URL}/donor-organization/${singleData?.donorOrganizationId}`;
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
    setrender(false);
    const form: any = document.querySelector("form");
    form.reset();
    if (type == "edit") {
      const page_list = `${API_URL}/donor-organization/${id}`;
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
      const page_list = `${API_URL}/donor-organization/${id}`;
      deleteData(page_list);
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
      Swal.fire({
        icon: "success",
        text: "Delete Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  // table column name

  const column = [
    {
      name: "Donor Organization Name",
      selector: (row: any) => row.donorOrganizationName,
      sortable: true,
    },
    {
      name: "Donor Organization Address",
      selector: (row: any) => row.donorOrganizationAddress,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.donorOrganizationRecStatus,
      cell: (row: any) => <>{col_value(row.donorOrganizationRecStatus)}</>,
      conditionalCellStyles: [
        {
          when: (row) => row.donorOrganizationRecStatus == "A",
          style: (row) => ({ color: "green" }),
        },

        {
          when: (row) => row.donorOrganizationRecStatus !== "A",
          style: (row) => ({ color: "red" }),
        },
      ],
      sortable: true,
    },
    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.donorOrganizationId)}</>
      ),
    },
  ];
  return (
    <>
      <Breadcrumb
        name1={"Donor Organization"}
        name2={"Donor Organization Setup"}
      />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form
          action="submit"
          className="bg-white rounded-2xl p-5 "
          onSubmit={handleSubmit}
        >
          <input
            type="hidden"
            name="componentId"
            value={singleData?.donorOrganizationId}
          />
          <div className="grid grid-cols-3 gap-4">
            {/* Donor Organization Name */}
            <div className="flex flex-col relative">
              <label
                htmlFor="donorOrganizationName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Donor Organization Name
              </label>
              <input
                name="donorOrganizationName"
                id="donorOrganizationName"
                defaultValue={singleData?.donorOrganizationName}
                type="text"
                placeholder="Name here"
                className="border p-4 rounded h-14"
                maxLength={50}
                required
                // value={formData.componentName}
                // onChange={handleInputChange}
              />
            </div>
            {/* Donor Organization Address */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="donorOrganizationAddress"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Donor Organization Address
              </label>
              <input
                required
                name="donorOrganizationAddress"
                id="donorOrganizationAddress"
                defaultValue={singleData?.donorOrganizationAddress}
                type="text"
                placeholder="Write Donor Organization Address here"
                className="border p-4 rounded-md h-14 text-sm"
                maxLength={50}
                // value={formData.donorOrganizationAddress}
                // onChange={handleInputChange}
              />
            </div>

            {/* Status */}
            <div className="flex flex-col justify-between relative">
              <label
                htmlFor="status"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Status
              </label>
              <div>
                <select
                  name="donorOrganizationRecStatus"
                  id="status"
                  className="w-full border p-4 rounded appearance-none h-14"
                >
                  <option value="" disabled>
                    Select
                  </option>
                  <option
                    value="A"
                    selected={singleData?.donorOrganizationRecStatus == "A"}
                  >
                    Active{" "}
                  </option>
                  <option
                    value="I"
                    selected={singleData?.donorOrganizationRecStatus == "I"}
                  >
                    Inactive
                  </option>
                </select>
              </div>
              <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none ml-80 mt-5">
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
          {/* Pass jsonData as props to AddButton */}
          {singleData ? <UpdateButton /> : <AddButton />}
        </form>
      </motion.div>
      <div className="mt-5 rounded-2xl shadow-xl ">
        <Table
          rows={data || []}
          column={column}
          getheaderColor={getheaderColor}
        />
      </div>
      {/* <SaveButton /> */}
    </>
  );
};

export default DonorOrganization;
