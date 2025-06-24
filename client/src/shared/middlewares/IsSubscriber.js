import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const IsSubscriber = () => {
  const isLoggedIn = useSelector((state) => state.studentAuth.token)? true: false;
  const credentials = useSelector((state) => state.studentAuth.credentials);

  return isLoggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default IsSubscriber;
