import Image from "next/image";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { unsplashUrl } from "@/lib/site-data";

export default function ClinicalBand() {
  return (
    <section className="relative h-[420px] w-full overflow-hidden sm:h-[480px]">
      <Image
        src={unsplashUrl("1551601651-2a8555f1a136", 1920, 960)}
        alt="Surgeons performing a procedure in an operating room"
        fill
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f2747]/90 via-[#0f2747]/25 to-transparent" />
      <Reveal className="absolute inset-x-0 bottom-0 pb-10">
        <Container>
          <p className="max-w-xl text-xl font-medium leading-snug text-white md:text-2xl">
            Every course is built with specialists who are still in the
            operating room and the clinic, not just the classroom.
          </p>
        </Container>
      </Reveal>
    </section>
  );
}
