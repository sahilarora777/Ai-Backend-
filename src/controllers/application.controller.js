// application.controller.js
const Application = require('../models/application.model');

// Apply for a job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Resume is required" });
    }

    const application = new Application({
      jobId,
      userId: req.user.id,
      resumeUrl: req.file.path,
    });

    await application.save();
    return res.status(200).json({ message: "Application submitted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "An Error Occurred" });
  }
};

exports.getApplications = async (req, res) => {
  try {
    const applications = await Application.find()
      .populate("jobId", "title")
      .populate("userId", "name email");

    res.status(200).json({ applications });
  } catch (err) {
    console.log("Error fetching applications:", err);
    return res.status(500).json({ message: 'An Error Occurred while getting applications' });
  }
}

exports.updateApllicationStatus = async (req, res) => {
try{
  const {applicationId, status} = req.body;
  if(!['reviewed','rejected']){
      return res.status(400).json({message: "Invalid status. Please use  'reviewed', or 'rejected'"});
  }
  await Application.findByIdAndUpdate(applicationId, {status});
  return res.status(200).json({message: 'Application status updated successfully'});
}catch(err){
console.log(err);
return res.status(500).json({message: 'An Error Occurred while updating application status'});
}
}
