export const checkHealth = (req, res) => {
  res.json({
    status: "ok",
    message: "Calendar-Service: Frontend ↔ Backend Connected ✅",
  });
};
