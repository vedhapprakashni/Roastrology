import { useState } from "react";
import { StarryBackground } from "@/components/StarryBackground";
import { RoastForm } from "@/components/RoastForm";
import { LoadingState } from "@/components/LoadingState";
import { RoastCard } from "@/components/RoastCard";
import { useRoast } from "@/hooks/useRoast";
import { ZodiacSign } from "@/lib/zodiac";

const Index = () => {
  const [currentSign, setCurrentSign] = useState<ZodiacSign | null>(null);
  const [currentNickname, setCurrentNickname] = useState<string>("");
  const { roast, isLoading, generateRoast } = useRoast();

  const handleSubmit = async (date: Date, nickname: string, sign: ZodiacSign) => {
    setCurrentSign(sign);
    setCurrentNickname(nickname);
    await generateRoast(sign, nickname);
  };

  const handleRetry = () => {
    if (currentSign) {
      generateRoast(currentSign, currentNickname);
    }
  };

  const handleReset = () => {
    setCurrentSign(null);
    setCurrentNickname("");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <StarryBackground />
      
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        {/* Header */}
        <header className="text-center mb-10 md:mb-16">
          <div className="inline-block animate-bounce-subtle mb-4">
            <span className="text-5xl md:text-7xl">🔮</span>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-gradient-chaos">
            Roastrology
          </h1>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Let the cosmos roast you based on your zodiac sign. 
            <span className="text-primary"> No mercy. </span>
            <span className="text-secondary">Just vibes.</span>
          </p>
        </header>

        {/* Main content */}
        <div className="max-w-3xl mx-auto">
          {!roast && !isLoading && (
            <div className="card-chaos rounded-2xl p-6 md:p-10 animate-fade-in-up">
              <RoastForm onSubmit={handleSubmit} isLoading={isLoading} />
            </div>
          )}

          {isLoading && (
            <div className="card-chaos rounded-2xl p-6 md:p-10">
              <LoadingState />
            </div>
          )}

          {roast && currentSign && !isLoading && (
            <div className="space-y-6">
              <RoastCard
                sign={currentSign}
                roast={roast}
                nickname={currentNickname}
                onRetry={handleRetry}
                isLoading={isLoading}
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
            Made with 🔥 and cosmic chaos • 
            <span className="text-primary"> No zodiac was harmed </span>
            in the making of these roasts
          </p>
        </footer>
      </div>
    </main>
  );
};

export default Index;
