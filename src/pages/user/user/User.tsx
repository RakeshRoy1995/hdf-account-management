import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import { get_all_data, submitFormData } from "@/api/Reqest";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import Select from "react-select";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const User = () => {
  const [role, setrole] = useState<any>([]);
  const [user, setuser] = useState<any>([]);
  const [userDetails, setuserDetails] = useState<any>(null);
  const [trainerList, settrainerList] = useState<any>([]);
  const [traineeList, settraineeList] = useState<any>([]);

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
  } = useFetch(`${API_URL}/employee?currentPage=1&pageSize=10000`);

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
      name: "username",
      selector: (row: any) => row.username,
      sortable: true,
    },

    {
      name: "organization Type",
      selector: (row: any) => row.organizationType,
      sortable: true,
    },

    {
      name: "email",
      selector: (row: any) => row.email,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.userId, false, true, false)}</>
      ),
    },
  ];
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    let obj: any = {};
    const role = [];
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      if (key == "roleIds__") {
        role.push(value);
      }
      obj = { ...obj, [key]: value };
    }

    obj.roleIds = role;

    let page_list = `${API_URL}/user/create`;
    let method = "POST";

    if (singleData?.userId) {
      page_list = `${API_URL}/user/update/${singleData?.userId}`;
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

  const TRAINER_list_api = async () => {
    const apiEndPoint =
      "mcp-registrations?currentPage=1&recordStatus=A&pageSize=100000";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    settrainerList(ministry_List_Array);
  };

  const TRAINEE_list_api = async () => {
    const apiEndPoint =
      "participant?currentPage=1&pageSize=50000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    settraineeList(ministry_List_Array);
  };

  const role_list_api = async (type: any) => {
    const apiEndPoint =
      "role?organizationType=" +
      type +
      "&currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data;
    setrole(ministry_List_Array);
  };

  const user_list_api = async () => {
    const apiEndPoint = "user?currentPage=1&pageSize=100000000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List?.data?.content;
    setuser(ministry_List_Array);
  };

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      // const form: any = document.querySelector("form");
      // form.reset();
      const page_list = `${API_URL}/user/by/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data }: any = await submitFormData( page_list , options );
      role_list_api(data.organizationType)
      if (data.organizationType == "TRAINER") {
        TRAINER_list_api()
      } if (data.organizationType == "TRAINEE") {
        TRAINEE_list_api()
      }

   

      console.log(`data`, data);
      setsingleData(data)

      // fetchSingleDataCommonByID(page_list, options);
      // setrender(true);
    }
  };

  const fetchInitData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
    // role_list_api();
    user_list_api();
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
      <BreadcumbWithButton name={"User"} url={"#"} />

      <form
        action="submit"
        className="p-4 space-y-6 shadow-lg rounded-xl bg-white"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col relative">
            <label
              htmlFor="type"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Organization type
            </label>

            <select
              name="organizationType"
              value={singleData?.organizationType}
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });

                role_list_api(e.target.value);

                if (e.target.value == "TRAINER") {
                  TRAINER_list_api();
                }

                if (e.target.value == "TRAINEE") {
                  TRAINEE_list_api();
                }
              }}
            >
              <option value={""}>Select Organization type</option>
              <option value={"PMU"}>PMU</option>
              <option value={"PO"}>PO</option>
              <option value={"BRANCH"}>Branch</option>
              <option value={"TRAINER"}>Trainer</option>
              <option value={"TRAINEE"}>Trainee</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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

          {(singleData?.organizationType == "PMU" ||
            singleData?.organizationType == "PO" ||
            singleData?.organizationType == "BRANCH") && (
            <div className="flex flex-col relative">
              <label
                htmlFor="employeeId"
                className="z-10 text-sm absolute mt-2 ml-6 -mb-4 bg-white text-QuaternaryColor"
              >
                Employee
              </label>
              <Select
                name="employeeId"
                onChange={(e: any) => {
                  const details = data?.content.find(
                    (d: any) => d.employeeId == e.value,
                  );
                  setuserDetails(details);

                  setsingleData({
                    ...singleData,
                    ["employeeId"]: e.value,
                    ["name"]: details?.firstName + " " + details?.lastName,
                    ["phone"]: details?.phone,
                  });
                }}
                className=" p-4 rounded-md h-14 text-sm"
                value={data?.content?.map((m_d: any) => {
                  if (
                    singleData?.employeeId &&
                    singleData?.employeeId == m_d.employeeId
                  ) {
                    return {
                      label: m_d.firstName + " " + m_d.lastName,
                      value: m_d.employeeId,
                    };
                  }
                })}
                options={data?.content?.map((m_d: any) => {
                  return {
                    label: m_d.firstName + " " + m_d.lastName,
                    value: m_d.employeeId,
                  };
                })}
              />
            </div>
          )}

          {singleData?.organizationType == "TRAINEE" && (
            <div className="flex flex-col relative">
              <label
                htmlFor="participantId"
                className="z-10 text-sm absolute  ml-4 -mb-4 bg-white text-QuaternaryColor"
              >
                TRAINEE
              </label>
              <Select
                name="participantId"
                onChange={(e: any) => {
                  const details = traineeList.find(
                    (d: any) => d.participantId == e.value,
                  );
                  setuserDetails(details);

                  setsingleData({
                    ...singleData,
                    ["participantId"]: e.value,
                    ["name"]: details?.partName,
                    ["phone"]: details?.partMobileNo,
                  });
                }}
                className=" p-4 rounded-md h-14 text-sm"
                value={traineeList?.map((m_d: any) => {
                  if (
                    singleData?.participantId &&
                    singleData?.participantId == m_d.participantId
                  ) {
                    return {
                      label: m_d.partName,
                      value: m_d.participantId,
                    };
                  }
                })}
                options={traineeList?.map((m_d: any) => {
                  return {
                    label: m_d.partName,
                    value: m_d.participantId,
                  };
                })}
              />
            </div>
          )}

          {singleData?.organizationType == "TRAINER" && (
            <div className="flex flex-col relative">
              <label
                htmlFor="employeeId"
                className="z-10 text-sm absolute  ml-4 -mb-4 bg-white text-QuaternaryColor"
              >
                TRAINER
              </label>
              <Select
                name="mcpRegistrationId"
                onChange={(e: any) => {
                  const details = trainerList.find(
                    (d: any) => d.mcpRegistrationId == e.value,
                  );
                  setuserDetails(details);

                  setsingleData({
                    ...singleData,
                    ["mcpRegistrationId"]: e.value,
                    ["name"]: details?.mcpName,
                    ["phone"]: details?.mcpMobile,
                    ["email"]: details?.mcpEmail,
                  });
                }}
                className=" p-4 rounded-md h-14 text-sm"
                value={trainerList?.map((m_d: any) => {
                  if (
                    singleData?.mcpRegistrationId &&
                    singleData?.mcpRegistrationId == m_d.mcpRegistrationId
                  ) {
                    return {
                      label: m_d.mcpName,
                      value: m_d.mcpRegistrationId,
                    };
                  }
                })}
                options={trainerList?.map((m_d: any) => {
                  return {
                    label: m_d.mcpName,
                    value: m_d.mcpRegistrationId,
                  };
                })}
              />
            </div>
          )}

          <div className="flex flex-col relative">
            <label
              htmlFor="name"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Name
            </label>
            <input
              required
              maxLength={50}
              name="name"
              id="name"
              value={singleData?.name}
              type="text"
              placeholder="Name here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="username"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Username
            </label>
            <input
              required
              maxLength={50}
              name="username"
              id="username"
              defaultValue={singleData?.username}
              type="text"
              placeholder="Username here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="phone"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Phone
            </label>
            <input
              required
              maxLength={50}
              name="phone"
              id="phone"
              value={singleData?.phone}
              type="text"
              placeholder="Phone here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="email"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Email
            </label>
            <input
              required
              maxLength={50}
              name="email"
              id="email"
              defaultValue={singleData?.email}
              type="text"
              placeholder="Email here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="password"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Password
            </label>
            <input
              required
              maxLength={50}
              name="password"
              id="password"
              defaultValue={singleData?.password}
              type="password"
              placeholder="Password here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="confirmPassword"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Confirm Password
            </label>
            <input
              required
              maxLength={50}
              name="confirmPassword"
              id="confirmPassword"
              // onChange={(e) =>
              //   setcheckObj({ ...checkObj, [e.target.name]: e.target.value })
              // }
              defaultValue={singleData?.confirmPassword}
              type="password"
              placeholder="phone here"
              className="border p-4 rounded h-14"
            />
          </div>

          <div className="flex flex-col relative">
            <label
              htmlFor="roleIds"
              className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
            >
              Role
            </label>
            <Select
              isMulti
              name="roleIds__"
              className=" p-4 rounded-md h-14 text-sm"
              closeMenuOnSelect={false}
              onChange={(e: any) => {
                const roles = e.map((d: any) => {
                  return d.value;
                });
                setsingleData({
                  ...singleData,
                  ["roles"]: roles,
                });
              }}
              value={role?.map((m_d: any) => {
                if (
                  singleData?.roles?.length &&
                  singleData?.roles.find(
                    (rol: any) => rol == m_d.roleId || rol.roleId == m_d.roleId,
                  )
                ) {
                  return {
                    label: m_d.name,
                    value: m_d.roleId,
                  };
                }
              })}
              options={role?.map((m_d: any) => {
                return {
                  label: m_d.name,
                  value: m_d.roleId,
                };
              })}
            />
          </div>

          <div className="flex flex-col relative">
            <label className="block  font-normal text-gray-700 text-sm  absolute -mt-1 ml-4 mb-2 bg-white">
              Status
            </label>
            <select
              data-tooltip="Select Project Status"
              name="empRecStatus"
              id="empRecStatus"
              className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
            >
              <option value="A" selected={singleData?.empRecStatus == "A"}>
                Active
              </option>
              <option value="I" selected={singleData?.empRecStatus == "I"}>
                Inactive
              </option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
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
        <div className="flex justify-end gap-4 mt-10">
          {singleData?.userId ? (
            <UpdateButton setsingleData={setsingleData} loading={loading} />
          ) : (
            <AddButton setsingleData={setsingleData} loading={loading} />
          )}
        </div>
      </form>

      <Table
        rows={user || []}
        column={column}
        getheaderColor={getheaderColor}
      />
    </>
  );
};

export default User;
