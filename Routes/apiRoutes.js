const notesDB = require("../db/notesDB");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    res.json(notesDB);
  });

  app.post("/api/notes", (req, res) => {
    const newNote = {
      id: uuidv4(),
      title: req.body.title,
      text: req.body.text,
    };
    notesDB.push(newNote);
    res.json(notesDB);
  });

  app.delete("/api/notes/:id", (req, res) => {
    const noteId = req.params.id;
    const index = notesDB.findIndex((note) => note.id === noteId);
    if (index !== -1) {
      notesDB.splice(index, 1);
      res.json(notesDB);
    } else {
      res.status(404).send(`Note with ID ${noteId} not found`);
    }
  });
};
