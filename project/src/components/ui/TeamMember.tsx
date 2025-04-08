import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TeamMemberProps {
  name: string;
  role: string;
  subtitle?: string;
  image?: string;
  className?: string;
}

export function TeamMember({ 
  name, 
  role,
  subtitle,
  image,
  className 
}: TeamMemberProps) {
  return (
    <motion.div 
      className={cn(
        "flex flex-col items-center p-4 md:p-8 rounded-2xl bg-white shadow-lg border border-gray-100 h-full",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative mb-4 md:mb-6 group"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
        
        {/* Image */}
        <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-[#00dfff]/20">
          <img
            src={image || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{name}</h3>
        <p className="text-sm md:text-base text-gray-800 font-medium mb-1">
          <span className="hidden md:inline">{role}</span>
          <span className="md:hidden">Entwicklung</span>
        </p>
        {subtitle && (
          <p className="text-xs md:text-sm text-gray-600">
            <span className="hidden md:inline">{subtitle}</span>
            <span className="md:hidden">Tech</span>
          </p>
        )}
      </div>
    </motion.div>
  );
}