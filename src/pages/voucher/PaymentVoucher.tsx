import { BreadcumbWithButton } from '@/shared/BreadcumbWithButton/BreadcumbWithButton';
import Table from '@/shared/Table/Table';
import Swal from "sweetalert2";
import React, { useEffect } from 'react'
import useFetch from '@/hooks/useFetch';
import UpdateButton from '@/shared/components/ButttonsCollection/UpdateButton';
import AddButton from '@/shared/components/ButttonsCollection/AddButton';
import { col_value } from '@/shared/Table/utils';
import ActionButton from '@/shared/Table/ActionButton';
import Breadcrumb from '@/shared/Breadcumb/Breadcrumb';
import PaymentVoucherForm from './payment-voucher/PaymentVoucherForm';


const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function BankAdd() {
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
    setaddFormShow
  } = useFetch(`${API_URL}/banks`);

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
    if (type == "delete") {
      const page_list = `${API_URL}/banks/${id}`;
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
          when: row => row.bankRecStatus == "A",
          style: row => ({ color: "green" }),
        },

        {
          when: row => row.bankRecStatus !== "A",
          style: row => ({ color: "red" }),
        },
      ],
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.bankId)}</>,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const authToken = localStorage.getItem("customer_login_auth") || "";
const token: any = authToken ? JSON.parse(authToken) : "";


    const formData = new FormData(e.target);
    let obj: any = {
      partnerOrganizationId : token?.user?.partnerOrganizationId || null,
      branchId : token?.user?.branchId || null,
    };
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

  return (
    <div>
      {addFormShow ? (
        <Breadcrumb name1={"Payment Voucher"} name2={"Payment Voucher Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Payment Voucher"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      {addFormShow && (
        <form className="bg-white rounded-2xl p-2 drop-shadow-lg mb-5" onSubmit={handleSubmit}>
        <PaymentVoucherForm />
        {
          singleData?.paymentId ?

            <UpdateButton setsingleData={setsingleData}
              loading={loading}
              setaddFormShow={setaddFormShow} /> :
            <AddButton setsingleData={setsingleData}
              loading={loading}
              setaddFormShow={setaddFormShow} />
        }
      </form>
      )}
      <Table rows={data || []} column={column} />
    </div>
  )
}

export default BankAdd
