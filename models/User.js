//User model for mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
	user_id: { type: String, trim: true },
	name: { type: String, trim: true },
	password: { type: String, trim: true },
})

module.exports = mongoose.model('users', UserSchema)
