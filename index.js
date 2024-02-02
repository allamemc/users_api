const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const db = require('./config/db')
const userRoutes = require('./routes/users.routes')
const notesRoutes = require('./routes/notes.routes')
const googleRoutes = require('./routes/google.routes')
const cors = require('cors')
const passport = require('passport')
const app = express()

db()

app.use(
	cors({
		origin: 'https://note-nest-c.fly.dev',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
)

app.use(
	session({
		secret: 'your secret here',
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: true,
			maxAge: 90 * 24 * 60 * 60 * 1000,
		},
	})
)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/api/users', userRoutes)
app.use('/api/google', googleRoutes)
app.use('/api/notes', notesRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port PORT ${PORT}`)
})
module.exports = app
