"use client";
import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Lock, LockOpen, Copy } from "lucide-react";
import { useTheme } from "next-themes";

export const TextRevealCard = ({
  text,
  revealText,
  children,
  className,
  handleCopyPhrase,
}) => {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [isRevealEnabled, setIsRevealEnabled] = useState(false);

  useEffect(() => {
    const updateBounds = () => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setLeft(rect.left);
      setLocalWidth(rect.width);
    };

    updateBounds();
    window.addEventListener("resize", updateBounds);
    return () => window.removeEventListener("resize", updateBounds);
  }, []);

  function mouseMoveHandler(event) {
    if (!isRevealEnabled) return;
    event.preventDefault();

    const { clientX } = event;
    if (cardRef.current) {
      const relativeX = clientX - left;
      const percentage = (relativeX / localWidth) * 100;
      setWidthPercentage(Math.min(100, Math.max(0, percentage)));
    }
  }

  function mouseLeaveHandler() {
    setIsMouseOver(false);
    setWidthPercentage(0);
  }
  function mouseEnterHandler() {
    if (!isRevealEnabled) return;
    setIsMouseOver(true);
  }
  function touchMoveHandler(event) {
    if (!isRevealEnabled) return;
    event.preventDefault();
    const clientX = event.touches[0].clientX;
    if (cardRef.current) {
      const relativeX = clientX - left;
      const percentage = (relativeX / localWidth) * 100;
      setWidthPercentage(Math.min(100, Math.max(0, percentage)));
    }
  }

  const rotateDeg = (widthPercentage - 50) * 0.1;
  return (
    <div
      className={cn(
        "bg-neutral-100 dark:bg-neutral-900 border border-black/10 dark:border-white/[0.08] w-full flex items-center justify-between rounded-2xl px-8 relative overflow-hidden",
        className,
      )}
    >
      <div
        onMouseEnter={mouseEnterHandler}
        onMouseLeave={mouseLeaveHandler}
        onMouseMove={mouseMoveHandler}
        onTouchStart={mouseEnterHandler}
        onTouchEnd={mouseLeaveHandler}
        onTouchMove={touchMoveHandler}
        ref={cardRef}
        className=" w-full"
      >
        {children}
        <div className="h-26  relative flex items-center overflow-hidden">
          <motion.div
            style={{
              width: "100%",
            }}
            initial={{
              opacity: 0,
              clipPath: "inset(0 100% 0 0)",
            }}
            animate={{
              opacity:
                isRevealEnabled && isMouseOver && widthPercentage > 0 ? 1 : 0,
              clipPath: isRevealEnabled
                ? `inset(0 ${100 - widthPercentage}% 0 0)`
                : "inset(0 100% 0 0)",
            }}
            transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
            className="absolute bg-neutral-100 dark:bg-neutral-900 z-20  will-change-transform pointer-events-none"
          >
            <p
              className="
                  text-base sm:text-[1.5rem] py-10 font-bold
                  bg-clip-text text-transparent
                  bg-linear-to-b from-neutral-900 dark:from-white to-neutral-500 dark:to-neutral-300
                "
            >
              {revealText}
            </p>
          </motion.div>
          <motion.div
            animate={{
              left: `${widthPercentage}%`,
              rotate: `${rotateDeg}deg`,
              opacity: isRevealEnabled && widthPercentage > 0 ? 1 : 0,
            }}
            transition={isMouseOver ? { duration: 0 } : { duration: 0.4 }}
            className="
                  h-40 w-[8px] absolute z-50 will-change-transform
                  bg-gradient-to-b
                  from-transparent
                  via-neutral-400 dark:via-neutral-800
                  to-transparent
                "
          ></motion.div>

          <div className=" overflow-hidden  [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
            <p className="text-base sm:text-[2rem] py-10 font-bold bg-clip-text text-transparent bg-neutral-400 dark:bg-[#323238]">
              {text}
              {isRevealEnabled && <span> (swipe left to right)</span>}
            </p>
          </div>
          <div>
            <MemoizedStars />
          </div>
        </div>
      </div>
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setIsRevealEnabled((prev) => !prev)}
        >
          {!isRevealEnabled ? <Lock /> : <LockOpen />}
        </Button>
        <Button variant="outline" size="icon" onClick={handleCopyPhrase}>
          <Copy />
        </Button>
      </div>
    </div>
  );
};

export const TextRevealCardTitle = ({ children, className }) => {
  return (
    <h2 className={twMerge("text-white text-lg mb-2", className)}>
      {children}
    </h2>
  );
};

export const TextRevealCardDescription = ({ children, className }) => {
  return (
    <p className={twMerge("text-[#a9a9a9] text-sm", className)}>{children}</p>
  );
};

const Stars = () => {
  const randomMove = () => Math.random() * 4 - 2;
  const randomOpacity = () => Math.random();
  const random = () => Math.random();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  const color = isDark ? "#a1a1a1" : "#323238";
  return (
    <div className="absolute inset-0">
      {[...Array(120)].map((_, i) => (
        <motion.span
          key={`star-${i}`}
          animate={{
            top: `calc(${random() * 100}% + ${randomMove()}px)`,
            left: `calc(${random() * 100}% + ${randomMove()}px)`,
            opacity: randomOpacity(),
            scale: [1, 1.2, 0],
          }}
          transition={{
            duration: random() * 10 + 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${random() * 100}%`,
            left: `${random() * 100}%`,
            width: `2px`,
            height: `2px`,
            backgroundColor: color,
            borderRadius: "50%",
            zIndex: 1,
          }}
          className="inline-block"
        ></motion.span>
      ))}
    </div>
  );
};

export const MemoizedStars = memo(Stars);
