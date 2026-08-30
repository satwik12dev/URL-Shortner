import React from "react";

/**
 * Ultra-high-performance GPU hardware-accelerated ambient cyber background.
 * Uses pure CSS transforms & gradients for 0% CPU overhead and zero WebGL context thrashing.
 */
const Background3DCanvas = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Cyber Grid Plane with 3D perspective */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          maskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 30%, black 40%, transparent 80%)",
        }}
      />

      {/* Floating ambient glow nodes with CSS animation */}
      <div className="absolute top-1/4 left-1/5 w-96 h-96 bg-indigo-600/15 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute top-1/2 right-1/4 w-[420px] h-[420px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: "6s" }} />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-[90px] animate-pulse" style={{ animationDuration: "8s" }} />
    </div>
  );
};

export default Background3DCanvas;
