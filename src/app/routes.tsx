import { createBrowserRouter, Navigate } from "react-router-dom";
import { MobileLayout } from "./components/MobileLayout";

import { AuthScreen } from "./screens/Auth";
import { DoctorHomeScreen } from "./screens/Doctorhome";
import { PatientHome } from "./screens/Patienthome";

import BranchesScreen from "./screens/Branches";
import { BookingScreen } from "./screens/Booking";
import { HistoryScreen } from "./screens/History";
import { NotificationsScreen } from "./screens/Notifications";
import { ProfileScreen } from "./screens/Profile";

import { ProtectedRoute } from "./screens/protectedroute";
import { RoleRoute } from "./roleroute";

// helper
const getRole = () => localStorage.getItem("userRole");

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileLayout />,
    children: [
      // AUTH
      { index: true, element: <AuthScreen /> },

      // DASHBOARD ROLE ROUTING (IMPORTANT FIX)
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            {getRole() === "doctor" ? (
              <Navigate to="/doctor" replace />
            ) : (
              <Navigate to="/patient" replace />
            )}
          </ProtectedRoute>
        ),
      },

      // =========================
      // DOCTOR HOME
      // =========================
      {
        path: "doctor",
        element: (
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <DoctorHomeScreen />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },

      // =========================
      // PATIENT HOME
      // =========================
      {
        path: "patient",
        element: (
          <ProtectedRoute>
            <RoleRoute role="patient">
              <PatientHome />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },

      // =========================
      // COMMON ROUTES
      // =========================
      {
        path: "notifications",
        element: (
          <ProtectedRoute>
            <NotificationsScreen />
          </ProtectedRoute>
        ),
      },

      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        ),
      },

      {
        path: "branches",
        element: (
          <ProtectedRoute>
            <BranchesScreen />
          </ProtectedRoute>
        ),
      },

      // =========================
      // DOCTOR ONLY ROUTES
      // =========================
      {
        path: "history",
        element: (
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <HistoryScreen />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },

      {
        path: "book",
        element: (
          <ProtectedRoute>
            <RoleRoute role="doctor">
              <BookingScreen />
            </RoleRoute>
          </ProtectedRoute>
        ),
      },
    ],
  },
]);