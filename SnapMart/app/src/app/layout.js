import "./globals.css";
import Header from "@/components/Header";
import MainLayout from "@/layouts/MainLayout";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: {
    default: "SnapMart",
    template: "%s | SnapMart",
  },
  description:
    "SnapMart – AI-Powered Hyperlocal Commerce Platform. Order from nearby grocery stores, pharmacies, and more. Faster delivery, real-time inventory.",
  keywords:
    "Online shopping in Nepal, Hyperlocal delivery, Grocery delivery Nepal, SnapMart, NCIT",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
      <MainLayout>
        <Header />
        {children}
      </MainLayout>

      <ToastContainer position="top-center" autoClose={2000} />
    </body>
  </html>
);

export default RootLayout;
