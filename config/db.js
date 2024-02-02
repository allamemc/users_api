const mongoose = require('mongoose')
const dotenv = require('dotenv') // Add the missing import statement for dotenv

dotenv.config()

const db = () => {
	mongoose
		.connect(process.env.MONGO_URI, {})
		.then(() => {
			console.log('Connected to MongoDB')
		})
		.catch((err) => {
			console.log(err)
		})
}

module.exports = db // Update the export statement to use module.exports
