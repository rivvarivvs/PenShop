//require mongoose
const mongoose = require('mongoose')

//define a schema
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    brand_name: {type: String, required: true, maxlength: 200},
    model: {type: Schema.Types.ObjectId, ref: 'PenModel'},
    brand_detail: {type: String, required: true, minlength: 50}
})

module.exports = mongoose.model('Brand', BrandSchema)