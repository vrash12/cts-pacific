import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ServiceDetail } from "@/components/marketing/service-detail";
import { siteConfig } from "@/config/site";
import { getServiceBySlug, services } from "@/modules/services/service-catalog";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {};
  }

  const canonical = `/services/${service.slug}`;

  return {
    title: service.title,
    description: service.description,
    alternates: { canonical },
    openGraph: {
      title: `${service.title} | CTS Pacific`,
      description: service.description,
      url: canonical,
      images: [
        {
          url: service.heroImage,
          alt: service.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} | CTS Pacific`,
      description: service.description,
      images: [service.heroImage],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const canonicalUrl = new URL(`/services/${service.slug}`, siteConfig.url).toString();
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      url: canonicalUrl,
      areaServed: ["Guam", "Pacific Region"],
      provider: {
        "@type": "Organization",
        name: siteConfig.legalName,
        alternateName: siteConfig.dba,
        url: siteConfig.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteConfig.url,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: new URL("/services", siteConfig.url).toString(),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: service.navigationTitle,
          item: canonicalUrl,
        },
      ],
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
