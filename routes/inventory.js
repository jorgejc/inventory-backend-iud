const { Router } = require('express');
const Inventory = require('../models/Inventory');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('model', 'invalid.model').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('photo', 'invalid.photo').not().isEmpty(),
    check('purchaseDate', 'invalid.purchaseDate').not().isEmpty(),
    check('price', 'invalid.price').not().isEmpty(),
    check('user', 'invalid.user').not().isEmpty(),
    check('brand', 'invalid.brand').not().isEmpty(),
    check('equipmentState', 'invalid.equipmentState').not().isEmpty(),
    check('equipmentType', 'invalid.equipmentType').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        const existInventoryForSerie = await Inventory.findOne({ serial: req.body.serial });
        if (existInventoryForSerie) {
            return res.status(400).send('Exist serial');
        }

        let inventory = new Inventory();
        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.color = req.body.color;
        inventory.photo = req.body.photo;
        inventory.purchaseDate = req.body.purchaseDate;
        inventory.price = req.body.price;
        inventory.user = req.body.user._id;
        inventory.brand = req.body.brand._id;
        inventory.equipmentState = req.body.equipmentState._id;
        inventory.equipmentType = req.body.equipmentType._id;
        inventory.createdAt = new Date();
        inventory.updatedAt = new Date();

        inventory = await inventory.save();
        res.send(inventory)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const inventories = await Inventory.find().populate([
            {
                path: 'user', select: 'name email state'
            },

            {
                path: 'brand', select: 'name state'
            },

            {
                path: 'equipmentState', select: 'name state'
            },

            {
                path: 'equipmentType', select: 'name, state'
            }
        ]); 
        res.send(inventories);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});


router.put('/:inventoryId', [
    check('serial', 'invalid.serial').not().isEmpty(),
    check('model', 'invalid.model').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
    check('color', 'invalid.color').not().isEmpty(),
    check('photo', 'invalid.photo').not().isEmpty(),
    check('purchaseDate', 'invalid.purchaseDate').not().isEmpty(),
    check('price', 'invalid.price').not().isEmpty(),
    check('user', 'invalid.user').not().isEmpty(),
    check('brand', 'invalid.brand').not().isEmpty(),
    check('equipmentState', 'invalid.equipmentState').not().isEmpty(),
    check('equipmentType', 'invalid.equipmentType').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let inventory = await Inventory.findById(req.params.inventoryId);
        if (!inventory) {
            return res.status(400).send('No exist inventory');
        }

        const existInventoryForSerie = await Inventory.findOne({ serial: req.body.serial, _id: { $ne: inventory._id} });
        if (existInventoryForSerie) {
            return res.status(400).send('Exist serial');
        }

        inventory.serial = req.body.serial;
        inventory.model = req.body.model;
        inventory.description = req.body.description;
        inventory.color = req.body.color;
        inventory.photo = req.body.photo;
        inventory.purchaseDate = req.body.purchaseDate;
        inventory.price = req.body.price;
        inventory.user = req.body.user._id;
        inventory.brand = req.body.brand._id;
        inventory.equipmentState = req.body.equipmentState._id;
        inventory.equipmentType = req.body.equipmentType._id;
        inventory.updatedAt = new Date();

        inventory = await inventory.save();
        res.send(inventory)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/:inventaryId', async function(req, res){
    try {
        const inventory = await Inventory.findById(req.params.inventaryId);
        if(!inventory) {
            return res.status(404).send('No exist inventory');
        }
        res.send(inventory);
    } catch(error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;