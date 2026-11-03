import React, { useEffect, useRef } from 'react';

const GLYPHS = ['∂', '∇', '∑', '∫', 'π', 'λ', '∞', 'φ', 'ψ', 'Ω', '×', '√', '≈', 'ℝ', 'θ'];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  glyph: string;
  alpha: number;
  phase: number;
}

export default function HeroParticles(): React.ReactElement {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let particles: Particle[] = [];
    let rafId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      width = parent.offsetWidth;
      height = parent.offsetHeight;
      canvas.width = width;
      canvas.height = height;
      const count = Math.min(36, Math.max(16, Math.floor(width / 38)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        size: 14 + Math.random() * 26,
        glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
        alpha: 0.06 + Math.random() * 0.14,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;
        const pulse = 0.5 + 0.5 * Math.sin(t * 2 + p.phase);
        ctx.globalAlpha = p.alpha * (0.6 + 0.4 * pulse);
        ctx.fillStyle = '#ffffff';
        ctx.font = `${p.size}px "Times New Roman", serif`;
        ctx.fillText(p.glyph, p.x, p.y);
      }
      // 细连接线,增强"知识网络"的意象
      ctx.globalAlpha = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 130 * 130) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      rafId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = '#ffffff';
        ctx.font = `${p.size}px "Times New Roman", serif`;
        ctx.fillText(p.glyph, p.x, p.y);
      }
    } else {
      rafId = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="heroParticles" aria-hidden="true" />;
}
