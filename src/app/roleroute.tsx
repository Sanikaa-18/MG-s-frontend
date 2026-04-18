import { Navigate } from "react-router-dom";
import React from "react";

export function RoleRoute({
  children,
  role,
}: {
  children: React.ReactElement;
  role: "doctor" | "patient";
}) {
  const userRole = localStorage.getItem("userRole");

  if (userRole !== role) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}