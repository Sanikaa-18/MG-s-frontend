import { Navigate } from "react-router-dom";
import React from "react";

export function ProtectedRoute({ children }: { children: React.ReactElement }) {
  const role = localStorage.getItem("userRole");

  console.log("ProtectedRoute role:", role);

  if (!role) {
    return null;
  }

  return children;
}