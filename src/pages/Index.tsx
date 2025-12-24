import { useState, useEffect } from "react";
import { FairyBackground } from "@/components/FairyBackground";
import { RoastForm } from "@/components/RoastForm";
import { LoadingState } from "@/components/LoadingState";
import { RoastCard } from "@/components/RoastCard";
import { useRoast } from "@/hooks/useRoast";
import { ZodiacSign } from "@/lib/zodiac";
import { getZodiacTheme, ZodiacTheme } from "@/lib/zodiacThemes";

const Index = () => {
  const [currentSign, setCurrentSign] = useState<ZodiacSign | null>(null);
  const [currentNickname, setCurrentNickname] = useState<string>("");
  const [currentIntensity, setCurrentIntensity] = useState<number>(2);
  const [currentTheme, setCurrentTheme] = useState<ZodiacTheme | null>(null);
  const { roast, isLoading, generateRoast, clearRoast } = useRoast();

  const handleSubmit = async (date: Date, nickname: string, sign: ZodiacSign, intensity: number) => {
    setCurrentSign(sign);
    setCurrentNickname(nickname);
    setCurrentIntensity(intensity);
    setCurrentTheme(getZodiacTheme(sign));
    await generateRoast(sign, nickname, intensity);
  };

  const handleRetry = () => {
    if (currentSign) {
      generateRoast(currentSign, currentNickname, currentIntensity);
    }
  };

  const handleDifferentAngle = () => {
    if (currentSign) {
      generateRoast(currentSign, currentNickname, currentIntensity, true);
    }
  };

  const handleReset = () => {
    setCurrentSign(null);
    setCurrentNickname("");
    setCurrentIntensity(2);
    setCurrentTheme(null);
    clearRoast();
  };

  // Apply dynamic theme to document
  useEffect(() => {
    if (currentTheme) {
      document.documentElement.style.setProperty('--dynamic-gradient', currentTheme.gradient);
      document.documentElement.style.setProperty('--dynamic-accent', currentTheme.accentHsl);
      document.documentElement.style.setProperty('--dynamic-glow', currentTheme.glowColor);
      document.documentElement.style.setProperty('--dynamic-border', currentTheme.cardBorder);
    } else {
      document.documentElement.style.removeProperty('--dynamic-gradient');
      document.documentElement.style.removeProperty('--dynamic-accent');
      document.documentElement.style.removeProperty('--dynamic-glow');
      document.documentElement.style.removeProperty('--dynamic-border');
    }
  }, [currentTheme]);

  return (
    <main 
      className="relative min-h-screen overflow-hidden transition-all duration-700"
      style={currentTheme ? { background: currentTheme.gradient } : undefined}
    >
      <FairyBackground theme={currentTheme} />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <div className="inline-block animate-bounce-soft mb-4">
            <span className="text-5xl md:text-7xl">✨</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 text-gradient-fairy">
            Roastrology
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Let the cosmos roast you based on your zodiac sign. 
            <span className="text-primary font-semibold"> No mercy. </span>
            <span className="text-secondary font-semibold">Just vibes.</span>
          </p>
        </header>

        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          {!roast && !isLoading && (
            <div className="card-fairy rounded-3xl p-6 md:p-10 animate-fade-in-up">
              <RoastForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <div className="card-fairy rounded-3xl p-6 md:p-10">
              <LoadingState />
            </div>
          )}

          {roast && currentSign && !isLoading && currentTheme && (
            <div className="space-y-6">
              <RoastCard
                sign={currentSign}
                roast={roast}
                nickname={currentNickname}
                onRetry={handleRetry}
                onDifferentAngle={handleDifferentAngle}
                isLoading={isLoading}
                theme={currentTheme}
              />
              
              <div className="text-center">
                <button
                  onClick={handleReset}
                  className="text-muted-foreground hover:text-primary transition-colors font-display text-sm underline underline-offset-4"
                >
                  ← Try a different birthday
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="text-center mt-16 text-muted-foreground text-sm font-body">
          <p>
            Made with 🌸 and cosmic magic • 
            <span className="text-primary"> No zodiac was harmed </span>
            in the making of these roasts
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
