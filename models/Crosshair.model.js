const mongoose = require("mongoose");

const CrosshairSchema = new mongoose.Schema({
    CrosshairID: { type: Number },
    Color: { type: String },
    Type : {type : String},
    Game : {type : String },
    CreatedBy : {type : String}

},
);





module.exports = mongoose.model("crosshairs", CrosshairSchema);