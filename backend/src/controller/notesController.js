import Note from "../models/Note.js";

export async function getAllNotes(req, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).send(notes);
  } catch (error) {
    console.error("error in getallnotes controller :", error);
    res.status(500).json("internal server error");
  }
}

export async function createNote(req, res) {
  try {
    const { title, content } = req.body;
    const newNote = new Note({ title, content });
    const saveNote = await newNote.save();
    res.status(201).json(saveNote);
  } catch (error) {
    console.error(" error in createnote in controller:", error);
    res.status(501).json("internal server error");
  }
}
export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const UpdateNote = await Note.findByIdAndUpdate(req.params.id, {
      title,
      content,
    });
    if (!UpdateNote) return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "note updated successfully" });
  } catch (error) {}
}

export async function deleteNote(req, res) {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "note deleted successfully" });
  } catch {}
}
export async function getNotesById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: "Note not found" });
  } catch (error) {
    console.error("error in getNotesById  controller :", error);
    res.status(500).json("internal server error");
  }
}
