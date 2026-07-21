import { Inter } from "next/font/google";
import "../styles/globals.css";
import ScrollToTop from '@/components/ui/ScrollToTop';
import GlobalLoader from '@/components/ui/GlobalLoader';
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <LanguageProvider>
          <GlobalLoader />
          {children}
          <ScrollToTop />
        </LanguageProvider>
      </body>
    </html>
  );
}
