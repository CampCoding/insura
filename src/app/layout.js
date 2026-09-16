import { Geist, Geist_Mono, EB_Garamond } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import ThemeSync from "@/components/layout/ThemeSync";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const displayFont = EB_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: "Miras | Medical Rehabilitation Courses",
  description:
    "Miras is a training platform for medical rehabilitation courses: videos, PDFs, exam banks and notes from real practicing specialists.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('miras-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <ThemeSync />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
