const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    
    feedback: { type: String },
    name: { type: String }

    
},
);
module.exports = mongoose.model("feedbacks", feedbackSchema);