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

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const TrailBalance = () => {
  const {
    fetchDataCommon,
    common_data,
    setcommon_Data,
    error,
    setsingleData,
    singleData,
  } = useFetch(`${API_URL}/project-partner-organizations`);

  const [selectedRows, setSelectedRows] = useState([]);
  const [PartnerOrganization, setPartnerOrganization] = useState([]);
  const [Project, setProject] = useState([]);
  const [Component, setComponent] = useState([]);
  const [branch, setbranch] = useState([]);
  const [batch, setbatch] = useState([]);
  const [training, settraining] = useState([]);
  const [tbldata, settbldata] = useState([]);
  const [dropDownObj, setdropDownObj] = useState<any>({});
  const [participateTableShow, setparticipateTableShow] = useState<any>(true);
  const [open, setOpen] = useState(false);
  const [data, setdata] = useState<any>("");

  const fetchPOOrganiztion = async () => {
    // partner Organization
    const page_list = `${API_URL}/partner-organization?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setPartnerOrganization(data.content);
  };

  const fetchProject = async () => {
    // partner Organization
    const page_list = `${API_URL}/project/ongoing?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setProject(data);
  };

  const fetchComponent = async () => {
    // partner Organization
    const page_list = `${API_URL}/component?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setComponent(data);
  };

  const fetchBranch = async () => {
    // fetchBranch Organization
    const page_list = `${API_URL}/branch?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setbranch(data?.content);
  };

  const fetchBatch = async () => {
    // fetchBranch Organization
    const page_list = `${API_URL}/batch?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    setbatch(data?.content);
  };

  const fetchTraining = async () => {
    // fetchBranch Organization
    const page_list = `${API_URL}/trainingSetup/getActiveTraining?currentPage=1&pageSize=2000`;
    const { data }: any = await submitFormData(page_list, {});
    settraining(data);
  };

  useEffect(() => {
    fetchPOOrganiztion();
    fetchProject();
    fetchComponent();
    fetchBranch();
    fetchBatch();
    fetchTraining();
  }, []);

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

  const handleSubmit_Approval = async (e: any) => {
    e.preventDefault();

    for (let index = 0; index < selectedRows?.length; index++) {
      const element: any = selectedRows[index];

      if (element?.mcpRegistrationId) {
        const obj = {
          ["partEnrollMcpRegistrationId"]: element?.mcpRegistrationId,
          ["partEnrollTrainingId"]: dropDownObj?.training_name,
          ["partEnrollBatchId"]: dropDownObj?.batch_name,
          ["partEnrollStatus"]: "PENDING",
          ["partEnrollRecStatus"]: "A",
        };

        const page_list = `${API_URL}/participant-enrollments`;
        const method = "POST";

        const options = {
          method,
          data: obj,
        };

        fetchDataCommon(page_list, options);
      } else {
        const obj = {
          ["partEnrollParticipantId"]: element?.participantId,
          ["partEnrollTrainingId"]: dropDownObj?.training_name,
          ["partEnrollBatchId"]: dropDownObj?.batch_name,
          ["partEnrollStatus"]: "PENDING",
          ["partEnrollRecStatus"]: "A",
        };

        const page_list = `${API_URL}/participant-enrollments`;
        const method = "POST";

        const options = {
          method,
          data: obj,
        };

        fetchDataCommon(page_list, options);
      }
    }

    // console.log(`dropDownObj`, dropDownObj, selectedRows);
  };

  const view = (data: any) => {
    setOpen(true);
    setdata(data);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columnMcp = [
    {
      name: "Name",
      selector: (row: any) => row.partName,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row: any) => row.partMobileNo,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <div className="flex justify-center space-x-2">
          <button
            aria-label="view"
            className="bg-[#e6f1f0] hover:bg-none rounded-full p-1"
            onClick={(e: any) => view(row)}
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.502 13.6299C11.4935 13.6299 12.3356 13.2829 13.0283 12.5888C13.721 11.8948 14.0674 11.0521 14.0674 10.0605C14.0674 9.06901 13.7204 8.2269 13.0263 7.53419C12.3323 6.84148 11.4896 6.49512 10.498 6.49512C9.50651 6.49512 8.6644 6.84214 7.97169 7.53616C7.27898 8.23018 6.93263 9.07295 6.93263 10.0645C6.93263 11.056 7.27964 11.8981 7.97366 12.5908C8.66768 13.2835 9.51045 13.6299 10.502 13.6299ZM10.5 12.425C9.84375 12.425 9.28594 12.1953 8.82657 11.7359C8.36719 11.2766 8.1375 10.7188 8.1375 10.0625C8.1375 9.40625 8.36719 8.84844 8.82657 8.38906C9.28594 7.92969 9.84375 7.7 10.5 7.7C11.1563 7.7 11.7141 7.92969 12.1734 8.38906C12.6328 8.84844 12.8625 9.40625 12.8625 10.0625C12.8625 10.7188 12.6328 11.2766 12.1734 11.7359C11.7141 12.1953 11.1563 12.425 10.5 12.425ZM10.5011 16.1875C8.48904 16.1875 6.65569 15.6325 5.00107 14.5224C3.34644 13.4124 2.12815 11.9258 1.34619 10.0625C2.12815 8.19919 3.346 6.71256 4.99975 5.60262C6.65365 4.49254 8.4867 3.9375 10.4989 3.9375C12.511 3.9375 14.3443 4.49254 15.9989 5.60262C17.6536 6.71256 18.8719 8.19919 19.6538 10.0625C18.8719 11.9258 17.654 13.4124 16.0003 14.5224C14.3464 15.6325 12.5133 16.1875 10.5011 16.1875ZM10.5 14.875C12.1479 14.875 13.6609 14.4411 15.0391 13.5734C16.4172 12.7057 17.4708 11.5354 18.2 10.0625C17.4708 8.58958 16.4172 7.41927 15.0391 6.55156C13.6609 5.68385 12.1479 5.25 10.5 5.25C8.85209 5.25 7.33907 5.68385 5.96094 6.55156C4.58282 7.41927 3.52917 8.58958 2.8 10.0625C3.52917 11.5354 4.58282 12.7057 5.96094 13.5734C7.33907 14.4411 8.85209 14.875 10.5 14.875Z"
                fill="#016E69"
              />
            </svg>
          </button>
        </div>
      ),
    },
  ];

  const columnParticipate = [
    {
      name: "Name",
      selector: (row: any) => row.mcpName,
      sortable: true,
    },
    {
      name: "Mobile No",
      selector: (row: any) => row.mcpMobile,
      sortable: true,
    },

    {
      name: "action",
      cell: (row: any) => (
        <>
          <div className="flex justify-center space-x-2">
            <button
              aria-label="view"
              className="bg-[#e6f1f0] hover:bg-none rounded-full p-1"
              onClick={(e: any) => view(row)}
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.502 13.6299C11.4935 13.6299 12.3356 13.2829 13.0283 12.5888C13.721 11.8948 14.0674 11.0521 14.0674 10.0605C14.0674 9.06901 13.7204 8.2269 13.0263 7.53419C12.3323 6.84148 11.4896 6.49512 10.498 6.49512C9.50651 6.49512 8.6644 6.84214 7.97169 7.53616C7.27898 8.23018 6.93263 9.07295 6.93263 10.0645C6.93263 11.056 7.27964 11.8981 7.97366 12.5908C8.66768 13.2835 9.51045 13.6299 10.502 13.6299ZM10.5 12.425C9.84375 12.425 9.28594 12.1953 8.82657 11.7359C8.36719 11.2766 8.1375 10.7188 8.1375 10.0625C8.1375 9.40625 8.36719 8.84844 8.82657 8.38906C9.28594 7.92969 9.84375 7.7 10.5 7.7C11.1563 7.7 11.7141 7.92969 12.1734 8.38906C12.6328 8.84844 12.8625 9.40625 12.8625 10.0625C12.8625 10.7188 12.6328 11.2766 12.1734 11.7359C11.7141 12.1953 11.1563 12.425 10.5 12.425ZM10.5011 16.1875C8.48904 16.1875 6.65569 15.6325 5.00107 14.5224C3.34644 13.4124 2.12815 11.9258 1.34619 10.0625C2.12815 8.19919 3.346 6.71256 4.99975 5.60262C6.65365 4.49254 8.4867 3.9375 10.4989 3.9375C12.511 3.9375 14.3443 4.49254 15.9989 5.60262C17.6536 6.71256 18.8719 8.19919 19.6538 10.0625C18.8719 11.9258 17.654 13.4124 16.0003 14.5224C14.3464 15.6325 12.5133 16.1875 10.5011 16.1875ZM10.5 14.875C12.1479 14.875 13.6609 14.4411 15.0391 13.5734C16.4172 12.7057 17.4708 11.5354 18.2 10.0625C17.4708 8.58958 16.4172 7.41927 15.0391 6.55156C13.6609 5.68385 12.1479 5.25 10.5 5.25C8.85209 5.25 7.33907 5.68385 5.96094 6.55156C4.58282 7.41927 3.52917 8.58958 2.8 10.0625C3.52917 11.5354 4.58282 12.7057 5.96094 13.5734C7.33907 14.4411 8.85209 14.875 10.5 14.875Z"
                  fill="#016E69"
                />
              </svg>
            </button>
          </div>
        </>
      ),
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

  return (
    <>
      <Breadcrumb name1={"Trail Balance"} name2={"Search Trail Balance"} />

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
                  htmlFor="Component Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Component
                </label>
                <select
                  id="Component Name"
                  name="component_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All </option>
                  {Component?.map((data: any) => (
                    <option key={data?.id} value={data?.componentId}>
                      {" "}
                      {data?.componentName}{" "}
                    </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="Project Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Project
                </label>
                <select
                  id="Project Name"
                  name="project_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All </option>
                  {Project?.map((data: any) => (
                    <option value={data?.projectId}> {data?.name} </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="Partner Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  FInanceir
                </label>
                <select
                  id="Partner Name"
                  name="partner_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All</option>
                  {PartnerOrganization?.map((po: any) => (
                    <option value={po?.partnerId} key={po?.partnerId}>
                      {" "}
                      {po?.nameBn}{" "}
                    </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="Branch Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Work Station
                </label>
                <select
                  id="Branch Name"
                  name="branch_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value=""> All </option>
                  {branch?.map((data: any) => (
                    <>
                      {dropDownObj?.partner_name ==
                      data?.partnerOrganizationId ? (
                        <option value={data?.id}>
                          {data?.name} {data?.code}
                        </option>
                      ) : (
                        <>
                          {!dropDownObj?.partner_name && (
                            <option value={data?.id}>
                              {data?.name} {data?.code}
                            </option>
                          )}
                        </>
                      )}
                    </>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="training"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Voucher Type
                </label>
                <select
                  id="training"
                  name="training_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All</option>
                  {training?.map((data: any) => (
                    <option value={data.trainingId}>
                      {" "}
                      {data.trainingCode} - {data?.trainingName}{" "}
                    </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="Batch Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Ledger Head
                </label>
                <select
                  id="Batch Name"
                  name="batch_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">All</option>
                  {batch?.map((data: any) => (
                    <option value={data.batchId}> {data.batchNo} </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="relative">
                <label
                  htmlFor="Batch Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Report Type
                </label>
                <select
                  id="Batch Name"
                  name="batch_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">Single</option>
                  {batch?.map((data: any) => (
                    <option value={data.batchId}> {data.batchNo} </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="holidayStartDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  Start Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="holidayStartDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="Start Date"
                />
              </div>

              <div className="flex flex-col relative">
                <label
                  htmlFor="holidayEndDate"
                  className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
                >
                  End Date <span className="required_field">*</span>
                </label>

                <DateFormate
                  name="holidayEndDate"
                  setsingleData={setsingleData}
                  singleData={singleData}
                  required={true}
                  label="End Date"
                />
              </div>

              <div className="relative">
                <label
                  htmlFor="Batch Name"
                  className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white"
                >
                  Report Level
                </label>
                <select
                  id="Batch Name"
                  name="batch_name"
                  onChange={(e: any) =>
                    setdropDownObj({
                      ...dropDownObj,
                      [e.target.name]: e.target.value,
                    })
                  }
                  className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                >
                  <option value="">Head</option>
                  {batch?.map((data: any) => (
                    <option value={data.batchId}> {data.batchNo} </option>
                  ))}
                </select>
                <DropDownIcon />
              </div>
            </div>

            {/* Add Button - Right Aligned */}
            <div className="flex justify-end space-x-4 mt-4 mb-4">
              {/* <ResetButton /> */}
              {/* <SaveButton /> */}

              <div className="flex justify-end mt-5">
                <button className="bg-primaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 mr-7">
                  {/* <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.7601 3.77017V14.7317C16.7601 15.192 16.606 15.5763 16.2976 15.8847C15.9893 16.193 15.605 16.3472 15.1446 16.3472H2.37563C1.9153 16.3472 1.53097 16.193 1.22263 15.8847C0.914299 15.5763 0.760132 15.192 0.760132 14.7317V1.96267C0.760132 1.50233 0.914299 1.118 1.22263 0.809668C1.53097 0.501335 1.9153 0.347168 2.37563 0.347168H13.3371L16.7601 3.77017ZM15.7601 4.19717L12.9101 1.34717H2.37563C2.19613 1.34717 2.04863 1.40483 1.93313 1.52017C1.8178 1.63567 1.76013 1.78317 1.76013 1.96267V14.7317C1.76013 14.9112 1.8178 15.0587 1.93313 15.1742C2.04863 15.2895 2.19613 15.3472 2.37563 15.3472H15.1446C15.3241 15.3472 15.4716 15.2895 15.5871 15.1742C15.7025 15.0587 15.7601 14.9112 15.7601 14.7317V4.19717ZM8.76013 12.8857C9.31147 12.8857 9.78263 12.6902 10.1736 12.2992C10.5646 11.9082 10.7601 11.437 10.7601 10.8857C10.7601 10.3343 10.5646 9.86317 10.1736 9.47217C9.78263 9.08117 9.31147 8.88567 8.76013 8.88567C8.2088 8.88567 7.73763 9.08117 7.34663 9.47217C6.95563 9.86317 6.76013 10.3343 6.76013 10.8857C6.76013 11.437 6.95563 11.9082 7.34663 12.2992C7.73763 12.6902 8.2088 12.8857 8.76013 12.8857ZM3.52938 6.11642H10.9524V3.11642H3.52938V6.11642ZM1.76013 4.19717V15.3472V1.34717V4.19717Z" fill="white" />
                </svg> */}
                  Search
                </button>
              </div>
            </div>
          </div>
        </form>

        {participateTableShow ? (
          <Table
            rows={tbldata || []}
            column={columnMcp}
            getheaderColor={() => {}}
            selectableRows
            setSelectedRows={setSelectedRows}
          />
        ) : (
          <Table
            rows={tbldata || []}
            column={columnParticipate}
            getheaderColor={() => {}}
            selectableRows
            setSelectedRows={setSelectedRows}
          />
        )}

        <form
          action="submit"
          className="p-4 space-y-6"
          onSubmit={handleSubmit_Approval}
        >
          <div className="flex justify-end space-x-4 mt-4 mb-4">
            {/* <ResetButton /> */}
            <SendForApprovalButton />
          </div>
        </form>

        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"User Information"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              <p> {data?.mcpName} </p>
              <p>NID {data?.mcpNidNo} </p>
              <p>Phone {data?.mcpEmergencyMobileNo} </p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </motion.div>
    </>
  );
};

export default TrailBalance;
