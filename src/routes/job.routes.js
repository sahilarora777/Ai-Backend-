const express = require('express');

const router = express.Router();

const {postJob,reviewJob,getJobs} = require('../controllers/job.controller');

const {authverifytoken, isAdmin} = require('../middleware/auth.middleware');

router.post('/postjob', authverifytoken, postJob);
router.put('/reviewjob', authverifytoken,isAdmin, reviewJob);
router.get('/all', getJobs);

module.exports = router;