export const isAdmin = (token) => {
  if (!token) return false;
  const role = JSON.parse(token)?.role;
  return role === "admin";
};
