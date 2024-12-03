import React, { useState } from "react";
import Select from "react-select";

export default function SelectComponent({
  required,
  options,
  singleData,
  isMulti,
  name,
  onChange,
  value
}: any) {
  return (

    <Select
      isMulti={isMulti}
      name={name}
      className=""
      closeMenuOnSelect={false}
      value={
        value.length == 0 ? 
        options.map((d: any) => {
        if (singleData[name].includes(d.value)) {
          return d
        }
      }) : value
    
    
    }
      options={options}
      onChange={onChange}
      data-tooltip="Select Sector Name"
      required={required}
    />
  );
}
