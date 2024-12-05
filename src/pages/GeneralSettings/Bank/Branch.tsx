import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import useFetch from "@/hooks/useFetch";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { col_value } from "@/shared/Table/utils";
import ActionButton from "@/shared/Table/ActionButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";

import { motion } from "framer-motion";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function Branch() {
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
    addFormShow,
    setaddFormShow,
  } = useFetch(`${API_URL}/banks`);

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
    setrender(true);
    setaddFormShow(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    if (type == "delete") {
      const page_list = `${API_URL}/banks/${id}`;
      deleteData(page_list);
      fetchData();
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
      setaddFormShow(false);
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
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
        text: error?.data?.message || error,
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
  // console.log(`data`, data, loading, error);
  // console.log(`common_data`, singleData);

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
  return (
    <>
      {addFormShow ? (
        <Breadcrumb name1={"Branch"} name2={"Branch Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Branch"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-5">
          {addFormShow && (
            <form className="bg-white rounded-2xl p-5 drop-shadow-lg" onSubmit={handleSubmit}>
              {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">

                {/* Bank */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="bank_branch_id"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Bank
                  </label>
                  <select
                    id="bank_branch_id"
                    name="bank_branch_id"
                    className="w-full border p-4 rounded appearance-none h-14"
                  >
                    <option
                      value="A"
                      selected={singleData?.bank_branch_id == "A"}
                    >
                      Sonali Bank{" "}
                    </option>
                    <option
                      value="I"
                      selected={singleData?.bank_branch_id == "I"}
                    >
                      Krishi Bank
                    </option>
                  </select>
                  <DropDownIcon />
                </div>

                {/* Branch Name */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="branch_name"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Branch Name
                  </label>
                  <input
                    id="branch_name"
                    type="text"
                    name="bankName"
                    defaultValue={singleData?.branch_name}
                    className="border p-4 rounded h-14"
                    placeholder="Branch Name here"
                    maxLength={20}
                  />
                </div>
                {/* Routing No*/}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="routing_number"
                    className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
                  >
                    Routing Number
                  </label>
                  <input
                    id="routing_number"
                    type="text"
                    name="bankDescription"
                    defaultValue={singleData?.routing_number}
                    placeholder="Routing Number here"
                    className="w-full border p-4 rounded h-14 text-sm"
                    maxLength={200}
                  />
                </div>

                {/* Swift Code*/}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="swift_code"
                    className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
                  >
                    Swift Code
                  </label>
                  <input
                    id="swift_code"
                    type="text"
                    name="bankDescription"
                    defaultValue={singleData?.swift_code}
                    placeholder="Swift Code here"
                    className="w-full border p-4 rounded h-14 text-sm"
                    maxLength={200}
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
                    className="w-full border p-4 rounded appearance-none h-14"
                  >
                    <option
                      value="A"
                      selected={singleData?.bankRecStatus == "A"}
                    >
                      Active{" "}
                    </option>
                    <option
                      value="I"
                      selected={singleData?.bankRecStatus == "I"}
                    >
                      Inactive
                    </option>
                  </select>
                  <DropDownIcon />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-10">
                {singleData ? (
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
              </div>
            </form>
          )}

          <div className="mt-5">
            <Table
              rows={data || []}
              column={column}
              getheaderColor={getheaderColor}
            />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default Branch;
