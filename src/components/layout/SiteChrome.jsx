"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";
import Footer from "./Footer";

const NO_CHROME_ROUTES = ["/login", "/register"];
const LESSON_PLAYER_PATTERN = /^\/learn\/[^/]+\/[^/]+$/;

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const hideChrome =
    NO_CHROME_ROUTES.some((route) => pathname.startsWith(route)) ||
    LESSON_PLAYER_PATTERN.test(pathname);

  return (
    <>
      {!hideChrome && <Header />}
      <main className="flex flex-1 flex-col">{children}</main>
      {!hideChrome && <Footer />}
    </>
  );
}
