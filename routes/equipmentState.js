const { Router } = require('express');
const EquipmentState = require('../models/EquipmentState');
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

        let equipmentState = new EquipmentState();
        equipmentState.name = req.body.name;
        equipmentState.state = req.body.state;
        equipmentState.createdAt = new Date();
        equipmentState.updatedAt = new Date();

        equipmentState = await equipmentState.save();
        res.send(equipmentState)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const equipmentStates = await EquipmentState.find(); // select * from equipmentStates;
        res.send(equipmentStates);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});


module.exports = router;