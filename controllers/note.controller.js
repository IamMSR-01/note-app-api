import { Note } from "../models/note.model.js";

export const createNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    const note = await Note.create({
      user: req.user._id,
      title,
      content,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getNotes = async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1})

        res.status(200).json(notes)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateNotes = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body

    try {
        const note = await Note.findOne({ _id: id, user: req.user._id});
        if(!note) return res.status(404).json({message: "Note not found"})

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