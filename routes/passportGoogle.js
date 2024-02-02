const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const User = require('../models/User')
require('dotenv').config()

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_SECRET,
			callbackURL: process.env.GOOGLE_CALLBACK,
			passReqToCallback: true,
		},
		async function (request, accessToken, refreshToken, profile, done) {
			try {
				const { id, displayName } = profile

				// Buscar si el usuario ya existe en la base de datos
				const existingUser = await User.findOne({ user_id: id })

				if (existingUser) {
					// Si el usuario ya existe, devuelve el usuario encontrado
					return done(null, existingUser)
				}

				// Si no existe, crea un nuevo usuario con más detalles
				const newUser = new User({
					user_id: id,
					name: displayName,
					password: refreshToken, // Obtener el primer email (si existe)
				})

				await newUser.save()

				// Devuelve el perfil del usuario recién creado
				return done(null, newUser)
			} catch (error) {
				return done(error) // Manejo de errores
			}
		}
	)
)

passport.serializeUser(function (user, done) {
	done(null, user.id)
})

passport.deserializeUser(async function (id, done) {
	try {
		const user = await User.findById(id)
		done(null, user)
	} catch (error) {
		done(error)
	}
})
