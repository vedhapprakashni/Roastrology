import { useState } from "react";
import { DatePicker } from "./DatePicker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";
import { getZodiacFromDate, ZodiacSign } from "@/lib/zodiac";

interface RoastFormProps {
  onSubmit: (date: Date, nickname: string, sign: ZodiacSign) => void;
  isLoading: boolean;
}

export function RoastForm({ onSubmit, isLoading }: RoastFormProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [nickname, setNickname] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date) return;
    
    const sign = getZodiacFromDate(date);
    onSubmit(date, nickname.trim(), sign);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5">
      <div className="space-y-2">
        <label className="font-display text-sm text-muted-foreground block">
          When were you cursed upon this earth? 📅
        </label>
        <DatePicker date={date} onDateChange={setDate} />
      </div>

      <div className="space-y-2">
        <label className="font-display text-sm text-muted-foreground block">
          What should we call you? (optional) 😈
        </label>
        <Input
          type="text"
          placeholder="Enter your name or nickname"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          maxLength={30}
          className="h-14 text-lg font-display bg-card/50 border-primary/30 focus:border-primary placeholder:text-muted-foreground/50"
        />
      </div>

      <Button
        type="submit"
        disabled={!date || isLoading}
        className="w-full h-14 btn-chaos text-primary-foreground font-display font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Sparkles className="mr-2 h-5 w-5" />
        {isLoading ? "Summoning the roast..." : "Roast Me! 🔥"}
      </Button>
    </form>
  );
}
