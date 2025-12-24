import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { IntensitySlider } from "./IntensitySlider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { getZodiacFromDate, ZodiacSign } from "@/lib/zodiac";

interface RoastFormProps {
  onSubmit: (date: Date, nickname: string, sign: ZodiacSign, intensity: number) => void;
  isLoading: boolean;
}

export function RoastForm({ onSubmit, isLoading }: RoastFormProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [nickname, setNickname] = useState("");
  const [intensity, setIntensity] = useState(2); // Default to middle (Spicy)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    
    const sign = getZodiacFromDate(date);
    onSubmit(date, nickname.trim(), sign, intensity);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-6">
      <div className="space-y-2">
        <label className="font-display text-sm text-foreground/70 flex items-center gap-2">
          <span>📅</span> When were you cursed upon this earth? <span>🎂</span>
        </label>
        <DatePicker date={date} onDateChange={setDate} />
      </div>

      <div className="space-y-2">
        <label className="font-display text-sm text-foreground/70 flex items-center gap-2">
          <span>👤</span> What should we call you? (optional) <span>🥺</span>
        </label>
        <Input
          type="text"
          placeholder="Enter your name or nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={30}
          className="h-14 text-lg font-display bg-card border-primary/30 focus:border-primary placeholder:text-muted-foreground/50 rounded-2xl"
        />
      </div>

      <IntensitySlider value={intensity} onChange={setIntensity} />

      <Button
        type="submit"
        disabled={!date || isLoading}
        className="w-full h-14 btn-fairy text-primary-foreground font-display font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isLoading ? "Summoning the roast..." : "Roast Me! ✨"}
      </Button>
    </form>
  );
}
