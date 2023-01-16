const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const validate = require("../middleware/validation")
const schemas = require('../modules/schemas')

router.get('/', async (req, res) => {
   res.render('users/loginUser')
})

router.get('/signUp', async (req, res) => {
   res.render('users/createUser')
})


router.post('/signUp', validate(schemas.userSignUpPOST), async (req, res) => { // register
   const userData = req.body

   const findUser = new Promise(async (resolve, reject) => {
      userData.login = (userData.login).toLowerCase()
      const foundUser = (await User.findOne({ login: userData.login }))
      if (!foundUser) {
         resolve("User not found")
      } else {
         console.log(foundUser)
         reject("User found")

      }
   })

   findUser.then((msg) => {
      console.log(msg)

      const saveUser = new Promise((resolve, reject) => {
         const user = new User(userData)
         if (user.save()) {
            resolve("User saved")
         } else {
            reject("User not saved")
         }
      })

      saveUser.then((msg) => {
         res.redirect(200, 'signUp')
      }).catch((err) => {
         console.log("Error occured while saving user: " + err)
      })

   }).catch((err) => {
      console.log("error occured " + err)
      res.redirect(400, 'signUp')
   })

})

router.post('/signIn', validate(schemas.UserSignInPOST), async (req, res) => { // login
   let { login, pass } = req.body;
   login = login.toLowerCase()

   const user = await User.findOne({ login: login });

   if (user && (await bcrypt.compare(pass, user.pass))) {

      const token = jwt.sign(
         { user_id: user._id, email: user.login },
         process.env.TOKEN_KEY,
         {
            expiresIn: "1h",
         }
      )

      console.log("New token created")
      console.log(token)

      // res.redirect("../chat") 

      res.status(200).send(JSON.stringify({'token:' : token}))
   } else {
      console.log("Wrong input")
      res.redirect(404, "/")
   }

})

module.exports = router