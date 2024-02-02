const express = require('express')
const router = express.Router()
require('./passportGoogle')
const passport = require('passport')
const dotenv = require('dotenv')
dotenv.config()
const uuidv4 = require('uuid').v4

function generateSessionId() {
	return uuidv4()
}

router.get(
	'/',
	passport.authenticate('google', { scope: ['email', 'profile'] })
)

router.get(
	'/callback',
	passport.authenticate('google', {
		successRedirect: 'success',
		failureRedirect: 'failure',
	})
)

router.get('/success', (req, res) => {
	if (req.isAuthenticated()) {
		req.session.user = {
			name: req.user.name,
			_id: req.user._id,
		}
		const sessionId = generateSessionId()
		req.session.id = sessionId
		res.cookie('sessionId', sessionId, {
			httpOnly: true,
			maxAge: 90 * 24 * 60 * 60 * 1000,
		})
		// Redirige al usuario a la página de inicio o dashboard en caso de autenticación exitosa
		return res.redirect('http://localhost:5173/dashboard')
	}
	// Redirige al usuario a la página de error en caso de fallo de autenticación
	return res.redirect('http://localhost:5173/error')
})

router.get('/failure', (req, res) => {
	res.status(401).json({ message: 'Authentication failed' })
})

module.exports = router
