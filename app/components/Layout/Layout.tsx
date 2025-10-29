import React from "react";
import { Outlet, useNavigation } from "react-router";
import { Header } from "./Header/Header";
import { Footer } from "./Footer/Footer";

function Layout() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  return (
    <>
      <Header />
      <main className="px-4 w-full">
        {isNavigating && (
          <div className="max-w-[1200px] m-auto flex justify-center items-center h-[60vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
              <p>Loading...</p>
            </div>
          </div>
        )}
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Layout;
