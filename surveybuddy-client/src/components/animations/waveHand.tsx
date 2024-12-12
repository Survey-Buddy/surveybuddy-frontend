import React from "react";
import { motion } from "framer-motion";

function WaveHand() {
  return (
    <motion.div
      style={{ display: "inline-block", fontSize: "3rem" }}
      animate={{
        rotate: [0, 20, 0, -20, 0], // Rotates back and forth
      }}
      transition={{
        duration: 2, // 2 seconds for one wave cycle
        repeat: Infinity, // Loops forever
      }}
    >
      👋
    </motion.div>
  );
}

export default WaveHand;
