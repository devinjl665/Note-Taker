const fs = require('fs');
const api = require('express').Router();
const uuid = require('uuid');




api.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
        console.error(err);
        } else {
        const parsedNote = JSON.parse(data);
        res.json(parsedNote);
        }
    });
})



api.post('/', (req, res) => {
    const{title, text} = req.body;
    if(req.body){
        const newNote = { 
            title, 
            text, 
            id: uuid.v4(),
        };


        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.log(err);
            } else {
            const parsedNote = JSON.parse(data);
            parsedNote.push(newNote);


        fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4),
            (writeError) => writeError ? console.error(writeError) : console.info('Successfully updated.'));    
            }
        });
    }
    
    res.redirect('return');
});


api.delete('/:id', (req, res) => {
    const {id} = req.params;

    fs.readFile('./db/db.json', 'utf-8', (err, data) => {
        if (err) {
            console.error(err);
        } else {
            var parsedNote = JSON.parse(data);
        }

        const savedNotes = []

        for(entry of parsedNote) {
            if(entry.id == id){
                console.log(`Note ${id} is to be deleted`)
            } else {
                savedNotes.push(entry)
            }
        }



    fs.writeFile('./db/db.json', JSON.stringify(parsedNote, null, 4),
    (writeError) => writeError ? console.error(writeError) : console.info('Successfully updated.'));        
    })


    res.redirect('return');
})

module.exports = api;