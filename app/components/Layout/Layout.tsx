import React from "react";
import { Outlet } from "react-router";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <main>
        klkl
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
