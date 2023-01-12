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
         const { TOKEN_KEY } = process.env
         console.log(TOKEN_KEY)
         const token = jwt.sign(
            { user_id: user._id, email: user.login },
            TOKEN_KEY,
            {
               expiresIn: "1h",
            }
         );
         // save user token
         user.token = token;



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

router.post('/signIn', async (req, res) => { // login
   const { login, pass } = req.body;

   if (!(login && pass)) {
      res.status(400).send("Wrong input, all fields required");
      return
   }

   const user = await User.findOne({ login: login });
   console.log("1) " + pass + "2) " + user.pass)

   if (user && (await bcrypt.compare(pass, user.pass))) {
      const token = jwt.sign(
         { user_id: user._id, email: user.login },
         process.env.TOKEN_KEY,
         {
            expiresIn: "1h",
         }
      )
      user.token = token
      console.log("New token created")
      res.status(200).redirect("/")
   } else {
      console.log("Wrong input")
      res.status(404).redirect("/")
   }


})

module.exports = router