import { submitFormData } from '@/api/Reqest';
import React, { useState } from 'react'

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
export default function AnnualExpense({setsingleData, singleData }:any) {

  const [options, setOptions] = useState(singleData?.personAnnualExpenses || [""]); // Default options for select-type questions

  // Handle changes in option text
  const handleOptionChange = (index: any, value: any, name: any) => {
    const updatedOptions = [...options];

    const tmpObj: any = updatedOptions[index];
    const obj: any = {
      ...tmpObj,
      [name]: value,
      ["personId"]: singleData?.personId,
    };
    updatedOptions[index] = obj;
    setOptions(updatedOptions);
    setsingleData({
      ...singleData,
      ["personAnnualExpenses"]: updatedOptions,
    });
  };

  // Add a new option for TRUE_FALSE, MULTIPLE_SELECT, or MULTIPLE_CHOICE questions
  const addNewOption = () => {
    setOptions([...options, ""]);
  };
  // Remove an option by index
  const removeOption = async(index: any) => {

    const found = options.find((_, i) => i == index);
    if (found?.personAnnualExpenseId) {
      const page_list = `${API_URL}/person-annual-expenses/${found?.personAnnualExpenseId}`;
      const option = {
        method: "DELETE",
      };

      await submitFormData(page_list, option);
    }

    setOptions(options.filter((_, i) => i !== index));
    setsingleData({
      ...singleData,
      ["personAnnualExpenses"]: options.filter((_, i) => i !== index),
    });
  };
  return (
    <div className="grid grid-cols-3 gap-4">
      {options?.map((option: any, index) => (
        <>
          <div className="flex flex-col relative">
            <label
              htmlFor="name"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Name <span className="required_field">*</span>
            </label>
            <input
              required
              id="name"
              name="name"
              placeholder="First Name"
              value={singleData?.personAnnualExpenses?.length && singleData?.personAnnualExpenses[index]?.name}
              onChange={(e) => {
                handleOptionChange(index, e.target.value, e.target.name);
              }}
              className="border p-4 rounded appearance-none h-14"
            />
          </div>
          <div className="flex flex-col relative">
            <label
              htmlFor="amount"
              className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
            >
              Amount <span className="required_field">*</span>
            </label>
            <input
              required
              id="amount"
              type="number"
              name="amount"
              placeholder="Amount"
              value={singleData?.personAnnualExpenses?.length && singleData?.personAnnualExpenses[index]?.amount}
              onChange={(e) => {
                handleOptionChange(index, e.target.value, e.target.name);
              }}
              className="border p-4 rounded appearance-none h-14"
            />
          </div>

          <div className="flex  relative">
            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="text-red-500 hover:underline mx-1"
              >
                Remove
              </button>
            )}

            {index === options.length - 1 && (
              <button
                onClick={addNewOption}
                className="text-blue-500 hover:underline"
              >
                + Add
              </button>
            )}
          </div>
        </>
      ))}
    </div>
  )
}
