import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import Table from "@/shared/Table/Table";
import Swal from "sweetalert2";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { formatDate_3, get_role, modelCss } from "@/utils";
import { get_all_data, submitFormData } from "@/api/Reqest";
import { Modal, Tab } from "@mui/material";
import { Box } from "@mui/material";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {History} from '@mui/icons-material';
import DataTable from "react-data-table-component";
import ReceptVoucherForm from "./recept-voucher/ReceptVoucherForm";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function ReceptVoucher() {
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
  } = useFetch(`${API_URL}/receipts`);

  const [rows, setRows] = useState([]);

  const [currency, setCurrency] = useState<any>([]);
  const [payTo, setPayTo] = useState<any>([]);
  const [bankAccount, setBankAccount] = useState<any>([]);
  const [cashAccount, setCashAccount] = useState<any>([]);
  const [GL, setGL] = useState<any>([]);
  const [historyData, setHistoryData] = useState<any>([]);
  const [historyOpen, setHistoryOpen] = useState(false);

  const fetchInitData = async () => {
    fetchData();
    setsingleData({...singleData,voucherType:"BANK"})
  };

  const fetchHistory = async (id: any) => {
    const apiEndPoint = `receipts/approval/history/${id}`;
    const response = await get_all_data(apiEndPoint);
    setHistoryData(response?.data);
    setHistoryOpen(true);
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
      name: "Action",
      selector: (row: any) => row.approvalStatus,
      cell: (row) => (
        <div className="space-x-2">
          <>
          <div className="cursor-pointer" onClick={()=>{
            fetchHistory(row.paymentId)
          }}>
            <History/>
          </div>
            {row.approvalStatus == "COMPLETE" ? (
              "DONE"
            ) : (
              <>
                <button
                  aria-label="view"
                  className="bg-green-500 hover:bg-none rounded-w-1/2 text-white mt-2 p-2"
                  onClick={(e: any) => {
                    setOpen(true);
                    changeStatus(
                      row.paymentId,

                      "APPROVED",
                    );
                  }}
                >
                  APPROVE
                </button>

                <button
                  aria-label="view"
                  className="bg-blue-800 text-white rounded-w-1/2 hover:bg-none m-2 p-2"
                  onClick={(e: any) => {
                    setOpen(true);
                    changeStatus(
                      row.paymentId,

                      "REJECTED",
                    );
                  }}
                >
                  REVIEW
                </button>
              </>
            )}
          </>
        </div>
      ),
    },
  ];

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const authToken = localStorage.getItem("customer_login_auth") || "";
    const token: any = authToken ? JSON.parse(authToken) : "";
    const obj: any = {
      recStatus: "A",
      partnerOrganizationId: token?.user?.partnerOrganizationId || null,
      branchId: token?.user?.branchId || null,
      ...singleData,
      receiptLines: rows,
    };

    obj.transDate = formatDate_3(obj.transDate);
    obj.chequeDate = formatDate_3(obj.chequeDate);

    let page_list = `${API_URL}/receipts`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/receipts/${singleData?.paymentId}`;
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

  const fetchAppravalList = async () => {
    const type = get_role();
    const page_list = `${API_URL}/receipts/approval/by/role?currentPage=1&pageSize=10000&roleId=${type}`;
    const { data }: any = await submitFormData(page_list, {});
    setallApprovalList(data?.content);
    // setMCPData(data?.content);
  };

  useEffect(() => {
    currency_list_api();
    pay_to_list_api();
    bank_account_list_api();
    cash_account_list_api();
    gl_list_api();
    fetchAppravalList();
  }, []);

  const [value, setValue] = useState("1");

  const changeStatus = async (id: any, approvalStatus: string) => {
    setOpen(true);
    const user = JSON.parse(localStorage.getItem("customer_login_auth"));
    setstatusPayload({ approvalStatus, id, userId: user?.user?.userId });
  };

  const changeStatusFunc = async () => {
    const options = {
      method: "put",
      data: statusPayload,
    };

    try {
      const page_list = `${API_URL}/receipts/approval/request/${statusPayload?.id}`;
      await submitFormData(page_list, options);

      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });

      setOpen(false);
      fetchInitData();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error?.response.data?.message,
        confirmButtonText: "বন্ধ করুন",
      });
      setOpen(false);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const [allApprovalList, setallApprovalList] = useState<any>([]);
  const [open, setOpen] = useState(false);
  const [statusPayload, setstatusPayload] = useState<any>({});


  

  const completed_list =
    data?.content.filter(
      (d: any) => d.approvalStatus == "COMPLETE",
    ) || [];

  const All_list =
    data?.content.filter(
      (d: any) => d.approvalStatus != "COMPLETE",
    ) || [];

  const handleClose = () => setOpen(false);
  const handleHistoryClose = () => setHistoryOpen(false);

  console.log(historyData)

  const columnHistory = [
    {
      name: "Created By",
      selector: (row: any) => row.createdByName,
      sortable: true,
    },
    {
      name: "Comment",
      selector: (row: any) => row.comment,
      sortable: true,
    },
    {
      name: "Created Date",
      selector: (row: any) => row.createdAt,
      sortable: true,
    },
    {
      name: "Previous Status",
      selector: (row: any) => row.prevApprovalStatus ? row.prevApprovalStatus : "N/A",
      sortable: true,
    },

    {
      name: "Status",
      selector: (row: any) => row.approvalStatus,
      sortable: true,
    },

  ];

  return (
    <div>
      {addFormShow ? (
        <Breadcrumb name1={"Recept Voucher"} name2={"Recept Voucher Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Recept Voucher"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      {addFormShow && (
        <form
          className="bg-white rounded-2xl p-2 drop-shadow-lg mb-5"
          onSubmit={handleSubmit}
        >
          <ReceptVoucherForm
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

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleTabChange} aria-label="lab API tabs example">
            <Tab label="List" value="1" />
            <Tab label="Pending List" value="2" />
            <Tab label="Completed" value="3" />
          </TabList>
        </Box>

        <TabPanel value="1">
          <Table rows={All_list} column={column} getheaderColor={() => {}} />
        </TabPanel>

        <TabPanel value="2">
          <Table
            rows={allApprovalList}
            column={column}
            getheaderColor={() => {}}
          />
        </TabPanel>

        <TabPanel value="3">
          <Table
            rows={completed_list}
            column={column}
            getheaderColor={() => {}}
          />
        </TabPanel>
      </TabContext>

      <Modal open={open} onClose={handleClose} aria-labelledby="modal-title">
        <Box
          sx={modelCss}
        >
          {/* Modal content */}

          <div className="flex flex-col relative ">
            <label
              htmlFor="comment"
              className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
            >
              Comment
            </label>
            <input
              id="comment"
              type="text"
              name="comment"
              onChange={(e) =>
                setstatusPayload({
                  ...statusPayload,
                  ["comment"]: e.target.value,
                })
              }
              placeholder="Comment here"
              className="w-full border p-4 rounded h-16 text-sm"
            />
          </div>

          <div className="flex justify-end mt-4 gap-5">
            <button
              onClick={handleClose}
              type="button"
              className="text-sm hover:text-primaryColor hover:font-bold"
            >
              Close
            </button>
            <button
              type="button"
              onClick={changeStatusFunc}
              className="text-sm hover:text-primaryColor text-primaryColor hover:font-bold"
            >
              {statusPayload.approvalStatus == "REJECTED"
                ? "Review"
                : "Approve"}
            </button>
          </div>

          {/* Close button */}
        </Box>
      </Modal>


      <Modal open={historyOpen} onClose={handleHistoryClose} aria-labelledby="modal-title">
        <Box
          sx={modelCss}
        >
          {/* Modal content */}

          <div className="flex flex-col relative ">

            <label className="text-sm font-bold mb-4">History</label>


          <DataTable  
            pagination={false}
            columns={columnHistory}
            data={historyData}
          />

          </div>

          <div className="flex justify-end mt-4 gap-5">
            <button
              onClick={handleHistoryClose}
              type="button"
              className="text-sm hover:text-primaryColor hover:font-bold"
            >
              Close
            </button>
          </div>

          {/* Close button */}
        </Box>
      </Modal>


    </div>
  );
}

export default ReceptVoucher;
