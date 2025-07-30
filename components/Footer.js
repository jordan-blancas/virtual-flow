"use client";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>Virtual Flow Technologies LLC</span>
      <div className={styles.links}>
        <a className={styles.link} href="mailto:contacto@virtualflow.tech">Contacto</a>
        <a className={styles.link} href="/aviso-privacidad" target="_blank" rel="noopener noreferrer">Aviso de Privacidad</a>
        <a className={styles.link} href="https://www.linkedin.com/company/virtualflowtech" target="_blank" rel="noopener noreferrer">LinkedIn</a>
      </div>
      <div>
        &copy; {new Date().getFullYear()} Virtual Flow Technologies LLC. Todos los derechos reservados.
      </div>
    </footer>
  );
}