// BACK-END/config/multerIdoso.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Garantir que a pasta existe
const uploadPath = path.join(__dirname, "../uploads/idosos");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const allowed = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato inválido. Use PNG ou JPG."));
    }
    cb(null, true);
  }
});

module.exports = upload;
