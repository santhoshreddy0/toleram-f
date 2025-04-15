export const isAdmin = (token) => {
  if (!token) return false;
  const role = JSON.parse(token)?.role;
  return role === "admin";
};

export function isEmptyObject(obj) {
  return obj && typeof obj === 'object' && !Array.isArray(obj) && Object.keys(obj).length === 0;
}