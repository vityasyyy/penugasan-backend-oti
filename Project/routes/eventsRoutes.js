const express = require('express');
const router = express.Router({mergeParams: true});

const asyncWrap = require('../utilities/asyncWrap');
const {isLoggedIn, isAuthor, validateEvent} = require('../utilities/validator');

const Event = require('../models/eventSchema')

router.get('/', asyncWrap(async (req,res) => {
    const events = await Event.find({});
    res.render('events/index', { events });
}))
router.get('/new', isLoggedIn, (req,res) => {
    res.render('events/new');
})
router.post('/', isLoggedIn, validateEvent, asyncWrap(async (req,res, next) => {
    const newEvent= new Event(req.body.events)
    newEvent.author = req.user._id;
    await newEvent.save();
    req.flash('success', 'Successfully made a new event!');
    res.redirect(`/events/${newEvent._id}`);
}))
router.get('/:id', asyncWrap(async (req,res) => {
    const {id} = req.params;
    const event = await Event.findById(id).populate({
        path: 'regists',
        populate: {
            path: 'author'
        }
    }).populate('author')
    if(!event){
        req.flash('error', "Cannot find the event u are looking for!");
        return res.redirect('/events')
    }
    res.render('events/show', { event });
}))
router.get('/:id/edit', isLoggedIn, isAuthor, asyncWrap(async (req,res) => {
    const {id} = req.params;
    const event = await Event.findById(id);
    if(!event){
        req.flash('error', "Cannot find the event u are looking for!");
        return res.redirect('/events')
    }
    res.render('events/edit', { event });
}))
router.put('/:id', isLoggedIn, isAuthor, validateEvent, asyncWrap(async (req,res) => {
    const {id} = req.params;
    const event = await Event.findByIdAndUpdate(id, {...req.body.events})
    req.flash('success', 'Updated an event!')
    res.redirect(`/events/${event._id}`);
}))
router.delete('/:id', isLoggedIn, isAuthor, asyncWrap(async (req,res) => {
    const {id} = req.params;
    await Event.findByIdAndDelete(id);
    req.flash('success', 'Event deleted!')
    res.redirect('/events');
}))

module.exports = router;