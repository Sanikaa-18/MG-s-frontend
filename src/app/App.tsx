import { Routes, Route, Navigate } from "react-router-dom";
import { AuthScreen } from "./screens/Auth";
import { HomeScreen } from "./screens/HomeScreen";
import { ResetPassword } from "./screens/resetpassword";
import { ProtectedRoute } from "./screens/protectedroute";

export default function App() {
  return (
    <Routes>
      {/* LOGIN / AUTH */}
      <Route path="/" element={<AuthScreen />} />

      {/* DASHBOARD (PROTECTED) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <HomeScreen />
          </ProtectedRoute>
        }
      />

      {/* RESET PASSWORD */}
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}