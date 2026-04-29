'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import dudukPng from '@/assets/dudukpng.png';
import { useState, useRef, MouseEvent } from 'react';

// The Interactive Spotlight Image Component
function SpotlightImage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
  
    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setPosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
  
    return (
      <div 
        ref={containerRef}
        className="relative w-full max-w-md h-[400px] md:h-[500px] mx-auto flex justify-center group cursor-crosshair mt-8 lg:mt-0 overflow-hidden rounded-3xl border border-border/40 bg-muted/10 shadow-lg"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Base Image: Grayscale */}
        <Image 
          src={dudukPng} 
          alt="Antigravity Profile Base" 
          fill
          className="object-cover object-top filter grayscale transition-transform duration-700 group-hover:scale-[1.03]"
          priority
        />
        
        {/* Colored Overlay Image with Radial Mask */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            WebkitMaskImage: `radial-gradient(circle 250px at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
            maskImage: `radial-gradient(circle 250px at ${position.x}px ${position.y}px, black 30%, transparent 80%)`,
          }}
        >
          <Image 
            src={dudukPng} 
            alt="Antigravity Profile Colored" 
            fill
            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            priority
          />
        </div>
      </div>
    );
}

export default function AboutPage() {
    return (
        <div className="w-full py-12 md:py-16">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
                
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex-1 w-full"
                >
                    <span className="text-muted-foreground text-xs uppercase tracking-widest mb-4 block font-semibold">
                        Detail &mdash; 01
                    </span>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 uppercase drop-shadow-sm leading-none">
                        About <br/><span className="text-primary italic">Me</span>
                    </h1>

                    <div className="space-y-6 text-lg md:text-xl text-foreground font-light leading-relaxed border-l-4 border-primary pl-6">
                        <p>
                            I am a dedicated Full-Stack Developer with a passion for creating immersive digital experiences. My approach combines technical rigor with a keen eye for design, ensuring that every project is not only functional but also emotionally resonant.
                        </p>
                        <p>
                            With years of experience in the modern web ecosystem, I've mastered tools like React, Next.js, and Node.js. I believe in continuous learning and often spend my time experimenting with new frameworks or contributing to open-source projects.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 mt-12 border-t border-border/50">
                        <div>
                            <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-primary">The Vision</h3>
                            <p className="text-muted-foreground text-base">To build software that feels like an extension of the user's intent—invisible, intuitive, and incredibly powerful.</p>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold mb-2 uppercase tracking-widest text-primary">The Method</h3>
                            <p className="text-muted-foreground text-base">Strict adherence to clean code, performance optimization, and user-centric design principles.</p>
                        </div>
                    </div>
                </motion.div>

                {/* The large interactive framed photo takes up the right half of the about page */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="flex-1 w-full flex justify-center"
                >
                    <SpotlightImage />
                </motion.div>

            </div>
        </div>
    );
}
