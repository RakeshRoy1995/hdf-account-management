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
import PaymentVoucherForm from "./payment-voucher/PaymentVoucherForm";
import { formatDate_3 } from "@/utils";
import { get_all_data } from "@/api/Reqest";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function PaymentVoucher() {
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
  } = useFetch(`${API_URL}/payments`);

  const [rows, setRows] = useState([]);

  const [currency, setCurrency] = useState<any>([]);
  const [payTo, setPayTo] = useState<any>([]);
  const [bankAccount, setBankAccount] = useState<any>([]);
  const [cashAccount, setCashAccount] = useState<any>([]);
  const [GL, setGL] = useState<any>([]);

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const apiEndPoint = `payments/${id}`;
      const response = await get_all_data(apiEndPoint);
      setsingleData(response?.data);
      setRows(response?.data?.paymentLines);
    }
    if (type == "delete") {
      const page_list = `${API_URL}/payments/${id}`;
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

  const AccountName = (id: any, type: any) => {
    if (type == "CASH") {
      const gl_name = cashAccount.find((bnk: any) => bnk.cashAccountId == id);
      return gl_name?.caCode + " - " + gl_name?.caName;
    } else {
      const bank_name = bankAccount.find((bnk: any) => bnk.bankAccountId == id);
      return bank_name?.accountName + " - " + bank_name?.accountNumber;
    }
  };

  const column = [
    {
      name: "Pay To",
      selector: (row: any) => row.payTo,
      sortable: true,
    },
    {
      name: "TransferDate",
      selector: (row: any) => row.transDate,
      sortable: true,
    },
    {
      name: "Voucher No",
      selector: (row: any) => row.voucherNo,
      sortable: true,
    },

    {
      name: "Voucher Type",
      selector: (row: any) => row.voucherType,
      sortable: true,
    },

    {
      name: "Voucher Type",
      selector: (row: any) => row.voucherType,
      sortable: true,
    },

    {
      name: "Account",
      selector: (row: any) =>
        AccountName(row.bankAccountId || row.cashAccountId, row.accountType),
      sortable: true,
    },
    {
      name: "action",
      cell: (row: any) => <>{ActionButton(fetchDataByID, row?.paymentId)}</>,
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const authToken = localStorage.getItem("customer_login_auth") || "";
    const token: any = authToken ? JSON.parse(authToken) : "";
    const obj: any = {
      partnerOrganizationId: token?.user?.partnerOrganizationId || null,
      branchId: token?.user?.branchId || null,
      ...singleData,
      paymentLines: rows,
    };

    obj.transDate = formatDate_3(obj.transDate);
    obj.chequeDate = formatDate_3(obj.chequeDate);

    let page_list = `${API_URL}/payments`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/payments/${singleData?.paymentId}`;
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

  const currency_list_api = async () => {
    const apiEndPoint = "currencies";
    const response = await get_all_data(apiEndPoint);
    const currencyList = response?.data;
    setCurrency(currencyList);
  };

  const pay_to_list_api = async () => {
    const apiEndPoint = "payment-to";
    const response = await get_all_data(apiEndPoint);
    const payToList = response?.data;
    setPayTo(payToList);
  };

  const bank_account_list_api = async () => {
    const apiEndPoint = "bank-accounts";
    const response = await get_all_data(apiEndPoint);
    const bankAccountList = response?.data;
    setBankAccount(bankAccountList);
  };

  const cash_account_list_api = async () => {
    const apiEndPoint = "cash-accounts";
    const response = await get_all_data(apiEndPoint);
    const cashAccountList = response?.data;
    setCashAccount(cashAccountList);
  };

  const gl_list_api = async () => {
    const apiEndPoint = "glAccount/getActiveGl";
    const response_ministry_List: any = await get_all_data(apiEndPoint);
    const ministry_List_Array = response_ministry_List;
    setGL(ministry_List_Array?.data);
  };

  useEffect(() => {
    currency_list_api();
    pay_to_list_api();
    bank_account_list_api();
    cash_account_list_api();
    gl_list_api();
  }, []);

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
        <form
          className="bg-white rounded-2xl p-2 drop-shadow-lg mb-5"
          onSubmit={handleSubmit}
        >
          <PaymentVoucherForm
            singleData={singleData}
            setsingleData={setsingleData}
            rows={rows}
            setRows={setRows}
            currency={currency}
            payTo={payTo}
            bankAccount={bankAccount}
            cashAccount={cashAccount}
            GL={GL}
            setCurrency={setCurrency}
            setPayTo={setPayTo}
            setBankAccount={setBankAccount}
            setCashAccount={setCashAccount}
            setGL={setGL}
          />
          {singleData?.paymentId ? (
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
      <Table rows={data?.content || []} column={column} />
    </div>
  );
}

export default PaymentVoucher;
