import Breadcrumb from '@/shared/Breadcumb/Breadcrumb'
import { motion } from "framer-motion";
import { useEffect, useState } from 'react';
import useFetch from "@/hooks/useFetch";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { popupmsg } from '@/utils';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const DepositProductType = () => {

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
        singleData
    } = useFetch(`${API_URL}/deposit-product-types`);

    const column = [
        {
            name: "Amount",
            selector: (row: any) => row.dptName,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row: any) => row.dptRecStatus,
            cell: (row: any) => <>{col_value(row.dptRecStatus)}</>,
            conditionalCellStyles: [
                {
                    when: row => row.dptRecStatus == "A",
                    style: row => ({ color: "green" }),
                },

                {
                    when: row => row.dptRecStatus !== "A",
                    style: row => ({ color: "red" }),
                },
            ],
            sortable: true,
        },
        {
            name: "action",
            cell: (row: any) => <>{ActionButton(fetchDataByID, row?.depositProductTypeId)}</>,
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

        let page_list = `${API_URL}/deposit-product-types`;
        let method = "POST";

        if (singleData?.depositProductTypeId) {
            page_list = `${API_URL}/deposit-product-types/${singleData?.depositProductTypeId}`;
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
            const page_list = `${API_URL}/deposit-product-types/${id}`;
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
            const page_list = `${API_URL}/deposit-product-types/${id}`;
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
            console.log("common_data",common_data)
            popupmsg(common_data?.dptName,"Added")
            //show success message
            // Swal.fire({
            //     icon: "success",
            //     text: `${common_data?.dptName} has been added successfully `,
            //     confirmButtonText: "Close",
            // });
            const form: any = document.querySelector("form");
            form.reset();
            setsingleData(null)
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
            <Breadcrumb name1={"Deposit Product Types"} name2={"Deposit Product Types"} />
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-10">


                    <input type="hidden" name="id" value={singleData?.id} />
                    <div className="grid grid-cols-2 gap-5 bg-white rounded-xl shadow-md p-10">
                        {/*  Name */}
                        <div className="flex flex-col relative mb-5">
                            <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
                                Deposit Name<span className="required_field">*</span>
                            </label>
                            <input
                                name="dptName"
                                required
                                id="dptName"
                                type="text"
                                placeholder="Write Deposit Name"
                                className="border p-4 rounded-md h-14 text-sm"
                                defaultValue={singleData?.dptName}
                                maxLength={30}
                            />
                        </div>

                        {/* Status */}
                        <div className="flex flex-col relative ">
                            <label
                                htmlFor="implementingMinistry"
                                className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
                            >
                                Status<span className="required_field">*</span>
                            </label>
                            <select
                                id="dptRecStatus"
                                name="dptRecStatus"
                                required
                                className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                            >

                                <option value="A" selected={singleData?.dptRecStatus == "A"}>Active </option>
                                <option value="I" selected={singleData?.dptRecStatus == "I"}>Inactive</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[450px] mt-5">
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
                    <div className="mb-5">
                        {
                            singleData ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
                    </div>
                </form>
                <div className='mt-5 rounded-2xl shadow-xl '>
                <Table rows={data || []} column={column} getheaderColor={getheaderColor} />
                </div>

            </motion.div>

        </>
    )
}

export default DepositProductType

// import { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { z } from 'zod';
// import { zodResolver } from '@hookform/resolvers/zod';
// import Swal from 'sweetalert2';
// import { motion } from 'framer-motion';

// import ActionButton from '@/shared/Table/ActionButton';
// import { col_value } from '@/shared/Table/utils';
// import useFetch from '@/hooks/useFetch';
// import Breadcrumb from '@/shared/Breadcumb/Breadcrumb';
// import UpdateButton from '@/shared/components/ButttonsCollection/UpdateButton';
// import AddButton from '@/shared/components/ButttonsCollection/AddButton';
// import Table from '@/shared/Table/Table';
// const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
// const token = localStorage.getItem("token");
// const schema = z.object({
//     dptName: z.string().min(1, "Deposit Name is required").max(30, "Deposit Name cannot exceed 30 characters"),
//     dptRecStatus: z.enum(["A", "I"], { required_error: "Status is required" })
// });

// const DepositProductType = () => {
//     const [render, setRender] = useState(true);
//     const { data, loading, error, fetchData, deleteData, deleteMsg, common_data, fetchDataCommon, setcommonData, fetchSingleDataCommonByID, setsingleData, singleData } = useFetch(`${API_URL}/deposit-product-types`);

//     const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm({
//         resolver: zodResolver(schema),
//         defaultValues: {
//             dptName: singleData?.dptName || "",
//             dptRecStatus: singleData?.dptRecStatus || "A"
//         }
//     });

//     const onSubmit = async (formData) => {
//         let page_list = `${API_URL}/deposit-product-types`;
//         let method = "POST";

//         if (singleData?.depositProductTypeId) {
//             page_list = `${API_URL}/deposit-product-types/${singleData?.depositProductTypeId}`;
//             method = 'PUT';
//         }

//         const options = {
//             method,
//             data: formData,
//             headers: {
//                 "content-type": "application/json",
//                 Authorization: `Bearer ${token}`
//             }
//         };

//         await fetchDataCommon(page_list, options);
//         setsingleData(null);
//         reset();
//     };

//     const fetchDataByID = async (id, type = "") => {
//         setRender(false);
//         if (type === "edit") {
//             const page_list = `${API_URL}/deposit-product-types/${id}`;
//             const options = {
//                 method: "get",
//                 headers: {
//                     "content-type": "application/json",
//                     Authorization: `Bearer ${token}`
//                 }
//             };

//             const data = await fetchSingleDataCommonByID(page_list, options);
//             setRender(true);

//             // Update form fields with fetched data
//             setValue("dptName", data?.dptName || "");
//             setValue("dptRecStatus", data?.dptRecStatus || "A");
//         } else if (type === "delete") {
//             const page_list = `${API_URL}/deposit-product-types/${id}`;
//             deleteData(page_list);
//         }
//     };

//     useEffect(() => {
//         fetchData();
//     }, []);

//     useEffect(() => {
//         if (common_data) {
//             Swal.fire({
//                 icon: "success",
//                 text: `${common_data?.dptName} has been added successfully `,
//                 confirmButtonText: "Close"
//             });
//             setsingleData(null);

//             fetchData();
//         }
//         if (error) {
//             Swal.fire({
//                 icon: "error",
//                 text: error?.data?.message || error,
//                 confirmButtonText: "Close"
//             });
//         }
//     }, [error, common_data]);

//     useEffect(() => {
//         if (deleteMsg) {

//             fetchData();
//         }
//     }, [deleteMsg]);

//     const column = [
//         { name: "Amount", selector: row => row.dptName, sortable: true },
//         {
//             name: "Status",
//             selector: row => row.dptRecStatus,
//             cell: row => <>{col_value(row.dptRecStatus)}</>,
//             conditionalCellStyles: [
//                 { when: row => row.dptRecStatus === "A", style: { color: "green" }},
//                 { when: row => row.dptRecStatus !== "A", style: { color: "red" }},
//             ],
//             sortable: true
//         },
//         { name: "Action", cell: row => <>{ActionButton(fetchDataByID, row?.depositProductTypeId)}</> }
//     ];

//     const getHeaderColor = status => status === "Active" ? "text-green-500" : "text-red-500";

//     return (
//         <>
//             <Breadcrumb name1={"Deposit Product Types"} name2={"Deposit Product Types"} />
//             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
//                 <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-10">
//                     <input type="hidden" name="id" value={singleData?.id} />
//                     <div className="grid grid-cols-2 gap-5 bg-white rounded-xl shadow-md p-10">
//                         {/* Name */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="dptName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Deposit Name<span className="required_field">*</span>
//                             </label>
//                             <input
//                                 {...register("dptName")}
//                                 id="dptName"
//                                 type="text"
//                                 placeholder="Write Deposit Name"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                             />
//                             {errors.dptName && <p className="text-red-500 text-sm">{errors.dptName.message}</p>}
//                         </div>

//                         {/* Status */}
//                         <div className="flex flex-col relative">
//                             <label htmlFor="dptRecStatus" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Status<span className="required_field">*</span>
//                             </label>
//                             <select
//                                 {...register("dptRecStatus")}
//                                 id="dptRecStatus"
//                                 className="w-full border p-4 rounded appearance-none h-14"
//                             >
//                                 <option value="A">Active</option>
//                                 <option value="I">Inactive</option>
//                             </select>
//                             {errors.dptRecStatus && <p className="text-red-500 text-sm">{errors.dptRecStatus.message}</p>}
//                         </div>
//                     </div>
//                     <div className="mb-5">
//                         {singleData
//                             ? <UpdateButton setSingleData={setsingleData} loading={loading} />
//                             : <AddButton setSingleData={setsingleData} loading={loading} />}
//                     </div>
//                 </form>
//                 <div className="mt-5 rounded-2xl shadow-xl">
//                     <Table rows={data || []} column={column} getHeaderColor={getHeaderColor} />
//                 </div>
//             </motion.div>
//         </>
//     );
// };

// export default DepositProductType;
