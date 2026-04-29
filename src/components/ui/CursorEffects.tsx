'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    alpha: number;
    size: number;
}

export default function CursorEffects() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { theme } = useTheme();
    const mouse = useRef({ x: 0, y: 0, active: false });
    const particles = useRef<Particle[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);
        resize();

        const handleMouseMove = (e: MouseEvent) => {
            mouse.current = { x: e.clientX, y: e.clientY, active: true };

            // Create particles on move
            for (let i = 0; i < 2; i++) {
                particles.current.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    alpha: 0.6,
                    size: Math.random() * 2 + 1
                });
            }
        };

        const handleMouseLeave = () => {
            mouse.current.active = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const isDark = theme === 'dark';
            const baseColor = isDark ? '255, 255, 255' : '100, 100, 100';
            const bloomColor = isDark ? '255, 255, 255' : '0, 0, 0';

            // Draw Bloom (Expanding Circle)
            if (mouse.current.active) {
                const gradient = ctx.createRadialGradient(
                    mouse.current.x, mouse.current.y, 0,
                    mouse.current.x, mouse.current.y, 400
                );
                gradient.addColorStop(0, `rgba(${bloomColor}, ${isDark ? 0.05 : 0.08})`);
                gradient.addColorStop(1, 'rgba(0,0,0,0)');
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            // Update & Draw Particles
            for (let i = 0; i < particles.current.length; i++) {
                const p = particles.current[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.01;
                p.size += 0.05;

                if (p.alpha <= 0) {
                    particles.current.splice(i, 1);
                    i--;
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${baseColor}, ${p.alpha * 0.5})`;
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [theme]);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
            style={{
                touchAction: 'none',
                opacity: 1
            }}
        />
    );
}
