import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { AuthScreen } from "./screens/Auth";
import { ResetPassword } from "./screens/resetpassword";
import { ProtectedRoute } from "./screens/protectedroute";

import { DoctorHomeScreen } from "./screens/Doctorhome";
import { PatientHome } from "./screens/Patienthome";

import { HistoryScreen } from "./screens/History";
import { ProfileScreen } from "./screens/Profile";
import { NotificationsScreen } from "./screens/Notifications";
import { BookingScreen } from "./screens/Booking";
import BranchesScreen from "./screens/Branches";

export default function App() {
  const [role, setRole] = useState<string | null>(null);

  // ✅ FIX: always sync role from localStorage
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    setRole(storedRole);
  }, []);

  return (
    <Routes>
      {/* LOGIN */}
      <Route path="/" element={<AuthScreen />} />

      {/* ROLE REDIRECT */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            {role === "doctor" ? (
              <Navigate to="/doctor" replace />
            ) : (
              <Navigate to="/patient" replace />
            )}
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* DOCTOR ROUTE */}
      {/* ========================= */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute>
            <DoctorHomeScreen />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* PATIENT ROUTE */}
      {/* ========================= */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute>
            <PatientHome />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* DOCTOR FEATURES */}
      {/* ========================= */}
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <HistoryScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/book"
        element={
          <ProtectedRoute>
            <BookingScreen />
          </ProtectedRoute>
        }
      />

      {/* ========================= */}
      {/* COMMON ROUTES */}
      {/* ========================= */}
      <Route
        path="/branches"
        element={
          <ProtectedRoute>
            <BranchesScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsScreen />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfileScreen />
          </ProtectedRoute>
        }
      />

      {/* RESET PASSWORD */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* FALLBACK */}
      <Route
        path="*"
        element={
          role === "doctor" ? (
            <Navigate to="/doctor" replace />
          ) : (
            <Navigate to="/patient" replace />
          )
        }
      />
    </Routes>
  );
}