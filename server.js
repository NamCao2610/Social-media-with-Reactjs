const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/api/users');
const authRouter = require('./routes/api/auth');
const profileRouter = require('./routes/api/profile');
const postRouter = require('./routes/api/posts');
const port = process.env.PORT || 5000;

const app = express();

connectDB();


app.use(express.json({ extended: true }));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,X-Requested-With');
    next();
});

app.get('/', (req, res) => {
    res.send('Day la nam dep zai');
})

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postRouter);

app.listen(port, () => {
    console.log(`Server dang chay port ${port}`)
})