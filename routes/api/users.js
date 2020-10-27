const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const normalize = require('normalize-url');
const User = require('../../models/User');

//@route POST api/users
//Register USer
//Truy cap ko auth
router.post('/', [
    check('name', 'Yeu cau ban nhap ten').not().isEmpty(),
    check('email', 'Vui long nhap dung email').isEmail(),
    check('password', 'Mat khau phai dai hon 6 ki tu').isLength({ min: 6 })
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, password } = req.body;
        try {
            //Kiem tra neu User da ton tai
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'Tai khoan nay da ton tai ' }] });
            }
            //Neu user ko ton tai se chuyen xuong them avatar
            const avatar = normalize(
                gravatar.url(email, {
                    s: '400',
                    r: 'pg',
                    d: 'mm'
                }),
                { forceHttps: true }
            );
            //Them 1 user moi tu req.body
            user = new User({ name, email, avatar, password });
            //Hash password trc khi save
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            //Return token user
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
                if (err) throw err;
                res.json({ token })
            })

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    })

module.exports = router;