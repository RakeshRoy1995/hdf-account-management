import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import { col_value } from "@/shared/Table/utils";
import ActionButton from "@/shared/Table/ActionButton";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { get_all_data } from "@/api/Reqest";
import Location from "@/shared/location/Location";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function Branch() {
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
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/bank-branches`);

  const [bank, setBank] = useState<any>([]);

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const page_list = `${API_URL}/bank-branches/${id}`;
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
      const page_list = `${API_URL}/bank-branches/${id}`;
      deleteData(page_list);
    }
    setaddFormShow(true);
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
      setaddFormShow(false);
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

  const bankName = (id:any) => {
    const banks_name = bank.find((bnk:any)=>   bnk.bankId == id)
    return banks_name?.bankName
  };

  const column = [
    {
      name: "Bank",
      selector: (row: any) => bankName(row.bankId),
      sortable: true,
    },
    {
      name: "Branch",
      selector: (row: any) => row.branchName,
      sortable: true,
    },
    {
      name: "Routing",
      selector: (row: any) => row.routingNumber,
      sortable: true,
    },

    {
      name: "Swift Code",
      selector: (row: any) => row.swiftCode,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.bankBranchId)}</>,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {
      address : {}
    };
    for (const [key, value] of formData) {
      console.log(key, ":", value);

      if (key.startsWith("location.")) {
        const locationKey = key.split(".")[1];
        obj.address[locationKey] = value;
      }else{

        obj = { ...obj, [key]: value };
      }

      
    }

    let page_list = `${API_URL}/bank-branches`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/bank-branches/${singleData?.bankId}`;
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

  const bank_list_api = async () => {
    const apiEndPoint = "banks";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setBank(ministry_List_Array?.data);
  };

  useEffect(() => {
    bank_list_api();
  }, []);

  console.log(`bank`, singleData);
  return (
    <div>
      {addFormShow ? (
        <Breadcrumb name1={"Branch"} name2={"Branch Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Branch"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      {/* <BreadcumbWithButton name={"Bank "} url={"/bank-add"} /> */}
      {addFormShow && (
        <form
          className="bg-white rounded-2xl p-5 drop-shadow-lg mb-5"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="bankId" value={singleData?.bankId} />
          {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Date */}

            <div className="flex flex-col relative ">
              <label
                htmlFor="bankId"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Bank
              </label>
              <select
                id="bankId"
                name="bankId"
                value={singleData?.bankId}
                // onChange={(e) => setImplementingMinistry(e.target.value)}
                className="border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>

                {bank.map((bnk: any) => (
                  <option value={bnk.bankId}>{bnk.bankName} </option>
                ))}
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
            {/* Branch Name */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="branchName"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Branch Name
              </label>
              <input
                id="branchName"
                type="text"
                name="branchName"
                defaultValue={singleData?.branchName}
                // value={dateOfEffectiveness}
                // onChange={(e) => setDateOfEffectiveness(e.target.value)}
                className="border p-4 rounded h-14"
                placeholder="Branch Name here"
              />
            </div>

            {/* Swift Code */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="swiftCode"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Swift Code
              </label>
              <input
                id="swiftCode"
                type="text"
                name="swiftCode"
                defaultValue={singleData?.swiftCode}
                className="border p-4 rounded h-14"
                placeholder="Swift Code here"
              />
            </div>

            {/* Routing No */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="routingNumber"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Swift Code
              </label>
              <input
                id="routingNumber"
                type="text"
                name="routingNumber"
                defaultValue={singleData?.routingNumber}
                className="border p-4 rounded h-14"
                placeholder="Routing Number here"
              />
            </div>
          </div>

          <Location singleData={singleData} setsingleData={setsingleData} />

          {singleData?.bankBranchId ? (
            <UpdateButton
              setsingleData={setsingleData}
              loading={loading}
              setaddFormShow={setaddFormShow}
            />
          ) : (
            <AddButton
              setsingleData={setsingleData}
              loading={loading}
              setaddFormShow={setaddFormShow}
            />
          )}
        </form>
      )}
      <Table rows={data || []} column={column} />
    </div>
  );
}

export default Branch;
