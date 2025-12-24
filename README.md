# ✨ Roastrology - AI-Powered Zodiac Roast Generator

<div align="center">
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Supabase-Cloud-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
</div>

<br />

A whimsical, pastel-themed web app that generates personalized AI-powered roasts based on your zodiac sign. Enter your birthday, pick an intensity level, and let the cosmos (and AI) roast you! 🔥✨

---

## 🌟 Features

### 🎂 Birthday-Based Zodiac Detection
- Automatically determines your zodiac sign from your birthdate
- Displays zodiac symbol, emoji, element, and personality traits
- Beautiful zodiac-themed card styling for each sign

### 🔥 Adjustable Roast Intensity
- **Mild** 🌸 - Gentle, playful teasing
- **Medium** 🌶️ - Balanced wit and humor
- **Spicy** 🔥 - Sharp observations
- **Nuclear** ☢️ - No mercy (with optional profanity)

### 🎨 Dynamic Theming
- Each zodiac sign has unique color palettes and gradients
- Pastel fairy aesthetic with soft shadows and glows
- Responsive design optimized for all devices
- Custom animations and micro-interactions

### 🤖 AI-Powered Roasts
- Powered by Lovable AI (Gemini 2.5 Flash)
- Context-aware roasts based on zodiac traits
- Optional nickname personalization
- "Different Angle" button for fresh perspectives

### 📤 Shareable Cards
- Generate beautiful shareable roast cards
- Download as image functionality
- Social media ready format

### 🎭 Whimsical UI Elements
- Fairy-themed background decorations
- Zodiac badges with element indicators
- Custom loading states with cosmic messaging
- Voice roast capability (TTS)

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| **Frontend** | React 18, TypeScript |
| **Styling** | Tailwind CSS, shadcn/ui |
| **Build Tool** | Vite |
| **Backend** | Supabase Edge Functions |
| **AI** | Lovable AI Gateway (Gemini 2.5 Flash) |
| **State Management** | TanStack React Query |
| **Routing** | React Router DOM |
| **Fonts** | Quicksand (Display), Nunito (Body) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── DatePicker.tsx   # Birthday selection
│   ├── FairyBackground.tsx  # Animated background
│   ├── IntensitySlider.tsx  # Roast intensity control
│   ├── LoadingState.tsx     # Loading animations
│   ├── RoastCard.tsx        # Roast display card
│   ├── RoastForm.tsx        # Main input form
│   ├── ShareableCard.tsx    # Downloadable card
│   ├── VoiceRoast.tsx       # Text-to-speech
│   └── ZodiacBadge.tsx      # Zodiac sign badge
├── hooks/
│   └── useRoast.ts      # Roast generation hook
├── lib/
│   ├── zodiac.ts        # Zodiac sign data & utils
│   ├── zodiacThemes.ts  # Sign-specific theming
│   └── utils.ts         # Utility functions
├── pages/
│   ├── Index.tsx        # Main app page
│   └── NotFound.tsx     # 404 page
└── index.css            # Design system & animations

supabase/
└── functions/
    └── generate-roast/
        └── index.ts     # AI roast generation endpoint
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- Lovable account (for cloud features)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd roastrology
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   bun dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

---

## 🎨 Design System

### Color Palette (HSL)

| Token | Light Mode |
|-------|------------|
| `--primary` | Soft Pink (`340 80% 70%`) |
| `--secondary` | Lavender (`270 60% 75%`) |
| `--accent` | Mint (`165 50% 70%`) |
| `--highlight` | Peachy (`25 90% 80%`) |
| `--background` | Cream (`340 100% 97%`) |

### Gradients

- **Fairy**: Pink → Lavender → Sky
- **Sunset**: Peach → Pink → Lavender  
- **Mint**: Mint → Sky → Lavender
- **Dreamy**: Vertical pastel blend

### Typography

- **Display**: Quicksand (headings, buttons)
- **Body**: Nunito (paragraphs, labels)

---

## ⚡ Edge Function API

### `POST /functions/v1/generate-roast`

Generates a personalized zodiac roast.

**Request Body:**
```json
{
  "zodiacSign": "Aries",
  "traits": ["Bold", "Ambitious", "Impulsive"],
  "nickname": "Alex",
  "intensity": 2,
  "differentAngle": false
}
```

**Response:**
```json
{
  "roast": "Oh, an Aries! The zodiac's equivalent of..."
}
```

**Intensity Levels:**
| Level | Name | Profanity |
|-------|------|-----------|
| 0 | Mild | ❌ |
| 1 | Medium | ❌ |
| 2 | Spicy | ❌ |
| 3 | Nuclear | ✅ |

---

## 🔮 Zodiac Signs Supported

| Sign | Symbol | Element | Date Range |
|------|--------|---------|------------|
| ♈ Aries | Ram | Fire | Mar 21 - Apr 19 |
| ♉ Taurus | Bull | Earth | Apr 20 - May 20 |
| ♊ Gemini | Twins | Air | May 21 - Jun 20 |
| ♋ Cancer | Crab | Water | Jun 21 - Jul 22 |
| ♌ Leo | Lion | Fire | Jul 23 - Aug 22 |
| ♍ Virgo | Maiden | Earth | Aug 23 - Sep 22 |
| ♎ Libra | Scales | Air | Sep 23 - Oct 22 |
| ♏ Scorpio | Scorpion | Water | Oct 23 - Nov 21 |
| ♐ Sagittarius | Archer | Fire | Nov 22 - Dec 21 |
| ♑ Capricorn | Goat | Earth | Dec 22 - Jan 19 |
| ♒ Aquarius | Water Bearer | Air | Jan 20 - Feb 18 |
| ♓ Pisces | Fish | Water | Feb 19 - Mar 20 |

---

## 📦 Key Dependencies

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "@supabase/supabase-js": "^2.89.0",
  "tailwindcss": "^3.x",
  "framer-motion": "optional",
  "lucide-react": "^0.462.0",
  "sonner": "^1.7.4",
  "date-fns": "^3.6.0",
  "html-to-image": "^1.11.13"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- Fonts from [Google Fonts](https://fonts.google.com)

---

<div align="center">
  <p>Made with ✨ magic and 🔥 cosmic sass</p>
  <p><strong>May the stars roast you gently</strong></p>
</div>
