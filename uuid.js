const uuidv4 = require('uuid').v4

function generateSessionId() {
	return uuidv4()
}
