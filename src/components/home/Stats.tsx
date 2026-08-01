const ITEMS = [
  { label: "Platforms", value: "3" },
  { label: "Weekly shows", value: "3+" },
  { label: "Fan-first focus", value: "100%" },
];

export function Stats() {
  return (
    <section className="border-y border-ice/10 bg-navy py-8 md:py-14">
      <div className="mx-auto grid max-w-6xl grid-cols-3 px-2 md:px-6">
        {ITEMS.map((item) => (
          <div
            key={item.label}
            className="border-l border-ice/10 px-2 text-center first:border-l-0 md:px-6"
          >
            <p className="font-chant text-3xl leading-none text-yellow sm:text-4xl md:text-6xl">
              {item.value}
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
