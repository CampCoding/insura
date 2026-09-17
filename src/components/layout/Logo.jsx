import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", imageClassName = "h-8" }) {
  return (
    <Link href="/" className={`flex shrink-0 items-center ${className}`}>
      <Image
        src="/images/insura-logo-light.webp"
        alt="Insura"
        width={1448}
        height={1086}
        priority
        className={`logo-light w-auto shrink-0 ${imageClassName}`}
      />
      <Image
        src="/images/insura-logo-dark.webp"
        alt="Insura"
        width={1536}
        height={1024}
        priority
        className={`logo-dark w-auto shrink-0 ${imageClassName}`}
      />
    </Link>
  );
}
