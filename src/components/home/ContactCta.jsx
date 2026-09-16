import Button from "@/components/common/Button";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { buildWhatsAppLink } from "@/lib/site-data";

export default function ContactCta() {
  return (
    <Container as="section" className="py-20">
      <Reveal className="flex flex-col items-center gap-6 rounded-card border border-border bg-primary-tint px-6 py-14 text-center">
        <h2 className="max-w-2xl text-4xl font-semibold text-foreground md:text-5xl">
          Have a question about a course?
        </h2>
        <p className="max-w-md text-sm leading-6 text-muted-foreground">
          Message us directly on WhatsApp and we&apos;ll help you pick the right
          course.
        </p>
        <Button
          href={buildWhatsAppLink("Hi, I'd like to know more about the courses")}
          fillColor="#25D366"
        >
          Chat on WhatsApp
        </Button>
      </Reveal>
    </Container>
  );
}
