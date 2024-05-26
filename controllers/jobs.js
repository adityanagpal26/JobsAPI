const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId }).sort("createdAt");
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id: ${jobId}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

const updateJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findOneAndUpdate(
    { _id: jobId, createdBy: req.user.userId },
    req.body,
    { new: true, runValidators: true }
  );
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id: ${jobId}` });
  }
  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  const { jobId } = req.params;
  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: req.user.userId,
  });
  if (!job) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ msg: `No job with id: ${jobId}` });
  }
  res.status(StatusCodes.OK).json({msg: 'Job deleted'});
};

module.exports = {
  getAllJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
