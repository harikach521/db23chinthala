const mongoose = require("mongoose") 
const costumeSchema = mongoose.Schema({ 
 costume_type: {type:String, required:true}, 
 size: String, 
 cost: { type: Number, min: 5, max: 100, default: 0 },
}) 
 
module.exports = mongoose.model("Costume", 
costumeSchema) 