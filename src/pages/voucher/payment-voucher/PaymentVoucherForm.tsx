import { get_all_data } from "@/api/Reqest";
import DateFormate from "@/shared/date-formate/DateFormate";
import Status from "@/shared/Status-component/Status";
import React, { useEffect, useState } from "react";

const PaymentVoucherForm = ({
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
            <option value={""}>Select Type</option>
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
              <option value={cur.paymentToId}>{cur.paymentToName}</option>
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
          <label className="block font-semibold mb-1">Amount:</label>
          <input
            type="number"
            name="amountCr"
            onChange={(e) => {
              setsingleData({
                ...singleData,
                [e.target.name]: e.target.value,
              });
            }}
            value={singleData?.amountCr}
            placeholder="Amount More than 0"
            className="w-full p-2 border rounded"
          />
        </div>

        <div></div>

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

        <div>
          <label className="block font-semibold mb-1">Narration:</label>
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
            className="w-full p-2 border rounded"
          />
        </div>

        <Status
          name="recStatus"
          setsingleData={setsingleData}
          singleData={singleData}
        />
      </div>

      {/* Table */}
      <table className="w-full text-left border-collapse border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Account Code</th>
            <th className="border p-2"> Amount</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <td className="border p-2">{GLAccountName(row.accountId)}</td>
              <td className="border p-2">{row.amountDr}</td>
              <td className="border p-2">
                <button
                  type="button"
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
              <select
                className="w-full p-2 border rounded"
                name="accountId"
                value={newRow?.accountId}
                onChange={(e) => handleInputChange(e, "accountId")}
              >
                <option value={""}> Select Account</option>
                {GL.map((cur: any) => (
                  <option value={cur.glId}>
                    {cur.glGeneratedAccountNo} - {cur.glAccountNo}
                  </option>
                ))}
              </select>
            </td>

            <td className="border p-2">
              <input
                type="number"
                className="w-full border p-1"
                placeholder="Amount"
                value={newRow.amountDr}
                onChange={(e) => handleInputChange(e, "amountDr")}
              />
            </td>

            {newRow.amountDr > 0 && newRow?.accountId && (
              <td className="border p-2 text-center">
                <button
                  type="button"
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                  onClick={handleAddRow}
                >
                  Add
                </button>
              </td>
            )}
          </tr>
        </tbody>
      </table>

      {/* Process Button */}
      {rows.length > 0 && (
        <div className="text-right mt-6">
          total : {rows.map((row: any) => row.amountDr)}
        </div>
      )}
    </div>
  );
};

export default PaymentVoucherForm;
