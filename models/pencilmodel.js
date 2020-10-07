const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PencilModelSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: Schema.Types.ObjectId, ref:'brand'},
    prices: {type: Number, required: true},
    details: {type: String, required: true, minlength: 100},
    stock: {type: Number}
})

module.exports = mongoose.model('PencilModel', PencilModelSchema)