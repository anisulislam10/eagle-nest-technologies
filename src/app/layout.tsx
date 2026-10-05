import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/Layout/SiteChrome";
import { ThemeProvider } from "next-themes";
import Aoscompo from "@/utils/aos";
import NextTopLoader from 'nextjs-toploader';
import SessionProviderComp from "@/components/nextauth/SessionProvider";
import { AuthDialogProvider } from "./context/AuthDialogContext";
export const metadata: Metadata = {
  title: 'Eagle Nest Technologies',
  description: 'Eagle Nest Technologies is a software development startup offering React Native and Flutter mobile apps, Next.js web apps, backend development, and AI integration with MERN, PERN, MySQL, Firebase, Supabase, Dart, and PHP.',
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
      <NextTopLoader />
      <AuthDialogProvider>
      <SessionProviderComp session={null}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="system"
        >
          <Aoscompo>
            <SiteChrome>{children}</SiteChrome>
          </Aoscompo>
        </ThemeProvider>
        </SessionProviderComp>
        </AuthDialogProvider>
      </body>
    </html>
  );
}
