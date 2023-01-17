const express = require("express")
const router = express.Router()
const User = require('../models/user')
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const validate = require("../middleware/validation")
const schemas = require('../modules/schemas')
const auth = require("../middleware/auth")

router.get('/', async (req, res) => {
   res.render('users/loginUser')
})

router.get('/signUp', async (req, res) => {
   res.render('users/createUser')
})

//Register
router.post('/signUp', validate(schemas.userSignUpPOST), async (req, res) => {
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

//Login
router.post('/signIn', validate(schemas.UserSignInPOST), async (req, res) => {
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

      res.status(200).send(JSON.stringify({ 'token:': token }))
   } else {
      console.log("Wrong input")
      res.status(404).send("Wrong input")
   }
})


//Get particular user  
router.get('/info', [validate(schemas.UserGetDel), auth], async (req, res) => {
   const { login } = req.body

   const userExists = await User.findOne({ login: login })

   if (!userExists) {
      res.status(404).send('User "' + login + '" is not in the DB')
      return
   }

   if (userExists.login === req.user.email) {
      try {
         userExists.pass = undefined
         res.status(200).send(userExists)

      } catch {
         res.status(404).send("Error occured getting user info ")

      }
   } else {
      res.status(404).send("Permission denied")
   }

})

//put particular user  
router.put('/info', [validate(schemas.userPUT), auth], async (req, res) => {
   const { login, pass, firstName, lastName, phone } = req.body

   const userExists = await User.findOne({ login: login })

   if (!userExists) {
      res.status(404).send('User "' + login + '" is not in the DB')
      return
   }

   if (userExists.login === req.user.email) {
      try {
         if (firstName) {
            userExists.firstName = firstName
         }
         if (lastName) {
            userExists.lastName = lastName
         }
         if (phone) {
            userExists.phone = phone
         }
         if (pass) { // not sure about allowing this action
            userExists.pass = pass
         }

         const newUser = await userExists.save()
         res.status(200).send(userExists)

      } catch {
         res.status(404).send("Error occured editing user info ")

      }
   } else {
      res.status(404).send("Permission denied")
   }

})

//Delete user  
router.delete('/info', [validate(schemas.UserGetDel), auth], async (req, res) => {

   const { login } = req.body

   const userExists = await User.findOne({ login: login })

   if (!userExists) {
      res.status(404).send('User "' + login + '" is not in the DB')
      return
   }

   if (userExists.login === req.user.email) {
      try {
         console.log(login)
         const result = await User.deleteOne({ login: login })

         res.status(200).send("Successful deletion of user: \n" + userExists.login + "\n")

      } catch {
         res.status(404).send("Error occured while deleting the user")

      }
   } else {
      res.status(404).send("Permission denied")
   }

})




module.exports = router