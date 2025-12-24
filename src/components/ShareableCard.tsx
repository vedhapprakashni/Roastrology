import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Button } from "@/components/ui/button";
import { Download, Instagram, Loader2 } from "lucide-react";
import { ZodiacSign } from "@/lib/zodiac";
import { toast } from "sonner";

interface ShareableCardProps {
  sign: ZodiacSign;
  roast: string;
  nickname?: string;
}

export function ShareableCard({ sign, roast, nickname }: ShareableCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const truncatedRoast = roast.length > 400 ? roast.slice(0, 397) + "..." : roast;

  const generateImage = async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;

    try {
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: undefined,
      });
      
      const response = await fetch(dataUrl);
      return await response.blob();
    } catch (error) {
      console.error("Error generating image:", error);
      return null;
    }
  };

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImage();
      if (!blob) throw new Error("Failed to generate image");

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `roastrology-${sign.name.toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Story card downloaded! 📸");
    } catch (error) {
      toast.error("Failed to generate image");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShareInstagram = async () => {
    setIsGenerating(true);
    try {
      const blob = await generateImage();
      if (!blob) throw new Error("Failed to generate image");

      // Check if Web Share API with files is supported
      if (navigator.share && navigator.canShare?.({ files: [new File([blob], "roast.png", { type: "image/png" })] })) {
        const file = new File([blob], `roastrology-${sign.name.toLowerCase()}.png`, { type: "image/png" });
        await navigator.share({
          files: [file],
          title: "My Roastrology Roast ✨",
        });
      } else {
        // Fallback: download the image
        await handleDownload();
        toast.info("Image downloaded! Open Instagram and share from your gallery 📱");
      }
    } catch (error) {
      if ((error as Error).name !== "AbortError") {
        toast.error("Failed to share. Try downloading instead!");
      }
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Hidden card for image generation - Instagram Story size 1080x1920 (9:16 ratio) */}
      <div className="overflow-hidden" style={{ height: 0 }}>
        <div
          ref={cardRef}
          className="flex flex-col items-center justify-center p-8 text-center"
          style={{
            width: "540px",
            height: "960px",
            background: "linear-gradient(165deg, #FFE1E9 0%, #E8D5F0 35%, #D4E5F7 65%, #E8F4E5 100%)",
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-8 left-8 text-4xl opacity-60">✧</div>
          <div className="absolute top-12 right-12 text-3xl opacity-50">✦</div>
          <div className="absolute bottom-16 left-16 text-5xl opacity-40">🦋</div>
          <div className="absolute bottom-20 right-10 text-4xl opacity-50">💫</div>

          {/* Header */}
          <div className="mb-6">
            <p className="text-6xl mb-2">{sign.emoji}</p>
            <h2 
              className="text-4xl font-bold"
              style={{ 
                fontFamily: "Nunito, sans-serif",
                background: "linear-gradient(135deg, #E879A0, #A78BDA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {sign.name}
            </h2>
            {nickname && (
              <p className="text-lg text-gray-600 mt-1" style={{ fontFamily: "Quicksand, sans-serif" }}>
                @{nickname}
              </p>
            )}
          </div>

          {/* Roast content */}
          <div 
            className="bg-white/70 rounded-3xl p-6 mx-4 shadow-lg"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <p 
              className="text-gray-700 text-base leading-relaxed"
              style={{ fontFamily: "Quicksand, sans-serif" }}
            >
              {truncatedRoast}
            </p>
          </div>

          {/* Branding */}
          <div className="mt-6 flex flex-col items-center">
            <p 
              className="text-2xl font-bold"
              style={{ 
                fontFamily: "Nunito, sans-serif",
                background: "linear-gradient(135deg, #E879A0, #A78BDA)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ✨ Roastrology ✨
            </p>
            <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: "Quicksand, sans-serif" }}>
              Get your cosmic roast
            </p>
          </div>
        </div>
      </div>

      {/* Share buttons */}
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          onClick={handleDownload}
          disabled={isGenerating}
          variant="outline"
          className="bg-card border-secondary/50 hover:border-secondary hover:bg-secondary/20 text-secondary-foreground font-display"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Download className="mr-2 h-4 w-4" />
          )}
          Download Story
        </Button>

        <Button
          onClick={handleShareInstagram}
          disabled={isGenerating}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground font-display font-bold"
        >
          {isGenerating ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Instagram className="mr-2 h-4 w-4" />
          )}
          Share to Stories
        </Button>
      </div>
    </div>
  );
}
