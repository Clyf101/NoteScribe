const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

// Create a new note object with a unique id using UUID
const newNote = (title, text) => {
  return {
    id: uuidv4(),
    title,
    text
  };
};

// Array to store the notes
let notes = [];

// Add some example notes to the array
notes.push(newNote('Shopping List', 'Milk, bread, eggs'));
notes.push(newNote('ToDo', 'Clean the kitchen, do laundry'));

// Write the notes array to a JSON file
fs.writeFileSync('./db.json', JSON.stringify(notes), err => {
  if (err) throw err;
  console.log('Notes written to file');
});
