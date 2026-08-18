const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },
    hasAdminAcess: {
      type: Boolean,
      default: false,
    },
    phone: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "storekeeper", "salesperson"],
      default: "salesperson",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
