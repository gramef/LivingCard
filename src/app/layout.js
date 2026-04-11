import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata = {
  title: "Living Card — Ethical Essential Credit for Canadians",
  description:
    "Build credit responsibly with Living Card. A restricted-use digital credit card that limits spending to essentials like groceries, transit, pharmacy, and utilities. Designed for financially vulnerable Canadians.",
  keywords: [
    "credit card Canada",
    "build credit",
    "ethical credit",
    "essential spending",
    "underbanked",
    "financial inclusion",
    "Living Card",
  ],
  icons: {
    icon: "/app-icon.png",
    apple: "/app-icon.png",
  },
  openGraph: {
    title: "Living Card — Credit That Cares",
    description:
      "A restricted-use credit card that helps you build credit by spending only on life's essentials.",
    type: "website",
    locale: "en_CA",
    siteName: "Living Card",
    images: [
      {
        url: "/logo-light.png",
        width: 1024,
        height: 1024,
        alt: "LivingCard Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Card — Credit That Cares",
    description:
      "Build credit responsibly. Spend only on essentials.",
    images: ["/logo-light.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
