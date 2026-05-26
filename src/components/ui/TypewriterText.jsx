'use client';
import { useEffect, useState } from 'react';

export default function TypewriterText({ texts }) {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const target = texts[currentIndex];
    let timeout;
    if (isPaused) {
      timeout = setTimeout(() => setIsPaused(false), 1000);
    } else if (isDeleting) {
      if (currentText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex(i => (i + 1) % texts.length);
      } else {
        timeout = setTimeout(() => setCurrentText(t => t.slice(0, -1)), 50);
      }
    } else {
      if (currentText.length === target.length) {
        setIsPaused(true);
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      } else {
        timeout = setTimeout(
          () => setCurrentText(target.slice(0, currentText.length + 1)),
          80
        );
      }
    }
    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, texts]);

  return (
    <span>
      {currentText}
      <span
        className="inline-block w-0.5 h-7 ml-1 align-middle"
        style={{ background: '#5B5BFF', animation: 'blink 1s step-end infinite' }}
      />
    </span>
  );
}