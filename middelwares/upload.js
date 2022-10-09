const multer = require("multer");
const storage = multer.diskStorage({
 destination: (req, file, cb) => {
  cb(null, "./storages");
 },
 filename: (req, file, cb) => {
  cb(null, file.originalname);
 },
});
const fileFilter = (req, file, cb) => {
 if (
  file.mimetype == "image/jpeg" ||
  file.mimetype == "image/png" ||
  file.mimetype == "image/jpg"
 ) {
  cb(null, true);
 } else {
  cb(null, false);
 }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });
module.exports = upload;