"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/lib/auth-context";
import styles from "./dashboard-screen.module.css";

export function DashboardScreen() {
  const router = useRouter();
  const { user, logout, isReady } = useAuth();

  useEffect(() => {
    if (isReady && !user) {
      router.replace("/login");
    }
  }, [isReady, router, user]);

  if (!isReady || !user) {
    return null;
  }

  return (
    <div className={styles.page}>
      <main className={styles.shell}>
        <section className={styles.hero}>
          <div>
            <span className={styles.eyebrow}>Authenticated</span>
            <h1 className={styles.title}>
              Welcome back, <span>{user.name}</span>.
            </h1>
            <p className={styles.body}>
              Your login flow is live. Add new pages under <code>apps/web/app</code> and link them
              from here as your project grows.
            </p>
          </div>

          <button
            className={styles.logout}
            type="button"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            Log out
          </button>
        </section>

        <section className={styles.grid}>
          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Starter routes</h2>
            <ol className={styles.list}>
              <li>/login for signing in with the demo or a created account.</li>
              <li>/signup for account creation.</li>
              <li>/forgot-password for recovery UX.</li>
              <li>/dashboard as the first protected page.</li>
            </ol>
          </article>

          <article className={styles.panel}>
            <h2 className={styles.panelTitle}>Next pages to add</h2>
            <div className={styles.tileGrid}>
              <div className={styles.tile}>
                <strong>Profile</strong>
                <span className={styles.muted}>User details and editable preferences.</span>
              </div>
              <div className={styles.tile}>
                <strong>Requests</strong>
                <span className={styles.muted}>Core workflow page for your project.</span>
              </div>
              <div className={styles.tile}>
                <strong>Notifications</strong>
                <span className={styles.muted}>Status updates and alerts.</span>
              </div>
              <div className={styles.tile}>
                <strong>Settings</strong>
                <span className={styles.muted}>App-level configuration and logout.</span>
              </div>
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}
