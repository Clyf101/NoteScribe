const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

const notesDB = path.join(__dirname, "../db.json");

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    fs.readFile(notesDB, "utf8", function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error getting notes" });
      }
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function(req, res) {
    fs.readFile(notesDB, "utf8", function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error saving note" });
      }
      const notes = JSON.parse(data);
      const newNote = {
        id: uuid.v4(),
        title: req.body.title,
        text: req.body.text
      };
      notes.push(newNote);
      fs.writeFile(notesDB, JSON.stringify(notes), function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error saving note" });
        }
        res.json(newNote);
      });
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    const id = req.params.id;
    fs.readFile(notesDB, "utf8", function(err, data) {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error deleting note" });
      }
      const notes = JSON.parse(data);
      const filteredNotes = notes.filter(note => note.id !== id);
      fs.writeFile(notesDB, JSON.stringify(filteredNotes), function(err) {
        if (err) {
          console.log(err);
          return res.status(500).json({ error: "Error deleting note" });
        }
        res.sendStatus(200);
      });
    });
  });
};
