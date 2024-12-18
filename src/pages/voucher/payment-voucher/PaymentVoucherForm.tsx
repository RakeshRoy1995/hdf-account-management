import DateFormate from "@/shared/date-formate/DateFormate";
import React, { useState } from "react";

const PaymentVoucherForm = ({ singleData, setsingleData }: any) => {
  const [rows, setRows] = useState([
    {
      accountCode: "12345",
      description: "testing",
      dimension: "007/2024 Supplier one",
      debit: "111.00",
      credit: "1111",
      memo: "",
    },
    {
      accountCode: "1101",
      description: "cash",
      dimension: "",
      debit: "",
      credit: "11.00",
      memo: "",
    },
  ]);

  const [newRow, setNewRow] = useState({
    accountCode: "",
    description: "",
    dimension: "",
    debit: "",
    credit: "",
    memo: "",
  });

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      accountCode: "",
      description: "",
      dimension: "",
      debit: "",
      credit: "",
      memo: "",
    });
  };

  const handleDeleteRow = (index) => {
    const updatedRows = rows.filter((_, i) => i !== index);
    setRows(updatedRows);
  };

  const handleInputChange = (e, field) => {
    setNewRow({ ...newRow, [field]: e.target.value });
  };

  return (
    <div className="mx-auto bg-white p-5 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Payment Voucher</h2>

      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-1">Payment Date:</label>

          <DateFormate
            name="transDate"
            setsingleData={setsingleData}
            singleData={singleData}
            required={true}
            label="Payment Date"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Document Date:</label>
          <input
            type="date"
            defaultValue="2024-12-15"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Currency:</label>
          <select className="w-full p-2 border rounded">
            <option>Rand</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Exchange Rate:</label>
          <input
            type="number"
            defaultValue="1.000"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Reference:</label>
          <input
            type="text"
            defaultValue="416/2022"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Quick Entry:</label>
          <input
            type="number"
            defaultValue="12"
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Account Code</th>
            <th className="border p-2">Account Description</th>
            <th className="border p-2">Dimension</th>
            <th className="border p-2">Debit</th>
            <th className="border p-2">Credit</th>
            <th className="border p-2">Memo</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{row.accountCode}</td>
              <td className="border p-2">{row.description}</td>
              <td className="border p-2">{row.dimension}</td>
              <td className="border p-2">{row.debit}</td>
              <td className="border p-2">{row.credit}</td>
              <td className="border p-2">{row.memo}</td>
              <td className="border p-2">
                <button
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteRow(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {/* New Row Input */}
          <tr>
            <td className="border p-2">
              <input
                type="text"
                className="w-full border p-1"
                placeholder="Account Code"
                value={newRow.accountCode}
                onChange={(e) => handleInputChange(e, "accountCode")}
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                className="w-full border p-1"
                placeholder="Description"
                value={newRow.description}
                onChange={(e) => handleInputChange(e, "description")}
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                className="w-full border p-1"
                placeholder="Dimension"
                value={newRow.dimension}
                onChange={(e) => handleInputChange(e, "dimension")}
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                className="w-full border p-1"
                placeholder="Debit"
                value={newRow.debit}
                onChange={(e) => handleInputChange(e, "debit")}
              />
            </td>
            <td className="border p-2">
              <input
                type="number"
                className="w-full border p-1"
                placeholder="Credit"
                value={newRow.credit}
                onChange={(e) => handleInputChange(e, "credit")}
              />
            </td>
            <td className="border p-2">
              <input
                type="text"
                className="w-full border p-1"
                placeholder="Memo"
                value={newRow.memo}
                onChange={(e) => handleInputChange(e, "memo")}
              />
            </td>
            <td className="border p-2 text-center">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={handleAddRow}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      {/* Process Button */}
      <div className="text-right mt-6">
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
          Process Journal Entry
        </button>
      </div>
    </div>
  );
};

export default PaymentVoucherForm;
