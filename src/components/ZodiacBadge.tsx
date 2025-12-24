import { ZodiacSign } from "@/lib/zodiac";
import { ZodiacTheme } from "@/lib/zodiacThemes";
import { cn } from "@/lib/utils";

interface ZodiacBadgeProps {
  sign: ZodiacSign;
  size?: "sm" | "md" | "lg";
  theme?: ZodiacTheme;
}

export function ZodiacBadge({ sign, size = "md", theme }: ZodiacBadgeProps) {
  const sizeClasses = {
    sm: "text-3xl p-3",
    md: "text-5xl p-4",
    lg: "text-7xl p-6",
  };

  return (
    <div className="flex flex-col items-center gap-2 animate-scale-in">
      <div
        className={cn(
          "rounded-full border-2 transition-all duration-500",
          theme ? theme.animation : "animate-pulse-soft",
          sizeClasses[size]
        )}
        style={theme ? {
          background: `linear-gradient(135deg, hsl(${theme.accentHsl} / 0.2), hsl(${theme.accentHsl} / 0.1))`,
          borderColor: `hsl(${theme.accentHsl} / 0.5)`,
          boxShadow: theme.glowColor,
        } : {
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.2), hsl(var(--accent) / 0.2))',
          borderColor: 'hsl(var(--primary) / 0.5)',
        }}
      >
        <span className="animate-float inline-block">{sign.emoji}</span>
      </div>
      <div className="text-center">
        <h2 
          className={cn("font-display font-bold", {
            "text-xl": size === "sm",
            "text-2xl": size === "md", 
            "text-4xl": size === "lg",
          })}
          style={theme ? { color: `hsl(${theme.accentHsl})` } : undefined}
        >
          {sign.name}
        </h2>
        <p className="text-muted-foreground text-sm">{sign.symbol} {sign.dateRange}</p>
      </div>
    </div>
  );
}
