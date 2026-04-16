import jwtDecode from "jwt-decode";
import numeral from "numeral";

const decodeToken = (token) => {
  if (!token) return null;
  try {
    return jwtDecode(token);
  } catch (e) {
    console.log(e);
    return null;
  }
};
export const isAdmin = (token) => {
  if (!token) return false;
  const role = getRole(token);
  return role === "admin" || role === "manager";
};

export const getRole = (token) => {
  if (!token) return null;
  const decodedToken = decodeToken(token);
  return decodedToken?.role;
};

export const isManager = (token) => {
  if (!token) return false;
  const role = getRole(token);
  return role === "manager";
};

export function isEmptyObject(obj) {
  return (
    obj &&
    typeof obj === "object" &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0
  );
}

export const getUsernameFromEmail = (email) => {
  if (!email) return "unanonymous";
  return email.split("@")[0];
};

export const formatToAbbreviation = (value) => {
  return numeral(value).format("0,0a");
};

export const toTitleCase = (str) =>
  str.replace(
    /(^\w|\s\w)(\S*)/g,
    (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase()
  );
