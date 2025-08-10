"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      {/* <span className={styles.brand}>Virtual Flow Technologies, LLC</span> */}
      {/* <div className={styles.socials}>
        ...íconos aquí...
      </div> */}
      <div className={styles.copyrightSmall}>
        &copy; {new Date().getFullYear()} Virtual Flow Technologies, LLC. Todos los derechos reservados.
      </div>
    </footer>
  );
}