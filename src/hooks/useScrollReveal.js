import { useEffect, useRef } from "react";

export default function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold }
    );

    const children = el.querySelectorAll(".reveal");
    children.forEach((child) => observer.observe(child));
    if (el.classList.contains("reveal")) observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
