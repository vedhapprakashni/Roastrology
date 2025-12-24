import { ZodiacSign } from "@/lib/zodiac";
import { ZodiacBadge } from "./ZodiacBadge";
import { Button } from "@/components/ui/button";
import { Copy, RefreshCw, Share2, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface RoastCardProps {
  sign: ZodiacSign;
  roast: string;
  nickname?: string;
  onRetry: () => void;
  isLoading: boolean;
}

export function RoastCard({ sign, roast, nickname, onRetry, isLoading }: RoastCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const textToCopy = `🔮 Roastrology: ${sign.name} Edition 🔮\n\n${roast}\n\n✨ Get roasted at roastrology.app`;
    await navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast.success("Roast copied to clipboard! 📋");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    const shareText = `I just got ROASTED by Roastrology as a ${sign.name}! 🔥😭\n\n${roast.slice(0, 200)}...\n\nGet your cosmic roast: `;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Roastrology - ${sign.name} Roast`,
          text: shareText,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled or error
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className="card-chaos rounded-2xl p-6 md:p-8 animate-fade-in-up max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-col items-center gap-4 mb-6">
        <ZodiacBadge sign={sign} size="lg" />
        {nickname && (
          <p className="text-muted-foreground font-display">
            aka <span className="text-secondary font-bold">{nickname}</span>
          </p>
        )}
      </div>

      {/* Roast content */}
      <div className="bg-background/50 rounded-xl p-5 md:p-6 mb-6 border border-primary/20">
        <p className="text-foreground leading-relaxed whitespace-pre-wrap font-body text-base md:text-lg">
          {roast}
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={onRetry}
          disabled={isLoading}
          variant="outline"
          className="bg-card/50 border-secondary/50 hover:border-secondary hover:bg-secondary/20 text-secondary font-display"
        >
          <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
          Roast me again
        </Button>
        
        <Button
          onClick={handleCopy}
          variant="outline"
          className="bg-card/50 border-accent/50 hover:border-accent hover:bg-accent/20 text-accent font-display"
        >
          {copied ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <Copy className="mr-2 h-4 w-4" />
          )}
          {copied ? "Copied!" : "Copy"}
        </Button>

        <Button
          onClick={handleShare}
          className="btn-chaos text-primary-foreground font-display font-bold"
        >
          <Share2 className="mr-2 h-4 w-4" />
          Share the pain
        </Button>
      </div>
    </div>
  );
}
