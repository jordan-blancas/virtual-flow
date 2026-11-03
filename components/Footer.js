"use client";
import { FaWhatsapp } from "react-icons/fa6";
import styles from "./Footer.module.css";

export default function Footer() {
  const whatsappUrl = "https://wa.me/51908741120?text=Hola%2C%20Jordan.%20Llegu%C3%A9%20desde%20Virtual%20Flow%20y%20quiero%20conversar%20sobre%20c%C3%B3mo%20automatizar%20mi%20negocio.";

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
      <a className={styles.contactButton} href={whatsappUrl} target="_blank" rel="noreferrer">
        <FaWhatsapp aria-hidden="true" />
        Contacto
      </a>
      <div className={styles.copyrightSmall}>
        &copy; {new Date().getFullYear()} Virtual Flow Technologies, LLC. Todos los derechos reservados.
      </div>
    </footer>
  );
}