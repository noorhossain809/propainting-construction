// components/MotionDiv.tsx

"use client"; // This is still the most crucial part!

import { motion, Variants } from "framer-motion";
import React from "react";

// Define the types for the component's props
interface MotionDivProps {
  children: React.ReactNode;
  variants?: Variants; // The 'variants' prop is now typed and optional
}

export const MotionDiv: React.FC<MotionDivProps> = ({ children, variants }) => {
  // Define default variants if none are passed
  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={variants || defaultVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Only animates once
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
};