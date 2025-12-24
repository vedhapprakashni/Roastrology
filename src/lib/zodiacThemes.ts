import { ZodiacSign } from "./zodiac";

export interface ZodiacTheme {
  gradient: string;
  accentColor: string;
  accentHsl: string;
  emojis: string[];
  animation: string;
  glowColor: string;
  cardBorder: string;
  name: string;
}

export const zodiacThemes: Record<string, ZodiacTheme> = {
  aries: {
    gradient: "linear-gradient(135deg, hsl(0, 75%, 85%), hsl(25, 85%, 80%), hsl(45, 90%, 85%))",
    accentColor: "text-red-400",
    accentHsl: "0 75% 70%",
    emojis: ["🔥", "🐏", "⚡", "💥", "🌋"],
    animation: "animate-pulse-soft",
    glowColor: "0 0 30px hsl(0, 75%, 70% / 0.4)",
    cardBorder: "hsl(0, 75%, 75%)",
    name: "Fire Storm",
  },
  taurus: {
    gradient: "linear-gradient(135deg, hsl(140, 50%, 80%), hsl(120, 45%, 85%), hsl(100, 40%, 82%))",
    accentColor: "text-green-500",
    accentHsl: "140 50% 65%",
    emojis: ["🌿", "🐂", "💎", "🌸", "🍃"],
    animation: "animate-float",
    glowColor: "0 0 30px hsl(140, 50%, 65% / 0.4)",
    cardBorder: "hsl(140, 50%, 70%)",
    name: "Earth Garden",
  },
  gemini: {
    gradient: "linear-gradient(135deg, hsl(45, 85%, 82%), hsl(55, 90%, 85%), hsl(35, 80%, 80%))",
    accentColor: "text-yellow-500",
    accentHsl: "45 85% 65%",
    emojis: ["💫", "👯", "🌟", "🎭", "✨"],
    animation: "animate-wiggle",
    glowColor: "0 0 30px hsl(45, 85%, 65% / 0.4)",
    cardBorder: "hsl(45, 85%, 75%)",
    name: "Twin Sparkle",
  },
  cancer: {
    gradient: "linear-gradient(135deg, hsl(200, 70%, 85%), hsl(210, 75%, 88%), hsl(190, 65%, 82%))",
    accentColor: "text-blue-400",
    accentHsl: "200 70% 65%",
    emojis: ["🌊", "🦀", "🌙", "💙", "🐚"],
    animation: "animate-drift",
    glowColor: "0 0 30px hsl(200, 70%, 65% / 0.4)",
    cardBorder: "hsl(200, 70%, 75%)",
    name: "Ocean Wave",
  },
  leo: {
    gradient: "linear-gradient(135deg, hsl(35, 90%, 75%), hsl(45, 95%, 80%), hsl(25, 85%, 78%))",
    accentColor: "text-orange-400",
    accentHsl: "35 90% 60%",
    emojis: ["🔥", "🦁", "👑", "☀️", "💛"],
    animation: "animate-pulse-soft",
    glowColor: "0 0 40px hsl(35, 90%, 60% / 0.5)",
    cardBorder: "hsl(35, 90%, 70%)",
    name: "Royal Gold",
  },
  virgo: {
    gradient: "linear-gradient(135deg, hsl(140, 40%, 85%), hsl(130, 35%, 88%), hsl(150, 45%, 82%))",
    accentColor: "text-emerald-500",
    accentHsl: "140 40% 60%",
    emojis: ["🌾", "👸", "📚", "🍃", "💚"],
    animation: "animate-float",
    glowColor: "0 0 30px hsl(140, 40%, 60% / 0.4)",
    cardBorder: "hsl(140, 40%, 70%)",
    name: "Forest Calm",
  },
  libra: {
    gradient: "linear-gradient(135deg, hsl(300, 60%, 88%), hsl(320, 55%, 85%), hsl(280, 50%, 90%))",
    accentColor: "text-pink-400",
    accentHsl: "300 60% 70%",
    emojis: ["⚖️", "🌸", "💖", "🦋", "🎀"],
    animation: "animate-bounce-soft",
    glowColor: "0 0 30px hsl(300, 60%, 70% / 0.4)",
    cardBorder: "hsl(300, 60%, 80%)",
    name: "Pink Balance",
  },
  scorpio: {
    gradient: "linear-gradient(135deg, hsl(350, 55%, 75%), hsl(340, 50%, 78%), hsl(320, 45%, 80%))",
    accentColor: "text-rose-500",
    accentHsl: "350 55% 55%",
    emojis: ["🦂", "🖤", "🔮", "🌑", "💀"],
    animation: "animate-pulse-soft",
    glowColor: "0 0 35px hsl(350, 55%, 55% / 0.5)",
    cardBorder: "hsl(350, 55%, 65%)",
    name: "Dark Mystery",
  },
  sagittarius: {
    gradient: "linear-gradient(135deg, hsl(280, 60%, 82%), hsl(290, 55%, 85%), hsl(270, 50%, 88%))",
    accentColor: "text-purple-500",
    accentHsl: "280 60% 65%",
    emojis: ["🏹", "🌈", "🔥", "✈️", "💜"],
    animation: "animate-wiggle",
    glowColor: "0 0 30px hsl(280, 60%, 65% / 0.4)",
    cardBorder: "hsl(280, 60%, 75%)",
    name: "Adventure Purple",
  },
  capricorn: {
    gradient: "linear-gradient(135deg, hsl(220, 30%, 80%), hsl(210, 25%, 82%), hsl(230, 35%, 85%))",
    accentColor: "text-slate-500",
    accentHsl: "220 30% 55%",
    emojis: ["🐐", "🏔️", "💼", "⏰", "🖤"],
    animation: "animate-float",
    glowColor: "0 0 30px hsl(220, 30%, 55% / 0.4)",
    cardBorder: "hsl(220, 30%, 70%)",
    name: "Mountain Stone",
  },
  aquarius: {
    gradient: "linear-gradient(135deg, hsl(195, 75%, 82%), hsl(200, 70%, 85%), hsl(185, 65%, 80%))",
    accentColor: "text-cyan-500",
    accentHsl: "195 75% 60%",
    emojis: ["🏺", "⚡", "🌊", "👽", "💙"],
    animation: "animate-twinkle",
    glowColor: "0 0 30px hsl(195, 75%, 60% / 0.4)",
    cardBorder: "hsl(195, 75%, 70%)",
    name: "Electric Blue",
  },
  pisces: {
    gradient: "linear-gradient(135deg, hsl(250, 60%, 85%), hsl(260, 55%, 88%), hsl(240, 50%, 82%))",
    accentColor: "text-indigo-400",
    accentHsl: "250 60% 70%",
    emojis: ["🐟", "🌊", "🔮", "🌙", "💜"],
    animation: "animate-drift",
    glowColor: "0 0 30px hsl(250, 60%, 70% / 0.4)",
    cardBorder: "hsl(250, 60%, 78%)",
    name: "Dreamy Waves",
  },
};

export function getZodiacTheme(sign: ZodiacSign): ZodiacTheme {
  const key = sign.name.toLowerCase();
  return zodiacThemes[key] || zodiacThemes.aries;
}
