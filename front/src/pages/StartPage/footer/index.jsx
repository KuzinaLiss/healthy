import React from "react";
import styles from "../footer/footer.module.scss";

export const Footer = () => {
    return (
      <div className={styles.footer_wrapper}>
        <div className={styles.footer_section_one}>
          <div className={styles.footer_logo_container}>
          <h1 className={styles.primary_heading}>HEALTHY</h1>
          </div>
          <div className={styles.footer_icons}>
        
          </div>
        </div>
        <div className={styles.footer_section_two}>
          <div className={styles.footer_section_columns}>
            <span>Qualtiy</span>
            <span>Help</span>
            <span>Share</span>
            <span>Carrers</span>
            <span>Testimonials</span>
            <span>Work</span>
          </div>
          <div className={styles.footer_section_columns}>
            <span>244-5333-7783</span>
            <span>hello@healthy.com</span>
            <span>press@healthy.com</span>
            <span>contact@healthy.com</span>
          </div>
          <div className={styles.footer_section_columns}>
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    );
  };