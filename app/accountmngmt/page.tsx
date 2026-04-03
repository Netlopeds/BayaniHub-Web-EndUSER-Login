"use client";

import React from 'react';
import Image from 'next/image';
import styles from './account-management.module.css';

export default function AccountManagement() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        {/* Header Section */}
        <header className={styles.header}>
          <div className={styles.profileSide}>
            <div className={styles.avatarContainer}>
              <Image 
                src="/images/avatar-placeholder.png" 
                alt="John Doenette" 
                width={80} 
                height={80} 
                className={styles.avatar}
              />
            </div>
            <div className={styles.profileInfo}>
              <h1>John Doenette</h1>
              <p>JoeDoenette@gmail.com</p>
            </div>
          </div>
          <button className={styles.saveButtonTop}>Save</button>
        </header>

        {/* General Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>General Information</div>
          <div className={styles.grid}>
            <div className={styles.formField}>
              <label className={styles.label}>Full Name</label>
              <input type="text" className={styles.input} defaultValue="John Doenette" />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Gender</label>
              <input type="text" className={styles.input} defaultValue="Female" />
            </div>
            <div className={styles.formField}>
              <label className={styles.label}>Date of Birth</label>
              <input type="text" className={styles.input} placeholder="MM/DD/YYYY" />
            </div>
            <div className={`${styles.formField} ${styles.fullWidth}`}>
              <label className={styles.label}>Home Address</label>
              <input type="text" className={styles.input} />
            </div>
          </div>
        </section>

        {/* Contact Information */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>Contact Information</div>
          <div className={styles.grid}>
            <div className={styles.formField}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Email Address</label>
                <button className={styles.addButton}>+Add Email</button>
              </div>
              <input type="email" className={styles.input} defaultValue="JohnDoenette@gmail.com" />
            </div>
            <div className={styles.formField}>
              <div className={styles.labelRow}>
                <label className={styles.label}>Phone Number</label>
                <button className={styles.addButton}>+Add Phone Number</button>
              </div>
              <input type="tel" className={styles.input} defaultValue="09635787333" />
            </div>
          </div>
        </section>

        {/* Family Management */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>Family Management</div>
          <button className={styles.fullWidthButton}>+Add Family Member</button>
        </section>

        {/* Security */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>Security</div>
          <div className={styles.formField}>
            <label className={styles.label}>Password</label>
            <div className={styles.securityRow}>
              <input type="password" className={styles.input} defaultValue="************" />
              <button className={styles.actionButton}>Change Password</button>
            </div>
          </div>
        </section>

        {/* Footer Buttons */}
        <footer className={styles.footer}>
          <button className={styles.cancelButton}>Cancel</button>
          <button className={styles.saveButtonBottom}>Save</button>
        </footer>
      </div>
    </main>
  );
}
