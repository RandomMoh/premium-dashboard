"use client"

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Github } from 'lucide-react';

export function GithubButton() {
    const buttonRef = useRef<HTMLAnchorElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const button = buttonRef.current;
        const content = contentRef.current;
        if (!button || !content) return;
        
        const xTo = gsap.quickTo(button, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const yTo = gsap.quickTo(button, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        
        const contentXTo = gsap.quickTo(content, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
        const contentYTo = gsap.quickTo(content, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });
        
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { height, width, left, top } = button.getBoundingClientRect();
            const x = clientX - (left + width / 2);
            const y = clientY - (top + height / 2);
            
            xTo(x * 0.4);
            yTo(y * 0.4);
            
            contentXTo(x * 0.1);
            contentYTo(y * 0.1);
        };
        
        const handleMouseLeave = () => {
            xTo(0);
            yTo(0);
            contentXTo(0);
            contentYTo(0);
        };
        
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
        
        return () => {
            button.removeEventListener("mousemove", handleMouseMove);
            button.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);
    
    return (
        <a 
            ref={buttonRef} 
            href="https://github.com/RandomMoh/premium-dashboard" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="fixed bottom-8 right-8 bg-foreground text-background px-6 py-4 rounded-full font-medium shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.05)] hover:scale-105 transition-all z-[100] flex items-center justify-center cursor-pointer will-change-transform border border-border"
        >
            <div ref={contentRef} className="pointer-events-none flex items-center gap-2 will-change-transform">
                <Github size={20} />
                <span>View on GitHub</span>
            </div>
        </a>
    );
}
