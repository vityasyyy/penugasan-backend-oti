// const Regist = require('./models/regist');
// const Event = require('./models/eventSchema')

// module.exports.isLoggedIn = (req, res, next) => {
//     if(!req.isAuthenticated()){
//         req.session.returnTo = req.originalUrl
//         req.flash('error', "Sign up first");
//         return res.redirect('/register');
//     }
//     next();
// }
// module.exports.isAuthor = async (req, res, next) => {
//     const {id} = req.params
//     const event = await Event.findById(id)
//     if(!event.author.equals(req.user._id)){
//         req.flash('error', 'You do not have the permission')
//         return res.redirect(`/events/${id}`)
//     }
//     next();
// }
// module.exports.isReviewAuthor = async (req, res, next) => {
//     const {id, registId} = req.params;
//     const regist = await Regist.findById(registId);
//     if(!regist.author.equals(req.user.id)) {
//         req.flash('error', 'You do not have permission');
//         return res.redirect(`/events/${id}`)
//     }
//     next()
// }   

// module.exports.storeReturnTo = (req, res, next) => {
//     if(req.res.returnTo) {
//         res.locals.returnTo = req.session.returnTo
//     }
//     next();
// }