import { useNavigate } from "react-router-dom";

export const BreadcumbWithButton = ({ name, url, setaddFormShow }: any) => {
  const navigate = useNavigate();

  const onclk = ()=> {
    if (setaddFormShow) {
      setaddFormShow(true)
    }

    if (url) {
      navigate(url)
    }

    
  }

  return (
    <div className="flex sm:flex-col md:flex-row lg:flex-row items-center space-x-4  breadcrumbs w-fit ml-1 mb-5">
      {name && (
        <>
          <div>
            List of <span className=" ml-1  text-sm font-bold">{name}</span>
          </div>
          {url && (
            <div
              className="w-fit p-3 border-2 cursor-pointer rounded-full border-primaryColor text-primaryColor text-sm font-bold  bg-white text-center"
              onClick={(e:any) => onclk()  }
            >
              +  New {name}{" "} Setup
            </div>
          )}
        </>
      )}
    </div>
  );
};
