const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURL');

const connectDB = async () => {
    try {
       await mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true ,useFindAndModify: false});
       console.log('MongoDb Connected........');
    } catch(e) {
       console.error(err.message);
       //Exit process khi failed
       process.exit(1);
    }
}

module.exports = connectDB;