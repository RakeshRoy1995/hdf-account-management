import React from "react";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { customeMaxLength, popupmsg } from "@/utils";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export const PaymentVoucher = () => {
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
  } = useFetch(`${API_URL}/currencies`);

  const column = [
    {
      name: "Currency Name",
      selector: (row: any) => row.currencyName,
      sortable: true,
    },
    {
      name: "Currency Symbol",
      selector: (row: any) => row.currencySymbol,
      sortable: true,
    },
    {
      name: "Currency Decimal Places",
      selector: (row: any) => row.currencyDecimalPlaces,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.currencyRecStatus,
      cell: (row: any) => <>{col_value(row.currencyRecStatus)}</>,
      conditionalCellStyles: [
        {
          when: (row) => row.currencyRecStatus == "A",
          style: (row) => ({ color: "green" }),
        },

        {
          when: (row) => row.currencyRecStatus !== "A",
          style: (row) => ({ color: "red" }),
        },
      ],
      sortable: true,
    },
    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.currencyId)}</>,
    },
  ];

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

    let page_list = `${API_URL}/currencies`;
    let method = "POST";

    if (singleData?.currencyId) {
      page_list = `${API_URL}/currencies/${singleData?.currencyId}`;
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

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      const form: any = document.querySelector("form");
      form.reset();
      const page_list = `${API_URL}/currencies/${id}`;
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
      const page_list = `${API_URL}/currencies/${id}`;
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
      console.log("common_data", common_data?.currencyName);

      popupmsg(common_data?.currencyName, "submitted");
      //show success message
      // Swal.fire({
      //     icon: "success",
      //     text: `${common_data?.dptName} has been added successfully `,
      //     confirmButtonText: "Close",
      // });
      const form: any = document.querySelector("form");
      form.reset();
      setsingleData(null);
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
      <Breadcrumb name1={"Payment Voucher"} name2={"Payment Voucher"} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5">
          <div className="grid grid-cols-2 gap-5">
            {/* Financier */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="implementingMinistry"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Financier<span className="required_field">*</span>
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  GOB{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/* Sub Sub Component */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="implementingMinistry"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Sub Sub Component<span className="required_field">*</span>
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  GOB{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
              <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[450px] mt-5">
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

            {/*  Sub Component */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Sub Component
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Component */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Component
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Cost Center */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Cost Center
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Voucher No */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Voucher No
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Voucher Date */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Voucher Date
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="date"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Pay To */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Pay To
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  Credit */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Credit
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Debit */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Debit
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Cheque No */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Cheque No
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Village */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Village
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Producer Group */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Producer Group
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Employee */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Employee
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            {/*  Amount */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Amount
              </label>
              <input
                name="currencyCode"
                required
                id="currencyCode"
                type="text"
                placeholder="Write Currency Code"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.currencyCode}
                onInput={(e) => {
                  customeMaxLength(e, 3);
                }}
              />
            </div>

            {/*  NJCS */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                NJCS
              </label>
              <select
                id="currencyRecStatus"
                name="currencyRecStatus"
                required
                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
              >
                <option
                  value="A"
                  selected={singleData?.currencyRecStatus == "A"}
                >
                  Selete{" "}
                </option>
                <option
                  value="I"
                  selected={singleData?.currencyRecStatus == "I"}
                >
                  Inactive
                </option>
              </select>
            </div>

            <div className="relative mb-5">
              <div className="flex items-center space-x-1 ">
                <input
                  className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                  type="checkbox"
                  name="glIsSubsidiary"
                />
                <p className="leading-6">Advance to Employee</p>
              </div>
            </div>

            <div className="relative mb-5">
              <div className="flex items-center space-x-1 ">
                <input
                  className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                  type="checkbox"
                  name="glIsSubsidiary"
                />
                <p className="leading-6">Has Bill Info?</p>
              </div>
            </div>

            <div className="relative mb-5">
              <div className="flex items-center space-x-1 ">
                <input
                  className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                  type="checkbox"
                  name="glIsSubsidiary"
                />
                <p className="leading-6">Is (vat/tax) paid by party?</p>
              </div>
            </div>

            <div className="relative mb-5">
              <div className="flex items-center space-x-1 ">
                <input
                  className="w-4 h-4 rounded-full border-gray-400 accent-[#ffcc1d]"
                  type="checkbox"
                  name="glIsSubsidiary"
                />
                <p className="leading-6">Add Vendor</p>
              </div>
            </div>



            <div className="relative mb-5">
                <button type="button" className="flex justify-center items-center bg-primaryColor font-bold text-sm text-white rounded-lg px-5 gap-2 py-3">Add to Grid + </button>
            </div>

          </div>
          {/* Add Button - Right Aligned */}
          <div className="">
            {singleData ? (
              <UpdateButton setsingleData={setsingleData} loading={loading} />
            ) : (
              <AddButton setsingleData={setsingleData} loading={loading} />
            )}
          </div>
        </form>
        <div className="mt-5 rounded-2xl shadow-xl ">
          <Table
            rows={data || []}
            column={column}
            getheaderColor={getheaderColor}
          />
        </div>
      </motion.div>
    </>
  );
};

export default PaymentVoucher;
