"use client";

import React from "react";

interface NoteCardProps {
  title: string;
  subject: string;
  uploaderEmail: string;
  createdAt: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
}

const subjectColors: Record<string, string> = {
  "Mathematics": "badge-purple",
  "Physics": "badge-cyan",
  "Chemistry": "badge-green",
  "Computer Science": "badge-amber",
  "Electronics": "badge-purple",
  "Mechanical": "badge-cyan",
  "Civil": "badge-green",
  "Electrical": "badge-amber",
  "Other": "badge-purple",
};

const fileIcons: Record<string, React.ReactNode> = {
  pdf: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-red-400">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  image: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  ),
  doc: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

function getFileIcon(fileType: string) {
  if (fileType.includes("pdf")) return fileIcons.pdf;
  if (fileType.includes("image")) return fileIcons.image;
  return fileIcons.doc;
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function NoteCard({
  title,
  subject,
  uploaderEmail,
  createdAt,
  fileName,
  fileUrl,
  fileType,
}: NoteCardProps) {
  return (
    <div className="card group cursor-default">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-[var(--color-bg-input)] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
          {getFileIcon(fileType)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--color-text-primary)] truncate text-lg">
            {title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] truncate mt-0.5">
            {fileName}
          </p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <span className={`badge ${subjectColors[subject] || "badge-purple"}`}>
          {subject}
        </span>
        <span className="text-xs text-[var(--color-text-muted)]">•</span>
        <span className="text-xs text-[var(--color-text-muted)]">
          {formatDate(createdAt)}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-xs text-[var(--color-text-muted)] truncate max-w-[150px]">
          by {uploaderEmail}
        </span>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary !py-2 !px-4 !text-xs group/btn"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/btn:translate-y-0.5">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Download
        </a>
      </div>
    </div>
  );
}
