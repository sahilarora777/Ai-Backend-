// user posting jobs 

const Job = require('../models/job.model');

exports.postJob = async (req, res) => {
try{
const {title, description, company, location} = req.body;
console.log(req.user.id);

const job = new Job({
title,
description,
company,
location,
createdBy:req.user.id,
});
await job.save();
res.status(200).json({message: 'Job posted successfully'});
}catch(err){
console.log(err);
return res.status(500).json({message:"BHAIYA JI ERROR AA GAYA HAI"});
}
};

exports.reviewJob = async (req, res) => {
    try {
      const { jobId, status } = req.body;
  
      // Validate status
      if (!['approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: "Invalid status. Please use 'approved' or 'rejected'." });
      }
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found.' });
      }
  
      // Update job status
      await Job.findByIdAndUpdate(jobId, { status });
      return res.status(200).json({ message: 'Job reviewed successfully' });
  
    } catch (err) {
      console.error('Error:', err);
      return res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
  };
  

  exports.getJobs = async (req, res) => {
try{
   const jobs = await Job.find({status:'approved'});
   return res.status(200).json({jobs});
}  catch(error){
    return res.status(500).json({ message: 'An error occurred while fetching data' });  
}
}