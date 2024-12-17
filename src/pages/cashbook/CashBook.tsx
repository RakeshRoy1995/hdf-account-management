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
import Status from "@/shared/Status-component/Status";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function CashBook() {
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
  } = useFetch(`${API_URL}/cash-accounts`);

  const [branches, setbranches] = useState<any>([]);
  const [GL, setGL] = useState<any>([]);
  const [partner, setpartner] = useState<any>([]);
  const [currency, setcurrency] = useState<any>([]);

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const page_list = `${API_URL}/cash-accounts/${id}`;
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
      const page_list = `${API_URL}/cash-accounts/${id}`;
      deleteData(page_list);
    }
    setaddFormShow(true);
  };

  const fetchInitData = async () => {
    fetchData();
    setsingleData({
      caRecStatus: "A"
    })
    currency_list_api();
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
      setsingleData({
        caRecStatus: "A"
      })
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

  const branchName = (id: any) => {
    const branch_name = branches.find((bnk: any) => bnk.bankBranchId == id);
    return branch_name?.branchName;
  };

  const GLAccountName = (id: any) => {
    const gl_name = GL.find((bnk: any) => bnk.glAccountId == id);
    return gl_name?.glAccountName;
  };

  const partnerName = (id: any) => {
    const partner_name = partner.find(
      (bnk: any) => bnk.partnerId == id,
    );
    return partner_name?.name;
  };

  const column = [
    {
      name: "Branch",
      selector: (row: any) => branchName(row.caBranchId),
      sortable: true,
    },
    {
      name: "Code",
      selector: (row: any) => row.caCode,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row: any) => row.caName,
      sortable: true,
    },

    {
      name: "GL Account",
      selector: (row: any) => GLAccountName(row.caGLAccountId),
      sortable: true,
    },

    {
      name: "Partner",
      selector: (row: any) => partnerName(row.caPartnerOrganizationId),
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
      caRecStatus: "I"
    };
    for (const [key, value] of formData) {
      console.log(key, ":", value);

      if (key.startsWith("location.")) {
        const locationKey = key.split(".")[1];
        obj.address[locationKey] = value;
      } else {
        obj = { ...obj, [key]: value };
      }
    }

    let page_list = `${API_URL}/cash-accounts`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/cash-accounts/${singleData?.bankId}`;
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

  const branch_list_api = async () => {
    const apiEndPoint = "bank-branches";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setbranches(ministry_List_Array?.data);
  };

  const gl_list_api = async () => {
    const apiEndPoint = "glAccount/getActiveGl";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setGL(ministry_List_Array?.data);
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

  useEffect(() => {
    branch_list_api();
    gl_list_api();
    partner_list_api();
  }, []);

  
  return (
    <div>
      {addFormShow ? (
        <Breadcrumb name1={"Cash Account"} name2={"Cash Account Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Cash Account"}
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
            {/* Partner */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="caPartnerOrganizationId"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Partner
              </label>
              <select
                id="caPartnerOrganizationId"
                name="caPartnerOrganizationId"
                value={singleData?.caPartnerOrganizationId}
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

            <div className="flex flex-col relative ">
              <label
                htmlFor="caBranchId"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Branch
              </label>
              <select
                id="caBranchId"
                name="caBranchId"
                value={singleData?.caBranchId}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded appearance-none h-14"
              >
                <option value="">Select</option>

                {branches.map((bnk: any) => (
                  <option value={bnk.bankBranchId}>{bnk.branchName} </option>
                ))}
              </select>
              <DropDownIcon />
            </div>

            {/* Currency code */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="caCurrencyCode"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Currency Code
              </label>
              <select
                id="caCurrencyCode"
                name="caCurrencyCode"
                value={singleData?.caCurrencyCode}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded appearance-none h-14"
              >
                {currency.map((cur: any) => (
                  <option value={cur.currencyCode}>{cur.currencyCode}</option>
                ))}
              </select>
              <DropDownIcon />
            </div>

            {/* Cash Account Name */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="caName"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Cash Account Name
              </label>
              <input
                id="caName"
                type="text"
                name="caName"
                defaultValue={singleData?.caName}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded h-14"
                placeholder="Cash Account Name here"
              />
            </div>

            {/* Cash Account Code */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="caCode"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Cash Account Code
              </label>
              <input
                id="caCode"
                type="text"
                name="caCode"
                defaultValue={singleData?.caCode}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded h-14"
                placeholder="Cash Account Code here"
              />
            </div>

            {/* GL Account */}
            <div className="flex flex-col relative ">
              <label
                htmlFor="cashAccountGLId"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                GL Account
              </label>
              <select
                id="cashAccountGLId"
                name="cashAccountGLId"
                value={singleData?.cashAccountGLId}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded appearance-none h-14"
              >
                {GL.map((cur: any) => (
                  <option value={cur.glId}>{cur.glGeneratedAccountNo} - {cur.glAccountNo} - {cur.glAccountName}</option>
                ))}
              </select>
              <DropDownIcon />
            </div>

            {/* Credit Limit */}
            <div className="flex flex-col relative mb-5">
              <label
                htmlFor="caCreditLimit"
                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
              >
                Credit Limit
              </label>
              <input
                id="caCreditLimit"
                type="text"
                name="caCreditLimit"
                defaultValue={singleData?.caCreditLimit}
                onChange={(e) =>
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  })
                }
                className="border p-4 rounded h-14"
                placeholder="Credit Limit here"
              />
            </div>
            <Status singleData={singleData} name="caRecStatus" setsingleData={setsingleData} />
          </div>

          

          {/* <Location singleData={singleData} setsingleData={setsingleData} /> */}

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

export default CashBook;
