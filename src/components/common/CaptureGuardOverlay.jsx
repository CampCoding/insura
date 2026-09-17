import { ShieldAlert } from "lucide-react";

export default function CaptureGuardOverlay({ show }) {
  if (!show) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/95 backdrop-blur-md">
      <ShieldAlert size={26} className="text-muted-foreground" strokeWidth={1.75} />
      <p className="text-sm font-medium text-muted-foreground">
        Content hidden while unfocused
      </p>
    </div>
  );
}
