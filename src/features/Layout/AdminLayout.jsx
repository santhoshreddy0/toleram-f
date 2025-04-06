import React from "react";
import { useSelector } from "react-redux";
import { Outlet, redirect } from "react-router-dom";
import AdminBanner from "../../Components/Banner/AdminBanner";

function AdminLayout(props) {
  const token = useSelector((state) => state.auth.JWTtoken);
  const isAdmin = (token) => {
    if (!token) return false;
    const role = JSON.parse(token)?.role;
    return role === "admin";
  };

  if (!isAdmin(token)) {
    redirect("/matches");
  }

  return (
    <>
      <AdminBanner />
      <Outlet />
    </>
  );
}

export default AdminLayout;
