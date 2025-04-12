import { submitFormData } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import SaveButton from "@/shared/components/ButttonsCollection/SaveButton";
import SendForApprovalButton from "@/shared/components/ButttonsCollection/SendForApprovalButton";
import Table from "@/shared/Table/Table";
import { motion } from "framer-motion";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DropDownIcon from "@/shared/DropDownIcon/DropDownIcon";
import DateFormate from "@/shared/date-formate/DateFormate";
import { formatDate_3 } from "@/utils";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const LedgerInformation = () => {
  const {
    fetchDataCommon,
    common_data,
    setcommon_Data,
    error,
    setsingleData,
    singleData,
  } = useFetch(`${API_URL}/project-partner-organizations`);

  const [selectedRows, setSelectedRows] = useState([]);
  const [Component, setComponent] = useState([]);
  const [gl_id, setgl_id] = useState([]);
  const [tbldata, settbldata] = useState([]);
  const [dropDownObj, setdropDownObj] = useState<any>({});
  const [participateTableShow, setparticipateTableShow] = useState<any>(true);

  const fetchData = async (gl_id:any, sdate:any, eDate:any) => {
    if (gl_id && sdate && eDate) {
      
      const page_list = `${API_URL}/gl-accounts/account/${gl_id}?startDate=${formatDate_3(sdate)}&endDate=${formatDate_3(eDate)}`;
      const { data }: any = await submitFormData(page_list, {});
      settbldata(data);
    }
  };

  const fetchGl = async ( )=> {
    // partner Organization
    const page_list = `${API_URL}/glAccount/getActiveGl`;
    const { data }: any = await submitFormData(page_list, {});
    setgl_id(data);
  };


  useEffect(() => {
    fetchGl();
  }, []);

  useEffect(() => {
    fetchData(singleData?.gl , singleData?.startDate  , singleData?.EndDate);
  }, [singleData?.gl , singleData?.startDate  , singleData?.EndDate ]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const component_: any = Component.find(
      (data: any) => data.componentId == dropDownObj?.component_name,
    );

    if (component_?.componentIsTrainee) {
      const page_list = `${API_URL}/participant?currentPage=&pageSize=1000&withoutEnrollment=true`;
      const { data }: any = await submitFormData(page_list, {});
      setparticipateTableShow(true);
      settbldata(data?.content);
    } else {
      const page_list = `${API_URL}/mcp-registrations?currentPage=&pageSize=1000&withoutEnrollment=true`;
      const { data }: any = await submitFormData(page_list, {});
      setparticipateTableShow(false);
      settbldata(data?.content);
    }
  };


  const column = [
    {
      name: "Voucher Type",
      selector: (row: any) => row.references.join(","),
      sortable: true,
    },
    {
      name: "Particular",
      selector: (row: any) => row.particulars,
      sortable: true,
    },

    {
      name: "Date",
      selector: (row: any) => row.transDate,
      sortable: true,
    },

    {
      name: "Debit",
      selector: (row: any) => row.amtDr,
      sortable: true,
    },

    {
      name: "Credit",
      selector: (row: any) => row.amtCr,
      sortable: true,
    },

    {
      name: "Balance",
      selector: (row: any) => row.Balance,
      sortable: true,
    },

  ];


  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
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


let balance = 0;
const table = tbldata.map((txn:any) => {
    balance += txn?.amtDr -  txn?.amtCr;
    return {
        Debit: txn?.amtDr.toFixed(2),
        Credit: txn?.amtCr.toFixed(2),
        Balance: balance.toFixed(2),
        ...txn
    };
});

  return (
    <>
      <Breadcrumb name1={"Ledger Information"} name2={"Search Ledger Information"} />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form action="submit" className="p-4 space-y-6" onSubmit={handleSubmit}>
          <div className="bg-white rounded-xl shadow-md p-10">
            <div className=" text-teal-700 text-sm font-semibold font-['Poppins'] leading-tight tracking-tight mb-4">
              Search from the list
            </div>

            <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">

              <div className="relative">
                <label
                  htmlFor="Batch Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Gl Account
                </label>
                <select
                  id="Batch Name"
                  name="gl"
                  onChange={(e: any) =>
                    setsingleData({
                      ...singleData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All</option>
                  {gl_id?.map((data: any) => (
                    <option value={data.glId}> {data.glAccountName} - {data.glAccountNo} </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>


              <div className="flex flex-col relative">
                <label
                  htmlFor="startDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Start Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="startDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="Start Date"
                />
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="EndDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  End Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="EndDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="End Date"
                />
              </div>

            </div>

          </div>
        </form>

        <Table
            rows={table || []}
            column={column}
            getheaderColor={() => {}}
          />

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4 mt-5">
            <div className="flex flex-col relative">
                <label
                  htmlFor="startDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Ending Date : {table[table.length - 1]?.transDate}
                </label>

                
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="startDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Ending Balance : {balance || ""}
                </label>

                
              </div>
          </div>





      </motion.div>
    </>
  );
};

export default LedgerInformation;
