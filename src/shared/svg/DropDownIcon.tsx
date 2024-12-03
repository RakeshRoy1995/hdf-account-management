import { useSidebar } from '@/hooks/SidebarContext';
import React from 'react'

const DropDownIcon = () => {
    const { isSidebarOpen, toggleSidebar } = useSidebar();
console.log(!isSidebarOpen)
    return (
        <>
          {/* when close side menu bar */}
            {/* <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] xl:ml-[340px] mt-5">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                        fill="#5F6368"
                    />
                </svg>
            </div> */}
            {
            !isSidebarOpen ?
            <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[300px] xl:ml-[900080px] mt-5">
            <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                    fill="#5F6368"
                />
            </svg>
        </div>
        :
        <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[200px] xl:ml-[980000px] mt-5">
        <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                fill="#5F6368"
            />
        </svg>
    </div>
            }
            {/* when open side menu bar */}
            {/* <div className="absolute inset-y-0 left-0 flex items-start px-2 pointer-events-none sm:ml-60 md:ml-32 lg:ml-[200px] xl:ml-[280px] mt-5">
                <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M2.59028 7.37727L3.53006 6.4375L10.8152 13.7226L18.1003 6.4375L19.04 7.37727L10.8152 15.6021L2.59028 7.37727Z"
                        fill="#5F6368"
                    />
                </svg>
            </div> */}
        </>
    )
}

export default DropDownIcon