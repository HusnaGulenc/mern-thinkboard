import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import NotesNotFound from "../components/NotesNotFound";

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/notes");
        setNotes(res.data);
      } catch (error) {
        console.log("Error fetching notes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 mt-6">
        {loading && (
          <div className="text-center text-primary py-10">Loading notes...</div>
        )}
        {notes.length > 0 && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-6 gap-3">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} setNotes={setNotes}/>
              ))}
            </div>
          </div>
        )}
        {notes.length === 0 && !loading && <NotesNotFound/>}
      </div>
    </div>
  );
};

export default Homepage;
