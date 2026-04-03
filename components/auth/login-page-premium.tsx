/**
 * Damayan - Desktop Login Page
 * Next.js TSX + CSS Modules
 * CI/CD Ready | Production Grade
 */

'use client';

import React, { useState, useCallback, FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoginFormState {
  email: string;
  password: string;
  showPassword: boolean;
}

interface LoginPageProps {
  onLogin?: (email: string, password: string) => Promise<void>;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage({ onLogin }: LoginPageProps) {
  const [form, setForm] = useState<LoginFormState>({
    email: '',
    password: '',
    showPassword: false,
  });
  const [errors, setErrors] = useState<Partial<Pick<LoginFormState, 'email' | 'password'>>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  // ── Validation ──────────────────────────────────────────────────────────────

  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address';
    }
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setServerError(null);
      if (!validate()) return;
      setIsLoading(true);
      try {
        await onLogin?.(form.email.trim(), form.password);
      } catch (err) {
        setServerError('Invalid credentials. Please try again.');
      } finally {
        setIsLoading(false);
      }
    },
    [form.email, form.password, onLogin]
  );

  const handleFieldChange =
    (field: keyof Pick<LoginFormState, 'email' | 'password'>) =>
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [field]: e.target.value }));
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
      };

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <>
      <style>{css}</style>
      <div className="page">
        {/* Background blobs */}
        <div className="blob blob--top" aria-hidden="true" />
        <div className="blob blob--bottom" aria-hidden="true" />

        <main className="card-wrapper" role="main">
          {/* Logo */}
          <div className="logo-ring" aria-hidden="true" />
          <Image
            src="https://placehold.co/120x120"
            alt="Bayanihub logo"
            width={280}
            height={280}
            className="logo-img"
            priority
          />

          <div className="card">
            <p className="welcome-sub">Welcome to</p>
            <h1 className="brand">DAMAYAN</h1>
            <h2 className="login-title">LOGIN</h2>

            {serverError && (
              <div className="server-error" role="alert">
                {serverError}
              </div>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className="field">
                <input
                  id="email"
                  type="email"
                  className={`input${errors.email ? ' input--error' : ''}`}
                  placeholder="Email"
                  value={form.email}
                  onChange={handleFieldChange('email')}
                  autoComplete="email"
                  aria-label="Email address"
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                />
                {errors.email && (
                  <span id="email-error" className="field-error" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="field">
                <div className={`password-wrapper${errors.password ? ' input--error' : ''}`}>
                  <input
                    id="password"
                    type={form.showPassword ? 'text' : 'password'}
                    className="input input--password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleFieldChange('password')}
                    autoComplete="current-password"
                    aria-label="Password"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'password-error' : undefined}
                  />
                  <button
                    type="button"
                    className="toggle-pw"
                    onClick={() => setForm((p) => ({ ...p, showPassword: !p.showPassword }))}
                    aria-label={form.showPassword ? 'Hide password' : 'Show password'}
                  >
                    {form.showPassword ? '🙈' : '👁'}
                  </button>
                </div>
                {errors.password && (
                  <span id="password-error" className="field-error" role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Forgot Password */}
              <Link href="/forgot-password" className="forgot">
                Forgot Password?
              </Link>

              {/* Submit */}
              <button type="submit" className="btn-login" disabled={isLoading}>
                {isLoading ? <span className="spinner" aria-label="Loading" /> : 'Login'}
              </button>
            </form>

            {/* OR Divider */}
            <div className="divider" aria-hidden="true">
              <span className="divider__line" />
              <span className="divider__text">OR</span>
              <span className="divider__line" />
            </div>

            {/* Social Login */}
            <div className="social-row" role="group" aria-label="Social login options">
              <button className="social-btn" type="button" aria-label="Login with Google">
                <span className="social-icon google">G</span>
              </button>
              <button className="social-btn" type="button" aria-label="Login with Apple">
                <span className="social-icon apple"></span>
              </button>
              <button className="social-btn" type="button" aria-label="Login with Facebook">
                <span className="social-icon facebook">f</span>
              </button>
            </div>

            {/* Sign Up */}
            <p className="signup-row">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

// ─── Inline CSS (move to LoginPage.module.css or globals.css in real project) ──

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,600;1,300&family=Onest:wght@500;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .page {
    position: relative;
    min-height: 100vh;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    font-family: 'Poppins', sans-serif;
  }

  /* Blobs */
  .blob {
    position: absolute;
    width: 1856px;
    height: 864px;
    border-radius: 9999px;
    background: #FFC300;
    pointer-events: none;
    z-index: 0;
  }
  .blob--top  { top: -527px; left: -287px; }
  .blob--bottom { bottom: -380px; left: -287px; }

  /* Card wrapper */
  .card-wrapper {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* Logo */
  .logo-ring {
    width: 200px;
    height: 200px;
    border-radius: 9999px;
    background: #5E70DC; /* The new color for the old "yellow circle" */
    position: absolute;
    top: -15px;
    z-index: 2;
  }
  .logo-img {
    width: 170px;
    height: 170px;
    border-radius: 9999px;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    position: relative;
    z-index: 3;
    margin-bottom: -85px;
    background: #4A61DD; /* "same blue color as it" (the logo blue) */
    border: 8px solid #4A61DD; /* Replaces the white circle with blue */
  }

  /* Card */
  .card {
    background: #fff;
    border-radius: 24px;
    box-shadow: 0 4px 20px 4px rgba(0,0,0,0.15);
    width: 505px;
    padding: 80px 60px 36px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    z-index: 2;
  }

  .welcome-sub {
    font-size: 20px;
    font-style: italic;
    font-weight: 275;
    color: #000;
    margin-bottom: 4px;
  }
  .brand {
    font-size: 64px;
    font-family: 'Onest', sans-serif;
    font-weight: 400;
    color: #FFC300;
    letter-spacing: 3px;
    line-height: 1;
    margin-bottom: 4px;
  }
  .login-title {
    font-size: 24px;
    font-family: 'Onest', sans-serif;
    font-weight: 500;
    color: #000;
    margin-bottom: 20px;
  }

  /* Server error */
  .server-error {
    width: 100%;
    background: #fff0f0;
    border: 1px solid #ff4444;
    color: #cc0000;
    font-size: 13px;
    border-radius: 10px;
    padding: 8px 14px;
    margin-bottom: 12px;
    text-align: center;
  }

  /* Form */
  .form {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
  .field {
    width: 100%;
    margin-bottom: 14px;
  }
  .input {
    width: 100%;
    height: 43px;
    border-radius: 15px;
    border: 1px solid #A9A9A9;
    padding: 0 16px;
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
    color: #000;
    background: transparent;
    outline: none;
    transition: border-color 0.2s;
  }
  .input:focus { border-color: #FFC300; }
  .input--error { border-color: #ff4444 !important; }
  .input--password { border: none; outline: none; flex: 1; background: transparent; font-size: 13px; font-family: 'Poppins', sans-serif; color: #000; }
  .password-wrapper {
    display: flex;
    align-items: center;
    height: 43px;
    border-radius: 15px;
    border: 1px solid #A9A9A9;
    padding: 0 12px 0 16px;
    transition: border-color 0.2s;
  }
  .password-wrapper:focus-within { border-color: #FFC300; }
  .toggle-pw {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 16px;
    padding: 4px;
    opacity: 0.6;
    transition: opacity 0.2s;
  }
  .toggle-pw:hover { opacity: 1; }
  .field-error {
    display: block;
    color: #ff4444;
    font-size: 11px;
    margin-top: 4px;
    margin-left: 4px;
  }

  /* Forgot */
  .forgot {
    align-self: flex-start;
    font-size: 11px;
    font-weight: 600;
    color: #B58A00;
    text-decoration: none;
    margin-bottom: 16px;
  }
  .forgot:hover { text-decoration: underline; }

  /* Login Button */
  .btn-login {
    width: 180px;
    height: 40px;
    background: #FFC300;
    border: none;
    border-radius: 15px;
    color: #fff;
    font-size: 16px;
    font-family: 'Onest', sans-serif;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.1s;
    margin-bottom: 12px;
  }
  .btn-login:hover:not(:disabled) { background: #e6b000; }
  .btn-login:active:not(:disabled) { transform: scale(0.98); }
  .btn-login:disabled { opacity: 0.7; cursor: not-allowed; }

  /* Spinner */
  .spinner {
    width: 18px;
    height: 18px;
    border: 2px solid rgba(255,255,255,0.4);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Divider */
  .divider {
    display: flex;
    align-items: center;
    width: 80%;
    margin: 8px 0;
    gap: 12px;
  }
  .divider__line {
    flex: 1;
    height: 1px;
    background: rgba(0,0,0,0.4);
  }
  .divider__text {
    font-size: 13px;
    color: #000;
  }

  /* Social */
  .social-row {
    display: flex;
    gap: 12px;
    margin-top: 8px;
  }
  .social-btn {
    width: 49.54px;
    height: 50px;
    background: #FAF6EB;
    border: 0.5px solid #FFC300;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s, transform 0.1s;
  }
  .social-btn:hover { background: #fff3cc; }
  .social-btn:active { transform: scale(0.96); }
  .social-icon {
    font-size: 18px;
    font-weight: 700;
    line-height: 1;
  }
  .google { color: #EA4335; }
  .apple  { color: #000; }
  .facebook { color: #4285F4; }

  /* Sign up */
  .signup-row {
    margin-top: 18px;
    font-size: 11px;
    font-weight: 300;
    color: #000;
  }
  .signup-link {
    font-weight: 600;
    color: #B58A00;
    text-decoration: none;
  }
  .signup-link:hover { text-decoration: underline; }

  /* Responsive */
  @media (max-width: 600px) {
    .card { width: 90vw; padding: 70px 28px 28px; }
    .brand { font-size: 44px; }
  }
`;
