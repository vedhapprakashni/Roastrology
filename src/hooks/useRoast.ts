import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ZodiacSign } from "@/lib/zodiac";
import { toast } from "sonner";

interface UseRoastReturn {
  roast: string | null;
  isLoading: boolean;
  error: string | null;
  generateRoast: (sign: ZodiacSign, nickname?: string, intensity?: number) => Promise<void>;
}

export function useRoast(): UseRoastReturn {
  const [roast, setRoast] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRoast = async (sign: ZodiacSign, nickname?: string, intensity: number = 2) => {
    setIsLoading(true);
    setError(null);
    setRoast(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("generate-roast", {
        body: {
          zodiacSign: sign.name,
          traits: sign.traits,
          nickname: nickname || undefined,
          intensity,
        },
      });

      if (fnError) {
        throw new Error(fnError.message || "Failed to generate roast");
      }

      if (data?.error) {
        throw new Error(data.error);
      }

      if (data?.roast) {
        setRoast(data.roast);
      } else {
        throw new Error("No roast received from the cosmos");
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Something went wrong!";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { roast, isLoading, error, generateRoast };
}
