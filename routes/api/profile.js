const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('config');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { response } = require('express');

//@route GET api/profile/me
//Get current user profile  
//Truy cap co auth
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: 'Khong tim thay profile cho user nay' });
        }

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }
})

//@route POST api/profile
//Tao va update profile nguoi dung 
//Truy cap co auth
router.post('/', [auth,
    [
        check('status', 'Trang thai duoc yeu cau').not().isEmpty(),
        check('skills', 'Ki nag duoc yeu cau').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
    }

    const { company, website, location, bio, status, githubusername, skills, youtube, facebook, twitter, instagram, linkedin } = req.body;

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
        profileFields.skills = skills.split(',').map(skills => skills.trim());
    }

    //Xay dung mang xa hoi
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if (profile) {
            //Update
            profile = await Profile.findOneAndUpdate({ user: req.user.id }, { $set: profileFields }, { new: true });
            return res.json(profile)
        }

        //Create 
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/profile
//LAy tat ca profile cua nguoi dung 
//Truy cap khong co auth
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/profile/user/:user_id
//LAy profile cua 1 user
//Truy cap khong co auth
router.get('/user/:user_id', async (req, res) => {
    try {
        const profiles = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);
        if (!profiles) {
            return res.status(400).json({ msg: 'Khong tim thay profile cho user nay' });
        }
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Khong tim thay profile cho user nay' });
        }
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile
//Xoa profile , nguoi dung va post
//Truy cap co auth
router.delete('/', auth, async (req, res) => {
    try {
        //Remove post
        await Post.deleteMany({ user: req.user.id })
        // Remove profile
        await Profile.findOneAndRemove({ user: req.user.id });
        //Remove USer
        await User.findOneAndRemove({ _id: req.user.id });
        res.json({ msg: 'User da duoc xoa vinh vien' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route PUT api/profile/experience
//Them experience
//Truy cap co auth
router.put('/experience', [
    auth,
    [
        check('title', 'Title duoc yeu cau').not().isEmpty(),
        check('company', 'Company duoc yeu cau').not().isEmpty(),
        check('from', 'From date duoc yeu cau').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { title, company, location, from, to, current, description } = req.body;
    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.messge);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/experience/:exp_id
//Xoa experience trong mang
//Truy cap co auth
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //GEt remove index
        const removeIndex = profile.experience.map(item => item._id).indexOf(req.params.exp_id);
        if (removeIndex === -1) {
            return res.status(400).json({ msg: 'Khong tim thay id nay' });
        }
        profile.experience.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route PUT api/profile/education
//Them education
//Truy cap co auth
router.put('/education', [
    auth,
    [
        check('school', 'Title duoc yeu cau').not().isEmpty(),
        check('degree', 'Company duoc yeu cau').not().isEmpty(),
        check('fieldofstudy', 'From date duoc yeu cau').not().isEmpty(),
        check('from', 'From duoc yeu cau').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { school, degree, fieldofstudy, from, to, current, description } = req.body;
    const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.education.unshift(newEdu);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.messge);
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/profile/education/:edu_id
//Xoa education trong mang
//Truy cap co auth
router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        //GEt remove index
        const removeIndex = profile.education.map(item => item._id).indexOf(req.params.edu_id);
        if (removeIndex === -1) {
            return res.status(400).json({ msg: 'Khong tim thay id nay' });
        }
        profile.education.splice(removeIndex, 1);

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route GET api/profile/github/:username
//Lay user tu github
//Truy cap ko auth
router.get('/github/:username', (req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${config.get('githubClientId')}&client_secret=${config.get('githubSecret')}`,
            method: 'GET',
            headers: { 'user-agent': 'nodejs' }
        };

        request(options, (error, response, body) => {
            if (error) console.error(error);

            if (response.statusCode !== 200) {
                return res.status(404).json({ msg: 'Khong tim thay github profile' });
            }

            res.json(JSON.parse(body));
        })
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})




module.exports = router;