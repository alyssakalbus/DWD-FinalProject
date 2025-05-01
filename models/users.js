const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    email: String,
    birthday: String,
    dnaSequence: String,
    encryptedSequence: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

module.exports = User;