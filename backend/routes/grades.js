const express = require("express");
const Grade = require("../models/GradeI");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, async (req, res) => {
  try {
    const { data } = req.body;
    let gradeData = await Grade.findOne({ userId: req.user._id });
    if (gradeData) {
      gradeData.data = data;
      await gradeData.save();
    } else {
      gradeData = new Grade({
        userId: req.user._id,
        data,
      });
      await gradeData.save();
    }
    res.json({ message: "Grades saved successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", protect, async (req, res) => {
  try {
    const gradeData = await Grade.findOne({ userId: req.user._id });
    res.json(gradeData?.data || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
