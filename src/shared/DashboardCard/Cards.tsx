import React from 'react'
import { useSpring, animated } from '@react-spring/web';

export const Cards = ({ title, amount, change, isPositive }) => {
    // Spring animation for amount
  const animatedAmount = useSpring({
    from: { value: 0 }, // Start from 0
    to: { value: amount }, // Animate to the final amount
    config: { tension: 170, friction: 26 }, // Customize animation speed
  });
  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg p-4 xs:w-3/4 lg:w-full md:w-1/2 xl:w-full">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <div className="bg-purple-100 p-2 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-purple-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.75 9.75l7.5-7.5 7.5 7.5M12 2.25v19.5"
            />
          </svg>
        </div>
        <h3 className="font-semibold text-gray-700">{title}</h3>
      </div>
      <button>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
    <div className="mt-4">
      <h1 className="text-2xl font-bold text-gray-800">${amount}</h1>
      <p
        className={`text-sm mt-1 ${
          isPositive ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {isPositive ? '↑' : '↓'} {change} vs last month
      </p>
    </div>
  </div>
  )
}
