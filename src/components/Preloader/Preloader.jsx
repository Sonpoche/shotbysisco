import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isMinimumTimeMet, setIsMinimumTimeMet] = useState(false);
  const [assetsLoaded, setAssetsLoaded] = useState(false);

  useEffect(() => {
    // Garantir une durée minimale d'affichage (1.5 secondes)
    const minimumDuration = 1500;
    const startTime = Date.now();
    
    // Timer pour la durée minimale
    const minimumTimer = setTimeout(() => {
      setIsMinimumTimeMet(true);
    }, minimumDuration);
    
    // Simuler le chargement progressif
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const targetProgress = Math.min((elapsed / minimumDuration) * 100, 100);
      
      setProgress(prev => {
        // Progression fluide vers la cible
        const diff = targetProgress - prev;
        const increment = Math.max(diff * 0.1, 0.5);
        const next = Math.min(prev + increment, 100);
        
        if (next >= 100) {
          clearInterval(interval);
        }
        
        return next;
      });
    }, 50);

    // Précharger les ressources critiques
    const preloadAssets = async () => {
      const criticalAssets = [
        '/fonts/BDMegalona-Italic.woff2',
        '/fonts/Rader.woff2',
      ];

      try {
        const promises = criticalAssets.map(async (src) => {
          return fetch(src).catch(() => null);
        });
        await Promise.all(promises);
      } catch (error) {
        console.log('Preload error:', error);
      } finally {
        setAssetsLoaded(true);
      }
    };

    preloadAssets();

    return () => {
      clearInterval(interval);
      clearTimeout(minimumTimer);
    };
  }, []);

  // Fermer seulement quand les deux conditions sont remplies
  useEffect(() => {
    if (isMinimumTimeMet && assetsLoaded && progress >= 100) {
      setTimeout(() => {
        setIsLoading(false);
        if (onComplete) onComplete();
      }, 500); // Délai pour la transition de sortie
    }
  }, [isMinimumTimeMet, assetsLoaded, progress, onComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Logo animé */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
              marginBottom: '60px',
              position: 'relative',
            }}
          >
            <motion.h1
              style={{
                fontFamily: 'BDMegalona, sans-serif',
                fontSize: 'clamp(3rem, 8vw, 6rem)',
                fontStyle: 'italic',
                color: 'transparent',
                background: 'linear-gradient(90deg, #ffffff 0%, #cccccc 50%, #ffffff 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                letterSpacing: '-0.04em',
                margin: 0,
                textTransform: 'lowercase',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              memento
            </motion.h1>
            
            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.7, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{
                fontFamily: 'Messina Sans Mono, monospace',
                fontSize: 'clamp(0.7rem, 2vw, 0.9rem)',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginTop: '10px',
                letterSpacing: '0.2em',
              }}
            >
              creating memorable stories
            </motion.p>
          </motion.div>

          {/* Barre de progression */}
          <div
            style={{
              width: '200px',
              height: '2px',
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '2px',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.8), transparent)',
                borderRadius: '2px',
              }}
              initial={{ x: '-100%', width: '100%' }}
              animate={{ x: `${progress - 100}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>

          {/* Pourcentage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5 }}
            style={{
              fontFamily: 'Messina Sans Mono, monospace',
              fontSize: '0.75rem',
              color: 'rgba(255, 255, 255, 0.4)',
              marginTop: '20px',
              letterSpacing: '0.1em',
            }}
          >
            {Math.round(progress)}%
          </motion.div>

          {/* Éléments décoratifs animés */}
          <div style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden', pointerEvents: 'none' }}>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                style={{
                  position: 'absolute',
                  width: '300px',
                  height: '300px',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  borderRadius: '50%',
                }}
                initial={{
                  scale: 0,
                  x: '50%',
                  y: '50%',
                  left: '50%',
                  top: '50%',
                }}
                animate={{
                  scale: [0, 4, 4],
                  opacity: [0.5, 0.15, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 1.2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Grain/texture subtile */}
          <div
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              opacity: 0.03,
              background: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
              pointerEvents: 'none',
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;