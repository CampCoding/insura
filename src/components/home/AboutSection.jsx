import Reveal from "@/components/common/Reveal";

export default function AboutSection() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-surface">
      <div className="pointer-events-none absolute -left-40 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-tint blur-3xl" />
      <Reveal className="relative mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h2 className="text-4xl font-semibold text-foreground md:text-5xl">
          Who we are
        </h2>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Miras is a training platform built for physiotherapists and rehab
          specialists. Every course is designed with practicing doctors,
          structured around real clinical cases, and built so you can learn at
          your own pace, then apply it the same week in clinic.
        </p>
      </Reveal>
    </section>
  );
}
