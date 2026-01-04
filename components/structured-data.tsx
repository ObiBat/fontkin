// JSON-LD Structured Data for SEO
// Following Schema.org 2024/2025 best practices

export function WebsiteSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Fontkin",
    alternateName: "Fontkin Font Pairing Lab",
    url: "https://fontkin.com",
    description: "Professional font pairing lab with curated combinations, real previews, and developer-friendly exports.",
    publisher: {
      "@type": "Person",
      name: "Obi Batbileg",
      url: "https://obicreative.dev",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://fontkin.com/explore?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Fontkin",
    url: "https://fontkin.com",
    logo: "https://fontkin.com/icon.png",
    sameAs: [
      "https://x.com/obibatbileg",
      "https://github.com/ObiBat",
    ],
    founder: {
      "@type": "Person",
      name: "Obi Batbileg",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareApplicationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fontkin",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "100",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FontPairingSchemaProps {
  name: string;
  description: string;
  primaryFont: string;
  secondaryFont: string;
  url: string;
  tags: string[];
}

export function FontPairingSchema({
  name,
  description,
  primaryFont,
  secondaryFont,
  url,
  tags,
}: FontPairingSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: name,
    description: description,
    url: url,
    creator: {
      "@type": "Person",
      name: "Obi Batbileg",
    },
    keywords: tags.join(", "),
    about: [
      {
        "@type": "Thing",
        name: primaryFont,
      },
      {
        "@type": "Thing",
        name: secondaryFont,
      },
    ],
    isAccessibleForFree: true,
    license: "https://creativecommons.org/licenses/by/4.0/",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQSchema() {
  const faqs = [
    {
      question: "What is Fontkin?",
      answer: "Fontkin is a professional font pairing lab that helps designers and developers find perfect typography combinations with real previews and one-click exports.",
    },
    {
      question: "Are the fonts free to use?",
      answer: "Yes, all font pairings on Fontkin use Google Fonts which are free and open-source for both personal and commercial use.",
    },
    {
      question: "Can I export the font pairings?",
      answer: "Yes, Fontkin provides one-click exports for CSS, Tailwind CSS, Google Fonts links, and AI-friendly prompts.",
    },
    {
      question: "How do I save my favorite combinations?",
      answer: "Click the heart icon on any font pairing to save it to your favorites. Your favorites are stored locally in your browser.",
    },
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
