"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="glass-strong sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full gradient-bg flex items-center justify-center transition-transform group-hover:scale-110">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                <path d="M8 7h6" />
                <path d="M8 11h8" />
              </svg>
            </div>
            <span className="text-xl font-bold gradient-text">PrepHub</span>
          </Link>

          <div className="flex items-center gap-2">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    isActive("/dashboard")
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/5"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  href="/upload"
                  className={`px-4 py-2 text-sm font-medium transition-all ${
                    isActive("/upload")
                      ? "bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-black/5"
                  }`}
                >
                  Upload
                </Link>
                <div className="w-px h-6 bg-[var(--color-border)] mx-2" />
                <span className="text-xs text-[var(--color-text-muted)] hidden sm:block max-w-[120px] truncate">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error)]/10 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn-secondary !py-2 !px-4 !text-sm"
                >
                  Log In
                </Link>
                <Link
                  href="/signup"
                  className="btn-primary !py-2 !px-4 !text-sm"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
