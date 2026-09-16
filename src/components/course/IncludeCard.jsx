export default function IncludeCard({ icon: Icon, title, description, compact, filled }) {
  return (
    <div
      className={`group rounded-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        compact ? "p-5" : "p-6"
      } ${
        filled
          ? "bg-primary hover:bg-primary-hover"
          : "border border-border bg-background hover:border-primary/40"
      }`}
    >
      <span
        className={`flex items-center justify-center rounded-full transition-colors duration-300 ${
          compact ? "h-10 w-10" : "h-11 w-11"
        } ${
          filled
            ? "bg-white/15 text-white"
            : "bg-primary-tint text-primary group-hover:bg-primary group-hover:text-primary-foreground"
        }`}
      >
        <Icon size={compact ? 18 : 20} strokeWidth={1.75} />
      </span>
      <p
        className={`font-semibold ${filled ? "text-white" : "text-foreground"} ${
          compact ? "mt-3 text-base" : "mt-4 text-base"
        }`}
      >
        {title}
      </p>
      <p
        className={`mt-1 leading-6 ${compact ? "text-base" : "text-sm"} ${
          filled ? "text-white/80" : "text-muted-foreground"
        }`}
      >
        {description}
      </p>
    </div>
  );
}
