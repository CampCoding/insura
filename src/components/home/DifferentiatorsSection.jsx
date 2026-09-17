import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { unsplashUrl } from "@/lib/site-data";

const DIFFERENTIATORS = [
  {
    title: "No More Passive Watching",
    subheading: "A clear path, not random videos",
    description:
      "Every course follows one deliberate order: assessment, then protocol, then real cases. Each lesson builds on the one before it, so nothing gets left for you to piece together on your own.",
    image: "1785688193082-61936b9f1a50",
  },
  {
    title: "You'll Understand the Why",
    subheading: "The reasoning behind the protocol",
    description:
      "Any video can show you an exercise. We show you why it works on this patient and not the next one, so you can adapt it the day a real case doesn't match the textbook.",
    image: "1513224502586-d1e602410265",
  },
  {
    title: "Ready for Real Patients",
    subheading: "Case studies, not just theory",
    description:
      "Every course closes with real, messy clinical cases pulled from actual practice, worked through the same way you'll need to think on your first day back in clinic.",
    image: "1766325693394-138c599bd739",
  },
];

export default function DifferentiatorsSection() {
  return (
    <Container as="section" className="py-20">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl">
          What makes Insura different
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-16">
        {DIFFERENTIATORS.map((item, index) => {
          const isReversed = index % 2 === 1;
          return (
            <div
              key={item.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              <Reveal className={isReversed ? "lg:order-2" : ""}>
                <div className="relative aspect-video overflow-hidden rounded-card">
                  <Image
                    src={unsplashUrl(item.image, 900, 600)}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>

              <Reveal delay={100} className={isReversed ? "lg:order-1" : ""}>
                <p className="text-sm font-medium text-primary">
                  {item.subheading}
                </p>
                <h3 className="mt-2 text-xl font-semibold text-foreground sm:text-2xl md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted-foreground">
                  {item.description}
                </p>
              </Reveal>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
