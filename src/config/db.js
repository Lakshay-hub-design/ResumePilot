const mongoose = require('mongoose')

async function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log('DB Connected');
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB