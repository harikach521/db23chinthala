const mongoose = require("mongoose") 
const omletSchema = mongoose.Schema({ 
 omlet_type: String, 
 size: String, 
 cost: Number 
}) 
 
module.exports = mongoose.model("omlet", 
omletSchema)