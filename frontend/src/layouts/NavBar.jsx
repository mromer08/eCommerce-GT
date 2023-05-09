import NavBar from "../components/NavBar";
import { Outlet } from "react-router-dom"
import { CartProvider } from "../context/cart";

export default function NavBarLayout() {
    return (
      <CartProvider>
        <NavBar />
        <Outlet />
      </CartProvider>
    );
  }