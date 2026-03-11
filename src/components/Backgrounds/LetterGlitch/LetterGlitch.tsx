/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { useEffect, useRef } from 'react';

const LETTERS_AND_SYMBOLS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
  '!', '@', '#', '$', '&', '*', '(', ')', '-', '_', '+', '=', '/',
  '[', ']', '{', '}', ';', ':', '<', '>', ',', '0', '1', '2', '3',
  '4', '5', '6', '7', '8', '9',
];

type LetterState = {
  char: string;
  color: string;
  targetColor: string;
  colorProgress: number;
};

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
}: {
  glitchColors: string[];
  glitchSpeed: number;
  centerVignette: boolean;
  outerVignette: boolean;
  smooth: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationRef = useRef<number | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const gridRef = useRef({ columns: 0, rows: 0 });
  const lastGlitchTimeRef = useRef(0);
  const isVisibleRef = useRef(true);
  const isInViewportRef = useRef(true);

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () =>
    LETTERS_AND_SYMBOLS[Math.floor(Math.random() * LETTERS_AND_SYMBOLS.length)];

  const getRandomColor = () =>
    glitchColors[Math.floor(Math.random() * glitchColors.length)];

  const hexToRgb = (hex: string) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const normalizedHex = hex.replace(shorthandRegex, (_match, r, g, b) => `${r}${r}${g}${g}${b}${b}`);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalizedHex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  };

  const interpolateColor = (
    start: { r: number; g: number; b: number },
    end: { r: number; g: number; b: number },
    factor: number
  ) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor),
    };

    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width: number, height: number) => ({
    columns: Math.ceil(width / charWidth),
    rows: Math.ceil(height / charHeight),
  });

  const initializeLetters = (columns: number, rows: number) => {
    const totalLetters = columns * rows;
    gridRef.current = { columns, rows };
    lettersRef.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1,
    }));
  };

  const drawLetters = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    if (!canvas || !context || lettersRef.current.length === 0) return;

    const { width, height } = canvas.getBoundingClientRect();
    context.clearRect(0, 0, width, height);
    context.font = `${fontSize}px monospace`;
    context.textBaseline = 'top';

    lettersRef.current.forEach((letter, index) => {
      const x = (index % gridRef.current.columns) * charWidth;
      const y = Math.floor(index / gridRef.current.columns) * charHeight;
      context.fillStyle = letter.color;
      context.fillText(letter.char, x, y);
    });
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = container.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (contextRef.current) {
      contextRef.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawLetters();
  };

  const updateLetters = () => {
    const letters = lettersRef.current;
    if (!letters.length) return;

    const updateCount = Math.max(1, Math.floor(letters.length * 0.05));

    for (let index = 0; index < updateCount; index += 1) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const currentLetter = letters[randomIndex];
      if (!currentLetter) continue;

      currentLetter.char = getRandomChar();
      currentLetter.targetColor = getRandomColor();

      if (!smooth) {
        currentLetter.color = currentLetter.targetColor;
        currentLetter.colorProgress = 1;
      } else {
        currentLetter.colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;

    lettersRef.current.forEach((letter) => {
      if (letter.colorProgress >= 1) return;

      letter.colorProgress += 0.05;
      if (letter.colorProgress > 1) {
        letter.colorProgress = 1;
      }

      const startRgb = hexToRgb(letter.color);
      const endRgb = hexToRgb(letter.targetColor);

      if (!startRgb || !endRgb) return;

      letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
      needsRedraw = true;
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const stopAnimation = () => {
    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  const animate = (timestamp: number) => {
    if (!isVisibleRef.current || !isInViewportRef.current) {
      animationRef.current = null;
      return;
    }

    if (timestamp - lastGlitchTimeRef.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTimeRef.current = timestamp;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  const startAnimation = () => {
    if (animationRef.current !== null || !isVisibleRef.current || !isInViewportRef.current) {
      return;
    }

    lastGlitchTimeRef.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    contextRef.current = canvas.getContext('2d');
    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isInViewportRef.current = entry.isIntersecting;

        if (entry.isIntersecting) {
          startAnimation();
          return;
        }

        stopAnimation();
      },
      {
        threshold: 0.05,
      }
    );

    intersectionObserver.observe(container);

    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';

      if (isVisibleRef.current) {
        startAnimation();
        return;
      }

      stopAnimation();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    handleVisibilityChange();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [glitchSpeed, smooth]);

  return (
    <div ref={containerRef} className="relative h-full min-h-[300px] w-full overflow-hidden bg-black sm:min-h-[400px]">
      <canvas ref={canvasRef} className="block h-full min-h-[300px] w-full sm:min-h-[400px]" />
      {outerVignette && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,_rgba(0,0,0,0)_60%,_rgba(0,0,0,1)_100%)]" />
      )}
      {centerVignette && (
        <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle,_rgba(0,0,0,0.8)_0%,_rgba(0,0,0,0)_60%)]" />
      )}
    </div>
  );
};

export default LetterGlitch;
