import { get_all_data } from "@/api/Reqest";
import DateFormate from "@/shared/date-formate/DateFormate";
import Status from "@/shared/Status-component/Status";
import React, { useEffect, useState } from "react";

const JournelVoucherForm = ({
  singleData,
  setsingleData,
  rows,
  setRows,
  currency,
  payTo,
  bankAccount,
  cashAccount,
  GL,
  setCurrency,
  setPayTo,
  setBankAccount,
  setCashAccount,
  setGL,
}: any) => {
  const [newRow, setNewRow] = useState({
    accountId: "",
    amountCr: 0,
    amountDr: 0,
  });

  const GLAccountName = (id: any) => {
    const gl_name = GL.find((bnk: any) => bnk.glId == id);
    return gl_name?.glAccountName + " - " + gl_name?.glAccountNo;
  };

  const handleAddRow = () => {
    setRows([...rows, newRow]);
    setNewRow({
      accountId: "",
      amountCr: 0,
      amountDr: 0,
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
      {/* Form Fields */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block font-semibold mb-1">Recept Date:</label>

          <DateFormate
            name="transDate"
            setsingleData={setsingleData}
            singleData={singleData}
            required={true}
            label="Recept Date"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Voucher Number:</label>
          <input
            type="text"
            name="voucherNo"
            defaultValue={singleData?.voucherNo}
            onChange={(e) => {
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              });
            }}
            placeholder="Voucher Number"
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-semibold mb-1">Type:</label>
          <select
            className="w-full p-2 border rounded"
            name="voucherType"
            value={singleData?.voucherType}
            onChange={(e) => {
              setsingleData({
                ...singleData,
                ["voucherType"]: e.target.value,
              });
            }}
          >
            {/* <option value={""}>Select Type</option> */}
            <option>BANK</option>
            <option>CASH</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Pay To:</label>
          <select
            className="w-full p-2 border rounded"
            name="payTo"
            value={singleData?.payTo}
            onChange={(e) => {
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            <option value={""}>Select Pay To</option>
            {payTo.map((cur: any) => (
              <option value={cur.paymentToName}>{cur.paymentToName}</option>
            ))}
          </select>
        </div>

        {singleData?.voucherType === "BANK" && (
          <>
            <div>
              <label className="block font-semibold mb-1">Bank Account:</label>
              <select
                className="w-full p-2 border rounded"
                name="bankAccountId"
                value={singleData?.bankAccountId}
                onChange={(e) => {
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value={""}>Select Bank Account</option>
                {bankAccount.map((cur: any) => (
                  <option value={cur.bankAccountId}>
                    {cur.accountNumber} - {cur.accountName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-1">Cheque Number:</label>
              <input
                type="number"
                name="chequeNo"
                onChange={(e) => {
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  });
                }}
                value={singleData?.chequeNo}
                placeholder="Cheque Number"
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Cheque Date:</label>

              <DateFormate
                name="chequeDate"
                setsingleData={setsingleData}
                singleData={singleData}
                required={true}
                label="Cheque Date"
              />
            </div>
          </>
        )}

        {singleData?.voucherType === "CASH" && (
          <>
            <div>
              <label className="block font-semibold mb-1">Cash Account:</label>
              <select
                className="w-full p-2 border rounded"
                name="cashAccountId"
                value={singleData?.cashAccountId}
                onChange={(e) => {
                  setsingleData({
                    ...singleData,
                    [e.target.name]: e.target.value,
                  });
                }}
              >
                <option value={""}>Select Cash Account</option>
                {cashAccount.map((cur: any) => (
                  <option value={cur.cashAccountId}>{cur.caName}</option>
                ))}
              </select>
            </div>
          </>
        )}

        <div>
          <label className="block font-semibold mb-1">Currency Code:</label>
          <select
            className="w-full p-2 border rounded"
            name="currencyCode"
            value={singleData?.currencyCode}
            onChange={(e) => {
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              });
            }}
          >
            {currency.map((cur: any) => (
              <option value={cur.currencyCode}>{cur.currencyCode}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Amount Debit:</label>
          <input
            type="number"
            name="totalAmountDr"
            onChange={(e) => {
              if (Number(e.target.value) > 0 || e.target.value == "") {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }
            }}
            value={singleData?.totalAmountDr}
            placeholder="Amount More than 0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Amount Credit:</label>
          <input
            type="number"
            name="totalAmountCr"
            onChange={(e) => {
              if (Number(e.target.value) > 0 || e.target.value == "") {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }
            }}
            value={singleData?.totalAmountCr}
            placeholder="Amount More than 0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Remark:</label>
          <textarea
            name="particulars"
            defaultValue={singleData?.particulars}
            onChange={(e) => {
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              });
            }}
            className="w-full p-2 border rounded"
            placeholder="Remark"
          />
        </div>
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2 ">Account Code</th>
            <th className="border p-2 "> Amount Debit</th>
            <th className="border p-2 "> Amount Credit</th>
            <th className="border p-2 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{GLAccountName(row.accountId)}</td>
              <td className="border p-2">{row.amountDr}</td>
              <td className="border p-2">{row.amountCr}</td>
              <td className="border p-2">
                <button
                  type="button"
                  className="text-red-500 hover:underline"
                  onClick={() => handleDeleteRow(index)}
                >
                  <svg
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
                      fill="#FF0000"
                      fill-opacity="0.1"
                    />
                    <path
                      d="M9.61184 22.8074C9.13798 22.8074 8.73436 22.6368 8.40099 22.2955C8.06779 21.954 7.90118 21.5405 7.90118 21.0551V7.6213H6.84229V6.53657H11.0779V5.70215H17.4313V6.53657H21.6669V7.6213H20.608V21.0551C20.608 21.5544 20.4447 21.9713 20.1182 22.3058C19.7917 22.6402 19.3848 22.8074 18.8973 22.8074H9.61184ZM19.5491 7.6213H8.96008V21.0551C8.96008 21.2498 9.02115 21.4098 9.14327 21.5351C9.26558 21.6602 9.42176 21.7227 9.61184 21.7227H18.8973C19.0604 21.7227 19.2098 21.6532 19.3455 21.5142C19.4812 21.3752 19.5491 21.2221 19.5491 21.0551V7.6213ZM11.9332 19.5533H12.9921V9.79075H11.9332V19.5533ZM15.5171 19.5533H16.576V9.79075H15.5171V19.5533Z"
                      fill="#FF2323"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
          {/* New Row Input */}
          <tr>
            <td className="border p-2">
              <select
                className="w-full p-2  rounded"
                name="accountId"
                value={newRow?.accountId}
                onChange={(e) => handleInputChange(e, "accountId")}
              >
                <option value={""}> Select Account</option>
                {GL.map((cur: any) => (
                  <option value={cur.glId}>
                    {cur.glAccountName} - {cur.glAccountNo}
                  </option>
                ))}
              </select>
            </td>

            <td className="border p-2">
              <input
                type="number"
                className="w-full border p-1"
                placeholder="Amount"
                readOnly={newRow.amountCr > 0}
                value={newRow.amountDr}
                onChange={(e) => {
                  if (Number(e.target.value) > 0 || e.target.value == "") {
                    handleInputChange(e, "amountDr");
                  }
                }}
              />
            </td>

            <td className="border p-2">
              <input
                type="number"
                className="w-full border p-1"
                placeholder="Amount"
                readOnly={newRow.amountDr > 0}
                value={newRow.amountCr}
                onChange={(e) => {
                  if (Number(e.target.value) > 0 || e.target.value == "") {
                    handleInputChange(e, "amountCr");
                  }
                }}
              />
            </td>


            {(newRow.amountDr > 0 || newRow.amountCr > 0 ) && newRow?.accountId && (
              <td className="border p-2 text-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={handleAddRow}
                >
                  +
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {/* Process Button */}
      {rows.length > 0 && (
        <div className="flex flex-raw gap-4">
          <div className="w-full">
            <textarea
              name="narration"
              onChange={(e) => {
                setsingleData({
                  ...singleData,
                  [e.target.name]: e.target.value,
                });
              }}
              value={singleData?.narration}
              placeholder="Narration"
              className="w-1/2 p-5 m-2 border bg-slate-100 rounded"
            />
          </div>

          <div className="text-center">
            <label className="block font-semibold mb-1">
              Total Amount: {rows.reduce((a, b) => a + Number(b.totalAmountDr), 0)} - {rows.reduce((a, b) => a + Number(b.totalAmountCr), 0)}
            </label>
          </div>

          {/* total : {rows.reduce((a, b) => a + Number(b.amountCr), 0)} */}
        </div>
      )}
    </div>
  );
};

export default JournelVoucherForm;
