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
  "eb-garamond-inter": {
    headline: "Centuries of Wisdom",
    subhead: "Where history meets hypertext",
    body: "Garamond's legacy spans five centuries of printed culture. EB Garamond brings that heritage to screens with authentic charm, while Inter ensures the interface never gets in the way of the content.",
    pullQuote: "The palest ink is better than the best memory.",
    micro: "Chinese Proverb",
  },
  "spectral-rubik": {
    headline: "Digital Refinement",
    subhead: "Elegance engineered for screens",
    body: "Google's Spectral was born digital, designed from the ground up for screen legibility without sacrificing the sophistication of traditional editorial serifs. Rubik adds warmth to every interaction.",
    pullQuote: "Innovation distinguishes between a leader and a follower.",
    micro: "Steve Jobs",
  },
  "cormorant-dm-sans": {
    headline: "Refined Simplicity",
    subhead: "Where Garamond heritage meets geometric warmth",
    body: "The old-style grace of Renaissance letterforms paired with friendly, approachable geometry. This combination speaks to brands that honor tradition while embracing accessibility. Luxury without pretension.",
    pullQuote: "Elegance is not about being noticed, it's about being remembered.",
    micro: "Giorgio Armani",
  },
  "libre-baskerville-inter": {
    headline: "Timeless Authority",
    subhead: "Trust built through typographic heritage",
    body: "Baskerville's transitional elegance has conveyed credibility for over two centuries. Paired with Inter's pixel-perfect precision, this system bridges the gravitas of print with the demands of digital interfaces.",
    pullQuote: "Type is a beautiful group of letters, not a group of beautiful letters.",
    micro: "Matthew Carter",
  },

  // === MODERN SAAS / TECH ===
  "space-grotesk-inter": {
    headline: "Future Forward",
    subhead: "Technology with personality",
    body: "Geometric precision with distinctive character. Space Grotesk brings the confident irregularity that tech brands need to stand apart, while Inter handles the interface with quiet competence.",
    pullQuote: "Design is not just what it looks like. Design is how it works.",
    micro: "Steve Jobs",
  },
  "plus-jakarta-inter": {
    headline: "Warm Precision",
    subhead: "The friendly face of modern software",
    body: "Contemporary geometric warmth meets systematic clarity. Plus Jakarta Sans brings approachability to headlines without sacrificing professionalism. The typographic handshake of SaaS done right.",
    pullQuote: "Simplicity is the ultimate sophistication.",
    micro: "Leonardo da Vinci",
  },
  "manrope": {
    headline: "Singular Vision",
    subhead: "One typeface, infinite expression",
    body: "When a single family carries the entire typographic load, every weight must earn its place. Manrope's distinctive letterforms and comprehensive weight range deliver hierarchy through contrast alone.",
    pullQuote: "Less, but better.",
    micro: "Dieter Rams",
  },
  "outfit": {
    headline: "Clean Slate",
    subhead: "Geometry refined for screens",
    body: "Pure geometric forms optimized for digital clarity. Outfit strips away historical baggage to deliver type that feels native to interfaces. Designed for the way we read now.",
    pullQuote: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
    micro: "Antoine de Saint-Exupéry",
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
  "sora-fira-code": {
    headline: "Precision Engineering",
    subhead: "Where geometry meets programming",
    body: "Sora's mathematical precision creates clean interfaces while Fira Code's programming ligatures make code beautiful. A system designed for those who appreciate the art in engineering.",
    pullQuote: "Code is poetry.",
    micro: "David Heinemeier Hansson",
  },
  "geist-mono-geist": {
    headline: "Next Generation",
    subhead: "The Vercel design language",
    body: "Geist represents the future of interface typography. Clean, neutral, and optimized for the modern web. Paired with monospace accents, it's the foundation for building what's next.",
    pullQuote: "Make it work, make it right, make it fast.",
    micro: "Kent Beck",
  },

  // === STARTUP FAVORITES ===
  "figtree-inter": {
    headline: "Launch Ready",
    subhead: "Friendly typography for ambitious teams",
    body: "Figtree's warm geometry gives your brand an approachable personality from day one. Combined with Inter's interface reliability, you're equipped to scale from MVP to market leader.",
    pullQuote: "Move fast and make things.",
    micro: "Mark Zuckerberg (modified)",
  },
  "nunito-open-sans": {
    headline: "Approachable Excellence",
    subhead: "Soft edges, hard results",
    body: "Nunito's rounded terminals say 'welcome' without trying too hard. Open Sans handles the details with quiet competence. Together, they build trust one pixel at a time.",
    pullQuote: "Be so good they can't ignore you.",
    micro: "Steve Martin",
  },
  "poppins-dm-sans": {
    headline: "Bold Moves",
    subhead: "Geometric confidence for growing brands",
    body: "Poppins' circular forms make a statement without shouting. DM Sans provides the supporting cast every headline needs. This is typography with startup energy.",
    pullQuote: "Stay hungry, stay foolish.",
    micro: "Steve Jobs",
  },
  "raleway-lato": {
    headline: "Elegant Ambition",
    subhead: "Sophistication meets scalability",
    body: "Raleway's refined forms suggest a brand that knows its worth. Lato's humanist warmth keeps things grounded. Aspiration without pretension.",
    pullQuote: "Excellence is not a destination but a continuous journey.",
    micro: "Brian Tracy",
  },
  "montserrat-karla": {
    headline: "Urban Energy",
    subhead: "Street-smart sophistication",
    body: "Montserrat channels the spirit of Buenos Aires signage. Bold, confident, unmistakable. Karla adds a touch of quirky charm to keep things interesting.",
    pullQuote: "The city is a jungle, but the jungle is full of opportunities.",
    micro: "Anonymous",
  },
  "archivo-inter": {
    headline: "Structured Growth",
    subhead: "Grotesque power, Swiss precision",
    body: "Archivo's strong backbone supports headlines that mean business. Inter's systematic approach ensures every interface element falls into place. Enterprise-ready from day one.",
    pullQuote: "Structure creates freedom.",
    micro: "Unknown",
  },

  // === BOLD & EXPRESSIVE / DISPLAY ===
  "bebas-neue-inter": {
    headline: "MAXIMUM IMPACT",
    subhead: "Headlines that demand attention",
    body: "Bebas Neue doesn't whisper, it declares. When your message can't wait, these all-caps letterforms cut through the noise. Inter keeps everything else readable.",
    pullQuote: "Speak softly but carry a big stick.",
    micro: "Theodore Roosevelt (inverted)",
  },
  "oswald-roboto": {
    headline: "Condensed Power",
    subhead: "More impact, less space",
    body: "Oswald packs presence into narrow forms, perfect for headlines that need to fit without compromise. Roboto expands to fill the body with reliable readability.",
    pullQuote: "Brevity is the soul of wit.",
    micro: "William Shakespeare",
  },
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
  "clash-display-inter": {
    headline: "Sharp Angles",
    subhead: "Contemporary edge for modern brands",
    body: "Clash Display cuts through mediocrity with geometric precision. Its sharp forms make memorable headlines while Inter maintains the clarity your interface demands.",
    pullQuote: "Design is intelligence made visible.",
    micro: "Alina Wheeler",
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
  "roboto-only": {
    headline: "Universal Language",
    subhead: "Google's gift to the digital world",
    body: "Roboto balances mechanical geometry with humanist curves, creating a typeface that feels both efficient and approachable. It's Android's voice, and increasingly the web's.",
    pullQuote: "Technology should be invisible.",
    micro: "Satya Nadella",
  },
  "lato-only": {
    headline: "Warm Welcome",
    subhead: "Approachability in every weight",
    body: "Lato's semi-rounded details create warmth without sacrificing professionalism. From light to black, it maintains the friendly character that's made it a web favorite.",
    pullQuote: "Be kind whenever possible. It is always possible.",
    micro: "Dalai Lama",
  },
  "lexend-only": {
    headline: "Read Better",
    subhead: "Typography designed for comprehension",
    body: "Lexend was created with reading fluency research in mind. Its carefully calibrated letterforms reduce visual stress, making reading easier for everyone. Not just those who struggle.",
    pullQuote: "Reading is to the mind what exercise is to the body.",
    micro: "Joseph Addison",
  },

  // === ACCESSIBILITY-FOCUSED ===
  "atkinson-inter": {
    headline: "Clarity First",
    subhead: "Hyperlegible design for everyone",
    body: "Atkinson Hyperlegible was designed to maximize character distinction, preventing confusion between similar letterforms. Combined with Inter's interface clarity, it creates truly accessible typography.",
    pullQuote: "Design for all or design for none.",
    micro: "Accessibility Principle",
  },
  "lexend-atkinson": {
    headline: "Inclusive Excellence",
    subhead: "Two fonts, one mission: readability",
    body: "When reading fluency meets hyperlegibility, everyone benefits. This pairing prioritizes comprehension without compromising on visual appeal. Proof that accessibility and aesthetics align.",
    pullQuote: "Good design enables, bad design disables.",
    micro: "Paul Hiebert",
  },

  // === LUXURY / FASHION ===
  "cormorant-jost": {
    headline: "Haute Typography",
    subhead: "Where luxury meets modernity",
    body: "Cormorant's delicate elegance speaks to the finer things, while Jost's geometric clarity keeps the message modern. This is the typography of aspiration. Timeless yet contemporary.",
    pullQuote: "Luxury must be comfortable, otherwise it is not luxury.",
    micro: "Coco Chanel",
  },
  "playfair-raleway": {
    headline: "Editorial Luxury",
    subhead: "The magazine aesthetic, digitized",
    body: "Playfair Display's high-contrast drama evokes fashion spreads and premium publications. Raleway's elegant geometry provides the supporting sophistication every luxury brand deserves.",
    pullQuote: "Style is a way to say who you are without speaking.",
    micro: "Rachel Zoe",
  },
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
  "vollkorn-rubik": {
    headline: "German Precision",
    subhead: "Engineering meets warmth",
    body: "Vollkorn ('whole grain' in German) delivers rich, substantial typographic flavor. Rubik's friendly roundness softens the edges, creating approachable sophistication.",
    pullQuote: "God is in the details.",
    micro: "Ludwig Mies van der Rohe",
  },
  "alegreya-nunito": {
    headline: "Literary Grace",
    subhead: "Where books meet browsers",
    body: "Alegreya's calligraphic heritage makes every headline feel considered, while Nunito's rounded forms ensure digital comfort. A pairing for those who believe in the power of words.",
    pullQuote: "Words are, of course, the most powerful drug used by mankind.",
    micro: "Rudyard Kipling",
  },
  "gelasio-open-sans": {
    headline: "Familiar Excellence",
    subhead: "The Georgia you wish you had",
    body: "Gelasio channels the comfortable warmth of Georgia with improved metrics for the web. Open Sans provides the neutral clarity that lets the content shine.",
    pullQuote: "Content is king.",
    micro: "Bill Gates",
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
