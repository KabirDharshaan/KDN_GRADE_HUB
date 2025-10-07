const mongoose = require("mongoose");

const GradeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object, required: true }, 
}, { timestamps: true });

module.exports = mongoose.model("Grade", GradeSchema);
