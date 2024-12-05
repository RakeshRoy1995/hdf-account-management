import { FC, useEffect } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";

const LandingPage = React.lazy(() => import("@/pages/LandingPage/LandingPage"));
const Home = React.lazy(() => import("@/pages/Home/index"));
const Login = React.lazy(() => import("@/pages/Login/Login"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

const Bank = React.lazy(() => import("@/pages/GeneralSettings/Bank/Bank"));
const BankAdd = React.lazy(
  () => import("@/pages/GeneralSettings/Bank/BankAdd"),
);
const ParentGL = React.lazy(
  () => import("@/pages/chart-of-account/GL/ParentGL"),
);

const Currency = React.lazy(
  () => import("@/pages/LoanMgt/DepositProductService/Currency/Currency"),
);

const Branch = React.lazy(() => import("@/pages/GeneralSettings/Bank/Branch"));
const BankAccount = React.lazy(
  () => import("@/pages/GeneralSettings/Bank/BankAccount"),
);
const DonorOrganization = React.lazy(
  () => import("@/pages/configure/Donor Organization/DonorOrganization"),
);
const ProjectList = React.lazy(
  () => import("@/pages/configure/ProjectSetup/ProjectList"),
);
const AddProjectSetup = React.lazy(
  () => import("@/pages/configure/ProjectSetup/AddProjectSetup"),
);
const ProjectEdit = React.lazy(
  () => import("@/pages/configure/ProjectSetup/ProjectEdit"),
);

import { submitFormData } from "@/api/Reqest";

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
              <Route path="/account/chart-of-account" element={<ParentGL />} />

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
              <Route path="/account/currency" element={<Currency />} />
              <Route
                path="/account/financier"
                element={<DonorOrganization />}
              />
              <Route path="/account/project-info" element={<ProjectList />} />
              <Route path="/account/project-setup-add" element={<AddProjectSetup />} />
              <Route
                path="/project-edit/:projectId"
                element={<ProjectEdit />}
              />

              <Route
                path="/account/financier"
                element={<DonorOrganization />}
              />
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
