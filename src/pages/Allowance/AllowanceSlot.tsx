import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const AllowanceSlot = () => {
    const [render, setrender] = useState(true);
    const [project, setProject] = useState([]);
    const [selectedProject, setSelectedProject] = useState<any>({});
    const [Training, setTraining] = useState([])
    const [selectedTraining, setSelectedTraining] = useState("")
    const [Batch, setBatch] = useState([])
    const [selectedBatch, setSelectedBatch] = useState("")
    const [allowanceType, setAllowanceType] = useState([])
    const [selectedAllowanceType, setSelectedAllowanceType] = useState("")
    const [AllowanceAmount, setAllowanceAmount] = useState<any>([])
    const [percentage, setPercentage] = useState(null);
    const [result, setResult] = useState<any>("");

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
        singleData
    } = useFetch(`${API_URL}/allowance-slots?currentPage=1&pageSize=10000`);


    const column = [
        {
            name: "Amount",
            selector: (row: any) => row.allowSlotAmount,
            sortable: true,
        },
        {
            name: "Slot Percentage",
            selector: (row: any) => row.allowSlotPercentage + "%",
            sortable: true,
        },
        {
            name: "Slot Period",
            selector: (row: any) => row.allowSlotPeriod,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: any) => row.allowSlotRecStatus,
            cell: (row: any) => <>{col_value(row.allowSlotRecStatus)}</>,
            conditionalCellStyles: [
                {
                    when: row => row.allowSlotRecStatus == "A",
                    style: row => ({ color: "green" }),
                },

                {
                    when: row => row.allowSlotRecStatus !== "A",
                    style: row => ({ color: "red" }),
                },
            ],
            sortable: true,
        },
        {
            name: "action",
            cell: (row: any) => <>{ActionButton(fetchDataByID, row?.allowanceSlotId)}</>,
        },
    ];
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

        let page_list = `${API_URL}/allowance-slots`;
        let method = "POST";

        if (singleData?.allowanceSlotId) {
            page_list = `${API_URL}/allowance-slots/${singleData?.allowanceSlotId}`;
            method = 'PUT'
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
        setsingleData(null)
    };


    const fetchDataByID = async (id: any, type = "") => {
        setrender(false)
        if (type == "edit") {
            const form: any = document.querySelector("form");
            form.reset();
            const page_list = `${API_URL}/allowance-slots/${id}`;
            const options = {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            fetchSingleDataCommonByID(page_list, options);
            setrender(true)
        }

        if (type == "delete") {
            const page_list = `${API_URL}/allowance-slots/${id}`;
            deleteData(page_list);
            // fetchData();
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
            //show success message
            Swal.fire({
                icon: "success",
                text: "Success",
                confirmButtonText: "Close",
            });
            const form: any = document.querySelector("form");
            form.reset();
            setsingleData(null)
            setcommon_Data(null);
            fetchData();
            setProject(null)
            setSelectedTraining(null)
            setSelectedBatch(null)
            setAllowanceType(null)
            setPercentage(null)
            setResult(null)
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


    // Fetch project
    useEffect(() => {
        const fetchProjectData = async () => {
            try {
                const response = await fetch(`${API_URL}/project?currentPage=1&pageSize=5000`, {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Check if the response is OK
                if (!response.ok) {
                    throw new Error("Error fetching projects.");
                }
                const data = await response.json();
                if (data?.content) {
                    const filteredProjects = data.content.filter((project: any) => project?.projectRecStatus === "A");
                    setProject(filteredProjects);
                    if (singleData?.allowSlotProjectId) {
                        const preselectedProject = filteredProjects.find(
                            (proj: any) => proj?.projectId === singleData.allowSlotProjectId
                        );
                        if (preselectedProject) {
                            setSelectedProject(preselectedProject.projectId);
                        }
                    }
                } else {
                    console.error("Error Fetching");
                }
            } catch (error) {
                console.error("Fetch project data error:", error.message);
            }
        };
        // Call the fetch function
        fetchProjectData();
    }, [singleData]);

    // Fetch project wise training
    useEffect(() => {
        if (selectedProject) {
            const fetchTraining = async () => {
                try {
                    const response = await fetch(`${API_URL}/project-training/by/project/${selectedProject}`,
                        {
                            headers: {
                                "content-type": "application/json",
                                Authorization: `Bearer ${token}`,
                            },
                        });
                    if (!response.ok) throw new Error("Error project wise Partner org.");
                    const data = await response.json();
                    console.log("project wise Partner org", data?.trainings)
                    setTraining(data?.trainings);

                    if (singleData?.allowSlotTrainingId) {
                        const preselectedTraining = data?.trainings?.find((training: any) => training?.trainingId === singleData.allowSlotTrainingId);
                        console.log("preselectedTraining", preselectedTraining)
                        if (preselectedTraining) {
                            setSelectedTraining(preselectedTraining.trainingId);
                        }
                    }

                } catch (error) {
                    console.error(error);
                }
            };
            fetchTraining();
        } else {
            setTraining([]); // Clear nth  is selected
        }
    }, [selectedProject, singleData]);


    // Fetch training wise batch
    useEffect(() => {
        if (selectedTraining) {
            const fetchTrainingBatch = async () => {
                try {
                    const response = await fetch(`${API_URL}/batch/getByTrainingId/${selectedTraining}`, {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) throw new Error("Error project wise Partner org.");
                    const data = await response.json();
                    setBatch(data);
                    if (singleData?.allowSlotBatchId) {
                        const preselectedBatch = data?.find((batch: any) => batch?.batchId === singleData?.allowSlotBatchId);
                        if (preselectedBatch) {
                            setSelectedBatch(preselectedBatch.batchId);
                        }
                    }
                } catch (error) {
                    console.error(error);
                }
            };
            fetchTrainingBatch();
        } else {
            setBatch([]); // Clear nth is selected
        }
    }, [selectedTraining, singleData]);

    // Fetch allowance type
    useEffect(() => {
        const fetchAllowance = async () => {
            try {
                const response = await fetch(`${API_URL}/allowance-types`, {
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Error fetching projects.");
                const data = await response.json();

                const filteredAllowance = data?.filter((filterAllow: any) => filterAllow?.allowanceTypeRecStatus === "A");
                setAllowanceType(filteredAllowance);
                console.log("allowancetype", allowanceType)

                if (singleData?.allowSlotAllowanceTypeId) {
                    const preselectedAllowanceType = data?.find((type: any) => type?.allowanceTypeId === singleData?.allowSlotAllowanceTypeId);
                    if (preselectedAllowanceType) {
                        setSelectedAllowanceType(preselectedAllowanceType.batchId);
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllowance();
    }, [singleData]);

    // fetch allowance amount
    useEffect(() => {
        if (selectedBatch && singleData?.allowSlotAllowanceTypeId) {
            const fetchAllowanceAmount = async () => {
                try {
                    const response = await fetch(`${API_URL}/allowances?currentPage=1&pageSize=10&allowanceTypeId=${singleData?.allowSlotAllowanceTypeId}&batchId=${selectedBatch}`, {
                        headers: {
                            "content-type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (!response.ok) throw new Error("Error fetching projects.");
                    const data = await response.json();
                    const filteredAllowance = data?.content?.filter((filterAllow: any) => filterAllow?.allowanceRecStatus === "A");
                    console.log("filteredAllowance", filteredAllowance)
                    setAllowanceAmount(filteredAllowance);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchAllowanceAmount();
        }
        else {
            setAllowanceAmount([])
        }

    }, [selectedBatch, singleData?.allowSlotAllowanceTypeId, singleData]);


    console.log("singleData", singleData)

    const allowanceTotalAmounts = AllowanceAmount?.map(allowance => allowance?.allowanceTotalAmount);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setPercentage(inputValue);

        // Calculate the result based on the input value
        const calculatedResult =  (allowanceTotalAmounts * inputValue) / 100;
        setResult(calculatedResult);
    };

    return (
        <>
            <Breadcrumb name1={"Allowance Slot"} name2={"Allowance Slot"} />
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-5 drop-shadow-lg">
                <div className="grid grid-cols-3 gap-5">

                    {/* project */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            Project <span className="required_field">*</span>
                        </label>
                        <select
                            required
                            value={selectedProject}
                            onChange={(e) => setSelectedProject(e.target.value)}
                            name='allowSlotProjectId'
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                        >
                            <option value="">Select </option>
                            {project?.map((proj) => (
                                <option key={proj?.projectId} value={proj?.projectId} selected={proj?.projectId == singleData?.allowanceProjectId}>
                                    {proj?.name}</option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
                            </svg>
                        </div>
                    </div>

                    {/* Project wise training */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            Training <span className="required_field">*</span>
                        </label>
                        <select name='allowSlotTrainingId'
                            required
                            value={selectedTraining}
                            onChange={(e) => setSelectedTraining(e.target.value)}
                            className="mt-1 block w-full p-4 border border-gray-300 rounded-md shadow-sm appearance-none"
                        >
                            <option value="">Select</option>
                            {Training?.map((poT) => (
                                <option key={poT?.trainingId} value={poT?.trainingId} selected={poT?.trainingId === singleData?.allowanceTrainingId}>
                                    {poT?.trainingName}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
                            </svg>
                        </div>
                    </div>

                    {/* Batch */}
                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Batch <span className="required_field">*</span></label>
                        <select
                            id="batchId"
                            required
                            name="allowSlotBatchId"
                            className="border p-4 rounded appearance-none h-14"
                            value={selectedBatch}
                            onChange={(e) => setSelectedBatch(e.target.value)}
                        >
                            <option value="" >Select Batch</option>
                            {Batch?.map((Batches) => (
                                <option key={Batches?.batchId} value={Batches?.batchId} selected={Batches?.batchId == singleData?.allowanceBatchId}>
                                    {Batches?.batchNo}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
                            </svg>
                        </div>
                    </div>

                    {/* Allowance type */}
                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Allowance Type <span className="required_field">*</span></label>
                        <select
                            value={singleData?.allowSlotAllowanceTypeId}
                            onChange={(e) => {
                                setsingleData({ ...singleData, [e.target.name]: e.target.value })
                            }}
                            id=""
                            required
                            name="allowSlotAllowanceTypeId"
                            className="border p-4 rounded appearance-none h-14"
                        >
                            <option value="" >Select </option>
                            {allowanceType?.map((allowType) => (
                                <option key={allowType?.allowanceTypeId} value={allowType?.allowanceTypeId}
                                >
                                    {allowType?.allowanceTypeName}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
                            </svg>
                        </div>
                    </div>

                    {/* Allowance Amount */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            Allowance Amount <span className="required_field">*</span>
                        </label>
                        <select
                            id=""
                            required
                            name="allowSlotAllowanceId"
                            value={singleData?.allowSlotAllowanceId}
                            onChange={(e) => {
                                setsingleData({ ...singleData, [e.target.name]: e.target.value })
                            }}
                            className="border p-4 rounded appearance-none h-14 w-full"
                        >

                            {AllowanceAmount?.map((allowType) => (
                                <option key={allowType?.allowanceId} value={allowType?.allowanceId}
                                >
                                    {allowType?.allowanceTotalAmount}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
                            </svg>
                        </div>
                    </div>

                    {/* allowSlotSeqNo */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 absolute -mt-1 ml-4 bg-white">
                            Allowance Slot Number <span className="required_field">*</span>
                        </label>
                        <input name="allowSlotSeqNo" type="number" min={0} defaultValue={singleData?.allowSlotSeqNo}
                            className="border p-4 rounded appearance-none h-14 w-full" placeholder="Write Allowance Slot Number" required/>
                    </div>

                    {/* allowSlotPercentage */}
                    <div className="flex flex-col relative w-full">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                            Allowance Slot Percentage <span className="required_field">*</span>
                        </label>
                        <input
                            name="allowSlotPercentage"
                            type="number"
                            min={0}
                            value={percentage || singleData?.allowSlotPercentage}
                            onChange={handleInputChange}
                            className="border p-4 rounded appearance-none h-14"
                            placeholder="Write Allowance Slot Percentage"
                            required
                        />
                    </div>

                    {/* Allowance  Slot Amount */}
                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Slot Amount  <span className="required_field">*</span></label>
                        <input required
                            name="allowSlotAmount"
                            type="number"
                            min={0}
                            value={"" || result || singleData?.allowSlotAmount }
                            readOnly
                            className="border p-4 rounded appearance-none h-14"
                        />
                    </div>

                    {/* allowSlotPeriod */}
                    <div className="flex flex-col relative w-full ">
                        <label htmlFor="batch" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">Slot Period <span className="required_field">*</span></label>
                        <input name="allowSlotPeriod" type="number" min={0} defaultValue={singleData?.allowSlotPeriod} className="border p-4 rounded appearance-none h-14" placeholder="Write Slot Period" required/>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col relative ">
                        <label
                            htmlFor="implementingMinistry"
                            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                        >
                            Status <span className="required_field">*</span>
                        </label>
                        <select
                            id="implementingMinistry"
                            name="allowSlotRecStatus"
                            required
                            className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        >
                            {/* <option value="">Select</option> */}
                            <option value="A" selected={singleData?.allowSlotRecStatus == "A"}>Active </option>
                            <option value="I" selected={singleData?.allowSlotRecStatus == "I"}>Inactive</option>
                        </select>
                        <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] mt-5">
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
                {/* Add Button - Right Aligned */}
                {
                    singleData?.allowanceSlotId ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
                
            </form>
            <div className="mt-5">
                <Table rows={data?.content || []} column={column} getheaderColor={getheaderColor} />
            </div>
        </>
    )
}

export default AllowanceSlot