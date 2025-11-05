import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Socket Mellotron - Real-time Multiplayer Music",
  description: "A modern web-based Mellotron with real-time multiplayer collaboration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
