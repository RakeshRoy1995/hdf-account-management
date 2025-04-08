// import { Collapse } from "@mui/material";
// import { useState, useEffect } from "react";
// import { AiOutlineRight } from "react-icons/ai";
// import { Link } from "react-router-dom";

// import { submitFormData } from "@/api/Reqest";
// import { permission_details } from "@/utils";

// const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

// export default function Menu() {
//   const [activeItem, setActiveItem] = useState(null);

//   const handleActive = (item: any) => {
//     console.log(`item`, item);
//     localStorage.setItem("permission_access", JSON.stringify(item));
//     setActiveItem(item?.name); // Update the active item on click
//   };

//   const [userOpen, setuserOpen] = useState(false);
//   const [menu, setmenu] = useState<any>({});
//   const [TargetOpen, setTargetOpen] = useState({});

//   const fetchData = async () => {
//     const token = localStorage.getItem("token");
//     const customer_login_auth = localStorage.getItem("customer_login_auth");

//     if (token) {
//       localStorage.setItem("token", token);
//       const response = JSON.parse(customer_login_auth);

//       const user = response?.user;
//       const page_list = `${API_URL}/user/${user?.username}`;

//       const option = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "content-type": "application/json",
//         },
//       };

//       const data_user: any = await submitFormData(page_list, option);

//       localStorage.setItem("user_info", JSON.stringify(data_user.data));

//       let newObj = {};

//       for (let index = 0; index < data_user.data.roles.length; index++) {
//         const element = data_user.data.roles[index];

//         const page_list_role_wiseSubmenu = `${API_URL}/menu/rolewisemenusubmenu?roleId=${element?.roleId}`;

//         const options = {
//           headers: {
//             Authorization: token ? `Bearer ${token}` : undefined,
//             "content-type": "application/json",
//           },
//         };

//         const data_role_wiseSubmenu: any = await submitFormData(
//           page_list_role_wiseSubmenu,
//           options,
//         );

//         newObj = { ...newObj, ...data_role_wiseSubmenu.data };
//       }

//       const page_list_permission = `${API_URL}/permission`;

//       const options_ = {
//         headers: {
//           Authorization: token ? `Bearer ${token}` : undefined,
//           "content-type": "application/json",
//         },
//       };
//       const data_permission: any = await submitFormData(
//         page_list_permission,
//         options_,
//       );

//       const permission = data_permission.data;

//       const perMission_ = permission.map((permit: any) => {
//         const obj = {
//           ...permit,
//           ["id"]: permit.permissionId + "-" + Math.random(),
//         };

//         return obj;
//       });
//       localStorage.setItem("permission_data", JSON.stringify(perMission_));
//       const data_role_wiseSubmenuData = Object.values(newObj);

//       const finalArr: any = [];

//       for (let index = 0; index < data_role_wiseSubmenuData.length; index++) {
//         let obj: any = {};
//         const data_role_wiseSubmenuData_el: any =
//           data_role_wiseSubmenuData[index];

//         const permissionIds = data_role_wiseSubmenuData_el?.permissionIds;
//         const submenus = data_role_wiseSubmenuData_el?.submenus;

//         const permssion_detls = permission_details(permission, permissionIds);
//         delete data_role_wiseSubmenuData_el["permissionIds"];

//         const tempArr = [];
//         if (submenus.length) {
//           let obj_2 = {};

//           for (let index = 0; index < submenus.length; index++) {
//             const submenus_EL = submenus[index];

//             const permissionIds = submenus_EL?.permissionIds;

//             const permssion_detls = permission_details(
//               permission,
//               permissionIds,
//             );

//             delete submenus_EL["permissionIds"];
//             obj_2 = {
//               ...submenus_EL,
//               ["permission"]: permssion_detls,
//             };

//             tempArr.push(obj_2);
//           }
//         }
//         delete data_role_wiseSubmenuData_el["submenus"];

//         obj = {
//           ...data_role_wiseSubmenuData_el,
//           ["permission"]: permssion_detls,
//           ["subMenu"]: tempArr,
//         };
//         finalArr.push(obj);
//       }

//       const object: any = {
//         data: finalArr,
//       };

//       setmenu(object);

//       localStorage.setItem("permission", JSON.stringify(object));
//     }

//     const upozila_list = localStorage.getItem("upazila_list")
//     const district_list = localStorage.getItem("district_list")
//     const division_list = localStorage.getItem("division_list")
//     const org_level = localStorage.getItem("org_level")

//     if (token && !upozila_list) {
//       const page_list = `${API_URL}/upazila/all`;
//       const { data }: any = await submitFormData(page_list, {});

//       localStorage.setItem("upazila_list", JSON.stringify(data));
//     }

//     // location district

//     if (token && !district_list) {
//       const page_list = `${API_URL}/district/all`;
//       const { data }: any = await submitFormData(page_list, {});

//       localStorage.setItem("district_list", JSON.stringify(data));
//     }

//     // location division

//     if (token && !division_list) {
//       const page_list = `${API_URL}/division`;
//       const { data }: any = await submitFormData(page_list, {});

//       localStorage.setItem("division_list", JSON.stringify(data));
//     }

//     // config settings

//     if (token) {
//       const page_list = `${API_URL}/approval-config?currentPage=1&pageSize=10000`;
//       const { data }: any = await submitFormData(page_list, {});

//       localStorage.setItem("config_setting", JSON.stringify(data));
//     }

//     // Organization level

//     if (token && !org_level) {
//       const page_list = `${API_URL}/organization-level`;
//       const { data }: any = await submitFormData(page_list, {});

//       localStorage.setItem("org_level", JSON.stringify(data));
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <ul className="w-full">
//       {menu?.data?.map((menu_data: any) => (
//         <>
//           {menu_data?.checked && (
//             <>
//               {menu_data.subMenu.length > 0 ? (
//                 <>
//                   {!menu_data.subMenu[0].route.includes("loan/") && (
//                     <>
//                       <li
//                         className={`cursor-pointer flex items-center p-3 gap-2 ${
//                           userOpen
//                             ? "bg-secondaryColor text-white font-bold" // Apply hover styles when userOpen is true
//                             : "hover:bg-secondaryColor hover:text-white hover:font-bold" // Apply hover styles only on hover when userOpen is false
//                         }`}
//                         onClick={() =>
//                           setTargetOpen({
//                             ...TargetOpen,
//                             [menu_data?.name]: TargetOpen[menu_data?.name]
//                               ? false
//                               : true,
//                           })
//                         }
//                       >
//                         <svg
//                                       width="24"
//                                       height="24"
//                                       viewBox="0 0 24 24"
//                                       xmlns="http://www.w3.org/2000/svg"
//                                     >
//                                       <path
//                                         d="M17.2308 8.76925H18.7693V7.23075H17.2308V8.76925ZM17.2308 12.7692H18.7693V11.2308H17.2308V12.7692ZM17.2308 16.7692H18.7693V15.2308H17.2308V16.7692ZM16 20V19H21V5H11.3845V7.1885L10.3845 6.46925V4H22V20H16ZM2 20V11.5L8 7.23075L14 11.5V20H9.26925V15.5H6.73075V20H2ZM3 19H5.73075V14.5H10.2692V19H13V12L8 8.4885L3 12V19Z"
//                                         fill="currentColor"
//                                       />
//                                     </svg>
//                         <span>{menu_data?.name}</span>
//                         <AiOutlineRight
//                           className={`custom-arrow ml-auto ${userOpen ? "rotate-90" : ""}`}
//                         />
//                       </li>

//                       <Collapse in={TargetOpen[menu_data?.name]}>
//                         <ul className="">
//                           {menu_data.subMenu.map((d: any) => (
//                             <>
//                               {d.checked && (
//                                 <li
//                                   className={`w-full my-5 cursor-pointer border-l-2 ${
//                                     activeItem === d?.name
//                                       ? "border-l-secondaryColor text-secondaryColor font-bold"
//                                       : "border-transparent"
//                                   }`}
//                                   onClick={() => handleActive(d)} // Set as active when clicked
//                                 >
//                                   <Link
//                                     to={d?.route}
//                                     className="ml-3 flex items-center"
//                                   >

//                                     <span className="ml-4">{d?.name}</span>
//                                   </Link>
//                                 </li>
//                               )}
//                             </>
//                           ))}
//                         </ul>
//                       </Collapse>
//                     </>
//                   )}
//                 </>
//               ) : (
//                 <li className="cursor-pointer flex items-center p-3 hover:bg-secondaryColor hover:text-white gap-2 hover:font-bold">
//                   <Link to={menu_data?.route} className="flex items-center">
//                     <svg
//                       width="24"
//                       height="24"
//                       viewBox="0 0 24 24"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M17.2308 8.76925H18.7693V7.23075H17.2308V8.76925ZM17.2308 12.7692H18.7693V11.2308H17.2308V12.7692ZM17.2308 16.7692H18.7693V15.2308H17.2308V16.7692ZM16 20V19H21V5H11.3845V7.1885L10.3845 6.46925V4H22V20H16ZM2 20V11.5L8 7.23075L14 11.5V20H9.26925V15.5H6.73075V20H2ZM3 19H5.73075V14.5H10.2692V19H13V12L8 8.4885L3 12V19Z"
//                         fill="currentColor"
//                       />
//                     </svg>

//                     <span className="ml-2">{menu_data?.name}</span>
//                   </Link>
//                 </li>
//               )}
//             </>
//           )}
//         </>
//       ))}
//     </ul>
//   );
// }

import { Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import { AiOutlineRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import { submitFormData } from "@/api/Reqest";
import { permission_details } from "@/utils";
import {
  Chart as ChartJS,
  BarElement,
  LinearScale,
  CategoryScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LinearScale,
  CategoryScale,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
);

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function Menu({ isSidebarOpen }) {
  const [activeItem, setActiveItem] = useState(null);

  const handleActive = (item: any) => {
    localStorage.setItem("permission_access", JSON.stringify(item));
    setActiveItem(item?.name); // Update the active item on click
  };

  const [menu, setmenu] = useState<any>({});
  const [TargetOpen, setTargetOpen] = useState({});

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const customer_login_auth = localStorage.getItem("customer_login_auth");

    if (token) {
      localStorage.setItem("token", token);
      const response = JSON.parse(customer_login_auth);

      const user = response?.user;
      const page_list = `${API_URL}/user/${user?.username}`;

      const option = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };

      const data_user: any = await submitFormData(page_list, option);

      localStorage.setItem("user_info", JSON.stringify(data_user.data));

      let newObj = {};

      for (let index = 0; index < data_user.data.roles.length; index++) {
        const element = data_user.data.roles[index];

        const page_list_role_wiseSubmenu = `${API_URL}/menu/rolewisemenusubmenu?roleId=${element?.roleId}`;

        const options = {
          headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "content-type": "application/json",
          },
        };

        const data_role_wiseSubmenu: any = await submitFormData(
          page_list_role_wiseSubmenu,
          options,
        );

        newObj = { ...newObj, ...data_role_wiseSubmenu.data };
      }

      const page_list_permission = `${API_URL}/permission`;

      const options_ = {
        headers: {
          Authorization: token ? `Bearer ${token}` : undefined,
          "content-type": "application/json",
        },
      };
      const data_permission: any = await submitFormData(
        page_list_permission,
        options_,
      );

      const permission = data_permission.data;

      const perMission_ = permission?.map((permit: any) => {
        const obj = {
          ...permit,
          ["id"]: permit.permissionId + "-" + Math.random(),
        };

        return obj;
      });
      localStorage.setItem("permission_data", JSON.stringify(perMission_));
      const data_role_wiseSubmenuData = Object.values(newObj);

      const finalArr: any = [];

      for (let index = 0; index < data_role_wiseSubmenuData.length; index++) {
        let obj: any = {};
        const data_role_wiseSubmenuData_el: any =
          data_role_wiseSubmenuData[index];

        const permissionIds = data_role_wiseSubmenuData_el?.permissionIds;
        const submenus = data_role_wiseSubmenuData_el?.submenus;

        const permssion_detls = permission_details(permission, permissionIds);
        delete data_role_wiseSubmenuData_el["permissionIds"];

        const tempArr = [];
        if (submenus.length) {
          let obj_2 = {};

          for (let index = 0; index < submenus.length; index++) {
            const submenus_EL = submenus[index];

            const permissionIds = submenus_EL?.permissionIds;

            const permssion_detls = permission_details(
              permission,
              permissionIds,
            );

            delete submenus_EL["permissionIds"];
            obj_2 = {
              ...submenus_EL,
              ["permission"]: permssion_detls,
            };

            tempArr.push(obj_2);
          }
        }
        delete data_role_wiseSubmenuData_el["submenus"];

        obj = {
          ...data_role_wiseSubmenuData_el,
          ["permission"]: permssion_detls,
          ["subMenu"]: tempArr,
        };
        finalArr.push(obj);
      }

      const object: any = {
        data: finalArr,
      };

      setmenu(object);

      localStorage.setItem("permission", JSON.stringify(object));

      const upozila_list = localStorage.getItem("upazila_list");
      const district_list = localStorage.getItem("district_list");
      const division_list = localStorage.getItem("division_list");
      const org_level = localStorage.getItem("org_level");

      if (token && !upozila_list) {
        const page_list = `${API_URL}/upazila/all`;
        const { data }: any = await submitFormData(page_list, {});

        localStorage.setItem("upazila_list", JSON.stringify(data));
      }

      // location district

      if (token && !district_list) {
        const page_list = `${API_URL}/district/all`;
        const { data }: any = await submitFormData(page_list, {});

        localStorage.setItem("district_list", JSON.stringify(data));
      }

      // location division

      if (token && !division_list) {
        const page_list = `${API_URL}/division`;
        const { data }: any = await submitFormData(page_list, {});

        localStorage.setItem("division_list", JSON.stringify(data));
      }

      // config settings

      if (token) {
        const page_list = `${API_URL}/approval-config?currentPage=1&pageSize=10000`;
        const { data }: any = await submitFormData(page_list, {});

        localStorage.setItem("config_setting", JSON.stringify(data));
      }

      // Organization level

      if (token && !org_level) {
        const page_list = `${API_URL}/organization-level`;
        const { data }: any = await submitFormData(page_list, {});

        localStorage.setItem("org_level", JSON.stringify(data));
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(`menu?.data`,menu?.data );

  return (
    <ul className="w-full font-sans overflow-y-auto text-lightwhite">
      {menu?.data?.map(
        (menu_data: any) =>
          menu_data?.checked && menu_data?.menuModuleIds?.includes(4) && (
            <li key={menu_data?.name}>
              {menu_data?.subMenu.length > 0 ? (
                 (
                  <>
                    <li
                      className={`cursor-pointer flex items-center p-3 gap-2 ${TargetOpen[menu_data?.name] ? " text-white  text-base font-bold" : " hover:text-white  text-sm"}`}
                      onClick={() =>
                        setTargetOpen((prev) => ({
                          ...prev,
                          [menu_data?.name]: !prev[menu_data?.name],
                        }))
                      }
                    >
                      <svg
                        width="20px"
                        height="20px"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M20 8.5V13.5M17.5 11H22.5M8 15C5.79086 15 4 16.7909 4 19V21H20V19C20 16.7909 18.2091 15 16 15H12M12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11C14.2091 11 16 9.20914 16 7C16 6.27143 15.8052 5.58835 15.4649 5"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      {isSidebarOpen && (
                        <span className="text-sm">{menu_data?.name} </span>
                      )}
                      <AiOutlineRight
                        className={`custom-arrow ml-auto ${TargetOpen[menu_data?.name] ? "rotate-90" : ""}`}
                      />
                    </li>

                    {/* Submenu Items */}
                    <Collapse in={TargetOpen[menu_data?.name]}>
                      <ul className="pl-8">
                        {menu_data?.subMenu?.map(
                          (submenu) =>
                            submenu?.checked && (
                              <li
                                key={submenu?.name}
                                onClick={() => handleActive(submenu)}
                                className={`w-full my-2 cursor-pointer border-l-2 pl-1 ${activeItem === submenu?.name ? "border-l-secondaryColor text-strongwhite  font-base" : "border-transparent hover:text-strongwhite"}`}
                              >
                                <Link
                                  to={submenu?.route}
                                  className="flex items-center ml-2"
                                >
                                  {isSidebarOpen && (
                                    <span className="ml-2 text-sm">
                                      {submenu.name}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ),
                        )}
                      </ul>
                    </Collapse>
                  </>
                )
              ) : (
                <Link
                  to={menu_data?.route}
                  className={`cursor-pointer flex items-center  gap-2  hover:text-white ${isSidebarOpen ? "" : ""}`}
                >
                  <svg
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.2308 8.76925H18.7693V7.23075H17.2308V8.76925ZM17.2308 12.7692H18.7693V11.2308H17.2308V12.7692ZM17.2308 16.7692H18.7693V15.2308H17.2308V16.7692ZM16 20V19H21V5H11.3845V7.1885L10.3845 6.46925V4H22V20H16ZM2 20V11.5L8 7.23075L14 11.5V20H9.26925V15.5H6.73075V20H2ZM3 19H5.73075V14.5H10.2692V19H13V12L8 8.4885L3 12V19Z"
                      fill="currentColor"
                    />
                  </svg>
                  {isSidebarOpen && <span>{menu_data?.name}</span>}
                </Link>
              )}
            </li>
          ),
      )}
    </ul>
  );
}
