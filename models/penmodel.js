const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PenModelSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Boolean},
    brand: {type: Schema.Types.ObjectId, ref:'Brand'}

})

module.exports = mongoose.model('PenModel', PenModelSchema)