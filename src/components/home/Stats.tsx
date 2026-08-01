"use client";

import { useEffect, useRef, useState } from "react";

const ITEMS = [
  { label: "Platforms", end: 3, suffix: "" },
  { label: "Weekly shows", end: 3, suffix: "+" },
  { label: "Fan-first focus", end: 100, suffix: "%" },
];

function useInView(ref: React.RefObject<HTMLElement | null>) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);
  return inView;
}

function Counter({
  end,
  suffix,
  active,
}: {
  end: number;
  suffix: string;
  active: boolean;
}) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const total = 36;
    const id = window.setInterval(() => {
      frame += 1;
      setValue(Math.round((end * frame) / total));
      if (frame >= total) window.clearInterval(id);
    }, 28);
    return () => window.clearInterval(id);
  }, [active, end]);
  return (
    <span>
      {value}
      {suffix}
    </span>
  );
}

export function Stats() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);

  return (
    <section ref={ref} className="border-y border-ice/10 bg-navy py-8 md:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-3 px-2 md:px-6">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="border-l border-ice/10 px-2 text-center first:border-l-0 md:px-6"
          >
            <p className="font-chant text-3xl leading-none text-yellow sm:text-4xl md:text-6xl">
              <Counter end={item.end} suffix={item.suffix} active={inView} />
            </p>
            <p className="mt-2 text-[9px] font-medium uppercase leading-tight tracking-[0.13em] text-ice/55 sm:text-xs md:text-sm md:tracking-[0.18em]">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
