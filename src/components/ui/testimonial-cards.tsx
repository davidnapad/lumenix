import React, { useState, useRef } from "react";
import { motion, PanInfo, useMotionValue, useTransform, useAnimation } from "framer-motion";

export interface TestimonialCardProps {
  testimonial: string;
  author: string;
  id: number;
  onVote: (direction: number) => void;
}

export function TestimonialCard({ testimonial, author, id, onVote }: TestimonialCardProps) {
  const cardElem = useRef<HTMLDivElement>(null);
  
  // Motion values for drag behavior
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-10, 0, 10]);
  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0, 1, 1, 1, 0]);
  
  // Animation controls
  const controls = useAnimation();
  
  // Handle drag end
  const handleDragEnd = async (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 100) {
      await controls.start({ x: 500, opacity: 0, transition: { duration: 0.5 } });
      onVote(1);
    } else if (info.offset.x < -100) {
      await controls.start({ x: -500, opacity: 0, transition: { duration: 0.5 } });
      onVote(-1);
    } else {
      controls.start({ x: 0, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 20 } });
    }
  };

  return (
    <motion.div
      ref={cardElem}
      className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing will-change-transform"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      whileTap={{ scale: 0.98 }}
    >
      <div className="relative w-full max-w-[480px] p-6 rounded-xl bg-slate-800/75 backdrop-blur-sm border border-slate-700 shadow-xl transform-gpu">
        {/* Avatar image */}
        <div className="flex gap-4">
          <div className="shrink-0">
            <img
              src={`https://i.pravatar.cc/128?img=${id}`}
              alt={`Avatar for ${author}`}
              className="h-12 w-12 rounded-full border-2 border-slate-700 object-cover"
              loading="lazy"
            />
          </div>
          
          <div className="flex-1">
            {/* Quote */}
            <blockquote className="text-slate-50 text-base mb-3">
              "{testimonial}"
            </blockquote>
            
            {/* Author */}
            <p className="text-slate-300 text-sm">— {author}</p>
          </div>
        </div>
        
        {/* Swipe indicator */}
        <div className="absolute bottom-2 right-2 flex items-center text-xs text-slate-400">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 opacity-70">
            <path d="M14 16L18 12M18 12L14 8M18 12H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Swipe
        </div>
      </div>
    </motion.div>
  );
}