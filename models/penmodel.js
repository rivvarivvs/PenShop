const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PenModelSchema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number},
    brand: {type: Schema.Types.ObjectId, ref:'Brand'},
    details: {type: String, required: true}
})

PenModelSchema
    .virtual('url')
    .get(() => {
        return '/catalog/pen/' + this._id
    })

module.exports = mongoose.model('Pen', PenModelSchema)