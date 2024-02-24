const { eventSchema, registSchema } = require('../schemas');
const ExpressError = require('../utilities/ExpressError');
const Regist = require('../models/regist');
const Event = require('../models/eventSchema');

const validateEvent = (req, res, next) => {
    const {error} = eventSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const validateRegist = (req, res, next) => {
    const {error} = registSchema.validate(req.body);
    if(error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    }
    else{
        next();
    }
}

const isAuthor = async (req, res, next) => {
    const {id} = req.params
    const event = await Event.findById(id)
    if(!event.author.equals(req.user._id)){
        req.flash('error', 'You do not have the permission')
        return res.redirect(`/events/${id}`)
    }
    next();
}
const isRegistAuthor = async (req, res, next) => {
    const {id, registId} = req.params;
    const regist = await Regist.findById(registId);
    if(!regist.author.equals(req.user.id)) {
        req.flash('error', 'You do not have permission');
        return res.redirect(`/events/${id}`)
    }
    next()
}   
const storeReturnTo = (req, res, next) => {
    if(req.res.returnTo) {
        res.locals.returnTo = req.session.returnTo
    }
    next();
}
const isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.returnTo = req.originalUrl
        req.flash('error', "Sign up first");
        return res.redirect('/register');
    }
    next();
}
module.exports = { validateEvent, validateRegist, isAuthor, isLoggedIn, isRegistAuthor, storeReturnTo };