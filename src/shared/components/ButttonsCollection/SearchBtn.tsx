import { get_all_data } from "@/api/Reqest";
import useFetch from "@/hooks/useFetch";
import { useEffect } from "react";

const SearchBtn = ({ params, apiEndPoint, setsearchData, btn_type }: any) => {

  const search_api = async (apiEndPoint, params: any) => {
    const response_ministry_List: any = await get_all_data(apiEndPoint, params);
    const ministry_List_Array = response_ministry_List?.data;
    setsearchData(ministry_List_Array);
  };

  return (
    <div className="flex justify-end mt-5">
      <button
        type={btn_type || "button"}
        onClick={(e: any) => search_api(apiEndPoint, params)}
        className="text-secondaryColor font-bold text-sm bg-DecenaryColor  flex justify-center items-center gap-1 px-8 py-3  rounded-full shadow-lg"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBtn;
