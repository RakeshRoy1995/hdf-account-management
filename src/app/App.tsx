import { FC, useEffect } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";

const LandingPage = React.lazy(() => import("@/pages/LandingPage/LandingPage"));
const Home = React.lazy(() => import("@/pages/Home/index"));
const Login = React.lazy(() => import("@/pages/Login/Login"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

const Bank = React.lazy(() => import( "@/pages/GeneralSettings/Bank/Bank"));
const BankAdd = React.lazy(() => import( "@/pages/GeneralSettings/Bank/BankAdd"));
const ParentGL = React.lazy(
  () => import("@/pages/chart-of-account/GL/ParentGL"),
);


const Currency = React.lazy(
  () => import("@/pages/LoanMgt/DepositProductService/Currency/Currency"),
);

import { submitFormData } from "@/api/Reqest";
import Branch from "@/pages/GeneralSettings/Bank/Branch";
import BankAccount from "@/pages/GeneralSettings/Bank/BankAccount";


const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const App: FC = () => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    // location upozila

    const upozila_list = localStorage.getItem("upazila_list");
    const district_list = localStorage.getItem("district_list");
    const division_list = localStorage.getItem("division_list");

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
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" index element={<Login />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/admin" element={<Home />} />
              {/* <Route
                path="/dashboard/role-permission"
                element={<RolePermissionManagement />}
              /> */}
              <Route
                path="/account/chart-of-account"
                element={<ParentGL />}
              />

              {/* <Route
                path="/loan/deposite-product-type"
                element={<DepositProductType />}
              /> */}
              <Route path="/account/bank" element={<Bank />} />
              <Route path="/bank-add" element={<BankAdd />} />
              <Route path="/account/branch" element={<Branch />} />
              <Route path="/account/bank-account" element={<BankAccount />} />
              <Route path="/account/cashbook" element={<Currency />} />
              <Route path="/account/voucher" element={<Currency />} />
              <Route path="/account/journel-voucher" element={<Currency />} />
              <Route path="/account/payment-voucher" element={<Currency />} />
              <Route path="/account/receipt-voucher" element={<Currency />} />
              <Route path="/account/trail-balance" element={<Currency />} />
              <Route path="/account/income-statement" element={<Currency />} />
              <Route path="/account/balance-sheet" element={<Currency />} />
              <Route path="/account/cash-flow" element={<Currency />} />
              {/* <Route path="/loan/loan-borrow-form" element={<LoanBorrowForm />} />
              <Route
                path="/loan/deposite-product"
                element={<DepositeProduct />}
              /> */}
            </Route>
          </Route>

          {/* <Route path="/projectsetup"  element={<ProjectSetup/>}/> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
