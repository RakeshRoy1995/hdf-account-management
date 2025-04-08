
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion } from 'framer-motion';

const LoadingStudentTableSkeleton = ({ number_Of_Card }) => {
  const isProjectCardNumber = Array.from({ length: number_Of_Card }, (v, i) => `Item ${i + 1}`);
  return (


    <>
      {isProjectCardNumber?.map((project: any, index: number) =>
        <motion.div
          key={index}
          initial={{ rotateX: -90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          exit={{ rotateX: 90, opacity: 0 }}
          whileHover={{
            rotateY: 10,
            boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.3)",
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
        >
          <div className="w-full  bg-white rounded-lg shadow-md pr-10 pl-5 py-6">
            <div className='mb-2'>
              <div className='text-end mb-2'>
                <button >
                  <Skeleton width={27} height={27} circle={true} className='mb-1' />
                </button>

              </div>
              <div className='flex justify-between items-center'>
                <span className="font-bold text-sm text-QuaternaryColor">
                  Project Name
                </span>
                <span className="font-normal text-sm text-QuaternaryColor">
                  <Skeleton width={100} />
                </span>
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="font-normal text-sm text-QuaternaryColor">Project Cost</span>
                <span className="font-normal text-sm text-QuaternaryColor"><Skeleton width={100} /></span>
              </div>

              <div className="flex items-center mt-4 ">
                <span className="font-normal text-sm text-QuaternaryColor mr-4 ">Progress</span>
                <div className="w-full bg-gray-200 rounded-full h-3 ">
                  <Skeleton className="h-3 rounded-full flex items-center justify-end p-1 text-white text-xs" />
                </div>
              </div>

              <div className="mt-6 p-4 bg-DecenaryColor border border-teal-500 rounded-lg flex items-center">
                <div>
                  <p className="font-normal text-sm text-QuaternaryColor ">No of Sector</p>
                  <p className="text-lg font-bold text-teal-700">
                    <Skeleton width={100} />
                  </p>
                </div>
                <div className="ml-auto text-gray-500">

                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20 31.1537L10 25.7179V17.6408L5.12836 14.9999L20 6.92285L34.8717 14.9999V25.6412H33.205V15.9358L30 17.6408V25.7179L20 31.1537ZM20 21.1666L31.3846 14.9999L20 8.83327L8.61544 14.9999L20 21.1666ZM20 29.2533L28.3334 24.7533V18.5574L20 23.0708L11.6667 18.5574V24.7533L20 29.2533Z" fill="#909090" />
                  </svg>

                </div>
              </div>
            </div>
          </div>

        </motion.div>
        
      )
      }
    </>

  );
}

export default LoadingStudentTableSkeleton;