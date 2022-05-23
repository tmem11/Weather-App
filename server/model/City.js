const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/Weather', { useNewUrlParser: true })
const Schema = mongoose.Schema


const citySchema = new Schema({
    name: String,
    condition: String,
    temperature: Number,
    conditionPic: String
})
const City = mongoose.model('city', citySchema)



module.exports=City



