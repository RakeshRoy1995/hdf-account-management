
const transactions = [
  // {
  //   type: "Project Payment",
  //   id: "INV_002024001",
  //   user: "Shin Tae Yong",
  //   time: "1 Jan 2024, 10.00",
  //   amount: "$974,65",
  //   status: "On Progress",
  // },
  {
    type: "Salary Payment",
    id: "INV_002024002",
    user: "Fridolina F Ferina",
    time: "1 Jan 2024, 12.30",
    amount: "$617,28",
    status: "Pending",
  },
  {
    type: "Figma Subscribe",
    id: "INV_002024003",
    user: "Figma",
    time: "30 Dec 2023, 16.15",
    amount: "$148,01",
    status: "Completed",
  },
  {
    type: "Salary Payment",
    id: "INV_002024004",
    user: "Daffa Toldo",
    time: "27 Dec 2023, 21.45",
    amount: "$422,35",
    status: "Completed",
  },
  {
    type: "Project Payment",
    id: "INV_002024005",
    user: "Carlo Ancelotti",
    time: "25 Dec 2023, 23.25",
    amount: "$812,21",
    status: "Canceled",
  },
];

const getStatusStyle = (status) => {
  switch (status) {
    // case "On Progress":
    //   return "bg-blue-100 text-blue-600";
    case "Pending":
      return "bg-yellow-100 text-yellow-600";
    case "Completed":
      return "bg-green-100 text-green-600";
    case "Canceled":
      return "bg-red-100 text-red-600";
    default:
      return "";
  }
};
export const TransactionsTable = () => {

  return (

    <div className="p-6   rounded-md  lg:w-full xl:w-full md:min-w-min">
      <div className="bg-white shadow-md rounded-lg sm:p-0 md:p-2 lg:p-6 xl:p-6">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-gray-700 text-lg">Cashflow</h3>
          <div className="flex items-center space-x-2">
            <button className="text-sm bg-slate-50 text-gray-600 px-3 py-2 rounded-md drop-shadow-md">View More</button>

          </div>
        </div>
        <table className="table-auto md:w-full lg:w-full xl:w-full border-collapse border border-gray-300 overflow-x-auto">
          <thead className="bg-gray-100 ">
            <tr className='text-sm'>
              <th className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center text-gray-600  border-r-2 ">Transaction Type</th>
              <th className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center text-gray-600 border-r-2">User Name</th>

              <th className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center text-gray-600 border-r-2">Amount</th>
              <th className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center text-gray-600 border-r-2">Status</th>
              <th className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center text-gray-600 ">Action</th>
            </tr>
          </thead>
          <tbody className='overflow-x-auto'>
            {transactions.map((transaction, index) => (
              <tr key={index} className="border-t">
                <td className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 border-r-2">
                  <div className="flex items-center">
                    <div className="bg-gray-200 p-2 rounded-full">
                      {/* Icon Placeholder */}
                      {/* <span className="text-sm text-gray-500">🗂️</span> */}
                    </div>
                    <div className="ml-2 text-sm">
                      <p>{transaction.type}</p>
                      {/* <p className="text-sm text-gray-500">{transaction.id}</p> */}
                    </div>
                  </div>
                </td>
                <td className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 border-r-2 md:text-xs">{transaction.user}</td>

                <td className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center border-r-2 md:text-xs">{transaction.amount}</td>
                <td className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center border-r-2 md:text-xs">
                  <span
                    className={`px-3 py-1 rounded-full  text-xs font-thin ${getStatusStyle(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                </td>
                <td className="xs:p-1 sm:1 md:px-1 md:py-1 lg:px-4 lg:py-2 xl:px-4 xl:py-2 text-center ">
                  <button className=" hover:underline bg-secondaryColor text-QuinaryColor p-2 rounded-full text-xs">
                    See Detail →
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  )
}
