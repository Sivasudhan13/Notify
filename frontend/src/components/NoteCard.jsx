import React from "react";
import { Link } from "react-router-dom";
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
      className="rounded-xl shadow-md hover:shadow-lg transition-all bg-white border border-gray-200 p-4 flex flex-col"
    >
      {/* Title */}
      <Link to={`/note/${note._id}`}>
        <h3 className="text-xl font-bold text-gray-800 mb-2 hover:underline">
          {note.title}
        </h3>
      </Link>

      {/* Content */}
      <p className="text-gray-700 text-sm flex-1 mb-3 line-clamp-3">
        {note.content}
      </p>

      {/* Dates */}
      <div className="text-xs text-gray-500 mb-4">
        <p>🕒 Created: {new Date(note.createdAt).toLocaleString()}</p>
        {note.updatedAt && (
          <p>✏️ Updated: {new Date(note.updatedAt).toLocaleString()}</p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-2">
        <Link to={`/note/${note._id}`}>
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            ✏️ Edit
          </button>
        </Link>
        <button
          className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition"
          onClick={(e) => handleDelete(e, note._id)}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
