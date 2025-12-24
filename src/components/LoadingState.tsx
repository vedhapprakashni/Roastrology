import { useEffect, useState } from "react";

const loadingMessages = [
  "Consulting the stars ✨",
  "Channeling cosmic energy 🌙",
  "Reading your birth chart 📜",
  "Summoning astral sass 💅",
  "Aligning the roast planets 🪐",
  "Brewing celestial tea ☕",
  "Downloading your drama 📡",
];

export function LoadingState() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      {/* Spinning zodiac wheel */}
      <div className="relative">
        <div className="w-24 h-24 rounded-full border-4 border-primary/30 animate-spin-slow" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-4xl animate-bounce-subtle">🔮</span>
        </div>
        {/* Orbiting stars */}
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg animate-sparkle">✨</div>
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 text-lg animate-sparkle" style={{ animationDelay: "0.5s" }}>⭐</div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-lg animate-sparkle" style={{ animationDelay: "1s" }}>🌟</div>
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 text-lg animate-sparkle" style={{ animationDelay: "1.5s" }}>💫</div>
      </div>

      {/* Loading message */}
      <p className="font-display text-xl text-primary animate-pulse">
        {loadingMessages[messageIndex]}
      </p>
    </div>
  );
}
