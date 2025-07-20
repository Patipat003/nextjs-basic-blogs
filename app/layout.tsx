import type { Metadata } from "next";
import { Roboto } from "next/font/google"; // 👈 นำเข้า Roboto
import "./globals.css";
import { NewsProvider } from "./contexts/NewsContext";
import Navbar from "./components/Navbar";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
});
export const metadata: Metadata = {
  title: "News Hub",
  description: "Stay updated with the latest news articles",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <NewsProvider>
        <body
          className={`bg-gradient-to-br from-violet-950 via-indigo-950 to-violet-950 bg-no-repeat ${roboto.variable} antialiased`}
        >
          <Toaster
            position="bottom-left"
            toastOptions={{
              style: {
                background: "transparent",
                color: "purple",
                border: "1px solid purple",
              },
            }}
          />
          <Navbar />
          {children}
        </body>
      </NewsProvider>
    </html>
  );
}
