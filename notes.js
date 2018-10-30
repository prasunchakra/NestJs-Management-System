console.log('Starting notes.js !!');

const fs = require('fs');

var saveNotes = (notes)=>{
    fs.writeFileSync('notesData.json',JSON.stringify(notes));
}
var fetchNotes=()=>{
    try{
        var notesString = fs.readFileSync('notesData.json');
        return JSON.parse(notesString);
    }catch(e){
        return [];
    }
}

var logNote = (note)=>{
    console.log('-----------');
    console.log(`Title: ${note.title}`);
    console.log(`Body:  ${note.body}`);
}
var addNote = (title,body) =>{
    var notes = fetchNotes();
    var note = {title,body};
    var duplicateNotes = notes.filter((note) => note.title === title);
    if (duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;   
    }    
};
var getAll = () =>{
    return fetchNotes();
};

var getNote=(title) =>{
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title === title);
    return filteredNotes[0];
};

var removeNote=(title) =>{
    notes = fetchNotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);
    return notes.length !== filteredNotes.length
};

module.exports={
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
};