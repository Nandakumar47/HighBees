import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PageLayout from "./components/layout/PageLayout/PageLayout";
import Home from "./pages/Home";
import Destinations from "./pages/Destinations";
import DestinationDetail from "./pages/DestinationDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Enquiry from "./pages/Enquiry";
import ErrorPage from "./pages/ErrorPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEnquiries from "./pages/admin/AdminEnquiries";
import AdminContactMessages from "./pages/admin/AdminContactMessages";
import { ROUTES } from "./utils/constants";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";
import AdminLayout from "./components/layout/AdminLayout";
import { ErrorBoundary } from "react-error-boundary";
import axios from "axios";
axios.defaults.baseURL = "https://highbeesholidays.com";
const App: React.FC = () => {
  return (
    <ErrorBoundary fallback={<ErrorPage />}>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen bg-white">
            <Routes>
              {/* Public Routes with shared PageLayout */}
              <Route element={<PageLayout />}>
                <Route path={ROUTES.HOME} element={<Home />} />
                <Route path={ROUTES.ABOUT} element={<About />} />
                <Route path={ROUTES.CONTACT} element={<Contact />} />
                <Route path={ROUTES.ENQUIRY} element={<Enquiry />} />
                <Route path="destinations">
                  <Route index element={<Destinations />} />
                  <Route path=":destination" element={<DestinationDetail />} />
                </Route>
              </Route>

              {/* Admin Routes without shared layout */}
              <Route path={ROUTES.ADMIN.LOGIN} element={<AdminLogin />} />
              <Route path="admin" element={<AdminLayout />}>
                <Route
                  path={ROUTES.ADMIN.DASHBOARD}
                  element={<AdminDashboard />}
                />
                <Route
                  path={ROUTES.ADMIN.ENQUIRIES}
                  element={<AdminEnquiries />}
                />
                <Route
                  path={ROUTES.ADMIN.CONTACT_MESSAGES}
                  element={<AdminContactMessages />}
                />
              </Route>

              {/* Error Routes */}
              <Route path={ROUTES.ERROR} element={<ErrorPage />} />
              <Route path="/404" element={<ErrorPage isNotFound />} />

              {/* Catch all route - redirect to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;
