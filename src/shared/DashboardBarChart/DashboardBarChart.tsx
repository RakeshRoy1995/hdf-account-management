import { Bar } from 'react-chartjs-2';
import { Pie } from 'react-chartjs-2';
export const DashboardBarChart = () => {
    // Bar Chart Data
    const barData = {
        labels: [ 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Income',
                data: [ 50000, 45000, 60000, 75000, 80000, 85000],
                backgroundColor: '#7770ff',
                borderRadius: 5,
            },
            {
                label: 'Expense',
                data: [ 20000, 25000, 30000, 23000, 28000, 32000],
                backgroundColor: '#111111',
                borderRadius: 5,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value) => `$${value}k`,
                },
            },
        },
    };

    const pieData = {
        labels: ['UI/UX', 'Branding', 'Illustration', 'Web Dev'],
        datasets: [
          {
            data: [52, 20, 15, 13],
            backgroundColor: ['#6366F1', '#10B981', '#F59E0B', '#EF4444'],
            hoverBackgroundColor: ['#4F46E5', '#059669', '#D97706', '#DC2626'],
          },
        ],
      };

      const pieOptions = {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio for custom sizing
        plugins: {
          legend: {
            position: 'right',
          },
        },
      };

    return (

            <div className="flex xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-wrap xl:flex-nowrap  xs:ml-6 lg:ml-0 md:ml-0 xl:ml-0  xs:p-0 lg:p-6 md:p-6 xl:p-6 gap-2 xs:w-2/3 md:w-full lg:w-full xl:w-full items-stretch">
                {/* Bar Chart */}
                <div className="bg-white shadow-md rounded-lg p-4 w-full  md:w-full lg:w-full xl:w-full ">
                    <div className="flex xs:flex-col md:flex-row lg:flex-row xl:flex-row  justify-between items-center">
                        <h3 className="font-semibold text-gray-700 text-lg">Cashflow</h3>
                        <div className="flex items-center space-x-2">
                            <button className="text-sm bg-slate-50 text-gray-600 px-3 py-2 rounded-md drop-shadow-md">Last 6 Months</button>
                            <button className='shadow-md rounded-md border-2 border-gray-500-800 p-1.5'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-gray-400"
                                >
                                    <circle cx="5" cy="12" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="19" cy="12" r="2" />
                                </svg>

                            </button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <Bar data={barData} options={barOptions} />
                    </div>
                </div>

                {/* Pie Chart */}
                <div className="bg-white shadow-md rounded-lg p-4 w-full md:w-full lg:w-full ">
                <div className="flex xs:flex-col md:flex-row lg:flex-row xl:flex-row  justify-between items-center ">
                        <h3 className="font-semibold text-gray-700 text-lg">Cashflow</h3>
                        <div className="flex items-center space-x-2">
                            <button className="text-sm bg-slate-50 text-gray-600 px-3 py-2 rounded-md drop-shadow-md">Last 6 Months</button>
                            <button className='shadow-md rounded-md border-2 border-gray-500-800 p-1.5'>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-5 h-5 text-gray-400"
                                >
                                    <circle cx="5" cy="12" r="2" />
                                    <circle cx="12" cy="12" r="2" />
                                    <circle cx="19" cy="12" r="2" />
                                </svg>

                            </button>
                        </div>
                    </div>

                    <div className="mt-4   flex justify-center items-center w-full  sm:w-[400px] md:w-[280px] lg:w-[600px] xl:w-[500px]
                    h-72 mx-auto">
                        <Pie data={pieData} options={pieOptions} />
                    </div>
                </div>
            </div>

    )
}
