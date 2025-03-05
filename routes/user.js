const { Router } = require('express');
const User = require('../models/User');
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).send('Exist email');
        }

        let user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.state = req.body.state;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        user = await user.save();
        res.send(user)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const users = await User.find(); // select * from users;
        res.send(users);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});


//UPDATE
router.put('/:userId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
        }

        let user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(400).send('User not exist');
        }

        const userExist = await User.findOne({ email: req.body.email });
        if (userExist) {
            return res.status(400).send('Exist email');
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.state = req.body.state;
        user.updatedAt = new Date();

        user = await user.save();
        res.send(user)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

// router.put('/', [
//     check('name', 'invalid.name').not().isEmpty(),
//     check('email', 'invalid.email').isEmail(),
//     check('state', 'invalid.state').isIn([ 'Active', 'Inactive' ]),
// ], async function(req, res) {
    
//     try {
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ message: errors.array() }); //CÓDIGOS DE ESTADO HTTP
//         }

//         const userExist = await User.findOne({ email: req.body.email });
//         if (userExist) {
//             return res.status(400).send('Exist email');
//         }

//         let user = new User();
//         user.name = req.body.name;
//         user.email = req.body.email;
//         user.state = req.body.state;
//         user.createdAt = new Date();
//         user.updatedAt = new Date();

//         user = await user.save();
//         res.send(user)

//     } catch (error){
//         console.log(error);
//         res.status(500).send('message error')
//     }

// });

module.exports = router;