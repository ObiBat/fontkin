import {
  Inter,
  Playfair_Display,
  Lora,
  Source_Serif_4,
  Cormorant_Garamond,
  Libre_Baskerville,
  Space_Grotesk,
  DM_Sans,
  Plus_Jakarta_Sans,
  Manrope,
  Outfit,
  Fraunces,
  Instrument_Serif,
  JetBrains_Mono,
  IBM_Plex_Mono,
  // New fonts
  Fira_Code,
  Source_Code_Pro,
  Roboto_Mono,
  Space_Mono,
  Merriweather,
  Crimson_Pro,
  EB_Garamond,
  Spectral,
  Bitter,
  Vollkorn,
  Alegreya,
  Gelasio,
  Literata,
  Work_Sans,
  Rubik,
  Nunito,
  Open_Sans,
  Raleway,
  Montserrat,
  Poppins,
  Karla,
  Archivo,
  Sora,
  Figtree,
  Bebas_Neue,
  Oswald,
  Anton,
  Abril_Fatface,
  Righteous,
  Big_Shoulders_Display,
  Chivo,
  Lexend,
  Atkinson_Hyperlegible,
  // Additional fonts for combos
  Lato,
  Roboto,
  Libre_Caslon_Text,
  Jost,
} from "next/font/google";

// Primary UI font
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// === SERIF FONTS ===
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
});

export const lora = Lora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lora",
});

export const sourceSerif4 = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-serif",
});

export const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-cormorant",
});

export const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-baskerville",
});

export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-instrument-serif",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

export const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  variable: "--font-merriweather",
});

export const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-crimson-pro",
});

export const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-eb-garamond",
});

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-spectral",
});

export const bitter = Bitter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bitter",
});

export const vollkorn = Vollkorn({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-vollkorn",
});

export const alegreya = Alegreya({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-alegreya",
});

export const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-gelasio",
});

export const literata = Literata({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-literata",
});

// === SANS FONTS ===
export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
});

export const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work-sans",
});

export const rubik = Rubik({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

export const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
});

export const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-poppins",
});

export const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-karla",
});

export const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

export const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const figtree = Figtree({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-figtree",
});

export const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

export const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

export const atkinsonHyperlegible = Atkinson_Hyperlegible({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-atkinson",
});

// === ADDITIONAL SANS FONTS ===
export const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
  variable: "--font-lato",
});

export const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  variable: "--font-roboto",
});

export const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

// === ADDITIONAL SERIF FONTS ===
export const libreCaslonText = Libre_Caslon_Text({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-libre-caslon",
});

// === DISPLAY FONTS ===
export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bebas",
});

export const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-oswald",
});

export const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-anton",
});

export const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-abril",
});

export const righteous = Righteous({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-righteous",
});

export const bigShouldersDisplay = Big_Shoulders_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-big-shoulders",
});

// === MONO FONTS ===
export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-mono",
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fira-code",
});

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-source-code",
});

export const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

// Combined class string for all font variables
export const fontVariables = [
  // Primary
  inter.variable,
  // Serifs
  playfairDisplay.variable,
  lora.variable,
  sourceSerif4.variable,
  cormorantGaramond.variable,
  libreBaskerville.variable,
  instrumentSerif.variable,
  fraunces.variable,
  merriweather.variable,
  crimsonPro.variable,
  ebGaramond.variable,
  spectral.variable,
  bitter.variable,
  vollkorn.variable,
  alegreya.variable,
  gelasio.variable,
  literata.variable,
  // Sans
  spaceGrotesk.variable,
  dmSans.variable,
  plusJakartaSans.variable,
  manrope.variable,
  outfit.variable,
  workSans.variable,
  rubik.variable,
  nunito.variable,
  openSans.variable,
  raleway.variable,
  montserrat.variable,
  poppins.variable,
  karla.variable,
  archivo.variable,
  sora.variable,
  figtree.variable,
  chivo.variable,
  lexend.variable,
  atkinsonHyperlegible.variable,
  lato.variable,
  roboto.variable,
  jost.variable,
  libreCaslonText.variable,
  // Display
  bebasNeue.variable,
  oswald.variable,
  anton.variable,
  abrilFatface.variable,
  righteous.variable,
  bigShouldersDisplay.variable,
  // Mono
  jetbrainsMono.variable,
  ibmPlexMono.variable,
  firaCode.variable,
  sourceCodePro.variable,
  robotoMono.variable,
  spaceMono.variable,
].join(" ");

// Map font IDs to CSS variable names
export const fontIdToVariable: Record<string, string> = {
  // Primary
  "inter": "var(--font-inter)",
  // Serifs
  "playfair-display": "var(--font-playfair)",
  "lora": "var(--font-lora)",
  "source-serif-4": "var(--font-source-serif)",
  "cormorant-garamond": "var(--font-cormorant)",
  "libre-baskerville": "var(--font-baskerville)",
  "instrument-serif": "var(--font-instrument-serif)",
  "fraunces": "var(--font-fraunces)",
  "merriweather": "var(--font-merriweather)",
  "crimson-pro": "var(--font-crimson-pro)",
  "eb-garamond": "var(--font-eb-garamond)",
  "spectral": "var(--font-spectral)",
  "bitter": "var(--font-bitter)",
  "vollkorn": "var(--font-vollkorn)",
  "alegreya": "var(--font-alegreya)",
  "gelasio": "var(--font-gelasio)",
  "literata": "var(--font-literata)",
  // Sans
  "space-grotesk": "var(--font-space-grotesk)",
  "dm-sans": "var(--font-dm-sans)",
  "plus-jakarta-sans": "var(--font-jakarta)",
  "manrope": "var(--font-manrope)",
  "outfit": "var(--font-outfit)",
  "work-sans": "var(--font-work-sans)",
  "rubik": "var(--font-rubik)",
  "nunito": "var(--font-nunito)",
  "open-sans": "var(--font-open-sans)",
  "raleway": "var(--font-raleway)",
  "montserrat": "var(--font-montserrat)",
  "poppins": "var(--font-poppins)",
  "karla": "var(--font-karla)",
  "archivo": "var(--font-archivo)",
  "sora": "var(--font-sora)",
  "figtree": "var(--font-figtree)",
  "geist-sans": "var(--font-inter)", // Fallback to Inter for now
  "cabinet-grotesk": "var(--font-space-grotesk)", // Fallback
  "general-sans": "var(--font-dm-sans)", // Fallback
  "chivo": "var(--font-chivo)",
  "lexend": "var(--font-lexend)",
  "atkinson-hyperlegible": "var(--font-atkinson)",
  "lato": "var(--font-lato)",
  "roboto": "var(--font-roboto)",
  "jost": "var(--font-jost)",
  "libre-caslon-text": "var(--font-libre-caslon)",
  // Display
  "bebas-neue": "var(--font-bebas)",
  "oswald": "var(--font-oswald)",
  "anton": "var(--font-anton)",
  "abril-fatface": "var(--font-abril)",
  "righteous": "var(--font-righteous)",
  "big-shoulders-display": "var(--font-big-shoulders)",
  "clash-display": "var(--font-space-grotesk)", // Fallback
  // Mono
  "jetbrains-mono": "var(--font-jetbrains)",
  "ibm-plex-mono": "var(--font-ibm-mono)",
  "fira-code": "var(--font-fira-code)",
  "source-code-pro": "var(--font-source-code)",
  "roboto-mono": "var(--font-roboto-mono)",
  "space-mono": "var(--font-space-mono)",
};

// Get font family style for a font ID
export function getFontStyle(fontId: string): React.CSSProperties {
  const variable = fontIdToVariable[fontId];
  if (!variable) return {};
  return { fontFamily: variable };
}
