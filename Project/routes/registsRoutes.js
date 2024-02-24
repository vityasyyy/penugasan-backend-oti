const express = require('express');
const router = express.Router({mergeParams: true});

const asyncWrap = require('../utilities/asyncWrap');
const {validateRegist, isLoggedIn, isRegistAuthor} = require('../utilities/validator');

const Regist = require('../models/regist')
const Event = require('../models/eventSchema');

router.post('/', isLoggedIn, validateRegist, asyncWrap(async (req, res) => {
    const {id} = req.params
    const userId = req.user._id;
    const existingRegist = await Regist.findOne({ event: id, author: userId });
        if (existingRegist) {
            req.flash('error', 'You have already submitted a registration for this event.');
            return res.redirect(`/events/${id}`);
        }
    const event = await Event.findById(id);
    const regist = new Regist(req.body.regist);
    regist.author = req.user._id;
    event.regists.push(regist);
    await regist.save();
    await event.save();
    req.flash('success', 'U are registered to the event!')
    res.redirect(`/events/${event.id}`);
}))
router.delete('/:registId', isLoggedIn, isRegistAuthor, asyncWrap(async(req, res) => {
    const {id, registId} = req.params;
    await Event.findByIdAndUpdate(id, { $pull: { regists: registId }});
    await Regist.findByIdAndDelete(registId);
    req.flash('success', 'Registration cancelled!')
    res.redirect(`/events/${id}`)
}))

module.exports = router;