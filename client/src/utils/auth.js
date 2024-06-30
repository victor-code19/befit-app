import isJWT from "validator/lib/isJWT";
import { redirect } from "react-router-dom";

export const getAuthToken = () => {
  const token = localStorage.getItem("token");

  if (token && isJWT(token)) {
    return token;
  }

  return null;
};

export const isAdminLogged = () => {
  return localStorage.getItem("role") ? true : false;
};

export const checkAuthLoader = () => {
  const token = getAuthToken();
  const isAdmin = isAdminLogged();

  if (!token || !isAdmin) {
    return redirect("/");
  }

  return null;
};
