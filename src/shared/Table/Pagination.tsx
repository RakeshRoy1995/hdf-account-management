
import { FaChevronRight } from 'react-icons/fa6'

export default function Pagination() {
  return (
    <div className="container mx-auto sm:max-w-screen-sm md:max-w-screen-md lg:max-w-[1200px] mt-2 bg-gray-50 flex justify-between items-center">
      {/* Items per page dropdown */}
      <div className="relative">
        <select className="block w-full pl-4 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm rounded-full appearance-none">
          <option>10</option>
          {/* Add more options as needed */}
        </select>
        <div className='-mt-7 ml-14 pr-2'>
          <svg width="18" height="18" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z" fill="#5F6368" />
          </svg>
        </div>

      </div>

      {/* Pagination */}
      <div className="flex items-center space-x-4">
        <span className="text-gray-600">1/3</span>
        <button className="flex items-center justify-center w-8 h-8 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-teal-500 focus:border-teal-500">
          <FaChevronRight className="text-blue-500" />
        </button>
      </div>
    </div>
  )
}
