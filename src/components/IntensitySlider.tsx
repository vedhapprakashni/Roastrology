import { Slider } from "@/components/ui/slider";

interface IntensitySliderProps {
  value: number;
  onChange: (value: number) => void;
}

const intensityLabels = [
  { label: "Gentle 🌸", emoji: "🌸" },
  { label: "Playful 😊", emoji: "😊" },
  { label: "Spicy 🌶️", emoji: "🌶️" },
  { label: "Savage 🔥", emoji: "🔥" },
  { label: "No Mercy 💀", emoji: "💀" },
];

export function IntensitySlider({ value, onChange }: IntensitySliderProps) {
  const currentIntensity = intensityLabels[value] || intensityLabels[2];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <label className="font-display text-sm text-foreground/70 block">
          How brutal should we be? 🎚️
        </label>
        <span className="font-display text-sm font-semibold text-primary">
          {currentIntensity.label}
        </span>
      </div>
      
      <div className="relative">
        <Slider
          value={[value]}
          onValueChange={(vals) => onChange(vals[0])}
          min={0}
          max={4}
          step={1}
          className="cursor-pointer"
        />
        
        {/* Emoji markers */}
        <div className="flex justify-between mt-2 px-1">
          {intensityLabels.map((item, index) => (
            <span
              key={index}
              className={`text-lg transition-all duration-200 ${
                value === index ? "scale-125 opacity-100" : "opacity-50"
              }`}
            >
              {item.emoji}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
