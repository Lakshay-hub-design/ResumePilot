const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username is already taken'],
        required: [true, 'username is required'],
        minlength: 3
    },
    email: {
        type: String,
        unique: [true, 'Account is alresdy exist with this email address'],
        required: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
         "Invalid email format"
        ]
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    }
}, {
    timestamps: true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel