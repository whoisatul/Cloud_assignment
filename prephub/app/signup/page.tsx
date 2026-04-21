"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);
    try {
      await signup(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      if (firebaseError.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else if (firebaseError.code === "auth/weak-password") {
        setError("Password is too weak. Use at least 6 characters.");
      } else {
        setError("Failed to create account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-[var(--color-accent)] opacity-[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-[var(--color-primary)] opacity-[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 gradient-bg mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="8.5" cy="7" r="4" />
              <line x1="20" y1="8" x2="20" y2="14" />
              <line x1="23" y1="11" x2="17" y2="11" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Create account</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Start organizing your study materials
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card animate-fade-in-up delay-100 !p-8"
          style={{ animationFillMode: 'backwards' }}
        >
          {error && (
            <div className="mb-6 p-4 bg-[var(--color-error)]/10 border border-[var(--color-error)]/20">
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

          <div className="space-y-5">
            <div>
              <label htmlFor="signup-email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Email Address
              </label>
              <input
                id="signup-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-password" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Password
              </label>
              <input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Min. 6 characters"
                required
              />
            </div>

            <div>
              <label htmlFor="signup-confirm" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Confirm Password
              </label>
              <input
                id="signup-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full justify-center mt-8 !py-4 text-base disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[var(--color-text-secondary)] text-sm animate-fade-in-up delay-200" style={{ animationFillMode: 'backwards' }}>
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--color-primary)] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
