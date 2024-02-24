const express = require('express');
const router = express.Router({mergeParams: true});
const passport = require('passport');

const User = require('../models/user')

const asyncWrap = require('../utilities/asyncWrap');
const {storeReturnTo} = require('../utilities/validator');


router.get('/register', (req, res) => {
    res.render('userEjs/register')
})
router.post('/register', asyncWrap(async (req, res) => {
    try{
        const {email, username, password} = req.body;
        const user = new User({email, username});
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if(err) return next(err);
            req.flash('success', `Welcome to the page ${registeredUser.username}`);
            res.redirect('/events');
        })
    }  catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}))
router.get('/login', (req, res) => {
    res.render('userEjs/login')
})
router.post('/login', storeReturnTo, passport.authenticate('local', {failureFlash: true, failureRedirect: '/login'}), (req, res) => {
    req.flash('success', "Welcome back")
    const redirectUrl = req.session.returnTo || '/foodplaces'
    delete req.session.returnTo
    res.redirect('/events')
})
router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if(err){
            return next(err);
        }
    })
    req.flash('success', 'Thanks for visiting')
    res.redirect('/events')
})
module.exports = router;