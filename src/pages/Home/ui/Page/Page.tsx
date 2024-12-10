import { submitFormData } from "@/api/Reqest";
import { DashboardBarChart } from "@/shared/DashboardBarChart/DashboardBarChart";
import { Cards } from "@/shared/DashboardCard/Cards";
import { TransactionsTable } from "@/shared/TransactionsTable/TransactionsTable";
import { permission_details } from "@/utils";
import { FC, useEffect } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;
const token = localStorage.getItem("token");
const customer_login_auth = localStorage.getItem("customer_login_auth");

const Home: FC = () => {
  const fetchData = async () => {
    if (token) {
      localStorage.setItem("token", token);

      console.log(`token`, token);

      const response = JSON.parse(customer_login_auth);

      const user = response.data?.user;
      const page_list = `${API_URL}/user/${user?.username}`;

      const option = {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
      };

      console.log(`optioddddn`, option);

      const data_user: any = await submitFormData(page_list, option);

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

      const perMission_ = permission.map((permit: any) => {
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

      localStorage.setItem("permission", JSON.stringify(object));

      setTimeout(() => {
        window.location.href = window.location.origin + "/admin";
      }, 500);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const cards = [
    {
      title: 'Balance',
      amount: '321,010.18',
      change: '25%',
      isPositive: true,
    },
    {
      title: 'Income',
      amount: '78,301.15',
      change: '12%',
      isPositive: true,
    },
    {
      title: 'Expense',
      amount: '25,502.23',
      change: '8%',
      isPositive: false,
    },
    // {
    //   title: 'Bill',
    //   amount: '779.72',
    //   change: '8%',
    //   isPositive: true,
    // },
  ];

  return (
    <>
    <div className="h-screen">
      <div className="md:w-full grid xs:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 gap-5  p-6 ">
      {cards.map((card, index) => (
        <Cards
          key={index}
          title={card.title}
          amount={card.amount}
          change={card.change}
          isPositive={card.isPositive}
        />
      ))}
    </div>
    <DashboardBarChart/>
    <TransactionsTable/>
    </div>
    </>
  );
};

export default Home;
