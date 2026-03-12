export default function sitemap() {
  const baseUrl = "https://demandlettergenerator.org";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
