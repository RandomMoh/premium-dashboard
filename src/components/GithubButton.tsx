"use client"

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>View on GitHub</span>
            </div>
        </a>
    );
}
