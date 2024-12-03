// import Breadcrumb from '@/shared/Breadcumb/Breadcrumb'
// import { motion } from "framer-motion";
// import { useEffect, useState } from 'react';
// import useFetch from "@/hooks/useFetch";
// import ActionButton from "@/shared/Table/ActionButton";
// import Table from "@/shared/Table/Table";
// import { col_value } from "@/shared/Table/utils";
// import Swal from "sweetalert2";
// import AddButton from "@/shared/components/ButttonsCollection/AddButton";
// import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
// import { DecimalPlaces, customeMaxLength, popupmsg } from '@/utils';

// const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
// const token = localStorage.getItem("token");

// const DepositeProduct = () => {
//     const [render, setrender] = useState(true);
//     const [isOverDraftFacility, setIsOverDraftFacility] = useState<boolean>()
//     const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>()
//     const [depositProductTypeId, setDepositProductTypeId] = useState([])
//     const {
//         data,
//         loading,
//         error,
//         fetchData,
//         deleteData,
//         deleteMsg,
//         common_data,
//         fetchDataCommon,
//         setcommon_Data,
//         fetchSingleDataCommonByID,
//         setsingleData,
//         singleData
//     } = useFetch(`${API_URL}/deposit-products`);

//     const column = [
//         {
//             name: "dp Product Name",
//             selector: (row: any) => row.dpProductName,
//             sortable: true,
//         },
//         {
//             name: "dp Interest Rate Type",
//             selector: (row: any) => row.dpInterestRateType,
//             sortable: true,
//         },
//         {
//             name: "dp Interest Rate",
//             selector: (row: any) => row.dpInterestRate,
//             sortable: true,
//         },
//         {
//             name: "Status",
//             selector: (row: any) => row.dpRecStatus,
//             cell: (row: any) => <>{col_value(row.dpRecStatus)}</>,
//             conditionalCellStyles: [
//                 {
//                     when: row => row.dpRecStatus == "A",
//                     style: row => ({ color: "green" }),
//                 },

//                 {
//                     when: row => row.dpRecStatus !== "A",
//                     style: row => ({ color: "red" }),
//                 },
//             ],
//             sortable: true,
//         },
//         {
//             name: "action",
//             cell: (row: any) => <>{ActionButton(fetchDataByID, row?.depositProductId)}</>,
//         },
//     ];

//     const getheaderColor = (status: string) => {
//         return status === "Active" ? "text-green-500" : "text-red-500";
//     };

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();

//         const formData = new FormData(e.target);
//         let obj: any = {};
//         for (const [key, value] of formData) {
//             console.log(key, ":", value);
//             obj = { ...obj, [key]: value };
//         }

//         let page_list = `${API_URL}/deposit-products`;
//         let method = "POST";

//         if (singleData?.depositProductId) {
//             page_list = `${API_URL}/deposit-products/${singleData?.depositProductId}`;
//             method = 'PUT'
//         }
//         const options = {
//             method,
//             data: obj,
//             headers: {
//                 "content-type": "application/json",
//                 Authorization: `Bearer ${token}`,
//             },
//         };
//         fetchDataCommon(page_list, options);
//         setsingleData(null)
//     };

//     const fetchDataByID = async (id: any, type = "") => {
//         setrender(false)
//         if (type == "edit") {
//             const form: any = document.querySelector("form");
//             form.reset();
//             const page_list = `${API_URL}/deposit-products/${id}`;
//             const options = {
//                 method: "get",
//                 headers: {
//                     "content-type": "application/json",
//                     Authorization: `Bearer ${token}`,
//                 },
//             };

//             fetchSingleDataCommonByID(page_list, options);
//             setrender(true)
//         }

//         if (type == "delete") {
//             const page_list = `${API_URL}/deposit-products/${id}`;
//             deleteData(page_list);
//             // fetchData();
//         }

//     };

//     const fetchInitData = async () => {
//         fetchData();
//     };

//     useEffect(() => {
//         fetchInitData();
//     }, []);

//     useEffect(() => {

//         if (common_data) {
//             console.log("common_data", common_data)
//             popupmsg(common_data?.dpProductName, "Added")
//             //show success message
//             // Swal.fire({
//             //     icon: "success",
//             //     text: `${common_data?.dptName} has been added successfully `,
//             //     confirmButtonText: "Close",
//             // });
//             const form: any = document.querySelector("form");
//             form.reset();
//             setsingleData(null)
//             setcommon_Data(null);
//             fetchData();
//         }

//         if (error) {
//             //show error message
//             Swal.fire({
//                 icon: "error",
//                 text: error?.data?.message ? error?.data?.message : error,
//                 confirmButtonText: "Close",
//             });
//         }
//     }, [error?.data?.timestamp, common_data, error]);

//     useEffect(() => {
//         if (deleteMsg) {
//             //show success message
//             setcommon_Data(null);
//             fetchData();
//         }
//     }, [deleteMsg]);

//     // Fetch deposit product type
//     useEffect(() => {
//         const fetchDepositProdType = async () => {
//             try {
//                 const response = await fetch(`${API_URL}/deposit-product-types`, {
//                     headers: {
//                         "content-type": "application/json",
//                         Authorization: `Bearer ${token}`,
//                     },
//                 });

//                 // Check if the response is OK
//                 if (!response.ok) {
//                     throw new Error("Error fetching projects.");
//                 }
//                 const data = await response.json();
//                 if (data) {
//                     const filteredPTypes = data?.filter((DepositProductType: any) => DepositProductType?.dptRecStatus === "A");
//                     setDepositProductTypeId(filteredPTypes);
//                     // if (singleData?.allowSlotProjectId) {
//                     //     const preselectedProject = filteredProjects.find(
//                     //         (proj: any) => proj?.projectId === singleData.allowSlotProjectId
//                     //     );
//                     //     if (preselectedProject) {
//                     //         setSelectedProject(preselectedProject.projectId);
//                     //     }
//                     // }
//                 } else {
//                     console.error("Error Fetching");
//                 }
//             } catch (error) {
//                 console.error("Fetch project data error:", error.message);
//             }
//         };
//         // Call the fetch function
//         fetchDepositProdType();
//     }, [singleData]);
//     // /deposit-product-types

//     return (
//         <>
//             <Breadcrumb name1={"Deposit Product"} name2={"Deposit Product"} />
//             <motion.div
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 1 }}
//             >
//                 <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-10">

//                     {/* <input type="hidden" name="id" value={singleData?.id} /> */}
//                     <div className="grid grid-cols-3 gap-5 bg-white rounded-xl shadow-md p-10">
// {/* tab-1 */}
//                         {/*  dpProductName */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Product Name <span className="required_field">*</span>
//                             </label>
//                             <input
//                                 name="dpProductName"
//                                 required
//                                 id="dpProductName"
//                                 type="text"
//                                 placeholder="Write Product Name here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpProductName}
//                                 maxLength={50}
//                             />
//                         </div>

//                         {/*  dpProductCode */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Product Code<span className="required_field">*</span>
//                             </label>
//                             <input
//                                 name="dpProductCode"
//                                 required
//                                 id="dpProductCode"
//                                 type="text"
//                                 placeholder="Write Product Code here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpProductCode}
//                                 maxLength={4}
//                             />
//                         </div>

//                         {/*  dpProductDesc */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Product Description
//                             </label>
//                             <textarea
//                                 name="dpProductDesc"

//                                 id="dpProductDesc"
//                                 placeholder="Write Product Description here"
//                                 className="border p-4 rounded-md h-14 text-sm appearance-none"
//                                 value={singleData?.dpProductDesc}
//                                 maxLength={200}
//                             />
//                         </div>

//                         {/*  dpDepositProductTypeId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Deposit Product Type<span className="required_field">*</span>
//                             </label>
//                             <select
//                                 className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpDepositProductTypeId"
//                                 id=""
//                                 value={singleData?.dpDepositProductTypeId}
//                                 onChange={(e) => {
//                                     setsingleData({ ...singleData, dpDepositProductTypeId: e.target.value });
//                                   }}
//                                 required>
//                                 <option value="">Select</option>
//                                 {depositProductTypeId?.map((DPI) => (
//                                     <option key={DPI?.depositProductTypeId} value={DPI?.depositProductTypeId}
//                                         selected={DPI?.depositProductTypeId == singleData?.dpDepositProductTypeId}>{DPI?.dptName}</option>
//                                 ))}

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpInterestRateType */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Rate Type<span className="required_field">*</span>
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestRateType" id="">
//                                 <option value="VARIABLE">VARIABLE</option>
//                                 <option value="FIXED">FIXED</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* dpInterestRate */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Rate<span className="required_field">*</span>
//                             </label>
//                             <input
//                                 name="dpInterestRate"
//                                 required
//                                 id="dpInterestRate"
//                                 type="number"

//                                 placeholder="Write Interest Rate here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpInterestRate}
//                                 step="1.11"
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/*  dpInterestCalcFrequency */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Calculation Frequency<span className="required_field">*</span>
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestCalcFrequency" id="">
//                                 <option value="DAILY">DAILY</option>
//                                 <option value="MONTHLY">MONTHLY</option>
//                                 <option value="YEARLY">YEARLY</option>
//                                 <option value="ANNUALLY">ANNUALLY</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpInterestPayFrequency */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Pay Frequency<span className="required_field">*</span>
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestPayFrequency" id="">
//                                 <option value="MONTHLY">MONTHLY</option>
//                                 <option value="YEARLY">YEARLY</option>
//                                 <option value="ANNUALLY">ANNUALLY</option>
//                                 <option value="MATURITY">MATURITY</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpInterestAccrualMethod */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Accrual Method<span className="required_field">*</span>
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestAccrualMethod" id="">
//                                 <option value="SIMPLE">SIMPLE</option>
//                                 <option value="COMPOUND">COMPOUND</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* dpMinDepositAmount */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Minimum Deposit Amount
//                             </label>
//                             <input
//                                 name="dpMinDepositAmount"

//                                 id="dpMinDepositAmount"
//                                 type="number"
//                                 placeholder="Write Minimum Deposit Amount here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMinDepositAmount}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpMaxDepositAmount */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Maximum Deposit Amount
//                             </label>
//                             <input
//                                 name="dpMaxDepositAmount"

//                                 id="dpMaxDepositAmount"
//                                 type="number"
//                                 placeholder="Write Maximum Deposit Amount here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMaxDepositAmount}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpMinBalanceToEarnInterest */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Minimum Balance To Earn Interest
//                             </label>
//                             <input
//                                 name="dpMinBalanceToEarnInterest"

//                                 id="dpMinBalanceToEarnInterest"
//                                 type="number"
//                                 placeholder="Write Minimum Balance To Earn Interest here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMinBalanceToEarnInterest}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>
// {/* tab-2 */}
//                         {/* dpDepositTerm */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Deposit Term<span className="required_field">*</span>
//                             </label>
//                             <input
//                                 name="dpDepositTerm"
//                                 required
//                                 id="dpDepositTerm"
//                                 type="number"
//                                 placeholder="Write Deposit Term here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpDepositTerm}
//                                 min={0}
//                                 onInput={(e) => {
//                                     customeMaxLength(e, 1);
//                                 }}
//                             />
//                         </div>

//                         {/* dpPenaltyEarlyWithdraw */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Penalty Early Withdraw
//                             </label>
//                             <input
//                                 name="dpPenaltyEarlyWithdraw"

//                                 id="dpPenaltyEarlyWithdraw"
//                                 type="number"
//                                 placeholder="Write Penalty Early Withdraw here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpPenaltyEarlyWithdraw}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/*  dpWithdrawFrequency */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Withdraw Frequency
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpWithdrawFrequency" id="">
//                                 <option value="DAILY">DAILY</option>
//                                 <option value="MONTHLY">MONTHLY</option>
//                                 <option value="YEARLY">YEARLY</option>
//                                 <option value="NONE">NONE</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* dpPenaltyGracePeriod */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Penalty Grace Period
//                             </label>
//                             <input
//                                 name="dpPenaltyGracePeriod"

//                                 id="dpPenaltyGracePeriod"
//                                 type="number"
//                                 placeholder="Write Penalty Grace Period here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpPenaltyGracePeriod}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpAccountOpeningFee */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Account Opening Fee
//                             </label>
//                             <input
//                                 name="dpAccountOpeningFee"

//                                 id="dpAccountOpeningFee"
//                                 type="number"
//                                 placeholder="Write Account Opening Fee here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpAccountOpeningFee}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpMaintenanceFee */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Maintenance Fee
//                             </label>
//                             <input
//                                 name="dpMaintenanceFee"

//                                 id="dpMaintenanceFee"
//                                 type="number"
//                                 placeholder="Write Maintenance Fee here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMaintenanceFee}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpTransactionFee */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Transaction Fee
//                             </label>
//                             <input
//                                 name="dpTransactionFee"

//                                 id="dpTransactionFee"
//                                 type="number"
//                                 placeholder="Write Transaction Fee here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpTransactionFee}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpStructureFee */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Structure Fee
//                             </label>
//                             <input
//                                 name="dpStructureFee"

//                                 id="dpStructureFee"
//                                 type="number"
//                                 placeholder="Write Structure Fee here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpStructureFee}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/*  dpCustomerType */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Withdraw Frequency<span className="required_field">*</span>
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpCustomerType" id="">
//                                 <option value="INDIVIDUAL">INDIVIDUAL</option>
//                                 <option value="GROUP">GROUP</option>
//                                 <option value="BUSINESS">BUSINESS</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* dpMinAgeRestriction */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Minimum Age Restriction
//                             </label>
//                             <input
//                                 name="dpMinAgeRestriction"

//                                 id="dpMinAgeRestriction"
//                                 type="number"
//                                 placeholder="Write Minimum Age Restriction here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMinAgeRestriction}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpMaxAgeRestriction */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Maximum Age Restriction
//                             </label>
//                             <input
//                                 name="dpMaxAgeRestriction"

//                                 id="dpMaxAgeRestriction"
//                                 type="number"
//                                 placeholder="Write Maximum Age Restriction here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpMaxAgeRestriction}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/*  dpGeographicRestriction */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Geographic Restriction
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpGeographicRestriction" id="">
//                                 <option value=""></option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpStatementFrequency */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Statement Frequency
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpStatementFrequency" id="">
//                                 <option value="MONTHLY">MONTHLY</option>
//                                 <option value="QUARTERLY">QUARTERLY</option>
//                                 <option value="ANNUALLY">ANNUALLY</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpNotificationPreferences */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Notification Preferences
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpNotificationPreferences" id="">
//                                 <option value="SMS">SMS</option>
//                                 <option value="EMAIL">EMAIL</option>
//                                 <option value="APP">APP</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* dpOverdraftFacility */}
//                         <div className="flex flex-col relative border-2 border-gray-100 h-14">
//                             <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
//                                 Overdraft Facility
//                             </label>
//                             <div className="flex justify-around">
//                                 {/* Yes - Overdraft Facility */}
//                                 <label className="flex items-center mr-4">
//                                     <input
//                                         type="radio"
//                                         name="dpOverdraftFacility"
//                                         value="true"
//                                         onChange={() => {
//                                             setsingleData({ ...singleData, isOverDraftFacility: true });
//                                             setIsOverDraftFacility(true); // Track selection
//                                         }}
//                                         id="true"
//                                         className="border p-4 rounded-md h-14 text-sm mr-1"
//                                         checked={isOverDraftFacility === true || singleData?.dpOverdraftFacility===true} // Updated here
//                                     />
//                                     Yes
//                                 </label>

//                                 {/* No - Overdraft Facility */}
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         name="dpOverdraftFacility"
//                                         value="false"
//                                         onChange={() => {
//                                             setsingleData({ ...singleData, isOverDraftFacility: false });
//                                             setIsOverDraftFacility(false); // Track selection
//                                         }}
//                                         id="false"
//                                         className="border p-4 rounded-md h-14 text-sm mr-1"
//                                         checked={isOverDraftFacility === false || singleData?.dpOverdraftFacility===false} // Updated here
//                                     />
//                                     No
//                                 </label>
//                             </div>
//                         </div>

//                         {/* dpOverdraftLimit */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Overdraft Limit
//                             </label>
//                             <input
//                                 name="dpOverdraftLimit"

//                                 id="dpOverdraftLimit"
//                                 type="number"
//                                 placeholder="Write Overdraft Limit here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpOverdraftLimit}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpOverdraftInterestRate */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Overdraft Interest Rate
//                             </label>
//                             <input
//                                 name="dpOverdraftInterestRate"

//                                 id="dpOverdraftInterestRate"
//                                 type="number"
//                                 placeholder="Write Overdraft Interest Rate here"
//                                 className="border p-4 rounded-md h-14 text-sm"
//                                 value={singleData?.dpOverdraftInterestRate}
//                                 min={0}
//                                 onChange={(e) => {
//                                     DecimalPlaces(e, 8);
//                                 }}
//                             />
//                         </div>

//                         {/* dpAutoRenewal */}
//                         <div className="flex flex-col relative border-2 border-gray-100 h-14">
//                             <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
//                                 Auto Renewal
//                             </label>
//                             <div className="flex justify-around">
//                                 {/* Yes - Trainer */}
//                                 <label className="flex items-center mr-4">
//                                     <input
//                                         required
//                                         type="radio"
//                                         name="dpAutoRenewal"
//                                         value="true"
//                                         onChange={() => {
//                                             setsingleData({ ...singleData, isAutoRenewal: true });
//                                             setIsAutoRenewal(true); // Track selection
//                                         }}
//                                         id="true"
//                                         className="border p-4 rounded-md h-14 text-sm mr-1"
//                                         checked={isAutoRenewal === true}
//                                     />
//                                     Yes
//                                 </label>

//                                 {/* No - Employee */}
//                                 <label className="flex items-center">
//                                     <input
//                                         type="radio"
//                                         name="dpAutoRenewal"
//                                         value="false"
//                                         onChange={() => {
//                                             setsingleData({ ...singleData, isAutoRenewal: false });
//                                             setIsAutoRenewal(false); // Track selection
//                                         }}
//                                         id="false"
//                                         className="border p-4 rounded-md h-14 text-sm mr-1"
//                                         checked={isAutoRenewal === false}
//                                     />
//                                     No
//                                 </label>
//                             </div>
//                         </div>

//                         {/*  dpPayoutMaturity */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Payout Maturity
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpPayoutMaturity" id="">
//                                 <option value="DEPOSIT">DEPOSIT</option>
//                                 <option value="TRANSFER">TRANSFER</option>
//                                 <option value="CASH OUT">CASH OUT</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>
// {/* tab-3 */}
//                         {/*  dpDepositReceiveGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Deposit Receive GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpDepositReceiveGLId" id="">
//                                 <option value="">Select</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpInterestPaymentGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Payment GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestPaymentGLId" id="">
//                                 <option value="">Select</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpInterestExpenseGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Interest Expense GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpInterestExpenseGLId" id="">
//                                 <option value="">Select</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpPenaltyWithdrawalGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Penalty Withdrawal GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpPenaltyWithdrawalGLId" id="">
//                                 <option value="">Select</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpMaturityPayoutGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Maturity Payout GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpMaturityPayoutGLId" id="">
//                                 <option value="">Select</option>

//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/*  dpAccruedInterestGLId */}
//                         <div className="flex flex-col relative mb-5">
//                             <label htmlFor="projectName" className="text-sm absolute -mt-2 ml-4 mb-2 bg-white">
//                                 Accrued Interest GL
//                             </label>
//                             <select className='w-full sm:w-full border p-4 rounded appearance-none h-14'
//                                 name="dpAccruedInterestGLId" id="">
//                                 <option value="">Select</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                         {/* Status */}
//                         <div className="flex flex-col relative ">
//                             <label
//                                 htmlFor="implementingMinistry"
//                                 className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
//                             >
//                                 Status<span className="required_field">*</span>
//                             </label>
//                             <select
//                                 id="dpRecStatus"
//                                 name="dpRecStatus"
//                                 required
//                                 className="w-full sm:w-full border p-4 rounded appearance-none h-14"
//                             >

//                                 <option value="A" selected={singleData?.dpRecStatus == "A"}>Active </option>
//                                 <option value="I" selected={singleData?.dpRecStatus == "I"}>Inactive</option>
//                             </select>
//                             <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
//                                 <svg
//                                     width="22"
//                                     height="22"
//                                     viewBox="0 0 22 22"
//                                     fill="none"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                 >
//                                     <path
//                                         d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
//                                         fill="#5F6368"
//                                     />
//                                 </svg>
//                             </div>
//                         </div>

//                     </div>
//                     {/* Add Button - Right Aligned */}
//                     <div className="mb-5">
//                         {
//                             singleData?.depositProductId ? <UpdateButton setsingleData={setsingleData} loading={loading} /> : <AddButton setsingleData={setsingleData} loading={loading} />}
//                     </div>
//                 </form>
//                 <div className='mt-5 rounded-2xl shadow-xl '>
//                     <Table rows={data || []} column={column} getheaderColor={getheaderColor} />
//                 </div>
//             </motion.div>
//         </>
//     )
// }

// export default DepositeProduct

import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import ActionButton from "@/shared/Table/ActionButton";
import Table from "@/shared/Table/Table";
import { col_value } from "@/shared/Table/utils";
import Swal from "sweetalert2";
import AddButton from "@/shared/components/ButttonsCollection/AddButton";
import UpdateButton from "@/shared/components/ButttonsCollection/UpdateButton";
import { DecimalPlaces, customeMaxLength, popupmsg } from "@/utils";
import DropDownIcon from "@/shared/svg/DropDownIcon";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const DepositeProduct = () => {
  const [render, setrender] = useState(true);
  const [isOverDraftFacility, setIsOverDraftFacility] = useState<boolean>();
  const [isAutoRenewal, setIsAutoRenewal] = useState<boolean>();
  const [depositProductTypeId, setDepositProductTypeId] = useState([]);
  const [activeTab, setActiveTab] = useState(1); // Control the active tab

  const tabVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };
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
  } = useFetch(`${API_URL}/deposit-products`);

  const column = [
    {
      name: "dp Product Name",
      selector: (row: any) => row.dpProductName,
      sortable: true,
    },
    {
      name: "dp Interest Rate Type",
      selector: (row: any) => row.dpInterestRateType,
      sortable: true,
    },
    {
      name: "dp Interest Rate",
      selector: (row: any) => row.dpInterestRate,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: any) => row.dpRecStatus,
      cell: (row: any) => <>{col_value(row.dpRecStatus)}</>,
      conditionalCellStyles: [
        {
          when: (row) => row.dpRecStatus == "A",
          style: (row) => ({ color: "green" }),
        },

        {
          when: (row) => row.dpRecStatus !== "A",
          style: (row) => ({ color: "red" }),
        },
      ],
      sortable: true,
    },
    {
      name: "action",
      cell: (row: any) => (
        <>{ActionButton(fetchDataByID, row?.depositProductId)}</>
      ),
    },
  ];

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  // const handleSubmit = async (e: any) => {
  //     e.preventDefault();

  //     const formData = new FormData(e.target);
  //     let obj: any = {};
  //     // for (const [key, value] of formData) {
  //     //     console.log(key, ":", value);
  //     //     obj = { ...obj, [key]: value };
  //     // }
  //     console.log("sss", typeof(singleData))

  //     let page_list = `${API_URL}/deposit-products`;
  //     let method = "POST";

  //     if (singleData?.depositProductId) {
  //         page_list = `${API_URL}/deposit-products/${singleData?.depositProductId}`;
  //         method = 'PUT'
  //     }
  //     const options = {
  //         method,
  //         data: singleData,
  //         headers: {
  //             "content-type": "application/json",
  //             Authorization: `Bearer ${token}`,
  //         },
  //     };
  //     fetchDataCommon(page_list, options);
  //     // setsingleData(null)
  // };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Define the endpoint and method based on presence of `depositProductId`
    let page_list = `${API_URL}/deposit-products`;
    let method = "POST";

    if (singleData?.depositProductId) {
      page_list = `${API_URL}/deposit-products/${singleData.depositProductId}`;
      method = "PUT";
    }

    // Define fetch options with `singleData` directly as JSON
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: singleData, // Convert `singleData` to JSON
    };

    // Fetch request with options
    try {
      await fetchDataCommon(page_list, options);
      console.log("Data submitted successfully:", singleData);
    } catch (error) {
      console.error("Error submitting data:", error);
    }

    // Optionally reset `singleData` to clear the form
    setsingleData({}); // Reset to initial state if needed
  };

  const fetchDataByID = async (id: any, type = "") => {
    setrender(false);
    if (type == "edit") {
      const form: any = document.querySelector("form");
      form.reset();
      const page_list = `${API_URL}/deposit-products/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      fetchSingleDataCommonByID(page_list, options);
      setrender(true);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/deposit-products/${id}`;
      deleteData(page_list);
      // fetchData();
    }
  };

  const fetchInitData = async () => {
    setsingleData({ ...singleData, ["dpRecStatus"]: "A" });
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    if (common_data) {
      console.log("common_data", common_data);
      popupmsg(common_data?.dpProductName, "Added");
      //show success message
      // Swal.fire({
      //     icon: "success",
      //     text: `${common_data?.dptName} has been added successfully `,
      //     confirmButtonText: "Close",
      // });
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

  // Fetch deposit product type
  useEffect(() => {
    const fetchDepositProdType = async () => {
      try {
        const response = await fetch(`${API_URL}/deposit-product-types`, {
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
        if (data) {
          const filteredPTypes = data?.filter(
            (DepositProductType: any) =>
              DepositProductType?.dptRecStatus === "A",
          );
          setDepositProductTypeId(filteredPTypes);
          // if (singleData?.allowSlotProjectId) {
          //     const preselectedProject = filteredProjects.find(
          //         (proj: any) => proj?.projectId === singleData.allowSlotProjectId
          //     );
          //     if (preselectedProject) {
          //         setSelectedProject(preselectedProject.projectId);
          //     }
          // }
        } else {
          console.error("Error Fetching");
        }
      } catch (error) {
        console.error("Fetch project data error:", error.message);
      }
    };
    // Call the fetch function
    fetchDepositProdType();
  }, []);
  // /deposit-product-types

  return (
    <>
      <Breadcrumb name1={"Deposit Product"} name2={"Deposit Product"} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-10">
          <div className="p-4">
            {/* Tab Header */}
            <div className="flex space-x-4 mb-4">
              <button
                type="button"
                onClick={() => handleTabChange(1)}
                className={`px-4 py-2 ${activeTab === 1 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Product Information
              </button>
              <button
                type="button"
                onClick={() => handleTabChange(2)}
                className={`px-4 py-2 ${activeTab === 2 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Calculation Information
              </button>
              <button
                type="button"
                onClick={() => handleTabChange(3)}
                className={`px-4 py-2 ${activeTab === 3 ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"}`}
              >
                Account Information
              </button>
            </div>

            {/* Tab Content */}
            <motion.div
              key={activeTab} // This key is important to allow Framer Motion to animate between tabs
              initial="initial"
              animate="animate"
              exit="exit"
              variants={tabVariants}
              className="space-y-6"
            >
              {activeTab === 1 && (
                <>
                  {/* Tab 1 content */}

                  {/*  dpProductName */}
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 bg-white rounded-xl shadow-md p-10">
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Product Name <span className="required_field">*</span>
                      </label>
                      <input
                        name="dpProductName"
                        required
                        id="dpProductName"
                        type="text"
                        placeholder="Write Product Name here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpProductName || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpProductName: e.target.value,
                          })
                        }
                        maxLength={50}
                      />
                    </div>

                    {/*  dpProductCode */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Product Code<span className="required_field">*</span>
                      </label>
                      <input
                        name="dpProductCode"
                        required
                        id="dpProductCode"
                        type="text"
                        placeholder="Write Product Code here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpProductCode || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpProductCode: e.target.value,
                          })
                        }
                        maxLength={4}
                      />
                    </div>

                    {/*  dpProductDesc */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Product Description
                      </label>
                      <textarea
                        name="dpProductDesc"
                        id="dpProductDesc"
                        placeholder="Write Product Description here"
                        className="border p-4 rounded-md h-14 text-sm appearance-none"
                        value={singleData?.dpProductDesc || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpProductDesc: e.target.value,
                          })
                        }
                        maxLength={200}
                      />
                    </div>

                    {/*  dpDepositProductTypeId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Deposit Product Type
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpDepositProductTypeId"
                        id=""
                        value={singleData?.dpDepositProductTypeId}
                        onChange={(e) => {
                          setsingleData({
                            ...singleData,
                            dpDepositProductTypeId: e.target.value,
                          });
                        }}
                        required
                      >
                        <option value="">Select</option>
                        {depositProductTypeId?.map((DPI) => (
                          <option
                            key={DPI?.depositProductTypeId}
                            value={DPI?.depositProductTypeId}
                            selected={
                              DPI?.depositProductTypeId ==
                              singleData?.dpDepositProductTypeId
                            }
                          >
                            {DPI?.dptName}
                          </option>
                        ))}
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpInterestRateType */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Rate Type
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestRateType"
                        id=""
                        value={singleData?.dpInterestRateType || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpInterestRateType: e.target.value,
                          })
                        }
                      >
                        <option value="VARIABLE">Variable</option>
                        <option value="FIXED">Fixed</option>
                      </select>
                      {/* <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[460px] xl:ml-[280px] mt-5">
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
                                            </div> */}
                      <DropDownIcon />
                    </div>

                    {/* dpInterestRate */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Rate<span className="required_field">*</span>
                      </label>
                      <input
                        name="dpInterestRate"
                        required
                        id="dpInterestRate"
                        type="number"
                        placeholder="Write Interest Rate here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpInterestRate || ""}
                        step="1.11"
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpInterestRate: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/*  dpInterestCalcFrequency */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Calculation Frequency
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestCalcFrequency"
                        value={singleData?.dpInterestCalcFrequency || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpInterestCalcFrequency: e.target.value,
                          })
                        }
                        id=""
                      >
                        <option value="DAILY">Daily</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="ANNUALLY">Annually</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpInterestPayFrequency */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Pay Frequency
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestPayFrequency"
                        id=""
                        value={singleData?.dpInterestPayFrequency || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpInterestPayFrequency: e.target.value,
                          })
                        }
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="YEARLY">Yearly</option>
                        <option value="ANNUALLY">Annually</option>
                        <option value="MATURITY">Maturity</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpInterestAccrualMethod */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Accrual Method
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestAccrualMethod"
                        id=""
                        value={singleData?.dpInterestAccrualMethod || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpInterestAccrualMethod: e.target.value,
                          })
                        }
                      >
                        <option value="SIMPLE">Simple</option>
                        <option value="COMPOUND">Compound</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/* dpMinDepositAmount */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Minimum Deposit Amount
                      </label>
                      <input
                        name="dpMinDepositAmount"
                        min={0}
                        id="dpMinDepositAmount"
                        type="number"
                        placeholder="Write Minimum Deposit Amount here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMinDepositAmount || ""}
                        step="1.11"
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpMinDepositAmount: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpMaxDepositAmount */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Maximum Deposit Amount
                      </label>
                      <input
                        name="dpMaxDepositAmount"
                        id="dpMaxDepositAmount"
                        type="number"
                        placeholder="Write Maximum Deposit Amount here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMaxDepositAmount}
                        min={0}
                        step="1.11"
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpMaxDepositAmount: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpMinBalanceToEarnInterest */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Minimum Balance To Earn Interest
                      </label>
                      <input
                        name="dpMinBalanceToEarnInterest"
                        id="dpMinBalanceToEarnInterest"
                        type="number"
                        placeholder="Write Minimum Balance To Earn Interest here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMinBalanceToEarnInterest}
                        min={0}
                        step="1.11"
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpMinBalanceToEarnInterest: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {/* Add other fields for Tab 1 here */}

                  <div className="flex justify-end mt-6">
                    <button
                      className="bg-primaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 mr-7"
                      type="button"
                      onClick={() => handleTabChange(2)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {activeTab === 2 && (
                <>
                  {/* Tab 2 content */}
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 bg-white rounded-xl shadow-md p-10">
                    {/* dpDepositTerm */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Deposit Term<span className="required_field">*</span>
                      </label>
                      <input
                        name="dpDepositTerm"
                        required
                        id="dpDepositTerm"
                        type="number"
                        placeholder="Write Deposit Term here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpDepositTerm || ""}
                        onChange={(e) => {
                          setsingleData({
                            ...singleData,
                            dpDepositTerm: e.target.value,
                          });
                        }}
                        min={0}
                        onInput={(e) => {
                          customeMaxLength(e, 3);
                        }}
                      />
                    </div>

                    {/* dpPenaltyEarlyWithdraw */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Penalty Early Withdraw
                      </label>
                      <input
                        name="dpPenaltyEarlyWithdraw"
                        id="dpPenaltyEarlyWithdraw"
                        type="number"
                        placeholder="Write Penalty Early Withdraw here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpPenaltyEarlyWithdraw || ""}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpPenaltyEarlyWithdraw: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/*  dpWithdrawFrequency */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Withdraw Frequency
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpWithdrawFrequency"
                        id=""
                        value={singleData?.dpWithdrawFrequency || ""}
                        onChange={(e) => {
                          setsingleData({
                            ...singleData,
                            dpWithdrawFrequency: e.target.value,
                          });
                        }}
                      >
                        <option value="DAILY">Daily</option>
                        <option value="MONTHLY">Monthly</option>
                        <option value="WEEKLY">Weekly</option>
                        <option value="NONE">None</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/* dpPenaltyGracePeriod */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Penalty Grace Period
                      </label>
                      <input
                        name="dpPenaltyGracePeriod"
                        id="dpPenaltyGracePeriod"
                        type="number"
                        placeholder="Write Penalty Grace Period here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpPenaltyGracePeriod}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpPenaltyGracePeriod: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpAccountOpeningFee */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Account Opening Fee
                      </label>
                      <input
                        name="dpAccountOpeningFee"
                        id="dpAccountOpeningFee"
                        type="number"
                        placeholder="Write Account Opening Fee here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpAccountOpeningFee}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpAccountOpeningFee: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpMaintenanceFee */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Maintenance Fee
                      </label>
                      <input
                        name="dpMaintenanceFee"
                        id="dpMaintenanceFee"
                        type="number"
                        placeholder="Write Maintenance Fee here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMaintenanceFee}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpMaintenanceFee: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpTransactionFee */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Transaction Fee
                      </label>
                      <input
                        name="dpTransactionFee"
                        id="dpTransactionFee"
                        type="number"
                        placeholder="Write Transaction Fee here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpTransactionFee}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpTransactionFee: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpStructureFee */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Structure Fee
                      </label>
                      <input
                        name="dpStructureFee"
                        id="dpStructureFee"
                        type="number"
                        placeholder="Write Structure Fee here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpStructureFee}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpStructureFee: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/*  dpCustomerType */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Withdraw Frequency
                        <span className="required_field">*</span>
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpCustomerType"
                        id=""
                        value={singleData?.dpCustomerType || ""}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpCustomerType: e.target.value,
                          })
                        }
                      >
                        <option value="INDIVIDUAL">Individual</option>
                        <option value="GROUP">Group</option>
                        <option value="BUSINESS">Business</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/* dpMinAgeRestriction */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Minimum Age Restriction
                      </label>
                      <input
                        name="dpMinAgeRestriction"
                        id="dpMinAgeRestriction"
                        type="number"
                        placeholder="Write Minimum Age Restriction here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMinAgeRestriction}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 3);
                          setsingleData({
                            ...singleData,
                            dpMinAgeRestriction: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpMaxAgeRestriction */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Maximum Age Restriction
                      </label>
                      <input
                        name="dpMaxAgeRestriction"
                        id="dpMaxAgeRestriction"
                        type="number"
                        placeholder="Write Maximum Age Restriction here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpMaxAgeRestriction}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 3);
                          setsingleData({
                            ...singleData,
                            dpMaxAgeRestriction: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/*  dpGeographicRestriction */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Geographic Restriction
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpGeographicRestriction"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpStatementFrequency */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Statement Frequency
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpStatementFrequency"
                        id=""
                        value={singleData?.dpStatementFrequency}
                        onChange={(e) => {
                          setsingleData({
                            ...singleData,
                            dpStatementFrequency: e.target.value,
                          });
                        }}
                      >
                        <option value="MONTHLY">Monthly</option>
                        <option value="QUARTERLY">Quarterly</option>
                        <option value="ANNUALLY">Annually</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpNotificationPreferences */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Notification Preferences
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpNotificationPreferences"
                        id=""
                        value={singleData?.dpNotificationPreferences}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpNotificationPreferences: e.target.value,
                          })
                        }
                      >
                        <option value="SMS">SMS</option>
                        <option value="EMAIL">Email</option>
                        <option value="APP">APP</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/* dpOverdraftFacility */}
                    <div className="flex flex-col relative border-2 border-gray-100 h-14">
                      <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                        Overdraft Facility
                      </label>
                      <div className="flex justify-around">
                        {/* Yes - Overdraft Facility */}
                        <label className="flex items-center mr-4">
                          <input
                            type="radio"
                            name="dpOverdraftFacility"
                            value="true"
                            onChange={() => {
                              setsingleData({
                                ...singleData,
                                isOverDraftFacility: true,
                              });
                              setIsOverDraftFacility(true); // Track selection
                            }}
                            id="true"
                            className="border p-4 rounded-md h-14 text-sm mr-1"
                            checked={
                              isOverDraftFacility === true ||
                              singleData?.dpOverdraftFacility === true
                            } // Updated here
                          />
                          Yes
                        </label>

                        {/* No - Overdraft Facility */}
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="dpOverdraftFacility"
                            value="false"
                            onChange={() => {
                              setsingleData({
                                ...singleData,
                                isOverDraftFacility: false,
                              });
                              setIsOverDraftFacility(false); // Track selection
                            }}
                            id="false"
                            className="border p-4 rounded-md h-14 text-sm mr-1"
                            checked={
                              isOverDraftFacility === false ||
                              singleData?.dpOverdraftFacility === false
                            } // Updated here
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/* dpOverdraftLimit */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Overdraft Limit
                      </label>
                      <input
                        name="dpOverdraftLimit"
                        id="dpOverdraftLimit"
                        type="number"
                        placeholder="Write Overdraft Limit here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpOverdraftLimit || ""}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpOverdraftLimit: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpOverdraftInterestRate */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Overdraft Interest Rate
                      </label>
                      <input
                        name="dpOverdraftInterestRate"
                        id="dpOverdraftInterestRate"
                        type="number"
                        placeholder="Write Overdraft Interest Rate here"
                        className="border p-4 rounded-md h-14 text-sm"
                        value={singleData?.dpOverdraftInterestRate}
                        min={0}
                        onChange={(e) => {
                          DecimalPlaces(e, 8);
                          setsingleData({
                            ...singleData,
                            dpOverdraftInterestRate: e.target.value,
                          });
                        }}
                      />
                    </div>

                    {/* dpAutoRenewal */}
                    <div className="flex flex-col relative border-2 border-gray-100 h-14">
                      <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
                        Auto Renewal
                      </label>
                      <div className="flex justify-around">
                        {/* Yes - Trainer */}
                        <label className="flex items-center mr-4">
                          <input
                            required
                            type="radio"
                            name="dpAutoRenewal"
                            value="true"
                            onChange={() => {
                              setsingleData({
                                ...singleData,
                                isAutoRenewal: true,
                              });
                              setIsAutoRenewal(true); // Track selection
                            }}
                            id="true"
                            className="border p-4 rounded-md h-14 text-sm mr-1"
                            checked={isAutoRenewal === true}
                          />
                          Yes
                        </label>

                        {/* No - Employee */}
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="dpAutoRenewal"
                            value="false"
                            onChange={() => {
                              setsingleData({
                                ...singleData,
                                isAutoRenewal: false,
                              });
                              setIsAutoRenewal(false); // Track selection
                            }}
                            id="false"
                            className="border p-4 rounded-md h-14 text-sm mr-1"
                            checked={isAutoRenewal === false}
                          />
                          No
                        </label>
                      </div>
                    </div>

                    {/*  dpPayoutMaturity */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Payout Maturity
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpPayoutMaturity"
                        id=""
                        value={singleData?.dpPayoutMaturity}
                        onChange={(e) => {
                          setsingleData({
                            ...singleData,
                            dpOverdraftInterestRate: e.target.value,
                          });
                        }}
                      >
                        <option value="DEPOSIT">DEPOSIT</option>
                        <option value="TRANSFER">TRANSFER</option>
                        <option value="CASH OUT">CASH OUT</option>
                      </select>
                      <DropDownIcon />
                    </div>
                  </div>
                  {/* Add other fields for Tab 2 here */}

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      className="bg-secondaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 mr-7 "
                      onClick={() => handleTabChange(1)}
                    >
                      Previous
                    </button>
                    <button
                      className="bg-primaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 mr-7"
                      type="button"
                      onClick={() => handleTabChange(3)}
                    >
                      Next
                    </button>
                  </div>
                </>
              )}

              {activeTab === 3 && (
                <>
                  {/* Tab 3 content */}
                  <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-5 bg-white rounded-xl shadow-md p-10">
                    {/*  dpDepositReceiveGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Deposit Receive GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpDepositReceiveGLId"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpInterestPaymentGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Payment GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestPaymentGLId"
                        id=""
                        value={singleData?.dpInterestPaymentGLId}
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            dpInterestPaymentGLId: e.target.name,
                          })
                        }
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpInterestExpenseGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Interest Expense GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpInterestExpenseGLId"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpPenaltyWithdrawalGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Penalty Withdrawal GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpPenaltyWithdrawalGLId"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpMaturityPayoutGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Maturity Payout GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpMaturityPayoutGLId"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
                    </div>

                    {/*  dpAccruedInterestGLId */}
                    <div className="flex flex-col relative mb-5">
                      <label
                        htmlFor="projectName"
                        className="text-sm absolute -mt-2 ml-4 mb-2 bg-white"
                      >
                        Accrued Interest GL
                      </label>
                      <select
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                        name="dpAccruedInterestGLId"
                        id=""
                      >
                        <option value="">Select</option>
                      </select>
                      <DropDownIcon />
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
                        id="dpRecStatus"
                        name="dpRecStatus"
                        required
                        onChange={(e) =>
                          setsingleData({
                            ...singleData,
                            [e.target.name]: e.target.value,
                          })
                        }
                        className="w-full sm:w-full border p-4 rounded appearance-none h-14"
                      >
                        <option
                          value="A"
                          selected={singleData?.dpRecStatus == "A"}
                        >
                          Active{" "}
                        </option>
                        <option
                          value="I"
                          selected={singleData?.dpRecStatus == "I"}
                        >
                          Inactive
                        </option>
                      </select>
                      <DropDownIcon />
                    </div>
                    {/* Add Button - Right Aligned */}
                    <div className=" mb-5">
                      {singleData?.depositProductId ? (
                        <UpdateButton
                          setsingleData={setsingleData}
                          loading={loading}
                        />
                      ) : (
                        <AddButton
                          setsingleData={setsingleData}
                          loading={loading}
                        />
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end mt-6">
                    <button
                      type="button"
                      className="bg-secondaryColor font-bold text-sm text-white rounded-lg px-5 py-3 flex justify-center items-center gap-2 mr-7 "
                      onClick={() => handleTabChange(2)}
                    >
                      Previous
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </form>

        <div className="mt-5 rounded-2xl shadow-xl ">
          <Table
            rows={data || []}
            column={column}
            getheaderColor={getheaderColor}
          />
        </div>
      </motion.div>
    </>
  );
};

export default DepositeProduct;
