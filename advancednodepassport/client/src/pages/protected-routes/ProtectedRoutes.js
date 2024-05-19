import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Login from "../Login";

export default function ProtectedRoutes() {
  const { user } = useSelector((store) => store.app);
  const { loaded } = useSelector((store) => store.app);

  return (
    user
      ? <Outlet />
      : <Login />
  )
}