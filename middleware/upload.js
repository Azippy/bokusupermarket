const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../Config/cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "bokusupermarkt",
    allowedFormats: ["jpg", "jpeg", "png"],
    tranformation: [
      {
        width: 500,
        height: 500,
        crop: "limit",
      },
    ],
  },
});

const upload = multer({ storage });

module.exports = upload;
