"use client";

import { useState } from "react";
import { Linkedin, Youtube } from "lucide-react";
import { motion } from "framer-motion";
import { BotMascot } from "./ui/BotMascot";

export function TeamShowcase() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <section className="py-20 px-4 text-center bg-white dark:bg-black text-black dark:text-white">
      <h2 className="text-3xl md:text-4xl font-bold mb-12">Unser Team</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-8 max-w-5xl mx-auto">
        {/* David */}
        <motion.div 
          onMouseEnter={() => setHovered("left")} 
          onMouseLeave={() => setHovered(null)} 
          className="transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl" />
              <img 
                src="https://i.postimg.cc/V66qXsmP/DSC02935-Photoroom-1.jpg" 
                alt="David" 
                className="relative rounded-full w-32 h-32 object-cover object-center mx-auto ring-2 ring-[#00dfff]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">David</h3>
            <p className="text-gray-600 dark:text-gray-400">KI-Entwicklung & Automatisierung</p>
            <div className="flex justify-center gap-4 mt-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gradient-to-r from-[#00dfff] to-[#A855F7] group transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gradient-to-r from-[#00dfff] to-[#A855F7] group transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* KI mit Persönlichkeit */}
        <div className="flex items-center justify-center">
          <BotMascot direction={hovered} />
        </div>

        {/* Daniel */}
        <motion.div 
          onMouseEnter={() => setHovered("right")} 
          onMouseLeave={() => setHovered(null)} 
          className="transition-all duration-300 hover:scale-105"
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="bg-white dark:bg-zinc-900 shadow-xl rounded-2xl p-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl" />
              <img 
                src="https://i.postimg.cc/TP5mP53F/DSC02935-Photoroom.jpg" 
                alt="Daniel" 
                className="relative rounded-full w-32 h-32 object-cover object-center mx-auto ring-2 ring-[#A855F7]"
              />
            </div>
            <h3 className="mt-4 text-lg font-semibold">Daniel</h3>
            <p className="text-gray-600 dark:text-gray-400">KI-Entwicklung & Automatisierung</p>
            <div className="flex justify-center gap-4 mt-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gradient-to-r from-[#00dfff] to-[#A855F7] group transition-all duration-300"
              >
                <Linkedin className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-gradient-to-r from-[#00dfff] to-[#A855F7] group transition-all duration-300"
              >
                <Youtube className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}