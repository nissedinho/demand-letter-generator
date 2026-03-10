import "./globals.css";

export const metadata = {
  title: "Free Demand Letter Generator — Create a Legal Demand Letter in Minutes",
  description:
    "Generate a professional demand letter for free. Perfect for security deposits, unpaid invoices, property damage, and small claims disputes.",
  openGraph: {
    title: "Free Demand Letter Generator",
    description:
      "Create a professional legal demand letter in minutes. No lawyer needed.",
    url: "https://demandlettergenerator.org",
    siteName: "Demand Letter Generator",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Serif+4:wght@400;600;700&family=DM+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
