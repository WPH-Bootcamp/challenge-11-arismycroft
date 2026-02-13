"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  Play,
  Pause,
  Shuffle,
  SkipBack,
  SkipForward,
  Repeat,
  Volume2,
  Music,
} from "lucide-react";

type PlayerState = "playing" | "paused" | "loading";
const BARS = Array.from({ length: 5 });

/* =======================
   VARIANTS
======================= */

const containerVariants = {
  playing: {
    boxShadow: `
      0 0 48px rgba(168,85,247,0.6),
      inset 0 1px 1px rgba(255,255,255,0.06),
      inset 0 -1px 1px rgba(0,0,0,0.6)
    `,
  },
  paused: {
    boxShadow: `
      0 16px 40px rgba(0,0,0,0.6),
      inset 0 1px 1px rgba(255,255,255,0.04),
      inset 0 -1px 1px rgba(0,0,0,0.5)
    `,
  },
  loading: {
    boxShadow: `
      inset 0 1px 1px rgba(255,255,255,0.04)
    `,
  },
};

const albumVariants = {
  playing: { scale: 1 },
  paused: { scale: 0.95 },
  loading: { scale: 0.9 },
};

const progressVariants = {
  playing: { backgroundColor: "#A855F7" },
  paused: { backgroundColor: "#6B7280" },
  loading: { backgroundColor: "#6B7280" },
};

/* =======================
   COMPONENT
======================= */

export function MusicPlayer() {
  const [state, setState] = useState<PlayerState>("paused");
  const [progress] = useState(0.35);
  const [volume] = useState(0.6);

  const togglePlay = async () => {
  if (state === "loading") return;

  const nextState: PlayerState =
    state === "playing" ? "paused" : "playing";

  setState("loading");

  await new Promise((r) => setTimeout(r, 500));

  setState(nextState);
};

  return (
    <div className="relative">
      {/* Ambient Glow – outer */}
<motion.div
  aria-hidden
  animate={{ opacity: state === "playing" ? 1 : 0 }}
  transition={{ duration: 0.3 }}
  className="absolute -inset-20 rounded-[40px] bg-purple-500/25 blur-[120px]"
/>

{/* Ambient Glow – contact */}
<motion.div
  aria-hidden
  animate={{ opacity: state === "playing" ? 1 : 0 }}
  transition={{ duration: 0.3 }}
  className="absolute -inset-6 rounded-[32px] bg-purple-500/30 blur-[40px]"
/>

      {/* Card */}
      <motion.div
        variants={containerVariants}
        animate={state}
        whileHover={{ y: -1 }}
        transition={{ duration: 0.3 }}
        className="relative w-[500px] h-[350px] bg-gradient-to-b from-[#161616] via-[#101010] to-[#0A0A0A] rounded-[20px] overflow-hidden px-16 py-14 flex flex-col gap-8 text-white will-change-transform"
      >
      <div
  aria-hidden
  className="
    pointer-events-none
    absolute inset-0
    rounded-[20px]
    bg-gradient-to-b
    from-white/8
    via-transparent
    to-black/60
  "
/>
        {/* ================= SONG INFO ================= */}
        <div className="flex gap-10">
          {/* Album */}
          <motion.div
            variants={albumVariants}
            animate={state}
            transition={{ type: "spring", duration: 0.3 }}
            className="
              w-[80px] h-[80px]
              rounded-[14px]
              bg-gradient-to-br from-[#A855F7] to-[#EC4899]
              shadow-[0_8px_24px_rgba(0,0,0,0.5)]
              flex items-center justify-center
              will-change-transform
              "
          >
            <motion.div
            className="w-9 h-9 will-change-transform"
            animate={state === "playing" ? { rotate: 360 } : { rotate: 0 }}
            transition={
            state === "playing"
            ? { duration: 20, ease: "linear", repeat: Infinity }
            : { duration: 0.3 }
          }
          >
          <img
          src="/icons/music-note-3d.png"
          alt="Music note"
          className="
          w-full h-full
          drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)]
          "
/>
</motion.div>
          </motion.div>

          {/* Text + Equalizer */}
          <div className="flex flex-col justify-center gap-1 flex-1">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Awesome Song Title</p>
              <p className="text-xs text-neutral-400">Amazing Artist</p>
            </div>

            {/* Equalizer */}
            <div className="flex items-end gap-2 h-12">
              {BARS.map((_, i) => (
                <motion.div
                  key={i}
                  animate={
                    state === "playing"
                      ? { height: ["20%", "100%"], opacity: 1 }
                      : state === "paused"
                      ? { height: "20%", opacity: 1 }
                      : { height: "50%", opacity: 0.5 }
                  }
                  transition={
                    state === "playing"
                      ? {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatType: "mirror",
                          ease: "easeInOut",
                          delay: i * 0.1,
                        }
                      : { duration: 0.3 }
                  }
                  className="w-[8px] bg-purple-500 origin-bottom will-change-transform"
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= PROGRESS ================= */}
        <div>
          <div className="h-[8px] bg-neutral-700 rounded-full overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent" />
            <motion.div
              variants={progressVariants}
              animate={state}
              transition={{ duration: 0.3 }}
              style={{ scaleX: progress }}
              className="h-full origin-left"
            />
          </div>
          <div className="flex justify-between text-[10px] text-neutral-500 mt-1">
            <span>1:23</span>
            <span>3:45</span>
          </div>
        </div>

        {/* ================= CONTROLS ================= */}
        <div className="flex justify-center items-center gap-9">
          <Shuffle size={12} className="text-neutral-400 hover:text-white active:scale-90 transition" />
          <SkipBack size={12} className="text-neutral-400 hover:text-white active:scale-90 transition" />

          <motion.button
            onClick={togglePlay}
            disabled={state === "loading"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shrink-0 disabled:bg-gray-500"
            aria-label="Play / Pause"
          >
            {state === "playing" ? (
              <Pause size={12} />
            ) : (
              <Play size={12} />
            )}
          </motion.button>

          <SkipForward size={12} className="text-neutral-400 hover:text-white active:scale-90 transition" />
          <Repeat size={12} className="text-neutral-400 hover:text-white active:scale-90 transition" />
        </div>

        {/* ================= VOLUME ================= */}
        <div className="flex items-center gap-6">
          <Volume2 size={12} className="text-neutral-400" />
          <motion.div
            className="flex-1 h-[2px] bg-neutral-700 rounded-full overflow-hidden"
            whileHover={{ backgroundColor: "#A855F7" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ scaleX: volume }}
              className="h-full bg-neutral-500 origin-left"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}