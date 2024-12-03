import DateFormate from "@/shared/date-formate/DateFormate";
import Location from "@/shared/location/Location";
import LocationParmanent from "@/shared/location/LocationParmanent";
import { calculateAge } from "@/utils";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
// import dayjs, { Dayjs } from 'dayjs';

export default function PersonInfo({ setsingleData, singleData }: any) {
  const [age, setage] = useState<any>("");
  const [value, setValue] = React.useState<any>();
  useEffect(() => {
    if (singleData?.dateOfBirth) {
      const age = calculateAge(singleData?.dateOfBirth);
      setage(age);
      setsingleData({ ...singleData, ["age"]: age });
    }
  }, [singleData?.dateOfBirth]);

  console.log(`singleData`, singleData);

  return (
    <div className="grid grid-cols-3 gap-4">
      {/* Date */}

      <div className="flex flex-col relative">
        <label
          htmlFor="firstName"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          First Name <span className="required_field">*</span>
        </label>
        <input
          required
          id="firstName"
          name="firstName"
          placeholder="First Name"
          value={singleData?.firstName}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      <div className="flex flex-col relative">
        <label
          htmlFor="lastName"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Last Name <span className="required_field">*</span>
        </label>
        <input
          required
          id="lastName"
          name="lastName"
          placeholder="Last Name"
          value={singleData?.lastName}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      <input
        type="hidden"
        name="fullName"
        placeholder="Full Name"
        onChange={(e) => {
          setsingleData({ ...singleData, [e.target.name]: e.target.value });
        }}
        value={singleData?.firstName + " " + singleData?.lastName}
      />


      <div className="flex flex-col relative">
        <label
          htmlFor="fathersName"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Father Name <span className="required_field">*</span>
        </label>
        <input
          required
          id="fathersName"
          name="fathersName"
          placeholder="Father Name"
          value={singleData?.fathersName}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      <div className="flex flex-col relative">
        <label
          htmlFor="mothersName"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Mother Name <span className="required_field">*</span>
        </label>
        <input
          required
          id="mothersName"
          name="mothersName"
          placeholder="Mother Name"
          value={singleData?.mothersName}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      <div className="flex flex-col relative">
        <label
          htmlFor="fullNameBn"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Full Name Bangla <span className="required_field">*</span>
        </label>
        <input
          required
          id="fullNameBn"
          name="fullNameBn"
          placeholder="Full Name Bangla"
          value={singleData?.fullNameBn}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Date of Birth  */}

      <div className="flex flex-col relative">
        <label
          htmlFor="dateOfBirth"
          className="text-sm  absolute -mt-4 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Date of Birth <span className="required_field">*</span>
        </label>

        <DateFormate
          name="dateOfBirth"
          setsingleData={setsingleData}
          singleData={singleData}
          required={true}
          label="Date of Birth "
        />
      </div>

      {/* Age */}
      <div className="flex flex-col relative">
        <label
          htmlFor="age"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Age
        </label>
        <input
          id="age"
          name="age"
          placeholder="Age"
          value={age}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      <div className="flex flex-col relative border-2 border-gray-100 h-14">
        <label className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor">
          Gender <span className="required_field">*</span>
        </label>
        <div className="flex justify-around">
          <label className="flex items-center mr-4">
            <input
              required
              type="radio"
              checked={singleData?.gender == "MALE"}
              name="gender"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  gender: "MALE",
                })
              }
              id="true"
              className="border p-4 rounded-md h-14 text-sm mr-1"
            />
            Male
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  gender: "FEMALE",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.gender === "FEMALE"}
            />
            Female
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="gender"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  gender: "THIRD",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.gender === "THIRD"}
            />
            Third
          </label>
        </div>
      </div>

      <div className="col-span-3 mt-2 border-2 border-gray-50 p-3 rounded-xl">
        <label className="text-sm absolute -mt-2  mb-2 bg-white text-QuaternaryColor">
          Matrimonial Status <span className="required_field">*</span>
        </label>
        <div className="flex justify-around">
          <label className="flex items-center mr-4">
            <input
              required
              type="radio"
              checked={singleData?.maritalStatus == "SINGLE"}
              name="maritalStatus"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  maritalStatus: "SINGLE",
                })
              }
              id="true"
              className="border p-4 rounded-md h-14 text-sm mr-1"
            />
            Single
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  maritalStatus: "MARRIED",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.maritalStatus === "MARRIED"}
            />
            Married
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  maritalStatus: "DIVORCED",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.maritalStatus === "DIVORCED"}
            />
            Divorced
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  maritalStatus: "SEPARATED",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.maritalStatus === "SEPARATED"}
            />
            Separated
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="maritalStatus"
              onClick={() =>
                setsingleData({
                  ...singleData,
                  maritalStatus: "WIDOWED",
                })
              }
              id="false"
              className="border p-4 rounded-md h-14 text-sm mr-1"
              checked={singleData?.maritalStatus === "WIDOWED"}
            />
            Widowed
          </label>
        </div>
      </div>

      {/* spouse name  */}
      <div className="flex flex-col relative">
        <label
          htmlFor="spouseName"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Spouse Name
        </label>
        <input
          id="spouseName"
          name="spouseName"
          placeholder="Spouse Name"
          value={singleData?.spouseName}
          onChange={(e) => {
            setsingleData({ ...singleData, [e.target.name]: e.target.value });
          }}
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Academic Qualification */}
      <div className="flex flex-col justify-between relative">
        <label
          htmlFor="lastAcademicQualification"
          className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Academic Qualification <span className="required_field">*</span>
        </label>
        <div>
          <select
            required
            name="lastAcademicQualification"
            id="lastAcademicQualification"
            value={singleData?.lastAcademicQualification}
            onChange={(e) =>
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full border p-4 rounded appearance-none h-14"
          >
            <option value="">Select Academic Qualification</option>
            <option value="CLASS_5">PSC</option>
            <option value="CLASS_6">Class 6</option>
            <option value="CLASS_7">Class 7</option>
            <option value="CLASS_8">Class 8</option>
            <option value="SSC">SSC</option>
            <option value="HSC">HSC</option>
            <option value="BACHELOR">BACHELOR</option>
            <option value="MASTERS_AND_ABOVE">MASTERS AND ABOVE</option>
          </select>
        </div>
        <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none xs:ml-64 md:ml-[590px] lg:ml-[280px] xl:ml-[490px] mt-5">
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

      {/* religion */}
      <div className="flex flex-col justify-between relative">
        <label
          htmlFor="religion"
          className="text-sm absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Religion <span className="required_field">*</span>
        </label>
        <div>
          <select
            required
            name="religion"
            id="religion"
            value={singleData?.religion}
            onChange={(e) =>
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              })
            }
            className="w-full border p-4 rounded appearance-none h-14"
          >
            <option value="">Select Religion</option>
            <option value="ISLAM">Islam</option>
            <option value="HINDUISM">Hinduism</option>
            <option value="CHRISTIANITY">Christianity</option>
            <option value="BUDDHISM">Buddhism</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none xs:ml-64 md:ml-[590px] lg:ml-[280px] xl:ml-[490px] mt-5">
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

      {/* NID */}
      <div className="flex flex-col relative">
        <label
          htmlFor="nidNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          NID <span className="required_field">*</span>
        </label>
        <input
          required
          id="nidNo"
          name="nidNo"
          placeholder="NID"
          value={singleData?.nidNo}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* BrNo */}
      <div className="flex flex-col relative">
        <label
          htmlFor="brNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Birth Certificate No
        </label>
        <input
          id="brNo"
          name="brNo"
          placeholder="Birth Certificate No"
          value={singleData?.brNo}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Passport No */}
      <div className="flex flex-col relative">
        <label
          htmlFor="passportNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Passport No
        </label>
        <input
          id="passportNo"
          name="passportNo"
          placeholder="Passport No"
          value={singleData?.passportNo}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Mobile No */}
      <div className="flex flex-col relative">
        <label
          htmlFor="mobileNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Mobile No <span className="required_field">*</span>
        </label>
        <input
          required
          id="mobileNo"
          name="mobileNo"
          placeholder="Mobile No"
          value={singleData?.mobileNo}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Mobile No Alternative*/}
      <div className="flex flex-col relative">
        <label
          htmlFor="altMobileNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Mobile No Alternative
        </label>
        <input
          id="altMobileNo"
          name="altMobileNo"
          placeholder="Alternative Mobile No"
          value={singleData?.altMobileNo}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* email */}
      <div className="flex flex-col relative">
        <label
          htmlFor="email"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          placeholder="email"
          value={singleData?.email}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.value,
            })
          }
          className="border p-4 rounded appearance-none h-14"
        />
      </div>

      {/* Present Address */}

      <div className="col-span-3 mt-2 border-2 border-gray-50 rounded-xl">
        <label
          htmlFor="mobileNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Present Address
        </label>

        <Location singleData={singleData} setsingleData={setsingleData} />
      </div>

      {/* Parmanent Address */}

      <div className="col-span-3 mt-2 border-2 border-gray-50 rounded-xl">
        <label
          htmlFor="mobileNo"
          className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
        >
          Permanent Address
        </label>

        <LocationParmanent singleData={singleData} setsingleData={setsingleData} />
      </div>
    </div>
  );
}
