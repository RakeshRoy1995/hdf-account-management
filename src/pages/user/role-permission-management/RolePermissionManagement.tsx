import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import Swal from "sweetalert2";
import {treeData_roles } from "@/utils";
import { get_all_data } from "@/api/Reqest";
import SearchBtn from "@/shared/components/ButttonsCollection/SearchBtn";
import RolePermissionTree from "./RolePermissionTree";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const RolePermissionManagement = () => {
  const [role, setrole] = useState<any>([]);
  const [menu, setmenu] = useState<any>([]);

  const [searchApi, setsearchApi] = useState({});
  const {
    error,
    fetchData,
    deleteMsg,
    common_data,
    fetchDataCommon,
    setcommon_Data,
    singleData,
    setsearchData,
    searchData,
  } = useFetch(`${API_URL}/permission`);

  const role_list_api = async () => {
    const apiEndPoint = "role?currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setrole(ministry_List_Array);
  };

  const menu_list_api = async () => {
    const apiEndPoint = "menu/onlymainmenu";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setmenu(ministry_List_Array);
  };

  const fetchInitData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
    role_list_api();
    menu_list_api();
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

  const treeData = treeData_roles(searchData);


  return (
    <>
      <BreadcumbWithButton name={"Role Menu Permission"} url={"#"} />
      <div className="bg-white rounded-xl shadow-md p-10">
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Role
            </label>
            <select
              name="roleId"
              onChange={(e) => {
                setsearchApi({ ...searchApi, [e.target.name]: e.target.value });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">select</option>

              {role.map((d: any) => (
                <option value={d.roleId}>{d.name}</option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
              Module
            </label>
            <select
              name="menuIds"
              onChange={(e) => {
                setsearchApi({ ...searchApi, [e.target.name]: e.target.value });
              }}
              id=""
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm"
            >
              <option value="">select</option>

              {menu.map((d: any) => (
                <option value={d.id}>{d.name}</option>
              ))}
            </select>
          </div>
        </div>
        <SearchBtn
          params={searchApi}
          setsearchData={setsearchData}
          apiEndPoint={"menu/rolewisemenusubmenu"}
        />
        <div className="p-2">
          <RolePermissionTree treeData={treeData} searchApi={searchApi} />
        </div>
        
      </div>
    </>
  );
};

export default RolePermissionManagement;
