import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const AddComponent = () => {
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
  } = useFetch(`${API_URL}/component`);

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

    let page_list = `${API_URL}/component`;
    let method = "POST";

    if (singleData?.componentId) {
      page_list = `${API_URL}/component/${singleData?.componentId}`;
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
    // const form: any = document.querySelector("form");
    // form.reset();
    if (type == "edit") {
      const page_list = `${API_URL}/component/${id}`;
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
      const page_list = `${API_URL}/component/${id}`;
      deleteData(page_list);
    }
    setrender(true);
    setaddFormShow(true);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
      fetchData();
      setcommon_Data(null);
      setsingleData(null);
      const form: any = document.querySelector("form");
      form.reset();
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
      name: "Code",
      selector: (row) => row.componentCode,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.componentName,
      sortable: true,
    },

    {
      name: " Is Trainee",
      selector: (row) => (row.componentIsTrainee ? "Yes" : "No"),
      sortable: true,
    },

    {
      name: "action",
      value: "componentId",
      onclickEvt: fetchDataByID,
      cell: (row) => <div>{ActionButton(fetchDataByID, row?.componentId)}</div>,
    },
  ];

  return (
    <>
      {/* <Breadcrumb name1={"Component"} name2={" Component Setup"} /> */}
      {addFormShow ? (
        <Breadcrumb name1={"Component"} name2={"Component"} />
      ) : (
        <BreadcumbWithButton
          name={"Component"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {addFormShow && (
          <form
            action="submit"
            className="bg-white rounded-2xl p-5 drop-shadow-lg"
            onSubmit={handleSubmit}
          >
            <input
              type="hidden"
              name="componentId"
              value={singleData?.componentId}
            />
            <div className="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
              {/* Component Code */}
              <div className="flex flex-col relative mb-5">
                <label
                  htmlFor="componentCode"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                >
                  Component Code<span className="required_field">*</span>
                </label>
                <input
                  name="componentCode"
                  id="componentCode"
                  defaultValue={singleData?.componentCode}
                  type="text"
                  placeholder="000"
                  className="border p-4 rounded-md h-14 text-sm"
                  maxLength={3}
                  required
                />
              </div>
              {/* Component Name */}
              <div className="flex flex-col relative">
                <label
                  htmlFor="componentName"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Component Name<span className="required_field">*</span>
                </label>
                <input
                  name="componentName"
                  id="componentName"
                  defaultValue={singleData?.componentName}
                  type="text"
                  placeholder="Component Name here"
                  className="border p-4 rounded h-14"
                  maxLength={50}
                  required
                />
              </div>

              {/* Component Trainee */}
              <div className="flex flex-col relative border-2 border-gray-100 h-14">
                <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                  Is Component Trainee?<span className="required_field">*</span>
                </label>
                <div className="flex justify-around">
                  {/* True */}
                  <label className="flex items-center mr-4">
                    <input
                      required
                      type="radio"
                      name="componentIsTrainee"
                      value="true"
                      onChange={() =>
                        setsingleData({
                          ...singleData,
                          componentIsTrainee: true,
                        })
                      }
                      id="true"
                      className="border p-4 rounded-md h-14 text-sm mr-1"
                      checked={singleData?.componentIsTrainee === true}
                    />
                    True
                  </label>

                  {/* False */}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="componentIsTrainee"
                      value="false"
                      onChange={() =>
                        setsingleData({
                          ...singleData,
                          componentIsTrainee: false,
                        })
                      }
                      id="false"
                      className="border p-4 rounded-md h-14 text-sm mr-1"
                      checked={singleData?.componentIsTrainee === false}
                    />
                    False
                  </label>
                </div>
              </div>

              {/* Status */}
              <div className="flex flex-col justify-between relative">
                <label
                  htmlFor="status"
                  className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Status<span className="required_field">*</span>
                </label>
                <div>
                  <select
                    name="componentRecStatus"
                    id="status"
                    className="w-full border p-4 rounded appearance-none h-14"
                  >
                    <option
                      value="A"
                      selected={singleData?.componentRecStatus == "A"}
                    >
                      Active{" "}
                    </option>
                    <option
                      value="I"
                      selected={singleData?.componentRecStatus == "I"}
                    >
                      Inactive
                    </option>
                  </select>
                </div>
                <DropDownIcon />
              </div>
            </div>
            {/* Pass jsonData as props to AddButton */}
            <div className="flex justify-end gap-4 mt-10">
              {singleData?.componentId ? (
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
      </motion.div>
    </>
  );
};

export default AddComponent;
