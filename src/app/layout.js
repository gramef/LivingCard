import "./globals.css";

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
  openGraph: {
    title: "Living Card — Credit That Cares",
    description:
      "A restricted-use credit card that helps you build credit by spending only on life's essentials.",
    type: "website",
    locale: "en_CA",
    siteName: "Living Card",
  },
  twitter: {
    card: "summary_large_image",
    title: "Living Card — Credit That Cares",
    description:
      "Build credit responsibly. Spend only on essentials.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
