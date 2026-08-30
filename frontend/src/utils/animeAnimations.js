import { animate, createTimeline, stagger } from "animejs";

/**
 * Anime.js kinetic count-up animation for numeric stats
 */
export const animateCounter = (element, endValue, duration = 2000, prefix = "", suffix = "") => {
  if (!element) return;
  const obj = { value: 0 };
  const numericEnd = typeof endValue === "string" ? parseFloat(endValue.replace(/[^0-9.]/g, "")) || 0 : endValue;

  animate(obj, {
    value: numericEnd,
    round: numericEnd % 1 === 0 ? 1 : 10,
    ease: "outExpo",
    duration: duration,
    onUpdate: () => {
      if (element) {
        element.textContent = `${prefix}${obj.value.toLocaleString()}${suffix}`;
      }
    },
  });
};

/**
 * Anime.js staggered entrance for cards / grid items
 */
export const animateStaggerIn = (targets, delay = 100) => {
  if (!targets) return;
  animate(targets, {
    opacity: [0, 1],
    translateY: [40, 0],
    scale: [0.95, 1],
    delay: stagger(delay, { start: 100 }),
    duration: 800,
    ease: "outCubic",
  });
};

/**
 * Anime.js pulse ripple effect on clicks
 */
export const triggerAnimeRipple = (event, color = "rgba(99, 102, 241, 0.4)") => {
  const target = event.currentTarget;
  if (!target) return;

  const rect = target.getBoundingClientRect();
  const circle = document.createElement("span");
  const diameter = Math.max(rect.width, rect.height);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - rect.left - radius}px`;
  circle.style.top = `${event.clientY - rect.top - radius}px`;
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.backgroundColor = color;
  circle.style.pointerEvents = "none";
  circle.style.transform = "scale(0)";
  circle.style.zIndex = "10";

  target.style.position = target.style.position === "static" || !target.style.position ? "relative" : target.style.position;
  target.style.overflow = "hidden";
  target.appendChild(circle);

  animate(circle, {
    scale: [0, 2.5],
    opacity: [1, 0],
    duration: 600,
    ease: "outQuad",
    onComplete: () => {
      circle.remove();
    },
  });
};

/**
 * Anime.js 3D URL Compression animation
 */
export const animateUrlCompression = (longUrlEl, shortUrlEl, onComplete) => {
  if (!longUrlEl) {
    if (onComplete) onComplete();
    return;
  }

  const timeline = createTimeline({
    ease: "inOutQuad",
    onComplete: onComplete,
  });

  timeline
    .add(longUrlEl, {
      scaleX: [1, 0.1],
      opacity: [1, 0],
      duration: 450,
    })
    .add(shortUrlEl, {
      scale: [0.5, 1.1, 1],
      opacity: [0, 1],
      duration: 500,
      ease: "outBack",
    });
};

/**
 * Anime.js Floating idle loop for 3D badges
 */
export const animateFloatingIdle = (element, offsetY = 12, duration = 3000) => {
  if (!element) return;
  return animate(element, {
    translateY: [-offsetY / 2, offsetY / 2],
    alternate: true,
    loop: true,
    duration: duration,
    ease: "inOutSine",
  });
};
