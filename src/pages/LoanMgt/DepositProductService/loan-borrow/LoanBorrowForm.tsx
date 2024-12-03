import Breadcrumb from "@/shared/Breadcumb/Breadcrumb";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PersonInfo from "@/pages/LandingPage/loan-borrow/PersonInfo";
import PersonLand from "@/pages/LandingPage/loan-borrow/PersonLand";
import PersonAssest from "@/pages/LandingPage/loan-borrow/PersonAssest";
import AnnualIncome from "@/pages/LandingPage/loan-borrow/AnnualIncome";
import AnnualExpense from "@/pages/LandingPage/loan-borrow/AnnualExpense";
import Liability from "@/pages/LandingPage/loan-borrow/Liability";
import "aos/dist/aos.css";
import AOS from "aos";
import { submitFormData } from "@/api/Reqest";
import { formatDate_3 } from "@/utils";
import Swal from "sweetalert2";
import Image from "@/pages/LandingPage/loan-borrow/Image";
import Table from "@/shared/Table/Table";
import ActionButton from "@/shared/Table/ActionButton";

const steps = [
  "Personal Info",
  "Land",
  "Personal Assets",
  "Annual Income",
  "Annual Expense",
  "Liability",
  "Image",
];

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

const LoanBorrowForm = () => {
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
  } = useFetch(`${API_URL}/persons?currentPage=1&pageSize=2000`);

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = async () => {
    let newSkipped = skipped;
    try {
      if (activeStep == 0) {
        const obj: any = {
          photoUrl: "",
          signatureUrl: "",

          firstName: "",
          lastName: "",
          fullName: "",
          fullNameBn: "",
          fathersName: "",
          mothersName: "",
          gender: "",
          maritalStatus: "",
          spouseName: null,
          lastAcademicQualification: "BACHELOR",
          religion: "ISLAM",
          dateOfBirth: "",
          nidNo: "",
          brNo: null,
          passportNo: "",
          mobileNo: "",
          altMobileNo: "",
          email: "",

          presentAddress: {
            divisionId: "",
            divisionName: "",
            districtId: "",
            districtName: "",
            cityCorporationId: null,
            cityCorporationName: null,
            upazilaId: null,
            upazilaName: null,
            pourasabhaId: null,
            pourasabhaName: null,
            unionId: null,
            unionName: null,
            villageId: null,
            villageName: null,
            wardId: null,
            wardName: null,
            postCode: "",
            address: "",
          },

          permanentAddress: {
            divisionId: "",
            divisionName: "",
            districtId: "",
            districtName: "",
            cityCorporationId: null,
            cityCorporationName: null,
            upazilaId: null,
            upazilaName: null,
            pourasabhaId: null,
            pourasabhaName: null,
            unionId: null,
            unionName: null,
            villageId: null,
            villageName: null,
            wardId: null,
            wardName: null,
            postCode: "",
            address: "",
          },
        };

        for (const key in singleData) {
          if (key.startsWith("parmanent.")) {
            const locationKey = key.split("parmanent.")[1];
            obj.permanentAddress[locationKey] = singleData[key];
          } else if (key.startsWith("location.")) {
            const locationKey = key.split(".")[1];
            obj.presentAddress[locationKey] = singleData[key];
          } else if (key == "dateOfBirth") {
            obj[key] = formatDate_3(singleData[key]);
          } else {
            obj[key] = singleData[key]; // Handle general fields
          }
        }

        console.log(`singleddddData`,singleData , obj );

        obj["fullName"] = singleData?.firstName + " " + singleData?.lastName;

        let page_list = `${API_URL}/persons`;
        let method = "POST";

        if (singleData?.personId) {
          page_list = `${API_URL}/persons/${singleData?.personId}`;
          method = "PUT";
        }

        const option = {
          method: method,
          data: obj,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        if (data_user?.data?.personId) {
          setsingleData({
            ...singleData,
            ["personId"]: data_user?.data?.personId,
            ["personal_info"]: data_user?.data,
          });
        }
      }

      if (activeStep == 1) {
        const page_list = `${API_URL}/person-lands/add/list`;

        const option = {
          method: "POST",
          data: singleData?.personLands,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        setsingleData({
          ...singleData,
          ["personLands"]: data_user?.data,
        });
      }

      if (activeStep == 2) {
        const page_list = `${API_URL}/person-assets/add/list`;

        const option = {
          method: "POST",
          data: singleData?.personAssets,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        setsingleData({
          ...singleData,
          ["personAssets"]: data_user?.data,
        });
      }

      if (activeStep == 3) {
        const page_list = `${API_URL}/person-annual-incomes/add/list`;

        const option = {
          method: "POST",
          data: singleData?.personAnnualIncomes,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        setsingleData({
          ...singleData,
          ["personAnnualIncomes"]: data_user?.data,
        });
      }

      if (activeStep == 4) {
        const page_list = `${API_URL}/person-annual-expenses/add/list`;

        const option = {
          method: "POST",
          data: singleData?.personAnnualExpenses,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        setsingleData({
          ...singleData,
          ["personAnnualExpenses"]: data_user?.data,
        });
      }

      if (activeStep == 5) {
        const page_list = `${API_URL}/person-liabilities/add/list`;

        const option = {
          method: "POST",
          data: singleData?.personLiabilities,
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        };

        const data_user: any = await submitFormData(page_list, option);

        setsingleData({
          ...singleData,
          ["personLiabilities"]: data_user?.data,
        });
      }

      if (isStepSkipped(activeStep)) {
        newSkipped = new Set(newSkipped.values());
        newSkipped.delete(activeStep);
      }

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setSkipped(newSkipped);
    } catch (error: any) {
      console.log(`error.response`, error.message);
      Swal.fire({
        icon: "error",
        text: error?.response?.data?.message,
        confirmButtonText: "Close",
      });
    } finally {
      console.log(`xxx`, 11);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    AOS.init({
      duration: 3000, // Default duration
    });
  }, []);

  useEffect(() => {
    if (common_data) {
      //show success message
      Swal.fire({
        icon: "success",
        text: "Success",
        confirmButtonText: "Close",
      });
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

  const getheaderColor = (status: string) => {
    return status === "Active" ? "text-green-500" : "text-red-500";
  };

  const fetchDataByID = async (id: any, type = "") => {
    if (type == "edit") {
      setsingleData(null);
      const form: any = document.querySelector("form");
      if (form) {
        form.reset();
      }

      const page_list = `${API_URL}/persons/${id}`;
      const options = {
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const data_user: any = await submitFormData(page_list, options);

      if (data_user.data?.personId) {
        const objLocParmanent = {
          ["parmanent.divisionId"]:
            data_user.data?.permanentAddress?.divisionId,
          ["parmanent.districtId"]:
            data_user.data?.permanentAddress?.districtId,
          ["parmanent.upazilaId"]: data_user.data?.permanentAddress?.upazilaId,
          ["parmanent.villageName"]:
            data_user.data?.permanentAddress?.villageName,
          ["parmanent.cityCorporationId"]:
            data_user.data?.permanentAddress?.cityCorporationId,
          ["parmanent.postCode"]: data_user.data?.permanentAddress?.postCode,
          ["parmanent.address"]: data_user.data?.permanentAddress?.address,
          ["parmanent.wardName"]: data_user.data?.permanentAddress?.wardName,
        };

        const objLocPresent = {
          ["location.divisionId"]: data_user.data?.presentAddress?.divisionId,
          ["location.districtId"]: data_user.data?.presentAddress?.districtId,
          ["location.upazilaId"]: data_user.data?.presentAddress?.upazilaId,
          ["location.villageName"]: data_user.data?.presentAddress?.villageName,
          ["location.cityCorporationId"]:
            data_user.data?.presentAddress?.cityCorporationId,
          ["location.postCode"]: data_user.data?.presentAddress?.postCode,
          ["location.address"]: data_user.data?.presentAddress?.address,
          ["location.wardName"]: data_user.data?.presentAddress?.wardName,
        };

        const final_obj = {
          ...objLocParmanent,
          ...objLocPresent,
          ...data_user.data,
        };

        setsingleData({ ...final_obj });
      }

      // fetchSingleDataCommonByID(page_list, options);
    }

    if (type == "delete") {
      const page_list = `${API_URL}/persons/${id}`;
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

  const columns = [
    {
      name: "Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Holiday Name",
      selector: (row) => row.holidayName,
      sortable: true,
    },
    {
      name: "action",
      value: "personId",
      onclickEvt: fetchDataByID,
      cell: (row) => <div>{ActionButton(fetchDataByID, row?.personId)}</div>,
    },
  ];

  return (
    <>
      <Breadcrumb name1={"Loan Borrow"} name2={"Loan Borrow Form"} />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white rounded-2xl p-10">
          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  All steps completed - you&apos;re finished
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Box sx={{ flex: "1 1 auto" }} />
                  <Button onClick={handleReset}>Reset</Button>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  <div className="px-3 py-4 ">
                    {activeStep == 0 && (
                      <PersonInfo
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 1 && (
                      <PersonLand
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 2 && (
                      <PersonAssest
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 3 && (
                      <AnnualIncome
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 4 && (
                      <AnnualExpense
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 5 && (
                      <Liability
                        setsingleData={setsingleData}
                        singleData={singleData}
                      />
                    )}

                    {activeStep == 6 && (
                      <Image
                        setsingleData={setsingleData}
                        singleData={singleData}
                        setActiveStep={setActiveStep}
                      />
                    )}
                  </div>
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{ mr: 1 }}
                  >
                    Back
                  </Button>
                  <Box sx={{ flex: "1 1 auto" }} />
                  {/* {isStepOptional(activeStep) && (
                    <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                      Skip
                    </Button>
                  )} */}
                  <Button onClick={handleNext}>
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </div>

        <Table
          rows={data?.content || []}
          column={columns}
          getheaderColor={getheaderColor}
        />
      </motion.div>
    </>
  );
};

export default LoanBorrowForm;
