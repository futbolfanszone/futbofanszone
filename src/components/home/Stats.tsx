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
    <section
      ref={ref}
      className="border-y border-ice/10 bg-navy py-14"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-3 md:px-6">
        {ITEMS.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-chant text-5xl text-yellow md:text-6xl">
              <Counter end={item.end} suffix={item.suffix} active={inView} />
            </p>
            <p className="mt-2 text-sm uppercase tracking-[0.18em] text-ice/50">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
