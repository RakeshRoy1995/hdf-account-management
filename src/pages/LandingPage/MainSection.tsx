import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const steps = [
  "Personal Info",
  "Land",
  "Personal Assets",
  "Annual Income",
  "Annual Expense",
  "Liability",
];

import { motion } from "framer-motion";
import LandingPageImage from "../../../assets/main page/landingpgpic.png";
import { CiSearch } from "react-icons/ci";
import { useEffect, useState } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

const MainSection = () => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  useEffect(() => {
    AOS.init({
      duration: 3000, // Default duration
    });
  }, []);

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="relative flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-between bg-primaryColor text-white p-6 md:p-12 xl:p-20 h-[600px] font-sans">
          {/* Left Section - Text */}
          <div className="text-left md:w-1/2 lg:w-1/2 xl:w-1/2">
            <h1 className="text-4xl font-bold ">
              Find Your Desired Trainings <br /> To Grow Up Your Goals
            </h1>
            <p className="font-medium my-10 text-xl ">
              Our platform is designed to streamline your training processes,
              making it easier than ever to empower your workforce with the
              skills they need. Whether you’re managing employee development,
              tracking progress, or planning future training sessions, our
              intuitive tools and resources are here to support your success.
              Dive in and discover how we can help you create a more
              knowledgeable and efficient team.
            </p>
            {/* Search Bar */}
            <div className="relative w-full md:w-2/3">
              <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-4 pl-12 border-2 border-gray-300 rounded-full text-black focus:outline-none "
              />
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="xl:w-1/2 flex justify-center relative z-10 mt-10">
            <img
              src={LandingPageImage} // Replace with your image path
              alt="Building"
              className="w-full h-full md:max-w-sm rounded-lg "
            />
            <div className="border-2 border-white w-[380px] h-[390px] rounded-3xl absolute -mr-10 -mt-4"></div>
          </div>
          {/* wave design */}
          <div className="custom-shape-divider-bottom-1726984966">
            <svg
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
            >
              <path
                d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
                className="shape-fill"
              />
            </svg>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto w-[1200px] mt-20">
        <div className="flex justify-between">
          <h2 className="font-sans text-3xl font-bold">Loan borrow</h2>
          <button className="block w-[150px] text-center font-bold text-sm px-4 py-3 text-white rounded-full font-sans bg-primaryColor">
            Explore More
          </button>
        </div>
        <div className="mt-5">
          
        </div>
      </div>
    </div>
  );
};

export default MainSection;
