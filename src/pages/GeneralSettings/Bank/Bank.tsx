import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import { motion } from "framer-motion";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import React, { useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import { col_value } from "@/shared/Table/utils";
import ActionButton from "@/shared/Table/ActionButton";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function Bank() {
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
  } = useFetch(`${API_URL}/banks`);

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const page_list = `${API_URL}/banks/${id}`;
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
      const page_list = `${API_URL}/banks/${id}`;
      deleteData(page_list);
    }
    console.log(`id`, id, type);
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

  const column = [
    {
      name: "Bank Name",
      selector: (row: any) => row.bankName,
      sortable: true,
    },
    {
      name: "Bank Description",
      selector: (row: any) => row.bankDescription,
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: any) => row.bankRecStatus,
      cell: (row: any) => <>{col_value(row.bankRecStatus)}</>,
      conditionalCellStyles: [
        {
          when: (row) => row.bankRecStatus == "A",
          style: (row) => ({ color: "green" }),
        },

        {
          when: (row) => row.bankRecStatus !== "A",
          style: (row) => ({ color: "red" }),
        },
      ],
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.bankId)}</>,
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

    let page_list = `${API_URL}/banks`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/banks/${singleData?.bankId}`;
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

  console.log(`bank`, data);
  return (
    <>
      <BreadcumbWithButton name={"Bank "} url={"/bank-add"} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form
          className="bg-white rounded-2xl p-5 drop-shadow-lg"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="bankId" value={singleData?.bankId} />
          {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
          <div className="grid grid-cols-3 gap-4">
           
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="dateOfEffectiveness"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Bank Name
              </label>
              <input
                id="dateOfEffectiveness"
                type="text"
                name="bankName"
                defaultValue={singleData?.bankName}
                // value={dateOfEffectiveness}
                // onChange={(e) => setDateOfEffectiveness(e.target.value)}
                className="border p-4 rounded h-14"
                placeholder="Sample Name here"
              />
            </div>
          </div>
          {/* Project Name */}
          <div className="flex flex-col relative mb-5 ">
            <label
              htmlFor="projectName"
              className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
            >
              Description
            </label>
            <input
              id="projectName"
              type="text"
              name="bankDescription"
              defaultValue={singleData?.bankDescription}
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
              name="bankRecStatus"
              // value={implementingMinistry}
              // onChange={(e) => setImplementingMinistry(e.target.value)}
              className="w-1/4 border p-4 rounded appearance-none h-14"
            >
              <option value="A" selected={singleData?.bankRecStatus == "A"}>
                Active{" "}
              </option>
              <option value="I" selected={singleData?.bankRecStatus == "I"}>
                Inactive
              </option>
            </select>
            <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none ml-56 mt-5">
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
          {singleData ? <UpdateButton /> : <AddButton />}
        </form>
      </motion.div>
      <Table rows={data || []} column={column} />
    </>
  );
}

export default Bank;
