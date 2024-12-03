
const Button = ({name, type}:any) => {
  return (
    <>
        <div className="flex justify-end mt-5 gap-5">
          
          <div className="flex justify-end mt-5">

                <button type={type || "submit"} className=" flex justify-center items-center bg-primaryColor font-bold text-sm text-white rounded-lg px-5   gap-2 py-3">
                     {name}
                </button>

            </div>

        </div>
    </>
  );
};

export default Button;
