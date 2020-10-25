const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

//@route POST api/posts
//Them 1 post
//Truy cap co auth
router.post('/', [
    auth,
    [
        check('text', 'Noi dung duoc yeu cau').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        });

        const post = await newPost.save();
        res.json(post);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

//@route GET api/posts
//Lay tat ca posts cua user dang nhap
//Truy cap co auth
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json({ posts });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route GET api/posts/:id
//Lay 1 post by id
//Truy cap co auth
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Post Not Found' })
        }

        res.json({ post });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post Not Found' })
        }
        res.status(500).send('Server Error');
    }
});

//@route DELETE api/posts/:id
//Xoa 1 id 
//Truy cap co auth
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).sort({ date: -1 });

        if (!post) {
            return res.status(404).json({ msg: 'Post Not Found' })
        }

        if (post.user.toString() !== req.user.id) {
            return res.status(401).send({ msg: 'Khong phai user tao post' });
        }

        await post.remove();
        res.json({ msg: 'Post removed ' });
    } catch (err) {
        console.error(err.message);
        if (err.kind == 'ObjectId') {
            return res.status(404).json({ msg: 'Post Not Found' })
        }
        res.status(500).send('Server Error');
    }
});

//@route PUT api/posts/like/:id
//Like 1 post
//Truy cap co auth
router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check neu  user da co like
        if (post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ msg: 'Post da like ' });
        }

        post.likes.unshift({ user: req.user.id });

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server errors')
    }
})

//@route PUT api/posts/unlike/:id
//Unlike 1 post
//Truy cap co auth
router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        //check neu  user da co like
        if (post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ msg: 'Post chua dc like' });
        }

        //Lay index remove
        const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user.id);

        post.likes.splice(removeIndex, 1);

        await post.save();
        res.json(post.likes);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server errors')
    }
})

//@route POST api/posts/comment/:id
//Them 1 comment tu user dang nhap
//Truy cap co auth
router.post('/comment/:id', [
    auth,
    [
        check('text', 'Noi dung duoc yeu cau').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: req.user.id
        };

        post.comments.unshift(newComment);

        await post.save();
        res.json(post.comments);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

})

//@route DELETE api/posts/comment/:id/:comment_id
//Xoa comment da binh luan
//Truy cap co auth
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const comment = post.comments.find((comment) => comment.id === req.params.comment_id)
        if (!comment) {
            return res.status(404).json({ msg: 'Comment ko ton tai ' });
        }

        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Khong phai user comment ' });
        }

        const removeIndex = post.comments.map(comment => comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex, 1);

        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})


module.exports = router;