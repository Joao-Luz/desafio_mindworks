const router = require('express').Router();
const User = require('../models/User');
const {registerValidation, loginValidation, updateValidation} = require('../validation');
const bcryp = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');


router.post('/register', async (req, res) => {
    const {error} = registerValidation(req.body);
    if(error) return res.status(400).json({msg: error.details[0].message});

    const emailExists = await User.findOne({email: req.body.email});
    if(emailExists) return res.status(400).json({msg: 'Email already registered'});

    if(req.body.password != req.body.password_check) return res.status(400).json({msg: "Passwords don't match"})

    const salt = await bcryp.genSalt(10);
    const hashedPassword = await bcryp.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        full_name: req.body.name + " " + req.body.last_name,
        age: Number(req.body.age),
        sex: req.body.sex,
        job: req.body.job,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const savedUser = await user.save();
        res.send({user: user._id});
    }catch(err){
        res.status(400).json({msg: err}); 
    }
});

router.post('/login', async (req, res) => {
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).json({msg: 'Fill the form properly'});

    if(req.body.email){
        const user = await User.findOne({email: req.body.email})
        if(!user) return res.status(400).json({msg: 'Email not found'});

        const validPassword = await bcryp.compare(req.body.password, user.password)
        if(!validPassword) return res.status(400).json({msg: 'Wrong password'});

        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
        res.status(200).json({
            user: user,
            token: token
        })
    }
})

router.get('/', verify, (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => {res.status(400).json({msg: err})});
});

router.get('/:id', verify, (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => {
            res.status(400).json({msg: err});
        })
});

router.post('/update/:id', verify, async (req, res) => {
    User.findById(req.params.id)
        .then( async user => {
            const {error} = updateValidation(req.body);
            if(error) return res.status(400).json({msg: error.details[0].message});

            user.name = req.body.name ? req.body.name : user.name;
            user.last_name = req.body.last_name ? req.body.last_name : user.last_name;
            user.full_name = user.name + " " + user.last_name;
            user.age = req.body.age ? req.body.age : user.age;
            user.sex = req.body.sex ? req.body.sex : user.sex;
            user.job = req.body.job ? req.body.job : user.job;
            
            if(req.body.email){
                const emailExists = await User.findOne({email: req.body.email});
                if(emailExists && emailExists.email !== user.email) return res.status(400).json({msg: 'Email already registered'});
                user.email = req.body.email ? req.body.email : user.email;
            }

            if(req.body.password){
                if(req.body.password != req.body.password_check) return res.status(400).json({msg: "Passwords don't match"})
                const salt = await bcryp.genSalt(10);
                const hashedPassword = await bcryp.hash(req.body.password, salt);
                user.password = hashedPassword;
            }

            try{
                await user.save();
                res.send({user: user._id});
            }catch(err){
               res.status(400).json({msg: err}); 
            }
        })
        .catch(err => {res.status(400).json({msg: err});})
});

router.post('/search', verify, (req, res) => {
    User.find({full_name: new RegExp('^'+req.body.name, "i")})
        .then(users => res.json(users))
        .catch(err => {
            res.status(400).json({msg: err});
        })
});

router.post('/validtoken', async (req, res) => {
    const token = req.header('auth-token');
    if(!token) return res.json(false);

    try{
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        if(!verified) return res.json(false);

        const user = await User.findById(verified._id);
        if(!user) return res.json(false);

        return res.json(true);
    }
    catch(err){
        res.json(false);;
    }
});

module.exports = router;