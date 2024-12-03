import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { groupBy } from "@/utils";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const RolePermissionAdd = () => {
  const [isEditMood, setIsEditMood] = useState<boolean>(true);



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
  } = useFetch(`${API_URL}/permission`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
      width : "10%"
    },
    {
      name: "title",
      selector: (row: any) => row.title,
      sortable: true,
    },

    {
      name: "url",
      selector: (row: any) => row.frontUrl,
      sortable: true,
    },

    {
      name: "method",
      selector: (row: any) => row.method,
      sortable: true,
      width : "10%"
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.permissionId)}</>,
      width : "20%"
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

    let page_list = `${API_URL}/permission`;
    let method = "POST";

    if (singleData?.permissionId) {
      page_list = `${API_URL}/permission/${singleData?.permissionId}`;
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
    setsingleData(null)
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/permission/${id}`;
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
      const page_list = `${API_URL}/permission/${id}`;
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

  const permission_grpBy = groupBy(data, "title");
  const permission_name_grpBy = groupBy(data, "name");

  console.log(`permission_name_grpBy`, singleData);

  return (
    <>
      <BreadcumbWithButton name={"Permission"} url={"#"} />
      <form
        onSubmit={handleSubmit}
        className={`${isEditMood ? "block" : "hidden"}`}
      >
        <div className="bg-white rounded-xl shadow-md p-10">
          {/* Sector Name */}

          <div className="col-span-3 mt-2 border-2 border-gray-50 p-3 rounded-xl">
            <label className="mb-5">Choose Name</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  defaultChecked={true}
                  onClick={(e: any) =>
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="name_choose"
                  id="name_choose"
                  value={"selection"}
                  type="radio"
                  className="mr-2 " // Use a custom class
                />
                Name selection from previous
              </label>
            </div>

            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  
                  onClick={(e: any) =>
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="name_choose"
                  id="name_choose"
                  type="radio"
                  value={"input"}
                  className="mr-2 " // Use a custom class
                />
                Create New Name
              </label>
            </div>
          </div>

          {singleData?.name_choose == "input" ? (
            <div className="flex flex-col relative mb-5 mt-3">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Name
              </label>
              <input
                name="name"
                id="projectName"
                type="text"
                placeholder="Write Sector name here"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.name}
              />
            </div>
          ) : (
            <div className="flex flex-col relative mb-5 mt-3">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                Name
              </label>
              <select
                name="name"
                id=""
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
              >
                <option
                  value=""
                >
                  select
                </option>


                {Object.keys(permission_name_grpBy).map((d: any) => (
                  <option value={d} selected={d == singleData?.name}>
                    {d}
                  </option>
                ))}

              </select>
            </div>
          )}

          <div className="col-span-3 mt-2 border-2 border-gray-50 p-3 rounded-xl">
            <label className="mb-5">Choose Title</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  defaultChecked={true}
                  onClick={(e: any) =>
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="title_choose"
                  id="title_choose"
                  value={"selection"}
                  type="radio"
                  className="mr-2 " // Use a custom class
                />
                Title selection from previous
              </label>
            </div>

            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  onClick={(e: any) =>
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  name="title_choose"
                  id="title_choose"
                  type="radio"
                  value={"input"}
                  className="mr-2 " // Use a custom class
                />
                Create New Title
              </label>
            </div>
          </div>

          {singleData?.title_choose == "input" ? (
            <div className="flex flex-col relative mt-3">
              <label
                htmlFor="Title"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Title
              </label>
              <input
                name="title"
                id="Title"
                className="border p-5 rounded "
                defaultValue={singleData?.title}
              />
            </div>
          ) : (
            <div className="flex flex-col relative mb-5 mt-3">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                Title
              </label>
              <select
                name="title"
                id="title"
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
              >
                {Object.keys(permission_grpBy).map((d: any) => (
                  <option value={d} selected={d == singleData?.title}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sector Code, Sector, and Status */}
          <div className="grid grid-cols-3 gap-4 mt-5">
            {/* Sector Code */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                Url
              </label>
              <input
                name="frontUrl"
                id="frontUrl"
                type="text"
                defaultValue={singleData?.frontUrl}
                placeholder="URL"
                className="rounded-md h-14 text-sm mt-1 block w-full p-5 border border-gray-300 shadow-sm"
              />
            </div>

            {/* Status */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                method
              </label>
              <select
                name="method"
                id=""
                className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
              >
                <option value="POST" selected={singleData?.method == "POST"}>
                  CREATE{" "}
                </option>
                <option value="GET" selected={singleData?.method == "GET"}>
                  LIST{" "}
                </option>
                <option value="PUT" selected={singleData?.method == "PUT"}>
                  UPDATE{" "}
                </option>
                <option
                  value="DELETE"
                  selected={singleData?.method == "DELETE"}
                >
                  DELETE
                </option>
              </select>
            </div>
          </div>

          {/* Add Button - Right Aligned */}
          {singleData?.permissionId ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
        </div>
      </form>

      <Table
        rows={data || []}
        column={column}
        getheaderColor={getheaderColor}
      />
    </>
  );
};

export default RolePermissionAdd;
