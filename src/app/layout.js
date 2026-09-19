import { Geist, Geist_Mono, EB_Garamond, Cairo } from "next/font/google";
import SiteChrome from "@/components/layout/SiteChrome";
import ThemeSync from "@/components/layout/ThemeSync";
import { LanguageProvider } from "@/components/layout/LanguageProvider";
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

const arabicFont = Cairo({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL("https://insura.example"), // TODO: replace with the real production domain
  title: "Insura | Medical Rehabilitation Courses",
  description:
    "Insura is a training platform for medical rehabilitation courses: videos, PDFs, exam banks and notes from real practicing specialists.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${arabicFont.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('insura-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}var l=localStorage.getItem('insura-lang');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <LanguageProvider>
          <ThemeSync />
          <SiteChrome>{children}</SiteChrome>
        </LanguageProvider>
      </body>
    </html>
  );
}
