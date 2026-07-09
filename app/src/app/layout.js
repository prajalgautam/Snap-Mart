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
    "Hyperlocal e-commerce platform connecting customers with nearby local shops.",
  keywords:
    "SnapMart, local shops, hyperlocal ecommerce, online shopping in Nepal, fast delivery",
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
