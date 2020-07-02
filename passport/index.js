require("dotenv").config()
const passport = require("passport")
const ExtractJWT = require("passport-jwt").ExtractJwt
const JWTStrategy = require("passport-jwt").Strategy
const User = require("../models/User")
const jwt = require("jsonwebtoken")

const setToken = (user) => {
  let opts = {
    expiresIn: "12h",
  }
  let secret = process.env.AUTH_SECRET
  return jwt.sign({user}, secret, opts)
}

const requireAuth = passport.authenticate("jwt", {session: false})

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.AUTH_SECRET,
    },
    async (jwtPayload, done) => {
      try {
        let id = [jwtPayload]
        console.log(id)
        //check if id exists then allow endpoint
        const user = await User.query().where("id", id)
        if (user) {
          return done(null, jwtPayload)
        }
        return done(null, false)
      } catch (error) {
        return done(error, false)
      }
    }
  )
)

const exportObj = {
  requireAuth,
  setToken,
}

module.exports = exportObj
