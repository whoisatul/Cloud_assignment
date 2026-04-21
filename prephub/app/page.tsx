"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[var(--color-primary)] opacity-[0.04] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-[var(--color-accent)] opacity-[0.03] rounded-full blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <div className="animate-fade-in-up">
            <span className="badge badge-cyan mb-6 text-xs tracking-widest">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1.5">
                <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
              </svg>
              CLOUD-POWERED LEARNING
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up delay-100" style={{ animationFillMode: 'backwards' }}>
            Your Study Notes,{" "}
            <span className="gradient-text">One Hub</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-[var(--color-text-secondary)] leading-relaxed animate-fade-in-up delay-200 max-w-2xl mx-auto" style={{ animationFillMode: 'backwards' }}>
            Upload, organize, and access study materials instantly. 
            PrepHub brings your notes together with the power of cloud services.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300" style={{ animationFillMode: 'backwards' }}>
            <Link
              href={user ? "/dashboard" : "/signup"}
              className="btn-primary text-lg !px-8 !py-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              {user ? "Go to Dashboard" : "Get Started Free"}
            </Link>
            <Link
              href={user ? "/upload" : "/login"}
              className="btn-secondary text-lg !px-8 !py-4"
            >
              {user ? "Upload Notes" : "Log In"}
            </Link>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute top-32 left-10 animate-float hidden lg:block" style={{ animationDelay: '0s' }}>
          <div className="w-16 h-16 glass flex items-center justify-center">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
        </div>
        <div className="absolute top-48 right-16 animate-float hidden lg:block" style={{ animationDelay: '2s' }}>
          <div className="w-14 h-14 glass flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              <path d="M8 7h6" />
              <path d="M8 11h8" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-20 left-20 animate-float hidden lg:block" style={{ animationDelay: '4s' }}>
          <div className="w-12 h-12 glass flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-warning)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
        </div>
        <div className="absolute bottom-32 right-24 animate-float hidden lg:block" style={{ animationDelay: '1s' }}>
          <div className="w-14 h-14 glass flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
            </svg>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            Powered by <span className="gradient-text">Firebase Cloud</span>
          </h2>
          <p className="mt-4 text-[var(--color-text-secondary)] max-w-xl mx-auto">
            Three cloud services working together to give you a seamless experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Auth Card */}
          <div className="card group">
            <div className="w-14 h-14 bg-[var(--color-primary)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Authentication</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Secure email & password authentication powered by Firebase Auth. 
              Your account, your notes.
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <span className="badge badge-purple text-[10px]">Firebase Auth</span>
            </div>
          </div>

          {/* Firestore Card */}
          <div className="card group">
            <div className="w-14 h-14 bg-[var(--color-accent)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <ellipse cx="12" cy="5" rx="9" ry="3" />
                <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Cloud Database</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              All note metadata stored in Cloud Firestore — titles, subjects, 
              timestamps, instantly queryable.
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <span className="badge badge-cyan text-[10px]">Cloud Firestore</span>
            </div>
          </div>

          {/* Storage Card */}
          <div className="card group">
            <div className="w-14 h-14 bg-[var(--color-success)]/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">File Storage</h3>
            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">
              Upload PDFs, images, and documents to Firebase Storage. 
              Instant access from anywhere.
            </p>
            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <span className="badge badge-green text-[10px]">Firebase Storage</span>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold">
            How it <span className="gradient-text">Works</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-20 h-20 glass mx-auto mb-5 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="gradient-text font-bold text-sm tracking-widest">STEP 01</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Sign Up</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Create your account in seconds with email & password.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 glass mx-auto mb-5 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
            </div>
            <span className="gradient-text font-bold text-sm tracking-widest">STEP 02</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Upload Notes</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Upload PDFs, docs, or images and tag them by subject.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 glass mx-auto mb-5 flex items-center justify-center">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            </div>
            <span className="gradient-text font-bold text-sm tracking-widest">STEP 03</span>
            <h3 className="text-xl font-bold mt-2 mb-2">Browse & Download</h3>
            <p className="text-[var(--color-text-secondary)] text-sm">
              Find notes by subject, search by title, and download.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[var(--color-text-muted)] text-sm">
            Built with <span className="gradient-text font-semibold">Next.js</span> &{" "}
            <span className="text-[var(--color-warning)] font-semibold">Firebase</span>{" "}
            — Cloud Management Project
          </p>
        </div>
      </footer>
    </div>
  );
}
