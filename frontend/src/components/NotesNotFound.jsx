import React from "react";
import { Link } from "react-router-dom";
import { Notebook } from "lucide-react";

const NotesNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center">
      <div
        className="rounded-full p-8 bg-purple-100 flex items-center justify-center"
        role="img"
        aria-label="Notebook icon"
      >
        <Notebook className="w-10 h-10 text-purple-600" />
      </div>

      <h3 className="text-2xl font-bold text-purple-600">No notes yet</h3>

      <p className="text-purple-100/70">
        Ready to organize your thoughts? Create your first note to get started
        on your journey.
      </p>

      <Link
        to="/create"
        className="px-6 py-3 rounded-xl font-semibold bg-purple-600 text-white hover:opacity-90 transition"
      >
        Create Your First Note
      </Link>
    </div>
  );
};

export default NotesNotFound;
