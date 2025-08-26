// src/components/FontPreloader/FontPreloader.js
import { useEffect } from 'react';

const FontPreloader = () => {
  useEffect(() => {
    // Fonction pour détecter iOS
    const isIOS = () => {
      return /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    };

    // Précharger la police BDMegalona
    const preloadFont = () => {
      const font = new FontFace(
        'BDMegalona',
        `url('/fonts/BDMegalona-Italic.woff2') format('woff2'),
         url('/fonts/BDMegalona-Italic.woff') format('woff'),
         url('/fonts/BDMegalona-Italic.ttf') format('truetype')`,
        {
          style: 'italic',
          weight: 'normal',
          display: 'swap'
        }
      );

      font.load().then((loadedFont) => {
        document.fonts.add(loadedFont);
        console.log('BDMegalona font loaded successfully');
        
        // Forcer un re-render sur iOS
        if (isIOS()) {
          document.body.style.fontFamily = document.body.style.fontFamily;
        }
      }).catch((error) => {
        console.error('Failed to load BDMegalona font:', error);
        
        // Fallback pour iOS
        if (isIOS()) {
          // Créer un élément temporaire pour forcer le chargement
          const testElement = document.createElement('div');
          testElement.style.fontFamily = 'BDMegalona, fantasy';
          testElement.style.fontStyle = 'italic';
          testElement.style.position = 'absolute';
          testElement.style.left = '-9999px';
          testElement.textContent = 'Font test';
          document.body.appendChild(testElement);
          
          setTimeout(() => {
            document.body.removeChild(testElement);
          }, 100);
        }
      });
    };

    // Attendre que le DOM soit chargé
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', preloadFont);
    } else {
      preloadFont();
    }

    // Cleanup
    return () => {
      document.removeEventListener('DOMContentLoaded', preloadFont);
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
};

export default FontPreloader;