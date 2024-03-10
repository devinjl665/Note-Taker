const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

const save = {
  write(note) {
    return writeNote('db/db.json', JSON.stringify(note));
  },
  read() {
    return readNote('db/db.json', 'utf8');
  },
  retrieveNotes() {
    return this.read().then((notes) => {
      let parsedNote;
      try {
        parsedNote = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNote = [];
      }
      return parsedNote;
    });
  },
  addNote(note) {
    const { title, text } = note;
    if (!title || !text) { // Fix the condition here
      throw new Error('Title and text fields cannot be left blank');
    }
    const newNote = { title, text, id: uuidv4() };
    return this.retrieveNotes()
      .then((notes) => [...notes, newNote])
      .then((editedNotes) => this.write(editedNotes))
      .then(() => newNote);
  },
};

module.exports = save;


