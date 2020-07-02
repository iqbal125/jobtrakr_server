const express = require("express")
const router = express()
const userController = require("../controllers")

//GET USER AND JOBS
router.get("/users", userController.showUserWithJobs)

// get jobs
router.get("/users/getJob/:id", userController.getJob)
// Add Jobs
router.post("/users/addJob", userController.addJob)
//Update Job
router.put("/users/updateJob/:id", userController.updateJob)
//Delete Job
router.delete("/users/deleteJob/:id", userController.deleteJob)

module.exports = router
