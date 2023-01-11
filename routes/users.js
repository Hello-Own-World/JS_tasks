const express = require("express")
const router = express.Router()
const User = require('../models/user')


router.get('/', async (req, res) => {
   res.render('users/loginUser')
})

router.get('/signUp', async (req, res) => {
   res.render('users/createUser')
})


router.post('/signUp', async (req, res) => {
   const userData = req.body
   if (!userData.login ||
      !userData.pass ||
      !userData.firstName ||
      !userData.lastName) {
      console.log("Invalid form data")
      res.redirect('signUp')
      return
   }

   const findUser = new Promise(async (resolve, reject) => {
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
         res.redirect('signUp')
      }).catch((err) => {
         console.log("Error occured while saving user: " + err)
      })

   }).catch((err) => {

      console.log("error occured " + err)
      res.redirect('signUp')

   })

})

module.exports = router