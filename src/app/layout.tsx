import type { Metadata } from "next";
import { fraunces, inter, jetbrainsMono } from "@/lib/fonts";
import "./globals.css";
import ClientShell from "@/components/ClientShell";

export const metadata: Metadata = {
  title: "925 League — Basketball Between the Meetings",
  description:
    "925 League runs organized basketball in New York, Los Angeles, and Chicago for players who did not quit the game.",
  openGraph: {
    title: "925 League",
    description: "Basketball between the meetings.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="grain" suppressHydrationWarning>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
