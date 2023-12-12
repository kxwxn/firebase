import React from "react";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }: { childre: React.ReactNode }) => {
  const user = auth.currentUser;
  //if(!user)
  console.log(user);
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return children;
};
