import { ZodiacSign } from "@/lib/zodiac";
import { ZodiacTheme } from "@/lib/zodiacThemes";
import { ZodiacBadge } from "./ZodiacBadge";
import { VoiceRoast } from "./VoiceRoast";
import { ShareableCard } from "./ShareableCard";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Check, Shuffle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RoastCardProps {
  sign: ZodiacSign;
  roast: string;
  nickname?: string;
  onRetry: () => void;
  onDifferentAngle: () => void;
  isLoading: boolean;
  theme: ZodiacTheme;
}

export function RoastCard({ sign, roast, nickname, onRetry, onDifferentAngle, isLoading, theme }: RoastCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `✨ Roastrology: ${sign.name} Edition ✨\n\n${roast}\n\n🌸 Get roasted at roastrology.app`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Roast copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="rounded-3xl p-6 md:p-8 animate-fade-in-up max-w-2xl mx-auto backdrop-blur-xl"
      style={{
        background: `linear-gradient(135deg, hsl(0 0% 100% / 0.95), hsl(0 0% 100% / 0.85))`,
        border: `2px dashed ${theme.cardBorder}`,
        boxShadow: theme.glowColor,
      }}
    >
      {/* Theme indicator (static so it doesn't shake) */}
      <div className="flex justify-center gap-2 mb-4">
        {theme.emojis.slice(0, 5).map((emoji, i) => (
          <span key={i} className="text-xl opacity-80">
            {emoji}
          </span>
        ))}
      </div>

      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <ZodiacBadge sign={sign} size="lg" theme={theme} />
        {nickname && (
          <p className="text-muted-foreground font-display">
            aka <span className="font-bold" style={{ color: `hsl(${theme.accentHsl})` }}>{nickname}</span>
          </p>
        )}
        <p className="text-xs font-display text-muted-foreground/60">
          ✨ {theme.name} Theme ✨
        </p>
      </div>

      {/* Roast content */}
      <div className="bg-background/70 rounded-2xl p-5 md:p-6 mb-6 border border-primary/20 shadow-inner">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap font-body text-base md:text-lg">
          {roast}
        </p>
      </div>

      {/* Voice roast */}
      <div className="flex justify-center mb-6">
        <VoiceRoast text={roast} />
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <Button
          onClick={onRetry}
          disabled={isLoading}
          variant="outline"
          className="bg-card border-accent/50 hover:border-accent hover:bg-accent/20 text-accent-foreground font-display rounded-xl"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Roast me again
        </Button>

        <Button
          onClick={onDifferentAngle}
          disabled={isLoading}
          variant="outline"
          className="bg-card border-accent/50 hover:border-accent hover:bg-accent/20 text-accent-foreground font-display rounded-xl"
        >
          <Shuffle className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Different angle
        </Button>
        
        <Button
          onClick={handleCopy}
          variant="outline"
          className="bg-card border-highlight/50 hover:border-highlight hover:bg-highlight/20 text-highlight-foreground font-display rounded-xl"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>
      </div>

      {/* Instagram Story sharing */}
      <div className="border-t border-primary/20 pt-6">
        <p className="text-center text-sm text-muted-foreground font-display mb-4">
          Share your roast to Instagram Stories ✨
        </p>
        <ShareableCard sign={sign} roast={roast} nickname={nickname} />
      </div>
    </div>
  );
}
