const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PencilModelSchema = new Schema({
    name: {type: String, required: true},
    brand: {type: Schema.Types.ObjectId, ref:'brand'},
    prices: {type: Number, required: true},
    details: {type: String, required: true, minlength: 100},
    stock: {type: Number}
})

//virtual for pencilModel url
PencilModelSchema
    .virtual('url')
    .get(() => {
        return '/catalog/pencil/' + this._id
    })

module.exports = mongoose.model('Pencil', PencilModelSchema)