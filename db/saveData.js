const util = require('util');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const readNote = util.promisify(fs.readFile);
const writeNote = util.promisify(fs.writeFile);

const save = {
  write(notes) {
    const filePath = path.join(__dirname, 'db.json');
    return writeNote(filePath, JSON.stringify(notes, null, 4));
  },
  read() {
    const filePath = path.join(__dirname, 'db.json');
    return readNote(filePath, 'utf8');
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
    if (!title || !text) {
      throw new Error('Title and text fields cannot be left blank');
    }
    const newNote = { title, text, id: uuidv4() };
    return this.retrieveNotes()
      .then((notes) => {
        const updatedNotes = [...notes, newNote];
        return this.write(updatedNotes);
      })
      .then(() => newNote);
  },  
};

module.exports = save;
