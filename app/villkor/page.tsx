"use client";

import React from 'react';
import { useLang } from '@/hooks/useLang';

const Villkor = () => {
  const { text } = useLang();

  // Stilobjekt för olika element
  const styles = {
    container: {
      textAlign: 'left',
      marginLeft: '5%',
      marginRight: '5%',
      fontFamily: 'Poppins', // Typsnitt för hela container
    },
    title: {
      color: '#6E2936',
      fontWeight: 'bold',
      fontSize: '2rem',
      marginBottom: '10px',
      marginTop: '20px',
      fontFamily: 'Poppins', // Typsnitt för titeln
    },
    subtitle: {
      color: '#6E2936',
      fontWeight: 'bold',
      fontSize: '1rem',
      marginBottom: '5px',
      marginTop: '20px',
      fontFamily: 'Poppins', // Typsnitt för underrubriker
    },
    text: {
      color: 'black',
      fontSize: '1rem',
      marginBottom: '5px',
      fontFamily: 'Poppins', // Typsnitt för brödtext
    },
    link: {
      color: 'inherit',
      textDecoration: 'underline',
      fontFamily: 'Poppins', // Typsnitt för länkar
    },
    lastText: {
      marginBottom: '40px', // Margin bottom för sista texten
    },
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      {/* Titel */}
      <h2 style={styles.title}>{text.terms.title}</h2>
      
      {/* Loop genom textobjektet och rendera mellanrubriker, brödtext och länkar */}
      {Object.keys(text.terms).map((key) => {
        if (key.startsWith('subtitle')) {
          const index = parseInt(key.substring(8));
          return (
            <React.Fragment key={key}>
              <p style={styles.subtitle}>{text.terms[key]}</p>
              {/* Placera texten och länken på samma rad */}
              <div style={styles.text}>
                <span>{text.terms['description' + index]}</span>
                {/* Placera länken till mejlen efter "på" */}
                {index === 5 && (
                  <React.Fragment>
                    <span> på </span>
                    <a href="mailto:hello@saveabl.se" style={styles.link}>
                      hello@saveabl.se
                    </a>
                    <span>.</span>
                  </React.Fragment>
                )}
                {/* Placera länken till integritetspolicyn efter "vår" */}
                {index === 8 && (
                  <React.Fragment>
                    <span> vår </span>
                    <a
                      href="https://www.saveabl.com/villkor/integritetspolicy"
                      style={styles.link}
                    >
                      integritetspolicy
                    </a>
                    <span>.</span>
                  </React.Fragment>
                )}
              </div>
            </React.Fragment>
          );
        }
        return null;
      })}
      {/* Lägg till marginBottom för sista texten */}
      <div style={styles.lastText}></div>
    </div>
  );
};

export default Villkor;







