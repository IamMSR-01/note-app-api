import { Note } from "../models/note.model.js";


// function to create a note 
export const createNote = async (req, res) => {
    // take input {title, content} to create a note
  const { title, content } = req.body;

  try {
    // create a note 
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
    });

    // return the note as response
    res.status(201).json(note);
  } catch (error) {
    // handle the error
    res.status(500).json({ message: error.message });
  }
};


// function for getting all the notes
export const getNotes = async (req, res) => {
    try {
        // get all the notes 
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1})

        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// fuction for update the notes
export const updateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body

    try {
        // find the note by using user id
        const note = await Note.findOne({ _id: id, user: req.user._id});
        if(!note) return res.status(404).json({message: "Note not found"})

            // if note 
        note.title = title || note.title
        note.content = content || note.content

        await note.save()

        res.status(200).json(note)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const note = await Note.findOneAndDelete({ _id: id, user: req.user._id })

        if(!note) return res.status(404).json({ message: "Note note found"});

        res.status(200).json({ message: "Note deleted successfully"})
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}