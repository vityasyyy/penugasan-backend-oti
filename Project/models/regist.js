const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const registSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
})

module.exports = mongoose.model("Regist", registSchema);