const express= require('express');

const router= express.Router();

const {getAllJobs, createJob, getJob, updateJob, deleteJob}= require('../controllers/jobs');


router.get('/jobs',   getAllJobs);
router.post('/jobs',   createJob);
router.get('/jobs/:jobId',  getJob);
router.patch('/jobs/:jobId',  updateJob);
router.delete('/jobs/:jobId',  deleteJob);

module.exports=router;