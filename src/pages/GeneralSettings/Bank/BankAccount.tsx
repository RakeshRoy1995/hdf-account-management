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
import { get_all_data, submitFormData } from "@/api/Reqest";
import Select from "react-select";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const authToken = localStorage.getItem("customer_login_auth") || "";
const token_user: any = authToken ? JSON.parse(authToken) : "";

function BankAccount() {
  const [render, setrender] = useState(true);
  const [partner, setpartner] = useState<any>([]);
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
  } = useFetch(`${API_URL}/bank-accounts`);

  const [branch, setbranch] = useState<any>([]);
  const [currency, setcurrency] = useState<any>([]);
  const [GL, setGL] = useState<any>([]);
  const [user, setuser] = useState<any>([]);

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

    let page_list = `${API_URL}/bank-accounts`;
    let method = "POST";

    if (singleData?.bankAccountId) {
      page_list = `${API_URL}/bank-accounts/${singleData?.bankAccountId}`;
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
      const page_list = `${API_URL}/bank-accounts/${id}`;
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
      const page_list = `${API_URL}/bank-accounts/${id}`;
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




  const branchName = (id: any) => {
    const branch_name = branch.find((bnk: any) => bnk.bankBranchId == id);
    return branch_name?.branchName;
  };

  const GLAccountName = (id: any) => {
    const gl_name = GL.find((bnk: any) => bnk.glId == id);
    return gl_name?.glAccountName + " - " + gl_name?.glAccountNo;
  };

  const column = [
    {
      name: "Branch Name",
      selector: (row: any) => branchName(row.bankBranchId),
      sortable: true,
    },

    {
      name: "Account",
      selector: (row: any) => row.accountNumber + " - " + row.accountName,
      sortable: true,
    },

    {
      name: "Type",
      selector: (row: any) => row.accountType,
      sortable: true,
    },

    {
      name: "GL Account",
      selector: (row: any) => GLAccountName(row.bankAccountGLId),
      sortable: true,
    },

    {
      name: "GL Account Charge",
      selector: (row: any) => GLAccountName(row.bankChangeGLId),
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.bankAccountId)}</>,
    },
  ];

  const bank_list_api = async () => {
    const apiEndPoint = "bank-branches";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setbranch(ministry_List_Array?.data);
  };

  const bankAccountGL = async () => {
    const apiEndPoint = "bank-branches";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setbranch(ministry_List_Array?.data);
  };

  const partner_list_api = async () => {
    const apiEndPoint =
      "partner-organization?currentPage=1&pageSize=1000&recordStatus=A";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setpartner(ministry_List_Array?.data?.content);
  };

  const currency_list_api = async () => {
    const apiEndPoint = "currencies";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setcurrency(ministry_List_Array?.data);
  };

  const gl_list_api = async () => {
    const apiEndPoint = "glAccount/getActiveGl";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setGL(ministry_List_Array?.data);
  };

  const user_list_api = async () => {
    const page_list = `${API_URL}/user?currentPage=1&pageSize=1000`;
    const options = {
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const { data }: any = await submitFormData(page_list, options);
    setuser(data?.content);
  };

  useEffect(() => {
    bank_list_api();
    partner_list_api();
    bankAccountGL();
    currency_list_api();
    gl_list_api();
    user_list_api();
  }, []);

  console.log(`user`, user , singleData);

  return (
    <>
      {addFormShow ? (
        <Breadcrumb name1={"Bank Account"} name2={"Bank Account Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Bank Account"}
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
            <form
              className="bg-white rounded-2xl p-5 drop-shadow-lg"
              onSubmit={handleSubmit}
            >
              <input
                type="hidden"
                name="branchId"
                value={token_user?.user?.branchId || ""}
              />
              {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
              <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Partner */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="partnerOrganizationId"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Partner
                  </label>
                  <select
                    id="partnerOrganizationId"
                    name="partnerOrganizationId"
                    value={singleData?.partnerOrganizationId}
                    onChange={(e) =>
                      setsingleData({
                        ...singleData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="border p-4 rounded appearance-none h-14"
                  >
                    {partner.map((cur: any) => (
                      <option value={cur.partnerId}>{cur.name}</option>
                    ))}
                  </select>
                  <DropDownIcon />
                </div>

                {/* Branch */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="bankBranchId"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Branch
                  </label>
                  <select
                    id="bankBranchId"
                    name="bankBranchId"
                    className="w-full border p-4 rounded appearance-none h-14"
                  >
                    {branch.map((item: any) => {
                      return (
                        <option
                          value={item.bankBranchId}
                          selected={
                            singleData?.bankBranchId == item.bankBranchId
                          }
                        >
                          {item.branchName}
                        </option>
                      );
                    })}
                  </select>
                  <DropDownIcon />
                </div>

                {/* Account Name */}
                <div className="flex flex-col relative">
                  <label
                    htmlFor="accountName"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Account Name
                  </label>
                  <input
                    id="accountName"
                    type="text"
                    name="accountName"
                    defaultValue={singleData?.accountName}
                    className="border p-4 rounded h-14"
                    placeholder="Account Name here"
                    maxLength={20}
                  />
                </div>
                {/* Account Number*/}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="accountNumber"
                    className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
                  >
                    Account Number
                  </label>
                  <input
                    id="accountNumber"
                    type="text"
                    name="accountNumber"
                    defaultValue={singleData?.accountNumber}
                    placeholder="Account Number here"
                    className="w-full border p-4 rounded h-14 text-sm"
                    maxLength={200}
                  />
                </div>

                {/* Type */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="accountType"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Account Type
                  </label>
                  <select
                    id="accountType"
                    name="accountType"
                    className="w-full border p-4 rounded appearance-none h-14"
                  >
                    <option value="SAVING" selected={singleData?.accountType == "SAVING"}>
                      SAVINGS{" "}
                    </option>
                    <option value="CURRENT" selected={singleData?.accountType == "CURRENT"}>
                      CURRENT
                    </option>
                  </select>
                  <DropDownIcon />
                </div>

                {/* Currency Code */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="currencyCode"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    Currency Code
                  </label>
                  <select
                    id="currencyCode"
                    name="currencyCode"
                    value={singleData?.currencyCode}
                    onChange={(e) =>
                      setsingleData({
                        ...singleData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="border p-4 rounded appearance-none h-14"
                  >
                    {currency.map((cur: any) => (
                      <option value={cur.currencyCode}>
                        {cur.currencyCode}
                      </option>
                    ))}
                  </select>
                  <DropDownIcon />
                </div>

                {/* GL Account */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="bankAccountGLId"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    GL Account
                  </label>
                  <select
                    id="bankAccountGLId"
                    name="bankAccountGLId"
                    value={singleData?.bankAccountGLId}
                    onChange={(e) =>
                      setsingleData({
                        ...singleData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="border p-4 rounded appearance-none h-14"
                  >
                    {GL.map((cur: any) => (
                      <option value={cur.glId}>
                        {cur.glGeneratedAccountNo} - {cur.glAccountNo} -{" "}
                        {cur.glAccountName}
                      </option>
                    ))}
                  </select>
                  <DropDownIcon />
                </div>

                {/* GL Account */}
                <div className="flex flex-col relative ">
                  <label
                    htmlFor="bankChangeGLId"
                    className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                  >
                    GL Account (Change)
                  </label>
                  <select
                    id="bankChangeGLId"
                    name="bankChangeGLId"
                    value={singleData?.bankChangeGLId}
                    onChange={(e) =>
                      setsingleData({
                        ...singleData,
                        [e.target.name]: e.target.value,
                      })
                    }
                    className="border p-4 rounded appearance-none h-14"
                  >
                    {GL.map((cur: any) => (
                      <option value={cur.glId}>
                        {cur.glGeneratedAccountNo} - {cur.glAccountNo} -{" "}
                        {cur.glAccountName}
                      </option>
                    ))}
                  </select>
                  <DropDownIcon />
                </div>


                {/* <div className="flex flex-col relative">
                  <label
                    htmlFor="signatoryUserId"
                    className="z-10 text-sm absolute mt-2 ml-6 -mb-4 bg-white text-QuaternaryColor"
                  >
                    Signatory User
                  </label>
                  <Select
                    isMulti
                    name="signatoryUserId"
                    onChange={(e: any) => {
                      setsingleData({
                        ...singleData,
                        ["signatoryUserId"]: e.value,
                      });
                    }}
                    className=" p-4 rounded-md h-14 text-sm"
                    value={user?.map((m_d: any) => {
                      if (singleData?.signatoryUserId.includes(m_d.userId)) {
                        return {
                          label: m_d.name,
                          value: m_d.userId,
                        };
                      }
                    })}
                    options={user?.map((m_d: any) => {
                      return {
                        label: m_d.name,
                        value: m_d.userId,
                      };
                    })}
                  />
                </div> */}
              </div>

              <div className="flex justify-end gap-4 mt-10">
                {singleData?.bankAccountId ? (
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

export default BankAccount;
