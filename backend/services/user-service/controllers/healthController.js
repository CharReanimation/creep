export const checkHealth = (req, res) => {
  res.json({
    status: "ok",
    message: "User-Service: Frontend ↔ Backend Connected ✅",
  });
};
