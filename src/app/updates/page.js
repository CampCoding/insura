import { Image as ImageIcon, FileText } from "lucide-react";
import Container from "@/components/common/Container";
import Reveal from "@/components/common/Reveal";
import { UPDATES } from "@/lib/site-data";

export const metadata = {
  title: "Announcements | Insura",
  description: "Latest announcements and attachments from Insura.",
};

const ATTACHMENT_ICON = {
  image: ImageIcon,
  pdf: FileText,
};

export default function UpdatesPage() {
  return (
    <Container as="section" className="py-16">
      <Reveal className="max-w-2xl">
        <h1 className="text-3xl font-semibold text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          Announcements
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground">
          Announcements, posters and attachments shared by the Insura team.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {UPDATES.map((update, index) => {
          const AttachmentIcon = ATTACHMENT_ICON[update.attachment?.type];
          return (
            <Reveal
              key={update.id}
              delay={index * 90}
              className="rounded-card border border-border bg-surface p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg"
              as="article"
            >
              <time className="text-xs font-medium text-muted-foreground">
                {update.date}
              </time>
              <h2 className="mt-2 text-lg font-semibold text-foreground">
                {update.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {update.body}
              </p>

              {update.attachment && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-tint px-3 py-1.5 text-xs font-medium text-primary">
                  <AttachmentIcon size={14} />
                  {update.attachment.label}
                </div>
              )}
            </Reveal>
          );
        })}
      </div>
    </Container>
  );
}
