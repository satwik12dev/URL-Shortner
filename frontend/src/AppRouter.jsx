import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

const AppRouter = () => {
  const location = useLocation();
  const hideHeaderFooter = location.pathname.startsWith("/s/");

  return (
    <div className="flex flex-col min-h-screen">
      {!hideHeaderFooter && <Navbar />}
      <Toaster
        position="bottom-center"
        containerStyle={{
          zIndex: 999999,
        }}
        toastOptions={{
          className:
            "!bg-slate-900 !text-white !border !border-slate-700 !shadow-2xl !rounded-2xl !text-sm !py-3 !px-4",
          duration: 3000,
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f43f5e",
              secondary: "#ffffff",
            },
          },
        }}
      />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />

          <Route
            path="/register"
            element={
              <PrivateRoute publicPage={true}>
                <RegisterPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PrivateRoute publicPage={true}>
                <LoginPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute publicPage={false}>
                <DashboardLayout />
              </PrivateRoute>
            }
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route
            path="*"
            element={
              <ErrorPage message="We can't seem to find the page you're looking for." />
            }
          />
        </Routes>
      </main>
      {(location.pathname === "/" || location.pathname === "/about") && <Footer />}
    </div>
  );
};

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <Routes>
      <Route path="/:url" element={<ShortenUrlPage />} />
    </Routes>
  );
};