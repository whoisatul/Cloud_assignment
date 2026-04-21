"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err: unknown) {
      const firebaseError = err as { code?: string };
      if (firebaseError.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (firebaseError.code === "auth/wrong-password" || firebaseError.code === "auth/invalid-credential") {
        setError("Incorrect password. Please try again.");
      } else if (firebaseError.code === "auth/invalid-email") {
        setError("Please enter a valid email address.");
      } else {
        setError("Failed to log in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 relative">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[20%] w-[400px] h-[400px] bg-[var(--color-primary)] opacity-[0.06] rounded-full blur-[100px]" />
        <div className="absolute bottom-[10%] left-[20%] w-[300px] h-[300px] bg-[var(--color-accent)] opacity-[0.04] rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative">
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="w-16 h-16 gradient-bg mx-auto mb-4 flex items-center justify-center animate-pulse-glow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-[var(--color-text-secondary)] mt-2">
            Log in to access your study materials
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
              <label htmlFor="login-email" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Email Address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-[var(--color-text-secondary)] mb-2">
                Password
              </label>
              <input
                id="login-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                Logging in...
              </>
            ) : (
              "Log In"
            )}
          </button>
        </form>

        <p className="text-center mt-6 text-[var(--color-text-secondary)] text-sm animate-fade-in-up delay-200" style={{ animationFillMode: 'backwards' }}>
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-[var(--color-primary)] font-semibold hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
