import "./globals.css";

import { cn } from "@/lib/cn";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={cn(poppins.className, "bg-gray-800")}>{children}</body>
      </ClerkProvider>
    </html>
  );
}
