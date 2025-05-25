import GlobalStyles from "../styles/GlobalStyles";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Bookings from "../pages/Bookings";
import Cabins from "../pages/Cabins";
import Users from "../pages/Users";
import Settings from "../pages/Settings";
import PageNotFound from "../pages/PageNotFound";
import Account from "../pages/Account";
import Login from "../pages/Login";
import AppLayout from "../ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "react-hot-toast";
import Booking from "../pages/Booking";
import Checkin from "../pages/Checkin";
import ProtectedRoute from "./ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeCTX";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DarkModeProvider>
          <BrowserRouter>
            <GlobalStyles />
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate to={"dashboard"} replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="bookings" element={<Bookings />} />
                <Route path="bookings/:id" element={<Booking />} />
                <Route path="checkin/:id" element={<Checkin />} />
                <Route path="rooms" element={<Cabins />} />
                <Route path="users" element={<Users />} />
                <Route path="settings" element={<Settings />} />
                <Route path="account" element={<Account />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            containerStyle={{}}
            toastOptions={{
              // Define default options
              className: "",
              duration: 5000,
              removeDelay: 1000,
              style: {
                background: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
                padding: "16px 24px",
                fontSize: "16px",
                maxWidth: "500px",
              },

              // Default options for specific types
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
        </DarkModeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
