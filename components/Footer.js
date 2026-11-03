"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.addresses}>
        <address className={styles.address}>
          <strong>Dirección postal</strong>
          <span>10501 Southwest 108th Avenue, apto. 210</span>
          <span>Miami, Florida 33176, Estados Unidos</span>
        </address>
        <address className={styles.address}>
          <strong>Dirección legal</strong>
          <span>651 N Broad St, suite 201</span>
          <span>Middletown, Delaware 19709, Estados Unidos</span>
        </address>
      </div>
      <div className={styles.copyrightSmall}>
        &copy; {new Date().getFullYear()} Virtual Flow Technologies, LLC. Todos los derechos reservados.
      </div>
    </footer>
  );
}