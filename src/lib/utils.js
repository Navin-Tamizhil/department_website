import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// ✅ Merge Tailwind + conditional classes
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// ✅ Conditional class helper
export function cnd(condition, trueClass, falseClass = "") {
  return condition ? trueClass : falseClass;
}

// ✅ Merge base class with dynamic ones
export function withBaseClass(base, ...inputs) {
  return cn(base, ...inputs);
}

// ✅ Debounce (for search, inputs, resize events, etc.)
export function debounce(fn, delay = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// ✅ Throttle (limit function execution frequency)
export function throttle(fn, limit = 300) {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// ✅ String helper (capitalize first letter)
export function capitalize(str) {
  if (typeof str !== "string") return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

