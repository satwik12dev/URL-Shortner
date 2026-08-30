import React from "react";
import { motion } from "framer-motion";
import { cn } from "../utils/cn";
import Tilt3DCard from "./3d/Tilt3DCard";

const Card = ({ title, desc, icon, badge, className }) => {
  return (
    <Tilt3DCard className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className={cn(
          "glass-panel glass-panel-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group relative overflow-hidden h-full",
          className
        )}
      >
        {/* Subtle top corner ambient glow */}
        <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-blue-500/10 via-indigo-500/5 to-transparent rounded-bl-full pointer-events-none group-hover:scale-125 transition-transform duration-500" />

        <div className="space-y-4 relative z-10">
          <div className="flex items-center justify-between">
            {icon && (
              <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-indigo-500/10 text-blue-600 dark:text-indigo-400 border border-blue-200 dark:border-indigo-500/20 flex items-center justify-center shadow-inner group-hover:bg-blue-600 dark:group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                {icon}
              </div>
            )}
            {badge && (
              <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/80">
                {badge}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-blue-600 dark:group-hover:text-indigo-300 transition-colors">
              {title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-normal">{desc}</p>
          </div>
        </div>

        <div className="mt-5 pt-3.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-indigo-400 opacity-75 group-hover:opacity-100 transition-opacity">
          <span>Explore feature &rarr;</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-indigo-400"></span>
        </div>
      </motion.div>
    </Tilt3DCard>
  );
};

export default Card;