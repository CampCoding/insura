import Image from "next/image";
import Link from "next/link";

export default function Logo({ className = "", imageClassName = "h-8" }) {
  return (
    <Link href="/" className={`flex items-center ${className}`}>
      <Image
        src="/miras-logo.webp"
        alt="Miras"
        width={1536}
        height={1024}
        priority
        className={`brand-logo w-auto ${imageClassName}`}
      />
    </Link>
  );
}
