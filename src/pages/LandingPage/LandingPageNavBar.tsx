import { Link } from "react-router-dom"


const LandingPageNavBar = () => {

    const auth: any = JSON.parse(localStorage.getItem("customer_login_auth"))

    console.log(`auth`, auth);
    return (
        <>
            <div className="bg-[#DEf4ff] p-2 flex justify-between ">
                <div className="flex items-center">
                    <div className="flex items-center px-10">
                        <span className="bg-[#FFCC1D] rounded-full h-8 w-8 flex items-center justify-center absolute -mt-3">
                            <span className="text-white text-xl font-bold"></span>
                        </span>
                        <Link to={"/"}>
                            <span className="text-teal-700 text-4xl font-bold ml-3 relative"></span>
                        </Link>
                    </div>
                </div>
                <div className="flex gap-5 px-20 py-2">
                    {/* login btn */}
                    <div>
                        <Link to={auth ? "/admin" : "/login"}>
                            <button
                                className="block w-full text-center font-bold text-sm px-8 py-3 text-white rounded-md  font-sans bg-primaryColor "
                            >
                                {auth ? auth?.user?.name : "Login"}
                            </button>
                        </Link>
                    </div>
                    {/* signup btn */}
                    {/* <div>
                        <Link to={"/register"}>
                            <button
                                className="block w-full text-center font-bold text-sm px-8 py-3 text-white rounded-md  font-sans bg-primaryColor  "
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div> */}

                </div>
            </div>
        </>
    )
}

export default LandingPageNavBar