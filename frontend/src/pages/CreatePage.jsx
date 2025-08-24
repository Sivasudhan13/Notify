import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import api from "../lib/axios";

function CreatePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All Feild required");
      return;
    }
    setLoading(true);
    try {
      await api.post("/notes", {
        title,
        content,
      });
      toast.success("Note Created Successfully");
      navigate("/");
    } catch (error) {
      console.log("Error in create page ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-y-auto">
      {/* Background Layers */}
      <div className="absolute inset-0 animate-gradient z-0" />
      <div
        className="absolute inset-0 animate-grid z-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-6">
          {/* Back Button */}
          <Link to={"/"}>
            <button className="flex items-center gap-2 text-[#5a189a] hover:text-[#9d31f1] transition">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back</span>
            </button>
          </Link>

          {/* Page Title */}
          <h1 className="text-2xl font-bold text-[#5a189a]">
            Create a New Note
          </h1>

          <form onSubmit={HandleSubmit} className="space-y-6 p-4">
            {/* Note Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Note Title
              </label>
              <input
                type="text"
                placeholder="Enter note title..."
                className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d31f1] focus:border-[#9d31f1]"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Note Content */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Note Content
              </label>
              <textarea
                placeholder="Write your note content..."
                className="w-full min-h-[150px] px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9d31f1] focus:border-[#9d31f1]"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#9d31f1] hover:bg-[#5a189a] text-white font-semibold py-2 rounded-xl transition duration-200 transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Note"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePage;
