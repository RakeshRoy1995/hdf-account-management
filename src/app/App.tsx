import { FC, useEffect } from "react";
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "@/app/Layout";

const LandingPage = React.lazy(() => import("@/pages/LandingPage/LandingPage"));
const Home = React.lazy(() => import("@/pages/Home/index"));
const Login = React.lazy(() => import("@/pages/Login/Login"));
const PrivateRoute = React.lazy(() => import("./PrivateRoute"));

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

const Accountingperiod = React.lazy(
  () => import("@/pages/configure/Accounting-period/Accountingperiod"),
);

const PaymentVoucher = React.lazy(
  () => import("@/pages/voucher/PaymentVoucher"),
);

const AddComponent = React.lazy(
  () => import("@/pages/configure/Component/AddComponent"),
);

import { submitFormData } from "@/api/Reqest";
import TrailBalance from "@/pages/financial-report/Trail-balance/TrailBalance";
import ChargeInEquity from "@/pages/financial-report/Charge-in-equity/ChargeInEquity";
import LedgerInformation from "@/pages/financial-report/ledger-information/LedgerInformation";
import RecitVoucher from "@/pages/voucher/RecitVoucher";
import JournelVoucher from "@/pages/voucher/JournelVoucher";
// import PaymentVoucher from "@/pages/voucher/PaymentVoucher";
// import Accountingperiod from "@/pages/configure/Accounting-period/Accountingperiod";

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
              <Route path="/account/bank" element={<BankAdd />} />
              <Route path="/bank-add" element={<BankAdd />} />
              <Route path="/account/branch" element={<Branch />} />
              <Route path="/account/bank-account" element={<BankAccount />} />
              <Route path="/account/cashbook" element={<Currency />} />
              <Route path="/account/voucher" element={<Currency />} />
              <Route path="/account/journel-voucher" element={<JournelVoucher />} />
              <Route path="/account/payment-voucher" element={<PaymentVoucher />} />
              <Route path="/account/receipt-voucher" element={<Currency />} />
              <Route path="/account/trail-balance" element={<RecitVoucher />} />
              <Route path="/account/changes-equity" element={<ChargeInEquity />} />
              <Route path="/account/ledger-information" element={<LedgerInformation />} />
              <Route path="/account/cash-bank" element={<TrailBalance />} />
              <Route path="/account/bank-book" element={<TrailBalance />} />
              <Route path="/account/trail-balance" element={<TrailBalance />} />
              <Route path="/account/dividend-rate" element={<TrailBalance />} />
              <Route path="/account/trail-balance" element={<TrailBalance />} />
              <Route path="/account/trail-balance" element={<TrailBalance />} />
              <Route path="/account/trail-balance" element={<TrailBalance />} />
              <Route path="/account/income-statement" element={<Currency />} />
              <Route path="/account/balance-sheet" element={<Currency />} />
              <Route path="/account/currency" element={<Currency />} />
              <Route
                path="/account/financier"
                element={<DonorOrganization />}
              />
              <Route path="/account/project-info" element={<ProjectList />} />
              <Route
                path="/account/project-setup-add"
                element={<AddProjectSetup />}
              />
              <Route
                path="/project-edit/:projectId"
                element={<ProjectEdit />}
              />

              <Route
                path="/account/financier"
                element={<DonorOrganization />}
              />

              <Route
                path="/account/accounting-period"
                element={<Accountingperiod />}
              />

              <Route
                path="/account/opening-balance"
                element={<Accountingperiod />}
              />

              <Route path="/account/component" element={<AddComponent />} />
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
