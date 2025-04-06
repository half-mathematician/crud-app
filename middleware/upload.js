const multer = require("multer");

// config for multer
const storage = multer.memoryStorage();

const upload = multer({ storage });

module.exports = upload;