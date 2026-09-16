import Link from "next/link";
import clsx from "clsx";

const base =
  "group relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-[15px] font-medium transition-all duration-300 active:scale-[0.98] whitespace-nowrap";

const variants = {
  primary:
    "bg-primary text-primary-foreground shadow-sm hover:-translate-y-0.5 hover:shadow-md",
  outline:
    "border border-border text-foreground hover:-translate-y-0.5 hover:border-primary/40",
};

const fillVariants = {
  primary: "bg-primary-hover",
  outline: "bg-primary-tint",
};

export default function Button({
  href,
  variant = "primary",
  className,
  fillColor,
  children,
  ...props
}) {
  const classes = clsx(base, variants[variant], className);

  const content = (
    <>
      <span
        aria-hidden
        style={fillColor ? { backgroundColor: fillColor } : undefined}
        className={clsx(
          "absolute inset-0 -z-10 origin-bottom scale-y-0 transition-transform duration-300 ease-out group-hover:scale-y-100",
          !fillColor && fillVariants[variant]
        )}
      />
      {children}
    </>
  );

  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <Link
        href={href}
        className={classes}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        {...props}
      >
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}
