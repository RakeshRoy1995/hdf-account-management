import React from "react";
import { BreadcumbWithButton } from "@/shared/BreadcumbWithButton/BreadcumbWithButton";
import "react-datepicker/dist/react-datepicker.css";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import LoadingStudentTableSkeleton from "./LoadingProjectListSkeleton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const ProjectList = () => {
  const [value, setValue] = useState("1");
  const [completedProjects, setCompletedProjects] = useState<any>([]);
  const [onGoingProjects, setOnGoingProjects] = useState<any>([]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
  } = useFetch(`${API_URL}/project?currentPage=${1}&pageSize=${150}`);

  console.log("data==>", data?.content, "error==>", error, "loading", loading);
  // ssss
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day); // Convert DD/MM/YYYY to Date
  };
  /* Date Wise Filtering ---ON Going & Completed */
  // const filteingProject__based_on__date = () => {
  //   const allProjects = data?.content;

  //   console.log("allProjects", allProjects);

  //   if (allProjects?.length !== 0) {
  //     const currentDate = new Date();
  //     const onGoing = allProjects?.filter(
  //       (project: any) => new Date(project?.endDate) > currentDate,
  //     );
  //     const completed = allProjects?.filter(
  //       (project: any) => new Date(project?.endDate) <= currentDate,
  //     );

  //     setOnGoingProjects(onGoing);
  //     setCompletedProjects(completed);
  //   }
  // };
  const filteingProject__based_on__date = () => {
    const allProjects = data?.content;

    console.log("allProjects", allProjects);

    if (allProjects?.length !== 0) {
      const normalizeDate = (date) => new Date(date.setHours(0, 0, 0, 0));
      const currentDate = normalizeDate(new Date());

      const onGoing = allProjects?.filter((project) => {
        const endDate = normalizeDate(parseDate(project?.endDate));
        return endDate > currentDate;
      });

      const completed = allProjects?.filter((project) => {
        const endDate = normalizeDate(parseDate(project?.endDate));
        return endDate <= currentDate;
      });

      setOnGoingProjects(onGoing);
      setCompletedProjects(completed);
    }
  };
  // ssss
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

    let page_list = `${API_URL}/project`;
    let method = "POST";

    if (singleData?.holidayId) {
      page_list = `${API_URL}/project/${singleData?.holidayId}`;
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

  const fetchInitData = async () => {
    fetchData();
  };

  useEffect(() => {
    fetchInitData();
  }, []);

  useEffect(() => {
    filteingProject__based_on__date();
  }, [data]);

  useEffect(() => {
    if (common_data) {
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
      setcommon_Data(null);
      fetchData();
    }

    if (error) {
      console.log("error", error);

      Swal.fire({
        icon: "error",
        text: error?.data?.message,
        confirmButtonText: "Close",
      });
    }
  }, [error?.data?.timestamp, common_data, error]);

  useEffect(() => {
    if (deleteMsg) {
      setcommon_Data(null);
      fetchData();
    }
  }, [deleteMsg]);

  return (
    <div>
      <BreadcumbWithButton name={"Projects"} url={"/account/project-setup-add"} />

      <Box sx={{ width: "100%", typography: "body1" }} className="my-10">
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              onChange={handleTabChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Ongoing Projects" value="1" />
              <Tab label="Completed Projects" value="2" />
            </TabList>
          </Box>

          {/* Ongoing Projects */}
          <TabPanel value="1">
            <div className=" w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading ? (
                <LoadingStudentTableSkeleton number_Of_Card={15} />
              ) : (
                <>
                  {onGoingProjects?.map((project: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      whileHover={{
                        rotateY: 10,
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-full bg-white rounded-lg shadow-md pr-10 pl-5 py-6 ">
                        <Link to={`/project-edit/${project?.projectId}`}>
                          <div className="text-end mb-2">
                            <button>
                              <motion.svg
                                whileHover={{
                                  scale: 1.2, // Scale up the SVG on hover
                                  rotate: 15, // Rotate the SVG on hover
                                  fill: "#ff5722", // Change fill color on hover
                                }}
                                transition={{ duration: 0.3 }} // Speed of the animation
                                width="29"
                                height="29"
                                viewBox="0 0 29 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="14.2544"
                                  cy="14.2544"
                                  r="14.2544"
                                  fill="#3793E9"
                                  fillOpacity="0.1"
                                />
                                <path
                                  d="M7.69755 19.6713H8.63663L17.7865 10.5216L16.8472 9.58234L7.69755 18.7322V19.6713ZM6.84229 20.5265V18.3719L18.1153 7.08732C18.203 7.0092 18.2997 6.94884 18.4055 6.90622C18.5114 6.8636 18.6218 6.84229 18.7367 6.84229C18.8516 6.84229 18.9629 6.86039 19.0707 6.89659C19.1783 6.9328 19.2776 6.99801 19.3687 7.09224L20.2815 8.01015C20.3757 8.10109 20.4401 8.20087 20.4748 8.30949C20.5093 8.41825 20.5265 8.52694 20.5265 8.63556C20.5265 8.75145 20.507 8.86235 20.4679 8.96826C20.4289 9.07403 20.3667 9.17074 20.2815 9.25841L8.99691 20.5265H6.84229ZM17.3086 10.0602L16.8472 9.58234L17.7865 10.5216L17.3086 10.0602Z"
                                  fill="#3793E9"
                                />
                              </motion.svg>
                            </button>
                          </div>
                        </Link>

                        <div className="mb-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-QuaternaryColor">
                              Project Name
                            </span>
                            <span className="font-normal text-sm text-QuaternaryColor">
                              {project?.name}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="font-normal text-sm text-QuaternaryColor">
                              Project Cost
                            </span>
                            <span className="font-normal text-sm text-QuaternaryColor">
                              ${project?.totalProjectCost}
                            </span>
                          </div>
                          <div className="mt-6 p-4 bg-DecenaryColor border border-teal-500 rounded-lg flex items-center">
                            <div>
                              <p className="font-normal text-sm text-QuaternaryColor ">
                                No of Sector
                              </p>
                              <p className="text-lg font-bold text-teal-700">
                                {project?.sectorIds?.length || "0"}
                              </p>
                            </div>
                            <div className="ml-auto text-gray-500">
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 31.1537L10 25.7179V17.6408L5.12836 14.9999L20 6.92285L34.8717 14.9999V25.6412H33.205V15.9358L30 17.6408V25.7179L20 31.1537ZM20 21.1666L31.3846 14.9999L20 8.83327L8.61544 14.9999L20 21.1666ZM20 29.2533L28.3334 24.7533V18.5574L20 23.0708L11.6667 18.5574V24.7533L20 29.2533Z"
                                  fill="#909090"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </TabPanel>

          {/* Completed Projects */}
          <TabPanel value="2">
            <div className=" w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {loading ? (
                <LoadingStudentTableSkeleton number_Of_Card={15} />
              ) : (
                <>
                  {completedProjects?.map((project: any, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ rotateX: -90, opacity: 0 }}
                      animate={{ rotateX: 0, opacity: 1 }}
                      exit={{ rotateX: 90, opacity: 0 }}
                      whileHover={{
                        rotateY: 10,
                        boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut",
                      }}
                    >
                      <div className="w-full bg-white rounded-lg shadow-md pr-10 pl-5 py-6 ">
                        <Link to={`/project-edit/${project?.projectId}`}>
                          <div className="text-end mb-2">
                            <button>
                              <motion.svg
                                whileHover={{
                                  scale: 1.2, // Scale up the SVG on hover
                                  rotate: 15, // Rotate the SVG on hover
                                  fill: "#ff5722", // Change fill color on hover
                                }}
                                transition={{ duration: 0.3 }} // Speed of the animation
                                width="29"
                                height="29"
                                viewBox="0 0 29 29"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <circle
                                  cx="14.2544"
                                  cy="14.2544"
                                  r="14.2544"
                                  fill="#3793E9"
                                  fillOpacity="0.1"
                                />
                                <path
                                  d="M7.69755 19.6713H8.63663L17.7865 10.5216L16.8472 9.58234L7.69755 18.7322V19.6713ZM6.84229 20.5265V18.3719L18.1153 7.08732C18.203 7.0092 18.2997 6.94884 18.4055 6.90622C18.5114 6.8636 18.6218 6.84229 18.7367 6.84229C18.8516 6.84229 18.9629 6.86039 19.0707 6.89659C19.1783 6.9328 19.2776 6.99801 19.3687 7.09224L20.2815 8.01015C20.3757 8.10109 20.4401 8.20087 20.4748 8.30949C20.5093 8.41825 20.5265 8.52694 20.5265 8.63556C20.5265 8.75145 20.507 8.86235 20.4679 8.96826C20.4289 9.07403 20.3667 9.17074 20.2815 9.25841L8.99691 20.5265H6.84229ZM17.3086 10.0602L16.8472 9.58234L17.7865 10.5216L17.3086 10.0602Z"
                                  fill="#3793E9"
                                />
                              </motion.svg>
                            </button>
                          </div>
                        </Link>

                        <div className="mb-2">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-sm text-QuaternaryColor">
                              Project Name
                            </span>
                            <span className="font-normal text-sm text-QuaternaryColor">
                              {project?.name}
                            </span>
                          </div>

                          <div className="flex justify-between items-center mt-4">
                            <span className="font-normal text-sm text-QuaternaryColor">
                              Project Cost
                            </span>
                            <span className="font-normal text-sm text-QuaternaryColor">
                              ${project?.totalProjectCost}
                            </span>
                          </div>

                          <div className="flex items-center mt-4 ">
                            <span className="font-normal text-sm text-QuaternaryColor mr-4 ">
                              Progress
                            </span>
                            <div className="w-full bg-gray-200 rounded-full h-3 ">
                              <div
                                className="bg-primaryColor h-3 rounded-full flex items-center justify-end p-1 text-white text-xs"
                                style={{ width: `${30}%` }}
                              >
                                {30}%
                              </div>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-DecenaryColor border border-teal-500 rounded-lg flex items-center">
                            <div>
                              <p className="font-normal text-sm text-QuaternaryColor ">
                                No of Sector
                              </p>
                              <p className="text-lg font-bold text-teal-700">
                                {project?.sectorIds?.length || "0"}
                              </p>
                            </div>
                            <div className="ml-auto text-gray-500">
                              <svg
                                width="40"
                                height="40"
                                viewBox="0 0 40 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 31.1537L10 25.7179V17.6408L5.12836 14.9999L20 6.92285L34.8717 14.9999V25.6412H33.205V15.9358L30 17.6408V25.7179L20 31.1537ZM20 21.1666L31.3846 14.9999L20 8.83327L8.61544 14.9999L20 21.1666ZM20 29.2533L28.3334 24.7533V18.5574L20 23.0708L11.6667 18.5574V24.7533L20 29.2533Z"
                                  fill="#909090"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </>
              )}
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default ProjectList;
