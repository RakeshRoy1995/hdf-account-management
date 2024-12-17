import React from "react";

export default function Status({ singleData, name , setsingleData}) {
  return (
    <div className="flex flex-col relative ">
      <label
        htmlFor={name}
        className="text-sm  absolute -mt-2 ml-4 mb-2 bg-white text-QuaternaryColor"
      >
        Status
      </label>
      <label className="flex items-center mt-2">
        <input
          checked={singleData?.[name] == "A"}
          onChange={(e) =>
            setsingleData({
              ...singleData,
              [e.target.name]: e.target.checked ? "A" : "I",
            })
          }
          value={singleData?.[name] == "A" ? "A" : "I"}
          name={name}
          id={name}
          type="checkbox"
          className="mr-2 " // Use a custom class
        />
        Yes
      </label>
    </div>
  );
}
