/** START
 * Navneethsai Kozhipurath
 */


const express = require('express');
const db_users = require("../db/users");
const router = express.Router();
const winston = require('../config/winston');

/**
 * Helping function to update user's session
 */
function login(req, user) {
  req.session.loggedIn = true;
  req.session.userId = user.id;
  req.session.username = user.name;
  req.session.email = user.email;
  req.session.shoppingCart = [];
  winston.info(`User ${user.email} logged in...`);
}

/**
 * Helping function to logout user
 */
function logout(req) {
  const email = req.session.email
  req.session.destroy();
  winston.info(`User ${email} logged out...`);
}

/**
 * Landing page
 */
router.get('/', (req, res) => {
  res.redirect('/catalog');
});

/**
 * Login page
 */
router.get('/login', (req, res) => {
  res.render('user/login');
});

/**
 * POST request to authenticate user
 */
router.post('/login', (req, res) => {
  // reads user's email and password from request and checks if match the existing user
  const { email, password } = req.body;
  db_users.authenticate(email, password).then((user) => {
    if (user) {
      login(req, user);
      res.redirect('/catalog');
    } else {
      res.render('user/login', {error: 'invalid user credentials'});
    }
  });
});

/**
 * GET user registration - renders registration page
 */
router.get('/registration', (req, res) => {
  res.render('user/registration');
});

/**
 * POST user registration - handles new user registration request
 */
router.post('/registration', (req, res) => {
  db_users.register(req.body).then((user) => {
    if (user) {
      login(req, user);
      res.redirect('/catalog');
    } else {
      res.redirect('/error');
    }
  });
});

/**
 * User logout, end session
 */
router.get('/logout', (req, res) => {
  logout(req);
  res.redirect('/catalog');
});

module.exports = router;


/** 
 * Navneethsai Kozhipurath
 END */