const User = require("../models/User")
const Job = require("../models/Job")

const requireAuth = require("../passport").requireAuth
const setToken = require("../passport").setToken
const firebase = require("firebase-admin")
const admin = firebase.initializeApp()

module.exports = {
  //Show user with associated jobs.
  showUserWithJobs: async (req, res, next) => {
    const users = await User.query().withGraphFetched("jobs")
    if (users) {
      return res.status(200).json(users)
    }
  },
  //GET JOB
  getJob: async (req, res) => {
    const {id} = req.params

    getJobs = await Job.query().select("*").where("user_id", id)

    res.status(200).json(getJobs)
  },
  //ADD JOB
  addJob: async (req, res) => {
    //Save the user's id associated with this job
    const user_id = req.body.user_id
    //Checking if the values are empty, if so we save it as an empty string
    const company = req.body.company ? req.body.company : ""
    const position = req.body.position ? req.body.position : ""
    const location = req.body.location ? req.body.location : ""
    const point_of_contact = req.body.point_of_contact ? req.body.point_of_contact : ""
    const date_applied = req.body.date_applied ? req.body.date_applied : ""
    const status = req.body.status ? req.body.status : ""
    const poc_email = req.body.poc_email ? req.body.poc_email : ""
    const poc_phone = req.body.poc_phone ? req.body.poc_phone : ""

    const last_followup_response = req.body.last_followup_response ? req.body.last_followup_response : ""
    const last_status_change = req.body.last_status_change ? req.body.last_status_change : ""
    const last_followup = req.body.last_followup ? req.body.last_followup : ""
    const notes = req.body.notes ? req.body.notes : ""

    // //Save Job to Database
    const savedJob = await Job.query().insert({
      user_id,
      company,
      position,
      location,
      point_of_contact,
      date_applied,
      status,
      poc_email,
      poc_phone,
      last_followup_response,
      last_followup,
      last_status_change,
      notes,
    })

    res.status(200).json(savedJob)
  },
  updateJob: async (req, res) => {
    const {id} = req.params
    console.log(req.body)
    //Save the user's id associated with this job
    const user_id = req.body.user_id
    //Checking if the values are empty, if so we save it as an empty strings
    const company = req.body.company ? req.body.company : ""
    const position = req.body.position ? req.body.position : ""
    const location = req.body.location ? req.body.location : ""
    const point_of_contact = req.body.point_of_contact ? req.body.point_of_contact : ""
    const date_applied = req.body.date_applied ? req.body.date_applied : ""
    const status = req.body.status ? req.body.status : ""
    const poc_email = req.body.poc_email ? req.body.poc_email : ""
    const poc_phone = req.body.poc_phone ? req.body.poc_phone : ""
    const last_followup_response = req.body.last_followup_response ? req.body.last_followup_response : ""
    const last_status_change = req.body.last_status_change ? req.body.last_status_change : ""
    const last_followup = req.body.last_followup ? req.body.last_followup : ""
    const notes = req.body.notes ? req.body.notes : ""

    //Update Job for a specific user and job
    const updatedJob = await Job.query()
      .update({
        user_id,
        company,
        position,
        location,
        point_of_contact,
        date_applied,
        status,
        poc_email,
        poc_phone,
        last_followup_response,
        last_followup,
        last_status_change,
        notes,
      })
      .where("id", id)
      .andWhere("user_id", user_id)

    res.status(200).json(updatedJob)
  },
  //DELETE JOB
  deleteJob: async (req, res) => {
    const {id} = req.params
    console.log(req.body)
    //GET the user's id associated with this job
    const user_id = req.body.user_id
    //Delete Job for a specific user and job
    const deletedJob = await Job.query().delete().where("id", id).andWhere("user_id", user_id)
    res.status(200).json(deletedJob)
  },
  updateUser: async (req, res) => {
    const {id} = req.params
    const username = req.body.username ? req.body.username : ""
    const userUpdated = await User.query().update({username}).where("id", id)
    res.status(200).json(userUpdated)
  },
  sendToken: async (req, res) => {
    let token = req.body.token
    admin
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        let name = decodedToken.name
        let email = decodedToken.email

        saveUserToDB(email, name)
      })
      .catch((error) => {
        res.send("error logging in")
        console.log("error", error)
      })

    //Save User To Our Database
    const saveUserToDB = async (email, username) => {
      /* Save user to our own db and get unique key from db */
      try {
        //Check If User Exists
        const user = await User.query().where({email})
        //If User exists then send a token
        if (user.length !== 0) {
          let id = user[0].id
          res.send({token: setToken(id)})
        } else {
          //If not save then user to the database then send token
          const newUser = await User.query().insert({email, username})
          res.send({token: setToken(newUser.id)})
        }
      } catch (error) {
        res.send(error)
      }
    }
  },
}
