const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    last_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    full_name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    age: {
        type: Number,
        required: true,
    },
    sex: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other']
    },
    job: {
        type: String,
        required: true,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    password: {
        type: String,
        required: true,
        min: 3,
        max: 1024
    },
});

module.exports = mongoose.model('User', userSchema);