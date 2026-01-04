# Fontkin

**Professional Font Pairing Lab for Designers & Developers**

Stop guessing font pairings. Explore curated, professional combinations with real web + editorial previews, smart filters, and one-click developer exports.

[Live Demo](https://fontkin.com) · [Report Bug](https://github.com/ObiBat/fontkin/issues) · [Request Feature](https://github.com/ObiBat/fontkin/issues)

---

## Features

### Curated Font Pairings
- **34 hand-picked combinations** - Not random generators, real design decisions
- **Multiple preview modes** - Web UI, editorial layouts, and hero sections
- **Vibe tags & filters** - Find pairings by mood: minimal, bold, elegant, playful
- **Timelessness ratings** - Classic, modern classic, or trending

### Custom Text Preview
- **Multi-field input** - Test with your own headline, subhead, and body text
- **Real-time preview** - See changes instantly across all specimens
- **Mobile-optimized** - Bottom sheet UI on mobile devices

### Custom Combo Builder
- **Build your own type system** - Select fonts for H1-H3, body, and caption
- **Fine-tune everything** - Weight, size, line-height, letter-spacing
- **Live preview** - See changes as you adjust sliders
- **4 export formats** - CSS, Tailwind, Google Fonts, AI Prompts

### Developer Exports
- **CSS** - Variables and class definitions
- **Tailwind Config** - Ready-to-paste configuration
- **Google Fonts** - HTML link tags with correct weights
- **AI Prompts** - Structured prompts for ChatGPT/Claude design handoff

### Compare Mode
- **Side-by-side comparison** - Compare up to 3 pairings
- **Synced previews** - Same sample text across all
- **Quick decision making** - See differences at a glance

### Favorites
- **Save your picks** - Heart any pairing to save it
- **Local storage** - No account needed, persists in browser
- **Dedicated page** - View all favorites in one place

---

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) via `next/font`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Deployment**: [Vercel](https://vercel.com/)
- **Analytics**: Google Analytics 4, Microsoft Clarity (optional)

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/ObiBat/fontkin.git
   cd fontkin
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Run the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000)

### Environment Variables (Optional)

Create a `.env.local` file for analytics:

```env
# Google Analytics 4 (optional - hardcoded in production)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Microsoft Clarity (optional)
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx

# Plausible Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=fontkin.com
```

---

## Project Structure

```
fontkin/
├── app/
│   ├── builder/          # Custom combo builder
│   ├── combo/[slug]/     # Individual pairing pages
│   ├── compare/          # Comparison tool
│   ├── explore/          # Main gallery
│   ├── favorites/        # Saved pairings
│   ├── layout.tsx        # Root layout with SEO
│   ├── page.tsx          # Homepage
│   ├── not-found.tsx     # Custom 404
│   ├── sitemap.ts        # Dynamic sitemap
│   └── robots.ts         # Robots.txt
├── components/
│   ├── analytics.tsx     # GA4, Clarity, Plausible
│   ├── combo-card.tsx    # Pairing card component
│   ├── combo-specimen.tsx # Detailed pairing view
│   ├── custom-text-input.tsx # Text preview input
│   ├── header.tsx        # Navigation
│   ├── hero-typography-theater.tsx # Homepage hero
│   ├── structured-data.tsx # JSON-LD schemas
│   └── ...
├── contexts/
│   └── app-state.tsx     # Global state (favorites, compare, custom text)
├── lib/
│   ├── data/
│   │   ├── fonts.ts      # Font definitions (50+ fonts)
│   │   └── combos.ts     # Curated pairings (34 combos)
│   ├── fonts.ts          # next/font loaders
│   ├── samples.ts        # Sample text templates
│   └── export-utils.ts   # Export generators
└── public/
    └── ...
```

---

## Font Library

### Classifications
- **Serif**: Playfair Display, Merriweather, Crimson Pro, Lora, and more
- **Sans-Serif**: Inter, Work Sans, Plus Jakarta Sans, Space Grotesk, and more
- **Display**: Anton, Bebas Neue, Oswald, Clash Display
- **Monospace**: JetBrains Mono, Fira Code, IBM Plex Mono

### Pairing Categories
- **Editorial**: Magazine and blog typography
- **Corporate**: Professional business sites
- **Creative**: Portfolio and agency sites
- **Startup**: Modern SaaS applications
- **E-commerce**: Product and retail sites

---

## SEO Implementation

### Structured Data (JSON-LD)
- `WebsiteSchema` - Site-wide search action
- `OrganizationSchema` - Brand identity
- `SoftwareApplicationSchema` - App store listing
- `FAQSchema` - Common questions
- `FontPairingSchema` - Individual pairing metadata
- `BreadcrumbSchema` - Navigation breadcrumbs

### Meta Tags
- Open Graph for social sharing
- Twitter Cards
- Canonical URLs
- Robots directives

### Technical SEO
- Dynamic sitemap with all 34+ pairing URLs
- robots.txt configuration
- Dynamic OG images per pairing
- Google Search Console verified

---

## Analytics

### Google Analytics 4
Tracks:
- Page views with anonymized IP
- Font pairing views
- Favorites and unfavorites
- Export copies (CSS, Tailwind, AI)
- Filter usage
- Builder interactions

### Event Tracking
```typescript
import { events } from '@/components/analytics';

events.viewCombo('playfair-inter');
events.favoriteCombo('playfair-inter');
events.copyExport('css', 'playfair-inter');
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

```bash
npx vercel --prod
```

### Build for Production

```bash
npm run build
npm start
```

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## Roadmap

- [ ] More font pairings (50+ goal)
- [ ] Variable font controls
- [ ] Dark mode toggle
- [ ] Export to Figma
- [ ] User accounts for cloud sync
- [ ] API for programmatic access

---

## Support

If Fontkin saves you time, consider supporting the project:

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/obibatbileg)

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Acknowledgments

- [Google Fonts](https://fonts.google.com/) for the incredible font library
- [Vercel](https://vercel.com/) for hosting
- The design and developer community for inspiration

---

## Author

**Obi Batbileg**

- Website: [obicreative.dev](https://obicreative.dev)
- Twitter: [@obibatbileg](https://x.com/obibatbileg)
- GitHub: [@ObiBat](https://github.com/ObiBat)
- Email: obi@craefto.com

---

<p align="center">
  Made with care for designers & developers
  <br />
  <a href="https://fontkin.com">fontkin.com</a>
</p>
