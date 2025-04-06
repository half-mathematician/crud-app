const getAdminDashboard = (req, res) => {
  res.json({ message: "Welcome to admin dashboard" });
};

module.exports = {
  getAdminDashboard,
};
