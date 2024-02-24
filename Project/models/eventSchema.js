const mongoose = require('mongoose');
const Schema = mongoose.Schema; 
const Regist = require('./regist');

const eventSchema = new Schema({
    title: String,
    price: Number,
    description: String,
    location: String,
    date: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    regists: [
        {   
            type: Schema.Types.ObjectId,
            ref: "Regist",
        }
    ]
})
eventSchema.post('findOneAndDelete', async function (event) {
     if (event.regists.length) {
        await Regist.deleteMany({ _id: { $in: event.regists }});
     }
})
module.exports = mongoose.model('Event', eventSchema);