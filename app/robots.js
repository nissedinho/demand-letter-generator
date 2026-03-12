export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
    sitemap: "https://demandlettergenerator.org/sitemap.xml",
  };
}
