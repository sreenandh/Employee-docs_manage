const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  s3_url: { type: String, required: true },
  category: {
    type: String,
    enum: ["Personal", "Education", "Professional"],
    required: true, 
  },
  uploadedAt: { type: Date, default: Date.now },
  employeeId: { type: String, required: true },
});

module.exports = mongoose.model("Document", DocumentSchema);
