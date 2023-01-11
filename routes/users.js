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

   const user = new User(userData)
   console.log('post sign up')
   try {
      const newUser = user.save()
   }
   catch {
      console.log(err)
   }
   res.redirect('signUp')
})

module.exports = router