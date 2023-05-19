import Register from "./components/Register";
import Login from "./components/Login";
import Layout from "./components/Layout";
import Admin from "./components/Admin";
import Missing from "./components/Missing";
import Unauthorized from "./components/Unauthorized";
import Lounge from "./components/Lounge";
import RequireAuth from "./components/RequireAuth";
import { Routes, Route } from "react-router-dom";
import ProductOverview from "./components/ProductOverview";
import ProductsList from "./components/ProductsList";
import NavBarLayout from "./layouts/NavBar";
import ProductForm from "./components/ProductForm";
import CreditCardList from "./components/CreditCardList";
import OrderList from "./components/OrderList";
import Users from "./components/Users";
import Reports from "./components/Reports";

export const ROLES = {
  User: 2000,
  Delivery: 1580,
  Admin: 5002,
};

export const REPORTS = {
  topSales: 0,
  topCustomers: 1,
  featuredCustomers: 2,
  activeCustomers: 3,
  inventoryCustomers: 4,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<NavBarLayout />}>
          <Route path="/" element={<ProductsList />} />
          <Route path="/product/:id" element={<ProductOverview />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* we want to protect these routes */}
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/product-form" element={<ProductForm />} />
            <Route
              path="/profile/products"
              element={<ProductsList profile={true} />}
            />
            <Route path="/cards" element={<CreditCardList />} />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.Delivery, ROLES.User]} />
            }
          >
            <Route path="/orders" element={<OrderList />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="/users" element={<Users />} />
            <Route path="/new-employee" element={<Register admin={true} />} />
            <Route path="/report/top-sales" element={<Reports type={REPORTS.topSales} />} />
            <Route path="/report/top-customers" element={<Reports type={REPORTS.topCustomers} />} />
            <Route path="/report/featured-customers" element={<Reports type={REPORTS.featuredCustomers} />} />
            <Route path="/report/active-customers" element={<Reports type={REPORTS.activeCustomers} />} />
            <Route path="/report/inventory-customers" element={<Reports type={REPORTS.inventoryCustomers} />} />
          </Route>

          <Route
            element={
              <RequireAuth allowedRoles={[ROLES.Delivery, ROLES.Admin]} />
            }
          >
            <Route path="lounge" element={<Lounge />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
