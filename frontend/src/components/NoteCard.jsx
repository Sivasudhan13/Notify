import React from "react";
import { Link } from "react-router-dom"; // Fixed import
import api from "../lib/axios";
import { toast } from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Failed to delete note");
    }
  };

  return (
    <div
      key={note._id}
      className="rounded-2xl shadow-lg p-5 bg-[#9d31f1] border border-[#f9f2ff]/30 flex flex-col justify-between"
    >
      <Link to={`/note/${note._id}`}>
        <h3 className="text-xl font-bold text-[#f9f2ff] mb-2 hover:underline">
          {note.title}
        </h3>
      </Link>

      <p className="text-[#f9f2ff]/90 flex-1 mb-3">{note.content}</p>

      <div className="text-sm text-[#f9f2ff]/70 mb-3">
        <p>Created: {new Date(note.createdAt).toLocaleString()}</p>
        {note.updatedAt && (
          <p>Updated: {new Date(note.updatedAt).toLocaleString()}</p>
        )}
      </div>

      <div className="mt-2 flex justify-end space-x-3">
        <Link to={`/note/${note._id}`}>
          <button className="px-4 py-2 rounded-xl bg-[#f9f2ff] text-[#9d31f1] font-semibold hover:bg-white transition">
            Edit
          </button>
        </Link>
        <button
          className="px-4 py-2 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition"
          onClick={(e) => handleDelete(e, note._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
