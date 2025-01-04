const express = require("express");
const { getJobsByDate, searchJobs, applyForJob } = require("../controllers/jobController");

const router = express.Router();

router.get("/", getJobsByDate);
router.get("/search", searchJobs);
router.post("/apply", applyForJob);

module.exports = router;
