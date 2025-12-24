import { ZodiacSign } from "@/lib/zodiac";
import { cn } from "@/lib/utils";

interface ZodiacBadgeProps {
  sign: ZodiacSign;
  size?: "sm" | "md" | "lg";
}

export function ZodiacBadge({ sign, size = "md" }: ZodiacBadgeProps) {
  const sizeClasses = {
    sm: "text-3xl p-3",
    md: "text-5xl p-4",
    lg: "text-7xl p-6",
  };

  return (
    <div className="flex flex-col items-center gap-2 animate-scale-in">
      <div
        className={cn(
          "rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary/50 glow-pink animate-pulse-glow",
          sizeClasses[size]
        )}
      >
        <span className="animate-float inline-block">{sign.emoji}</span>
      </div>
      <div className="text-center">
        <h2 className={cn("font-display font-bold text-gradient-chaos", {
          "text-xl": size === "sm",
          "text-2xl": size === "md", 
          "text-4xl": size === "lg",
        })}>
          {sign.name}
        </h2>
        <p className="text-muted-foreground text-sm">{sign.symbol} {sign.dateRange}</p>
      </div>
    </div>
  );
}
