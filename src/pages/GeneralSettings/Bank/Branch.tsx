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


const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

function Branch() {
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
  } = useFetch(`${API_URL}/bank-branches`);

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      const page_list = `${API_URL}/bank-branches/${id}`;
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
      const page_list = `${API_URL}/bank-branches/${id}`;
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

    const formData = new FormData(e.target);
    let obj: any = {};
    for (const [key, value] of formData) {
      console.log(key, ":", value);
      obj = { ...obj, [key]: value };
    }

    let page_list = `${API_URL}/bank-branches`;
    let method = "POST";

    if (singleData?.bankId) {
      page_list = `${API_URL}/bank-branches/${singleData?.bankId}`;
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

  console.log(`bank`, data);
  return (
    <div>
      {addFormShow ? (
        <Breadcrumb name1={"Branch"} name2={"Branch Setup"} />
      ) : (
        <BreadcumbWithButton
          name={"Branch"}
          url={"#"}
          setaddFormShow={setaddFormShow}
        />
      )}

      {/* <BreadcumbWithButton name={"Bank "} url={"/bank-add"} /> */}
      {addFormShow && (
        <form className="bg-white rounded-2xl p-5 drop-shadow-lg mb-5" onSubmit={handleSubmit}>
        <input
          type="hidden"
          name="bankId"
          value={singleData?.bankId}
        />
        {/* <p className="font-normal text-sm">Holiday ID:  <span className="text-primaryColor">2154UUHNGH</span></p> */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Date */}


          <div className="flex flex-col relative ">
          <label
            htmlFor="implementingMinistry"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Status
          </label>
          <select
            id="implementingMinistry"
            name="bankRecStatus"
            // value={implementingMinistry}
            // onChange={(e) => setImplementingMinistry(e.target.value)}
            className="w-1/4 border p-4 rounded appearance-none h-14"
          >
            <option
              value="A"
              selected={singleData?.bankRecStatus == "A"}
            >
              Active{" "}
            </option>
            <option
              value="I"
              selected={singleData?.bankRecStatus == "I"}
            >
              Inactive
            </option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none ml-56 mt-5">
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


        
          {/* <div className="flex flex-col relative">
            <label
              htmlFor="dateOfSigning"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Date
            </label>
            <input
              id="dateOfSigning"
              type="date"
              name="holidayDate"
              defaultValue={singleData?.holidayDate}
              // onChange={(e) => setDateOfSigning(e.target.value)}
              className="border p-4 rounded appearance-none h-14"
            />
            <span className="open-button">
              <button type="button">
                <svg
                  width="15"
                  height="17"
                  viewBox="0 0 15 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.17364 16.1293C1.76687 16.1293 1.42725 15.9931 1.15479 15.7206C0.882325 15.4481 0.746094 15.1085 0.746094 14.7017V3.4183C0.746094 3.01153 0.882325 2.67191 1.15479 2.39945C1.42725 2.12698 1.76687 1.99075 2.17364 1.99075H3.73684V0.0195312H4.68854V1.99075H11.0102V0.0195312H11.8939V1.99075H13.4571C13.8639 1.99075 14.2035 2.12698 14.4759 2.39945C14.7484 2.67191 14.8846 3.01153 14.8846 3.4183V14.7017C14.8846 15.1085 14.7484 15.4481 14.4759 15.7206C14.2035 15.9931 13.8639 16.1293 13.4571 16.1293H2.17364ZM2.17364 15.2456H13.4571C13.5932 15.2456 13.7178 15.189 13.8311 15.0758C13.9444 14.9625 14.001 14.8378 14.001 14.7017V6.95294H1.62975V14.7017C1.62975 14.8378 1.68638 14.9625 1.79964 15.0758C1.91289 15.189 2.03756 15.2456 2.17364 15.2456ZM1.62975 6.06906H14.001V3.4183C14.001 3.28222 13.9444 3.15755 13.8311 3.0443C13.7178 2.93104 13.5932 2.87441 13.4571 2.87441H2.17364C2.03756 2.87441 1.91289 2.93104 1.79964 3.0443C1.68638 3.15755 1.62975 3.28222 1.62975 3.4183V6.06906ZM7.81537 10.0795C7.63304 10.0795 7.47413 10.0119 7.33863 9.87653C7.20329 9.74118 7.13561 9.58227 7.13561 9.39979C7.13561 9.21746 7.20329 9.05863 7.33863 8.92328C7.47413 8.78793 7.63304 8.72026 7.81537 8.72026C7.99769 8.72026 8.15661 8.78793 8.2921 8.92328C8.42745 9.05863 8.49512 9.21746 8.49512 9.39979C8.49512 9.58227 8.42745 9.74118 8.2921 9.87653C8.15661 10.0119 7.99769 10.0795 7.81537 10.0795ZM4.28073 10.0795C4.0984 10.0795 3.93949 10.0119 3.804 9.87653C3.66865 9.74118 3.60098 9.58227 3.60098 9.39979C3.60098 9.21746 3.66865 9.05863 3.804 8.92328C3.93949 8.78793 4.0984 8.72026 4.28073 8.72026C4.46306 8.72026 4.62197 8.78793 4.75746 8.92328C4.89281 9.05863 4.96048 9.21746 4.96048 9.39979C4.96048 9.58227 4.89281 9.74118 4.75746 9.87653C4.62197 10.0119 4.46306 10.0795 4.28073 10.0795ZM11.35 10.0795C11.1677 10.0795 11.0088 10.0119 10.8733 9.87653C10.7379 9.74118 10.6702 9.58227 10.6702 9.39979C10.6702 9.21746 10.7379 9.05863 10.8733 8.92328C11.0088 8.78793 11.1677 8.72026 11.35 8.72026C11.5323 8.72026 11.6912 8.78793 11.8267 8.92328C11.9621 9.05863 12.0298 9.21746 12.0298 9.39979C12.0298 9.58227 11.9621 9.74118 11.8267 9.87653C11.6912 10.0119 11.5323 10.0795 11.35 10.0795ZM7.81537 13.4783C7.63304 13.4783 7.47413 13.4106 7.33863 13.2753C7.20329 13.14 7.13561 12.981 7.13561 12.7986C7.13561 12.6162 7.20329 12.4573 7.33863 12.3218C7.47413 12.1865 7.63304 12.1188 7.81537 12.1188C7.99769 12.1188 8.15661 12.1865 8.2921 12.3218C8.42745 12.4573 8.49512 12.6162 8.49512 12.7986C8.49512 12.981 8.42745 13.14 8.2921 13.2753C8.15661 13.4106 7.99769 13.4783 7.81537 13.4783ZM4.28073 13.4783C4.0984 13.4783 3.93949 13.4106 3.804 13.2753C3.66865 13.14 3.60098 12.981 3.60098 12.7986C3.60098 12.6162 3.66865 12.4573 3.804 12.3218C3.93949 12.1865 4.0984 12.1188 4.28073 12.1188C4.46306 12.1188 4.62197 12.1865 4.75746 12.3218C4.89281 12.4573 4.96048 12.6162 4.96048 12.7986C4.96048 12.981 4.89281 13.14 4.75746 13.2753C4.62197 13.4106 4.46306 13.4783 4.28073 13.4783ZM11.35 13.4783C11.1677 13.4783 11.0088 13.4106 10.8733 13.2753C10.7379 13.14 10.6702 12.981 10.6702 12.7986C10.6702 12.6162 10.7379 12.4573 10.8733 12.3218C11.0088 12.1865 11.1677 12.1188 11.35 12.1188C11.5323 12.1188 11.6912 12.1865 11.8267 12.3218C11.9621 12.4573 12.0298 12.6162 12.0298 12.7986C12.0298 12.981 11.9621 13.14 11.8267 13.2753C11.6912 13.4106 11.5323 13.4783 11.35 13.4783Z"
                    fill="#5F6368"
                  />
                </svg>
              </button>
            </span>
          </div> */}
          {/* Holiday Name */}
          <div className="flex flex-col relative mb-5">
            <label htmlFor="dateOfEffectiveness" className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Bank Name</label>
            <input
              id="dateOfEffectiveness"
              type="text"
              name="bankName"
              defaultValue={singleData?.bankName}
              // value={dateOfEffectiveness}
              // onChange={(e) => setDateOfEffectiveness(e.target.value)}
              className="border p-4 rounded h-14"
              placeholder="Sample Name here"
            />

          </div>
        </div>
        {/* Project Name */}
        <div className="flex flex-col relative mb-5 ">
          <label
            htmlFor="projectName"
            className=" text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor "
          >
            Description
          </label>
          <input
            id="projectName"
            type="text"
            name="bankDescription"
            defaultValue={singleData?.bankDescription}
            // value={projectName}
            // onChange={(e) => setProjectName(e.target.value)}
            placeholder="Description here"
            className="w-full border p-4 rounded h-16 text-sm"
          />
        </div>
        {/* Status */}
        <div className="flex flex-col relative ">
          <label
            htmlFor="implementingMinistry"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Status
          </label>
          <select
            id="implementingMinistry"
            name="bankRecStatus"
            // value={implementingMinistry}
            // onChange={(e) => setImplementingMinistry(e.target.value)}
            className="w-1/4 border p-4 rounded appearance-none h-14"
          >
            <option
              value="A"
              selected={singleData?.bankRecStatus == "A"}
            >
              Active{" "}
            </option>
            <option
              value="I"
              selected={singleData?.bankRecStatus == "I"}
            >
              Inactive
            </option>
          </select>
          <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none ml-56 mt-5">
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
        {
          singleData?.bankId ?

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

export default Branch
