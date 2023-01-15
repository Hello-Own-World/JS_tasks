const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
   res.render('users/loginUser')
})

router.get('/signUp', async (req, res) => {
   res.render('users/createUser')
})


router.post('/signUp', async (req, res) => { // register
   const userData = req.body
   if (!userData.login ||
      !userData.pass ||
      !userData.firstName ||
      !userData.lastName) {
      console.log("Invalid form data")
      res.redirect(404, 'signUp')
      return
   }

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

router.post('/signIn', async (req, res) => { // login
   let { login, pass } = req.body;
   login = login.toLowerCase()
   if (!(login && pass)) {
      res.redirect(400, 'signIn')
      return
   }

   const user = await User.findOne({ login: login });

   //del after test
   if (user) {
      console.log("1) " + pass + "2) " + user.pass)
   }

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