const { Schema, model } = require('mongoose');

const BrandSchema = Schema({
    name: { type: String, required: true },
    state: { type: String, required: true, enum: [ 'Activo', 'Inactivo' ]},
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }
});

module.exports = model('Brand', BrandSchema);