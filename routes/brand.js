const { Router } = require('express');
const Brand = require('../models/Brand');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let brand = new Brand();
        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.createdAt = new Date();
        brand.updatedAt = new Date();

        brand = await brand.save();
        res.send(brand)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const brands = await Brand.find(); // select * from Brands;
        res.send(brands);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.put('/:brandId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let brand = await Brand.findById(req.params.brandId);
        if (!brand) {
            return res.status(400).send('Not exist brand');
        }
        
        brand.name = req.body.name;
        brand.state = req.body.state;
        brand.updatedAt = new Date();

        brand = await brand.save();
        res.send(brand)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

module.exports = router;