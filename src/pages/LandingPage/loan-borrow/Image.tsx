import { submitFIleData, submitFormData } from "@/api/Reqest";
import { calculateAge } from "@/utils";
import React, { useEffect, useState } from "react";
// import dayjs, { Dayjs } from 'dayjs';

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");

export default function Image({ setActiveStep, singleData }: any) {
  const [error, seterror] = useState<any>("");
  const handleSubmit = async (e: any) => {
    try {
      
      e.preventDefault();
  
      const formData = new FormData(e.target);
      let obj: any = {};
      const Img = {};
      for (const [key, value] of formData) {
        console.log(key, ":", value);
        obj = { ["image"]: value };
  
        const page_list = `${API_URL}/images/upload`;
        const method = "POST";
  
        const options = {
          method: method,
          data: obj,
          headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        };
  
        const data_user: any = await submitFIleData(page_list, options);
  
        Img[key] = data_user?.data?.url;
      }
  
      const page_list_ = `${API_URL}/persons/${singleData?.personId}`;
      const method_ = "PUT";
  
      const option_ = {
        method: method_,
        data: Img,
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };
      setActiveStep(7)
      await submitFormData(page_list_, option_);
    } catch (error) {
      seterror("Something Went Wrong")
    }
  };

  return (
    <form className="p-4 space-y-6" onSubmit={handleSubmit}>

      <p className="text-red-600">{error}</p>
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col relative">
          <label
            htmlFor="photoUrl"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Image <span className="required_field">*</span>
          </label>
          <input
            required
            type="file"
            id="photoUrl"
            accept="image/png, image/gif, image/jpeg"
            name="photoUrl"
            placeholder="First Name"
            className="border p-4 rounded appearance-none h-14"
          />
        </div>

        <div className="flex flex-col relative">
          <label
            htmlFor="signatureUrl"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Signature <span className="required_field">*</span>
          </label>
          <input
            required
            type="file"
            accept="image/png, image/gif, image/jpeg"
            id="signatureUrl"
            name="signatureUrl"
            placeholder="First Name"
            className="border p-4 rounded appearance-none h-14"
          />
        </div>

        <div className="flex justify-end ">
            <button className="bg-QuinaryColor font-bold text-sm text-primaryColor  flex justify-center items-center gap-1 px-12 py-4  rounded-full">
                Upload
            </button>
        </div>

        <div className="flex flex-col relative">
          <label
            htmlFor="signatureUrl"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Image 
          </label>
          <img src={API_URL+ "/images/download/" + singleData?.photoUrl} alt={singleData?.photoUrl} />
        </div>

        <div className="flex flex-col relative">
          <label
            htmlFor="signatureUrl"
            className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
          >
            Signature 
          </label>
          <img src={API_URL + "/images/download/" + singleData?.signatureUrl} alt={singleData?.signatureUrl} />
        </div>
      </div>
    </form>
  );
}
