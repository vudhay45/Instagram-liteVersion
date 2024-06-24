import express from 'express'
import { User } from '../models/users.js'
import { signJwtToken } from '../utils/jwt.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  const verified = false
  const foundUser = await User.findOne({ username: req.body.username })
  if (!foundUser) {
    res.status(400).send({ message: 'username is not registered with us' })
    return
  }
  if (foundUser.password === req.body.password) {
    const userId = foundUser._id
    const verified = true
    if (verified) {
      res.status(200).send({
        message: 'User successfully authenticated',
        jwtToken: signJwtToken(userId),
        userDetails: {
          username: foundUser.username,
        },
      })
    }
  } else {
    res.status(400).send({ message: 'Invalid password' })
  }
})

router.post('/signup', async (req, res) => {
  const foundUser = await User.findOne({ username: req.body.username })
  if (foundUser) {
    return res.status(400).send({
      message: 'This usename is already registered with us',
    })
  } else {
    const newUser = await new User({
      username: req.body.username,
      password: req.body.password,
    }).save()

    res.status(200).send({ message: 'Successfully registered' })
  }
})

export const AuthRouters = router
