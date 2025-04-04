const { Router } = require('express');
const EquipmentType = require('../models/EquipmentType');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let equipmentType = new EquipmentType();
        equipmentType.name = req.body.name;
        equipmentType.state = req.body.state;
        equipmentType.createdAt = new Date();
        equipmentType.updatedAt = new Date();

        equipmentType = await equipmentType.save();
        res.send(equipmentType)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const equipmentTypes = await EquipmentType.find(); // select * from equipmentTypes;
        res.send(equipmentTypes);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.put('/:equipmentTypeId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let equipmentType = new EquipmentType.findById(req.params.equipmentTypeId);
        if (!equipmentType) {
            return res.status(400).send('Not exist equipment type');
        }
        equipmentType.name = req.body.name;
        equipmentType.state = req.body.state;
        equipmentType.updatedAt = new Date();

        equipmentType = await equipmentType.save();
        res.send(equipmentType)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});


module.exports = router;