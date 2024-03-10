const router = require('express').Router();
const saveData = require('../db/saveData');

// Retrieve notes
router.get('/notes', function (req, res) {
  saveData
    .retrieveNotes()
    .then(notes => res.json(notes))
    .catch(err => res.status(500).json(err));
});

// Add a new note
router.post('/notes', (req, res) => {
  saveData
    .addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
});

// Delete a note by ID
router.delete('/notes/:id', (req, res) => {
  const noteId = req.params.id;
  saveData
    .retrieveNotes()
    .then((notes) => {
      const updatedNotes = notes.filter((note) => note.id !== noteId);
      return saveData.write(updatedNotes);
    })
    .then(() => res.json({ success: true }))
    .catch((err) => res.status(500).json(err));
});

module.exports = router;