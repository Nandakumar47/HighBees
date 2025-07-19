import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import WhatsAppFloat from "../../features/home/WhatsAppFloat/WhatsAppFloat";
import { Outlet } from "react-router-dom";

interface PageLayoutProps {
  showWhatsApp?: boolean;
}

const PageLayout: React.FC<PageLayoutProps> = ({ showWhatsApp = true }) => {
  return (
    <>
      {/* <ScrollToTop /> */}
      <div className="min-h-screen bg-white">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
        {showWhatsApp && <WhatsAppFloat />}
      </div>
    </>
  );
};

export default PageLayout;
