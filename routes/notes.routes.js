//notes router
const express = require('express')
const router = express.Router()

const Notes = require('../models/Notes')

//get all notes for a user
router.get('/:user_id', (req, res) => {
	Notes.find({ user_id: req.params.user_id })
		.then((notes) => res.json(notes))
		.catch((err) => res.json(err))
})

//create a new note
router.post('/create/:user_id', (req, res) => {
	const note = new Notes({
		user_id: req.params.user_id,
		title: req.body.title,
		content: req.body.content,
	})

	note
		.save()
		.then((note) => res.json(note))
		.catch((err) => res.json(err))
})

//update a note
router.put('/update/:note_id', (req, res) => {
	Notes.findByIdAndUpdate(req.params.note_id, {
		title: req.body.title,
		content: req.body.content,
	})
		.then((note) => res.json(note))
		.catch((err) => res.json(err))
})

//delete a note
router.delete('/delete/:note_id', (req, res) => {
	Notes.findByIdAndDelete(req.params.note_id)
		.then((note) => res.json(note))
		.catch((err) => res.json(err))
})

module.exports = router
