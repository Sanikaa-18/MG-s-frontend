import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export function ProtectedRoute({
  children,
}: {
  children: React.ReactElement;
}) {
  const location = useLocation();
  const role = localStorage.getItem("userRole");

  // if not logged in
  if (!role) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  // if logged in
  return children;
}