const express = require('express');
const { applyForJob,getApplications,updateApllicationStatus } = require('../controllers/application.controller');
const { authverifytoken, isAdmin } = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware'); // Ensure it's a valid middleware

const router = express.Router();

router.post('/apply', authverifytoken, upload.single('resume'), applyForJob);
router.get("/all", authverifytoken, isAdmin, getApplications);
router.put("/update-status", authverifytoken, isAdmin, updateApllicationStatus);
module.exports = router;
