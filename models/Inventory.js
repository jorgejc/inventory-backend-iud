const { Schema, model } = require('mongoose');

const InventorySchema = Schema({
    serial: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    description: { type: String, required: true },
    color: { type: String, required: true },
    photo: { type: String, required: true },
    purchaseDate: { type: String, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand', required: true },
    equipmentState: { type: Schema.Types.ObjectId, ref: 'EquipmentState', required: true },
    equipmentType: { type: Schema.Types.ObjectId, ref: 'EquipmentType', required: true },
    createdAt: { type: Date, required: true },
    updatedAt: { type: Date, required: true }

});

module.exports = model('Inventory', InventorySchema);


