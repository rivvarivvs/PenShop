//require mongoose
const mongoose = require('mongoose')

//define a schema
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    name: {type: String, required: true, maxlength: 200},
    model: {type: Schema.Types.ObjectId, ref: 'Pen, Notebook, Pencil'},
    brand_details: {type: String, required: true, minlength: 50}
})

BrandSchema
    .virtual('url')
    .get(() => {
        return 'catalog/brand/' + this._id
    })

module.exports = mongoose.model('Brand', BrandSchema)