import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import api from "../lib/axios";
import { toast } from "react-hot-toast";
import "./Home.css";

const NoteDetailpage = () => {
  const [note, setNote] = useState({ title: "", content: "" });

  const navigate = useNavigate();
  const { id } = useParams();
  const titleInputRef = useRef(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data || { title: "", content: "" });
        titleInputRef.current?.focus();
      } catch (error) {
        console.error(error);
        toast.error("Failed to load note");
      }
    };
    fetchNotes();
  }, [id]);

  const handleSave = async () => {
    try {
      console.log("Saving note:", note); // Debugging
      await api.put(`/notes/${id}`, {
        title: note.title,
        content: note.content,
      });
      toast.success("Note saved successfully!");
      navigate("/");
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Failed to save note");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto bg-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 z-0" />

      <div className="relative z-10 flex items-center justify-center p-4 sm:p-6 min-h-screen">
        <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6 space-y-6">
          <Link to="/">
            <button className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Notes</span>
            </button>
          </Link>

          <h1 className="text-2xl font-bold text-purple-700">Edit Note</h1>

          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <div className="space-y-2">
              <label
                htmlFor="note-title"
                className="block text-sm font-medium text-gray-700"
              >
                Note Title
              </label>
              <input
                id="note-title"
                type="text"
                placeholder="Enter note title..."
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                value={note.title}
                ref={titleInputRef}
                onChange={(e) => setNote({ ...note, title: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="note-content"
                className="block text-sm font-medium text-gray-700"
              >
                Note Content
              </label>
              <textarea
                id="note-content"
                placeholder="Write your note content..."
                className="w-full min-h-[200px] px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-400"
                value={note.content}
                onChange={(e) => setNote({ ...note, content: e.target.value })}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-xl flex items-center justify-center transition"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Note
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailpage;
