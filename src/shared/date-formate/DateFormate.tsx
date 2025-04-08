import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { formatDate_2 } from "@/utils";
import "react-datepicker/dist/react-datepicker.css";

export default function DateFormate({
  name,
  singleData,
  setsingleData,
  required,
  label,
}: any) {
  const [FromselectedDate, setFromSelectedDate] = useState(null);
  return (
    <DatePicker
      name={name}
      required={required}
      selected={
        singleData?.[name]
          ? new Date(formatDate_2(singleData?.[name]))
          : FromselectedDate
      }
      onChange={(date: any) => {
        setFromSelectedDate(date);
        setsingleData({ ...singleData, [name]: date });
      }}
      dateFormat="dd/MM/yyyy"
      placeholderText={label || "DD/MM/YYYY"}
      showYearDropdown
      showMonthDropdown
      dropdownMode="select"
      autoComplete="off"
      className="w-full border p-4 rounded h-14 text-lg relative "
    />
  );
}
