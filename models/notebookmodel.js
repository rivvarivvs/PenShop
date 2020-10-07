const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotebookSchema = new Schema({
    brand: {type: Schema.Types.ObjectId, ref:'Brand'},
    name: {type: String, required: true},
    price: {type: Number, required: true},
    details: {type: String, required: true, minlength: 100},
    stock: {type: Number}
})

NotebookSchema
    .virtual('url')
    .get(() => {
        return '/catalog/notebook/' + this._id
    })

module.exports = mongoose.model('Notebook', NotebookSchema)