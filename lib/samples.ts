// Distinctive sample texts that showcase each font pairing's personality
// These are crafted to highlight the unique characteristics of each combination

export interface ComboSample {
  headline: string;
  subhead: string;
  body: string;
  pullQuote?: string;
  micro: string;
}

// Samples mapped by combo ID - each crafted for that specific pairing's character
export const comboSamples: Record<string, ComboSample> = {
  // === TIMELESS EDITORIAL ===
  "playfair-inter": {
    headline: "The Weight of Words",
    subhead: "On the delicate balance between elegance and clarity",
    body: "Every letterform carries centuries of evolution. The high contrast of classical serifs meets the measured neutrality of contemporary sans. A dialogue between heritage and utility that defines modern editorial design.",
    pullQuote: "Typography is the craft of endowing human language with a durable visual form.",
    micro: "Robert Bringhurst",
  },
  "merriweather-open-sans": {
    headline: "Built to Last",
    subhead: "When readability meets reliability",
    body: "Some typefaces earn their place through quiet excellence. Merriweather's sturdy serifs have supported countless hours of reading, proving that the best typography is often the kind you never notice.",
    pullQuote: "Good design is as little design as possible.",
    micro: "Dieter Rams",
  },
  "crimson-pro-work-sans": {
    headline: "Renaissance Renewed",
    subhead: "Classical forms for modern screens",
    body: "The humanist tradition lives on in digital form. Crimson Pro channels the elegance of old-style typefaces while embracing the technical demands of contemporary web design. Heritage without nostalgia.",
    pullQuote: "Study the past if you would define the future.",
    micro: "Confucius",
  },

  // === MODERN SAAS / TECH ===
  "space-grotesk-inter": {
    headline: "Future Forward",
    subhead: "Technology with personality",
    body: "Geometric precision with distinctive character. Space Grotesk brings the confident irregularity that tech brands need to stand apart, while Inter handles the interface with quiet competence.",
    pullQuote: "Design is not just what it looks like. Design is how it works.",
    micro: "Steve Jobs",
  },
  "manrope": {
    headline: "Singular Vision",
    subhead: "One typeface, infinite expression",
    body: "When a single family carries the entire typographic load, every weight must earn its place. Manrope's distinctive letterforms and comprehensive weight range deliver hierarchy through contrast alone.",
    pullQuote: "Less, but better.",
    micro: "Dieter Rams",
  },

  // === EDITORIAL / STORYTELLING ===
  "instrument-serif-inter": {
    headline: "Editorial Edge",
    subhead: "Contemporary serif for the digital age",
    body: "Instrument Serif captures the current moment in editorial design. Refined yet approachable, distinctive yet readable. Paired with Inter, it creates the sophisticated voice modern publications demand.",
    pullQuote: "Fashion fades, only style remains.",
    micro: "Coco Chanel",
  },
  "lora-dm-sans": {
    headline: "Gentle Authority",
    subhead: "Warmth without weakness",
    body: "Lora's brushed curves bring organic warmth to headlines, while DM Sans provides the quiet confidence of geometric precision. Together, they create an inviting yet trustworthy editorial voice.",
    pullQuote: "In character, in manner, in style, in all things, the supreme excellence is simplicity.",
    micro: "Henry Wadsworth Longfellow",
  },
  "source-serif-space-grotesk": {
    headline: "Intellectual Rigor",
    subhead: "Where scholarship meets innovation",
    body: "Adobe's meticulously crafted Source Serif handles extended reading with scholarly precision, while Space Grotesk injects contemporary energy into navigation and UI. A pairing for serious content with modern delivery.",
    pullQuote: "The details are not the details. They make the design.",
    micro: "Charles Eames",
  },

  // === BOLD / EXPRESSIVE ===
  "fraunces-dm-sans": {
    headline: "Expressive Soul",
    subhead: "Personality that refuses to be ignored",
    body: "Fraunces brings unapologetic character with its soft, 'wonky' forms. Type that makes an instant impression. DM Sans provides the neutral counterweight, letting the headline personality shine.",
    pullQuote: "Have no fear of perfection. You'll never reach it.",
    micro: "Salvador Dalí",
  },

  // === WITH MONO ACCENT ===
  "inter-jetbrains": {
    headline: "Code & Craft",
    subhead: "Developer-first design systems",
    body: "Inter's systematic approach to UI typography meets JetBrains Mono's developer-focused precision. This pairing speaks the language of technical documentation, dashboards, and tools built by engineers, for engineers.",
    pullQuote: "First, solve the problem. Then, write the code.",
    micro: "John Johnson",
  },
  "geist-mono-geist": {
    headline: "Next Generation",
    subhead: "The Vercel design language",
    body: "Geist represents the future of interface typography. Clean, neutral, and optimized for the modern web. Paired with monospace accents, it's the foundation for building what's next.",
    pullQuote: "Make it work, make it right, make it fast.",
    micro: "Kent Beck",
  },

  // === STARTUP FAVORITES ===
  "poppins-dm-sans": {
    headline: "Bold Moves",
    subhead: "Geometric confidence for growing brands",
    body: "Poppins' circular forms make a statement without shouting. DM Sans provides the supporting cast every headline needs. This is typography with startup energy.",
    pullQuote: "Stay hungry, stay foolish.",
    micro: "Steve Jobs",
  },
  "montserrat-karla": {
    headline: "Urban Energy",
    subhead: "Street-smart sophistication",
    body: "Montserrat channels the spirit of Buenos Aires signage. Bold, confident, unmistakable. Karla adds a touch of quirky charm to keep things interesting.",
    pullQuote: "The city is a jungle, but the jungle is full of opportunities.",
    micro: "Anonymous",
  },

  // === BOLD & EXPRESSIVE / DISPLAY ===
  "anton-dm-sans": {
    headline: "No Apologies",
    subhead: "Bold typography for bold brands",
    body: "Anton is unapologetically heavy, demanding attention without asking permission. DM Sans provides the friendly counterbalance, keeping your brand approachable despite its confidence.",
    pullQuote: "Fortune favors the bold.",
    micro: "Virgil",
  },
  "abril-fatface-lora": {
    headline: "Editorial Drama",
    subhead: "Where Didone meets digital",
    body: "Abril Fatface brings the drama of 19th-century advertising posters to modern screens. Lora's comfortable curves invite readers to stay for the story behind the headline.",
    pullQuote: "All the world's a stage.",
    micro: "William Shakespeare",
  },
  "righteous-nunito": {
    headline: "Retro Future",
    subhead: "Yesterday's tomorrow, today",
    body: "Righteous channels the optimism of mid-century futurism. Space-age curves that still feel fresh. Nunito keeps the supporting text friendly and readable.",
    pullQuote: "The future ain't what it used to be.",
    micro: "Yogi Berra",
  },
  "big-shoulders-work-sans": {
    headline: "Industrial Strength",
    subhead: "Built for the working class",
    body: "Big Shoulders Display was designed for Chicago's signage. Bold, proud, and built to work. Work Sans lives up to its name, handling body text with no-nonsense reliability.",
    pullQuote: "Form follows function.",
    micro: "Louis Sullivan",
  },

  // === MINIMAL & CLEAN ===
  "dm-sans-only": {
    headline: "Simply Effective",
    subhead: "One font, no compromises",
    body: "DM Sans proves that sometimes less is more. Its friendly geometry handles every typographic challenge with consistent warmth, from hero headlines to footnotes.",
    pullQuote: "Simplicity is the ultimate sophistication.",
    micro: "Leonardo da Vinci",
  },
  "inter-only": {
    headline: "Interface Standard",
    subhead: "The typeface of the modern web",
    body: "Inter was built for screens, designed for interfaces, and optimized for every size. It's become the default choice for a reason. Reliable, readable, refined.",
    pullQuote: "Good design is invisible.",
    micro: "Jared Spool",
  },

  // === ACCESSIBILITY-FOCUSED ===
  "lexend-atkinson": {
    headline: "Inclusive Excellence",
    subhead: "Two fonts, one mission: readability",
    body: "When reading fluency meets hyperlegibility, everyone benefits. This pairing prioritizes comprehension without compromising on visual appeal. Proof that accessibility and aesthetics align.",
    pullQuote: "Good design enables, bad design disables.",
    micro: "Paul Hiebert",
  },

  // === LUXURY / FASHION ===
  "libre-caslon-montserrat": {
    headline: "Classic Confidence",
    subhead: "Traditional elegance, modern presence",
    body: "Libre Caslon Text brings centuries of typographic tradition to digital screens. Montserrat adds contemporary boldness, creating a pairing that respects the past while embracing the future.",
    pullQuote: "Tradition is not the worship of ashes, but the preservation of fire.",
    micro: "Gustav Mahler",
  },
  "bitter-poppins": {
    headline: "Substantial Style",
    subhead: "Slab serif meets geometric precision",
    body: "Bitter's sturdy serifs convey substance and reliability, while Poppins' circular forms add contemporary appeal. A pairing that says 'trust us' in a friendly voice.",
    pullQuote: "Quality is remembered long after price is forgotten.",
    micro: "Gucci Family Motto",
  },
  "literata-sora": {
    headline: "Optical Intelligence",
    subhead: "Variable fonts for variable screens",
    body: "Literata adapts its optical size for perfect readability at any scale. A true variable font for the variable conditions of modern reading. Sora brings geometric modernity to the interface.",
    pullQuote: "The only constant is change.",
    micro: "Heraclitus",
  },
  "chivo-dm-sans": {
    headline: "Strong Foundations",
    subhead: "Grotesque confidence for modern brands",
    body: "Chivo's bold presence creates headlines that command respect. DM Sans softens the approach with friendly geometry, balancing strength with approachability.",
    pullQuote: "Strength does not come from physical capacity. It comes from an indomitable will.",
    micro: "Mahatma Gandhi",
  },

  // === AVANT-GARDE & EXPERIMENTAL ===
  "cabinet-grotesk-spectral": {
    headline: "Defy Convention",
    subhead: "Where optical precision meets editorial soul",
    body: "Cabinet Grotesk's variable optical sizing creates headlines that breathe at any scale. Spectral's screen-native elegance carries the narrative forward. A pairing for brands that refuse to play it safe.",
    pullQuote: "Art is not what you see, but what you make others see.",
    micro: "Edgar Degas",
  },
  "general-sans-cormorant": {
    headline: "Understated Opulence",
    subhead: "Swiss restraint meets Parisian grace",
    body: "The precision of Helvetica's descendants paired with the timeless romance of Garamond. General Sans provides the framework; Cormorant adds the flourish. Luxury that whispers rather than shouts.",
    pullQuote: "Elegance is refusal.",
    micro: "Coco Chanel",
  },
  "sora-fraunces": {
    headline: "Playful Precision",
    subhead: "When algorithms learn to dance",
    body: "Sora's calculated curves meet Fraunces' delightful wonkiness. A conversation between control and chaos. For brands that take their craft seriously but never themselves.",
    pullQuote: "The creation of something new is not accomplished by the intellect but by the play instinct.",
    micro: "Carl Jung",
  },
  "outfit-eb-garamond": {
    headline: "Past Meets Pixel",
    subhead: "Five centuries compressed into one pairing",
    body: "Outfit was born for screens; EB Garamond carries 500 years of typographic wisdom. Together, they prove that innovation and tradition aren't opposites. They're dance partners.",
    pullQuote: "In order to be irreplaceable, one must always be different.",
    micro: "Coco Chanel",
  },
  "archivo-crimson-pro": {
    headline: "Authoritative Warmth",
    subhead: "The voice of trusted institutions",
    body: "Archivo's grotesque strength commands the headline while Crimson Pro's old-style warmth invites deeper reading. A pairing for organizations that lead with confidence and connect with heart.",
    pullQuote: "The measure of intelligence is the ability to change.",
    micro: "Albert Einstein",
  },
  "jost-instrument-serif": {
    headline: "Geometric Poetry",
    subhead: "Bauhaus philosophy meets modern editorial",
    body: "Jost channels the spirit of Futura with contemporary refinement. Instrument Serif adds the editorial credibility that pure geometry can lack. Functional idealism with emotional depth.",
    pullQuote: "Design is not a thing you do. It's a way you live.",
    micro: "Alan Fletcher",
  },
  "plus-jakarta-libre-baskerville": {
    headline: "Trust Reimagined",
    subhead: "Modern warmth meets centuries of credibility",
    body: "Plus Jakarta's friendly geometry opens doors while Libre Baskerville's classical authority closes deals. A pairing for brands building the future on foundations of trust.",
    pullQuote: "Trust is built with consistency.",
    micro: "Lincoln Chafee",
  },
  "space-grotesk-playfair": {
    headline: "Tension by Design",
    subhead: "When tech culture meets editorial tradition",
    body: "The deliberate friction between Space Grotesk's digital-native quirks and Playfair's high-contrast elegance creates visual interest that demands attention. Opposites attract.",
    pullQuote: "Creativity is just connecting things.",
    micro: "Steve Jobs",
  },
  "figtree-literata": {
    headline: "Comfort Zone",
    subhead: "Typography that feels like home",
    body: "Figtree welcomes readers with warm, open forms while Literata, Google's ebook-optimized serif, makes long-form reading a pleasure. For platforms where people come to stay.",
    pullQuote: "The details are not the details. They make the design.",
    micro: "Charles Eames",
  },
  "manrope-source-serif": {
    headline: "Considered Choices",
    subhead: "Distinctive clarity for thoughtful brands",
    body: "Manrope's semi-condensed character adds subtle distinction to headlines while Source Serif's Adobe-engineered legibility handles extended reading with grace. Quiet confidence, impeccable execution.",
    pullQuote: "Have nothing in your houses that you do not know to be useful or believe to be beautiful.",
    micro: "William Morris",
  },
};

// Fallback sample for any combo not explicitly defined
export const defaultSample: ComboSample = {
  headline: "Typography Matters",
  subhead: "The invisible art that shapes how we read",
  body: "Great typography disappears into the reading experience, guiding the eye without calling attention to itself. The best font pairings create harmony between form and function.",
  pullQuote: "Typography is the voice of design.",
  micro: "Unknown",
};

export function getSampleForCombo(comboId: string): ComboSample {
  return comboSamples[comboId] || defaultSample;
}
