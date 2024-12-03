import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Select from "react-select";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { get_all_data } from "@/api/Reqest";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const MenuPage = () => {
  const [isEditMood, setIsEditMood] = useState<boolean>(true);
  const [permission, setpermission] = useState<any>([]);

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
  } = useFetch(`${API_URL}/menu`);

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
      name: "route",
      selector: (row: any) => row.route,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.id)}</>
      ),
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    const parent: any = {};
    const permissionIds = []
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      
      if (key=="permissionId") {
        permissionIds.push(value)
      } else{
        obj = { ...obj, [key]: value };
      }

    }

    obj.permissionIds = permissionIds

    let page_list = `${API_URL}/menu`;
    let method = "POST";

    if (singleData?.id) {
      page_list = `${API_URL}/menu/${singleData?.id}`;
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
      const page_list = `${API_URL}/menu/${id}`;
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
      const page_list = `${API_URL}/menu/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const ministry_List_API = async () => {
    const apiEndPoint = "permission";
    const response_ministry_List = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setpermission(ministry_List_Array);
    // console.log('ministry_List_Array', ministry_List_Array);
  };

  const fetchInitData = async () => {
    fetchData();
    ministry_List_API();
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

  console.log(`singleData`, singleData);

  return (
    <>
      <BreadcumbWithButton name={"Menu"} url={"#"} />
      <form
        onSubmit={handleSubmit}
        className={`${isEditMood ? "block" : "hidden"}`}
      >
        <input type="hidden" name="id" value={singleData?.id} />
        <div className="bg-white rounded-xl shadow-md p-10">
          {/* Sector Name */}
          <div className="grid grid-cols-2  relative mb-5">
            <div className="flex flex-col relative p-1">
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
                required
                placeholder="Name"
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.name}
              />
            </div>

            <div className="flex flex-col relative p-1">
              <label
                htmlFor="parent"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Parent
              </label>

              <Select
                name="parentId"
                className=" p-4 rounded-md h-14 text-sm"
                value={ data?.map((m_d: any) => {
                  if (singleData?.parentId == m_d.id) {
                    return {
                      label: m_d.name,
                      value: m_d.id,
                    };
                  }
                  
                }) }
                onChange={(e:any)=> {
                  setsingleData({...singleData, ['parentId']: e.value  })
                }  }
                options={
                data?.map((m_d: any) => {
                  return {
                    label: m_d.name,
                    value: m_d.id,
                  };
                })
              
              }
              />
            </div>
          </div>

          <div className="grid grid-cols-2  relative mb-5">
            <div className="flex flex-col relative p-1">
              <label
                htmlFor="projectName"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Permission
              </label>
              <Select
                isMulti
                name="permissionId"
                className=" p-4 rounded-md h-14 text-sm"
                closeMenuOnSelect={false}
                onChange={(e:any)=> {
                  const permissionIds = e.map((d:any)=> {  return d.value  } )
                  setsingleData({...singleData, ['permissionIds']: permissionIds  })
                }  }
                value={
                  permission?.map((m_d: any) => {
                    if (singleData?.permissionIds?.length && singleData?.permissionIds.includes(m_d.permissionId)) {
                      return {
                        label: m_d.title + " - " + m_d.name,
                        value: m_d.permissionId,
                      };
                    }
                    
                  })

                }
                options={permission?.map((m_d: any) => {
                  return {
                    label: m_d.title + " - " + m_d.name,
                    value: m_d.permissionId,
                  };
                })}
              />
            </div>

            <div className="flex flex-col relative p-1">
              <label
                htmlFor="route"
                className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
              >
                Route
              </label>
              <input
                name="route"
                id="route"
                placeholder="Route"
                required
                className="border p-4 rounded-md h-14 text-sm"
                defaultValue={singleData?.route}
              />
            </div>
          </div>

          {/* Sector Description */}

          <div className="flex flex-col w-1/2 relative">
            
          </div>

          {/* <div className="flex flex-col w-1/2 relative">
            <label
              htmlFor="neqNo"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Sequence Number
            </label>
            <textarea
              name="neqNo"
              id="neqNo"
              placeholder="Sequence Number"
              required
              className="border p-5 rounded h-24 resize-none"
              defaultValue={singleData?.neqNo}
            />
          </div> */}

          {/* Add Button - Right Aligned */}
          {singleData?.id ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
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

export default MenuPage;
