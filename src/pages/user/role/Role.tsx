import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const Role = () => {
  const [isEditMood, setIsEditMood] = useState<boolean>(true);

  const handleCancel = () => {
    setIsEditMood(!isEditMood);
  };

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
  } = useFetch(`${API_URL}/role`);

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const column = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.roleId, false, true, false)}</>
      ),
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

    let page_list = `${API_URL}/role`;
    let method = "POST";

    if (singleData?.roleId) {
      page_list = `${API_URL}/role/${singleData?.roleId}`;
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
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/role/${id}`;
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
      const page_list = `${API_URL}/role/${id}`;
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
      <BreadcumbWithButton name={"Role"} url={"/#"} />
      <form
        onSubmit={handleSubmit}
        className={`${isEditMood ? "block" : "hidden"}`}
      >
        <input type="hidden" name="id" value={singleData?.id} />
        <div className="bg-white rounded-xl shadow-md p-10">
          {/* Sector Name */}
          <div className="flex flex-col relative mb-5">
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
              placeholder="Write name here"
              className="border p-4 rounded-md h-14 text-sm"
              defaultValue={singleData?.name}
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
              <option value={"TRAINER"}>TRAINER</option>
              <option value={"TRAINEE"}>TRAINEE</option>
            </select>
          </div>

          {/* Sector Description */}
          <div className="flex flex-col relative">
            <label
              htmlFor="description"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="border p-5 rounded h-24 resize-none"
              defaultValue={singleData?.description}
            />
          </div>

          {/* Add Button - Right Aligned */}
          {singleData?.roleId ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
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

export default Role;
