const Job = require("../models/Job");

// Fetch jobs by date
exports.getJobsByDate = async (req, res) => {
  try {
    const { date } = req.query;
    const jobs = await Job.find({ date });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search jobs
exports.searchJobs = async (req, res) => {
  try {
    const { query } = req.query;
    const jobs = await Job.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ jobs });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { userId, jobId } = req.body;
    // Implement application logic here
    res.status(200).json({ message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
