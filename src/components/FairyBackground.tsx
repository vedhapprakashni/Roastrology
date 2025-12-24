import { useEffect, useState } from "react";
import { ZodiacTheme } from "@/lib/zodiacThemes";

interface Doodle {
  id: number;
  type: "sparkle" | "star" | "heart" | "butterfly" | "crystal" | "wand";
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  rotation: number;
}

interface MagicBall {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  delay: number;
}

interface FairyBackgroundProps {
  theme?: ZodiacTheme | null;
}

const defaultPastelColors = [
  "rgba(245, 194, 231, 0.4)", // pink
  "rgba(203, 195, 227, 0.4)", // lavender
  "rgba(178, 226, 220, 0.4)", // mint
  "rgba(255, 218, 185, 0.4)", // peach
  "rgba(186, 225, 255, 0.4)", // sky blue
];

const DoodleIcon = ({ type }: { type: Doodle["type"] }) => {
  switch (type) {
    case "sparkle":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full text-primary/40">
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      );
    case "star":
      return <span className="text-highlight/50">✦</span>;
    case "heart":
      return <span className="text-primary/30">♡</span>;
    case "butterfly":
      return <span className="text-secondary/40">🦋</span>;
    case "crystal":
      return <span className="text-accent/40">💎</span>;
    case "wand":
      return <span className="text-highlight/40">✨</span>;
    default:
      return null;
  }
};

export function FairyBackground({ theme }: FairyBackgroundProps) {
  const [doodles, setDoodles] = useState<Doodle[]>([]);
  const [magicBalls, setMagicBalls] = useState<MagicBall[]>([]);

  // Get colors based on theme or defaults
  const getThemeColors = () => {
    if (theme) {
      const hsl = theme.accentHsl;
      return [
        `hsla(${hsl} / 0.3)`,
        `hsla(${hsl} / 0.25)`,
        `hsla(${hsl} / 0.2)`,
        `hsla(${hsl} / 0.35)`,
        `hsla(${hsl} / 0.15)`,
      ];
    }
    return defaultPastelColors;
  };

  useEffect(() => {
    const types: Doodle["type"][] = ["sparkle", "star", "heart", "butterfly", "crystal", "wand"];
    
    const newDoodles: Doodle[] = [];
    for (let i = 0; i < 25; i++) {
      newDoodles.push({
        id: i,
        type: types[Math.floor(Math.random() * types.length)],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 15,
        delay: Math.random() * 5,
        duration: Math.random() * 3 + 3,
        rotation: Math.random() * 360,
      });
    }
    setDoodles(newDoodles);
  }, []);

  useEffect(() => {
    const colors = getThemeColors();
    const newBalls: MagicBall[] = [];
    for (let i = 0; i < 8; i++) {
      newBalls.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 150 + 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 3,
      });
    }
    setMagicBalls(newBalls);
  }, [theme]);

  return (
    <div className="fairy-bg">
      {/* Magic gradient balls - static, no animation */}
      {magicBalls.map((ball) => (
        <div
          key={`ball-${ball.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${ball.x}%`,
            top: `${ball.y}%`,
            width: `${ball.size}px`,
            height: `${ball.size}px`,
            background: `radial-gradient(circle, ${ball.color}, transparent)`,
          }}
        />
      ))}

      {/* Fairy doodles - static decorations */}
      {doodles.slice(0, 12).map((doodle) => (
        <div
          key={doodle.id}
          className="absolute opacity-40"
          style={{
            left: `${doodle.x}%`,
            top: `${doodle.y}%`,
            width: `${doodle.size}px`,
            height: `${doodle.size}px`,
            transform: `rotate(${doodle.rotation}deg)`,
            fontSize: `${doodle.size}px`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DoodleIcon type={doodle.type} />
        </div>
      ))}

      {/* Theme emojis - static */}
      {theme && theme.emojis.slice(0, 3).map((emoji, i) => (
        <div
          key={`emoji-${i}`}
          className="absolute text-3xl opacity-20"
          style={{
            left: `${15 + i * 30}%`,
            top: `${20 + (i % 2) * 40}%`,
          }}
        >
          {emoji}
        </div>
      ))}
    </div>
  );
}
