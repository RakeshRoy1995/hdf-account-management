import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const Breadcrumb = ({ name1, name2, url }: any) => {

  return (
    <>
      <div className="flex sm:flex-col md:flex-row lg:flex-row items-center space-x-4  breadcrumbs w-fit  mb-5 ">
     
        <div>List of <span className='text-sm font-bold '>{name1}</span>
          <ArrowForwardIosIcon className='text-[#5F6368] ml-5' />
        </div>
        <div className="w-fit p-3  border-primaryColor text-primaryColor text-sm font-semibold  "> {name2}</div>
      </div>

    </>
  )
}

export default Breadcrumb