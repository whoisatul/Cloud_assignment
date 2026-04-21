"use client";

import { useState, useRef } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

const SUBJECTS = [
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

export default function UploadPage() {
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    if (!title.trim()) {
      setError("Please enter a title.");
      return;
    }

    if (!subject) {
      setError("Please select a subject.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const timestamp = Date.now();
      const storageRef = ref(storage, `notes/${timestamp}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prog = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.round(prog));
        },
        (error) => {
          console.error("Upload error:", error);
          setError("Failed to upload file. Please try again.");
          setUploading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          await addDoc(collection(db, "notes"), {
            title: title.trim(),
            subject,
            uploaderEmail: user?.email || "Unknown",
            createdAt: new Date().toISOString(),
            fileName: file.name,
            fileUrl: downloadURL,
            fileType: file.type,
            fileSize: file.size,
          });

          setSuccess(true);
          setUploading(false);
          setTimeout(() => {
            router.push("/dashboard");
          }, 2000);
        }
      );
    } catch {
      setError("Something went wrong. Please try again.");
      setUploading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[5%] left-[10%] w-[400px] h-[400px] bg-[var(--color-primary)] opacity-[0.05] rounded-full blur-[120px]" />
        </div>

        <div className="relative">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Upload <span className="gradient-text">Notes</span>
            </h1>
            <p className="text-[var(--color-text-secondary)] mt-1">
              Share your study materials with everyone
            </p>
          </div>

          {success ? (
            <div className="card !p-12 text-center animate-fade-in-up">
              <div className="w-20 h-20 bg-[var(--color-success)]/10 mx-auto mb-6 flex items-center justify-center">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Successful!</h2>
              <p className="text-[var(--color-text-secondary)]">
                Redirecting to dashboard...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
                  <p className="text-sm text-[var(--color-error)] flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="15" y1="9" x2="9" y2="15" />
                      <line x1="9" y1="9" x2="15" y2="15" />
                    </svg>
                    {error}
                  </p>
                </div>
              )}

              <div className="card !p-6">
                <label htmlFor="upload-title" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Note Title
                </label>
                <input
                  id="upload-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input-field"
                  placeholder="e.g., Data Structures Unit 3 Notes"
                  required
                />
              </div>

              <div className="card !p-6">
                <label htmlFor="upload-subject" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  Subject
                </label>
                <select
                  id="upload-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="input-field cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%238B8FA3%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%2F%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[right_1rem_center]"
                  required
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  {SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="card !p-6">
                <label className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                  File
                </label>
                <div
                  className={`relative border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                    dragActive
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/5"
                      : file
                      ? "border-[var(--color-success)]/30 bg-[var(--color-success)]/5"
                      : "border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-bg-card-hover)]"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.txt,.jpg,.jpeg,.png,.gif,.webp"
                    id="upload-file"
                  />

                  {file ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-[var(--color-success)]/10 flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <path d="M9 15l2 2 4-4" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          {file.name}
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">
                          {formatFileSize(file.size)} • Click to change
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-14 h-14 bg-[var(--color-bg-input)] flex items-center justify-center">
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-[var(--color-text-primary)]">
                          Drag & drop your file here
                        </p>
                        <p className="text-sm text-[var(--color-text-muted)] mt-1">
                          or click to browse • PDF, DOC, PPT, Images
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {uploading && (
                <div className="card !p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium">Uploading...</span>
                    <span className="text-sm font-bold gradient-text">{progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-[var(--color-bg-input)] overflow-hidden">
                    <div
                      className="h-full gradient-bg transition-all duration-300 ease-out"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="btn-primary w-full justify-center !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {uploading ? (
                  <>
                    <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    Upload Note
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
