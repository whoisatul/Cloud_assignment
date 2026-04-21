"use client";

import { useState, useEffect } from "react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import ProtectedRoute from "@/components/ProtectedRoute";
import NoteCard from "@/components/NoteCard";
import Link from "next/link";

interface Note {
  id: string;
  title: string;
  subject: string;
  uploaderEmail: string;
  createdAt: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

const SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Computer Science",
  "Electronics",
  "Mechanical",
  "Civil",
  "Electrical",
  "Other",
];

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>([]);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Note[];
      setNotes(notesData);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    let filtered = notes;

    if (selectedSubject !== "All Subjects") {
      filtered = filtered.filter((note) => note.subject === selectedSubject);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (note) =>
          note.title.toLowerCase().includes(query) ||
          note.subject.toLowerCase().includes(query) ||
          note.fileName.toLowerCase().includes(query)
      );
    }

    setFilteredNotes(filtered);
  }, [notes, selectedSubject, searchQuery]);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-[var(--color-primary)] opacity-[0.03] rounded-full blur-[100px]" />
        </div>

        {/* Header */}
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Study <span className="gradient-text">Dashboard</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-1">
              Browse and download study materials
            </p>
          </div>
          <Link href="/upload" className="btn-primary">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Upload Notes
          </Link>
        </div>

        {/* Filters */}
        <div className="relative flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-text-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="absolute left-4 top-1/2 -translate-y-1/2"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Search notes by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field !pl-12"
              id="search-notes"
            />
          </div>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="input-field !w-auto min-w-[180px] cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2394A3B8%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
            id="filter-subject"
          >
            {SUBJECTS.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Stats */}
        <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="card !p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
            <p className="text-2xl font-bold mt-1">{notes.length}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Total Notes</p>
          </div>
          <div className="card !p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M8 7h6" />
              <path d="M8 11h8" />
            </svg>
            <p className="text-2xl font-bold mt-1">{new Set(notes.map(n => n.subject)).size}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Subjects</p>
          </div>
          <div className="card !p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            <p className="text-2xl font-bold mt-1">{new Set(notes.map(n => n.uploaderEmail)).size}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Contributors</p>
          </div>
          <div className="card !p-4 text-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p className="text-2xl font-bold mt-1">{filteredNotes.length}</p>
            <p className="text-xs text-[var(--color-text-muted)]">Filtered</p>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="relative">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <div className="w-12 h-12 rounded-full border-2 border-[var(--color-border)] border-t-[var(--color-primary)] animate-spin" />
              <p className="text-[var(--color-text-muted)]">Loading notes...</p>
            </div>
          ) : filteredNotes.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 glass mx-auto mb-6 flex items-center justify-center">
                {notes.length === 0 ? (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ) : (
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">
                {notes.length === 0 ? "No notes yet" : "No results found"}
              </h3>
              <p className="text-[var(--color-text-secondary)] mb-6 max-w-sm mx-auto">
                {notes.length === 0
                  ? "Be the first to upload study material!"
                  : "Try adjusting your search or filter."}
              </p>
              {notes.length === 0 && (
                <Link href="/upload" className="btn-primary">
                  Upload First Note
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNotes.map((note) => (
                <NoteCard
                  key={note.id}
                  title={note.title}
                  subject={note.subject}
                  uploaderEmail={note.uploaderEmail}
                  createdAt={note.createdAt}
                  fileName={note.fileName}
                  fileUrl={note.fileUrl}
                  fileType={note.fileType}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
