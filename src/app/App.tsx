import { FC, useEffect } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";

const LandingPage = React.lazy(() => import('@/pages/LandingPage/LandingPage'));
const Home = React.lazy(() => import('@/pages/Home/index'));
const Login = React.lazy(() => import('@/pages/Login/Login'));
const PrivateRoute = React.lazy(() => import('./PrivateRoute'));

const OutreachCardsApply = React.lazy(() => import( "@/pages/LandingPage/OutreachCardsApply"));
const LayoutUser = React.lazy(() => import( "./Layout/ui/LayoutUser"));
const ParentGL = React.lazy(() => import( "@/pages/chart-of-account/GL/ParentGL"));
const RolePermissionManagement = React.lazy(() => import( "@/pages/user/role-permission-management/RolePermissionManagement"));
const DepositProductType = React.lazy(() => import( "@/pages/LoanMgt/DepositProductService/DepositProductType/DepositProductType"));
const  Currency  = React.lazy(() => import( "@/pages/LoanMgt/DepositProductService/Currency/Currency"));
const DepositeProduct = React.lazy(() => import( "@/pages/LoanMgt/DepositProductService/DepositeProduct/DepositeProduct"));
import { submitFormData } from "@/api/Reqest";
import LoanBorrowForm from "@/pages/LoanMgt/DepositProductService/loan-borrow/LoanBorrowForm";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const App: FC = () => {
  const fetchData = async () => {
    const token = localStorage.getItem("token");
    // location upozila

    const upozila_list = localStorage.getItem("upazila_list")
    const district_list = localStorage.getItem("district_list")
    const division_list = localStorage.getItem("division_list")

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
          <Route path="/" index element={<LandingPage />} />

          <Route path="/" element={<LayoutUser />}>
            <Route
              path="/apply-call-for-submission/:id"
              element={<OutreachCardsApply />}
            />
          </Route>

          <Route path="/" element={<PrivateRoute />}>
            <Route path="/" element={<Layout />}>
              <Route path="/admin" element={<Home />} />
              <Route
                path="/dashboard/role-permission"
                element={<RolePermissionManagement />}
              />
              <Route
                path="/loan/chart-of-account-setup/parent-gl"
                element={<ParentGL />}
              />

              <Route
                path="/loan/deposite-product-type"
                element={<DepositProductType />}
              />
              <Route path="/loan/deposite-currency" element={<Currency />} />
              <Route path="/loan/loan-borrow-form" element={<LoanBorrowForm />} />
              <Route
                path="/loan/deposite-product"
                element={<DepositeProduct />}
              />
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
