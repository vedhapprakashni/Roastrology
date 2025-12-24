export interface ZodiacSign {
  name: string;
  symbol: string;
  emoji: string;
  element: string;
  dateRange: string;
  colorClass: string;
  traits: string[];
}

export const zodiacSigns: Record<string, ZodiacSign> = {
  aries: {
    name: "Aries",
    symbol: "♈",
    emoji: "🐏",
    element: "Fire",
    dateRange: "Mar 21 - Apr 19",
    colorClass: "text-zodiac-aries",
    traits: ["impulsive", "competitive", "hot-headed", "impatient", "aggressive"],
  },
  taurus: {
    name: "Taurus",
    symbol: "♉",
    emoji: "🐂",
    element: "Earth",
    dateRange: "Apr 20 - May 20",
    colorClass: "text-zodiac-taurus",
    traits: ["stubborn", "materialistic", "lazy", "possessive", "indulgent"],
  },
  gemini: {
    name: "Gemini",
    symbol: "♊",
    emoji: "👯",
    element: "Air",
    dateRange: "May 21 - Jun 20",
    colorClass: "text-zodiac-gemini",
    traits: ["two-faced", "inconsistent", "gossipy", "superficial", "restless"],
  },
  cancer: {
    name: "Cancer",
    symbol: "♋",
    emoji: "🦀",
    element: "Water",
    dateRange: "Jun 21 - Jul 22",
    colorClass: "text-zodiac-cancer",
    traits: ["moody", "clingy", "oversensitive", "manipulative", "passive-aggressive"],
  },
  leo: {
    name: "Leo",
    symbol: "♌",
    emoji: "🦁",
    element: "Fire",
    dateRange: "Jul 23 - Aug 22",
    colorClass: "text-zodiac-leo",
    traits: ["attention-seeking", "arrogant", "dramatic", "self-centered", "vain"],
  },
  virgo: {
    name: "Virgo",
    symbol: "♍",
    emoji: "👸",
    element: "Earth",
    dateRange: "Aug 23 - Sep 22",
    colorClass: "text-zodiac-virgo",
    traits: ["overcritical", "perfectionist", "anxious", "judgmental", "uptight"],
  },
  libra: {
    name: "Libra",
    symbol: "♎",
    emoji: "⚖️",
    element: "Air",
    dateRange: "Sep 23 - Oct 22",
    colorClass: "text-zodiac-libra",
    traits: ["indecisive", "people-pleaser", "superficial", "avoidant", "flaky"],
  },
  scorpio: {
    name: "Scorpio",
    symbol: "♏",
    emoji: "🦂",
    element: "Water",
    dateRange: "Oct 23 - Nov 21",
    colorClass: "text-zodiac-scorpio",
    traits: ["jealous", "secretive", "vengeful", "obsessive", "controlling"],
  },
  sagittarius: {
    name: "Sagittarius",
    symbol: "♐",
    emoji: "🏹",
    element: "Fire",
    dateRange: "Nov 22 - Dec 21",
    colorClass: "text-zodiac-sagittarius",
    traits: ["commitment-phobic", "tactless", "reckless", "preachy", "unreliable"],
  },
  capricorn: {
    name: "Capricorn",
    symbol: "♑",
    emoji: "🐐",
    element: "Earth",
    dateRange: "Dec 22 - Jan 19",
    colorClass: "text-zodiac-capricorn",
    traits: ["workaholic", "pessimistic", "cold", "condescending", "unforgiving"],
  },
  aquarius: {
    name: "Aquarius",
    symbol: "♒",
    emoji: "🏺",
    element: "Air",
    dateRange: "Jan 20 - Feb 18",
    colorClass: "text-zodiac-aquarius",
    traits: ["emotionally detached", "contrarian", "aloof", "unpredictable", "rebellious"],
  },
  pisces: {
    name: "Pisces",
    symbol: "♓",
    emoji: "🐟",
    element: "Water",
    dateRange: "Feb 19 - Mar 20",
    colorClass: "text-zodiac-pisces",
    traits: ["escapist", "delusional", "victim mentality", "overly emotional", "spacey"],
  },
};

export function getZodiacSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "aquarius";
  return "pisces";
}

export function getZodiacFromDate(date: Date): ZodiacSign {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const signKey = getZodiacSign(month, day);
  return zodiacSigns[signKey];
}
