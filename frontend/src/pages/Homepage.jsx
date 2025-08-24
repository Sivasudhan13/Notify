import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import RateLimitedUI from "../components/RateLimitedUI";
import "./Home.css";
import axios from "axios";
import toast from "react-hot-toast";
import NoteCard from "../components/NoteCard";
import api from "../lib/axios";
import NotesNotFound from "../components/NotesNotFound";

function Homepage() {
  const [isRateLimit, setRateLimit] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(true);

  // fetch data
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const res = await api.get("/notes");
        setNotes(res.data);
        console.log(res.data);
        setRateLimit(false);
      } catch (error) {
        console.log(error);
        if (error.response?.status === 429) {
          setRateLimit(true);
        } else {
          toast.error("Failed to load notes");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

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

      {/* Nav */}
      <div className="relative z-10">
        <NavBar />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto p-4 mt-20">
        {/* ratelimit */}
        {isRateLimit && <RateLimitedUI />}
        {/* loading */}
        {isLoading && (
          <div className="text-center text-primary font-semibold py-10">
            Loading notes...
          </div>
        )}
        {!isLoading && Notes.length === 0 && !isRateLimit && <NotesNotFound />}

        {/* notes grid */}
        {Notes.length > 0 && !isRateLimit && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-5">
            {Notes.map((note) => (
              <NoteCard key={note._id} note={note} setNotes={setNotes} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Homepage;
