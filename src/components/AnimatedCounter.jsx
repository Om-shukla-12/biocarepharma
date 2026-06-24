import { useState, useEffect, useRef } from "react";

export default function AnimatedCounter({ target, duration = 1500, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target) || 0;
          if (num === 0) { setCount(target); return; }
          const step = Math.max(1, Math.floor(num / (duration / 16)));
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= num) { setCount(num); clearInterval(timer); }
            else setCount(current);
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  const num = parseInt(target);
  const display = num ? `${count}${suffix}` : target;

  return <span ref={ref}>{display}</span>;
}
