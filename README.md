# 🌱 Eco English — Learn English & Save the Planet!

> An educational gamified web platform for children (ages 9–11) to learn English vocabulary through interactive sustainability games aligned with the UN Sustainable Development Goals (SDGs).

![Eco English Banner](https://img.shields.io/badge/Eco%20English-Educational%20Platform-22c55e?style=for-the-badge&logo=leaf)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?style=flat&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?style=flat&logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-FF0055?style=flat)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 📖 Overview

**Eco English** is a fully responsive, gamified educational website where children learn:

- 🇬🇧 **English vocabulary** — sustainability, nature, recycling, energy
- ♻️ **Recycling and waste sorting**
- 🛒 **Conscious consumption habits**
- 💡 **Energy and water conservation**
- 🏙️ **Sustainable urban planning concepts**
- 🌍 **UN SDGs** — especially SDG 4, 11, 12, 13, 14, 15

### 🎮 Five Interactive Games

| Game | Description | Skills |
|------|-------------|--------|
| ♻️ **Recycling Game** | Drag & drop waste into correct bins | Sorting, vocabulary |
| 🛒 **Eco Shopping** | Choose eco-friendly products | Decision making, consumer awareness |
| 💡 **Energy Quiz** | Multiple-choice sustainability quiz | Critical thinking, knowledge |
| 🔤 **Word Match** | Memory game — match words to images | English vocabulary, memory |
| 🏙️ **Green City** | Build a sustainable city on a grid | Planning, creativity |

### 🏆 Gamification System

- 🪙 **Eco Coins** — earned for correct answers
- ⭐ **XP & Levels** — 8 levels from "Eco Seedling" to "Sustainability Master"
- 🏅 **12 Achievements** — unlockable milestones
- 📊 **Progress tracking** — stored in LocalStorage
- 🔥 **Streak bonuses** — consecutive correct answers

---

## 🛠️ Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 19 | UI framework |
| TypeScript | 6 | Type safety |
| Vite | 8 | Build tool |
| TailwindCSS | 4 | Styling |
| Framer Motion | 12 | Animations |
| React Router | 7 | Navigation |
| LocalStorage | — | Progress persistence |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm 9+ installed

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/eco-english.git

# Enter the project directory
cd eco-english

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 📁 Project Structure

```
eco-english/
├── public/
│   ├── leaf.svg              # App icon
│   └── manifest.json         # PWA manifest
├── src/
│   ├── components/
│   │   ├── Header.tsx        # Navigation header with stats
│   │   ├── Footer.tsx        # Footer with author credits
│   │   └── GameUI.tsx        # Reusable game components
│   ├── pages/
│   │   ├── HomePage.tsx      # Home / dashboard
│   │   ├── GamesPage.tsx     # Games catalog
│   │   ├── AchievementsPage.tsx
│   │   └── ProfilePage.tsx
│   ├── games/
│   │   ├── RecyclingGame.tsx  # Drag & drop recycling
│   │   ├── ShoppingGame.tsx   # Eco vs non-eco products
│   │   ├── EnergyQuiz.tsx     # Multiple-choice quiz
│   │   ├── WordMatchGame.tsx  # Memory / matching game
│   │   └── GreenCityGame.tsx  # City builder
│   ├── hooks/
│   │   ├── useProgress.ts    # Player progress hook
│   │   └── useSound.ts       # Web Audio sound effects
│   ├── services/
│   │   └── progress.ts       # LocalStorage service
│   ├── data/
│   │   └── gameData.ts       # All game content
│   ├── types/
│   │   └── index.ts          # TypeScript types
│   ├── App.tsx               # Router setup
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles + Tailwind
├── index.html                # HTML entry point
├── vite.config.ts            # Vite configuration
├── tsconfig.json             # TypeScript configuration
└── package.json
```

---

## 🌐 Deploy

### Deploy to Vercel (Recommended — Free)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"Add New Project"** → Select your repo
4. Vercel auto-detects Vite — click **Deploy**
5. Your site is live at `https://eco-english.vercel.app` 🎉

### Deploy to Netlify (Free)

1. Run `npm run build` locally
2. Go to [netlify.com](https://netlify.com)
3. Drag the `dist/` folder to the Netlify dashboard
4. Or connect your GitHub repo for automatic deploys

### Deploy to GitHub Pages

```bash
# Install gh-pages
npm install --save-dev gh-pages

# Add to package.json scripts:
# "deploy": "gh-pages -d dist"
# "predeploy": "npm run build"

npm run deploy
```

---

## 📱 Responsive Design

The application is fully responsive and tested on:
- 📱 **Mobile** — 320px+ (touch-friendly, large buttons)
- 📟 **Tablet** — 768px+ (optimized layouts)
- 💻 **Laptop** — 1024px+ (full feature layout)
- 🖥️ **Desktop** — 1440px+ (centered content, max-width)

---

## ♿ Accessibility

- ARIA labels on interactive elements
- Keyboard navigation support
- High contrast color schemes
- Large touch targets (minimum 44px)
- Optional sound effects (can be muted)
- Screen reader friendly structure

---

## 🌍 UN SDG Alignment

This project specifically addresses:

| SDG | Goal | How |
|-----|------|-----|
| SDG 4 | Quality Education | Gamified English learning |
| SDG 11 | Sustainable Cities | Green City game |
| SDG 12 | Responsible Consumption | Shopping game |
| SDG 13 | Climate Action | Energy quiz |
| SDG 14 | Life Below Water | Ocean waste awareness |
| SDG 15 | Life on Land | Recycling & nature vocabulary |

---

## 🔮 Future Improvements

- [ ] Audio narration for all games
- [ ] Firebase backend for multiplayer/leaderboard
- [ ] Avatar customization system
- [ ] Dark mode
- [ ] Full PWA with offline support
- [ ] Teacher dashboard
- [ ] Portuguese/Spanish language support
- [ ] Additional game levels and content
- [ ] Parent progress reports
- [ ] Certificate generation

---

## 📸 Screenshots

> The application features a vibrant, child-friendly design with:
> - Animated hedgehog mascot as the guide
> - Colorful game cards with gradient backgrounds
> - Real-time feedback with animations
> - XP/coin progress system visible in the header

---

## 👩‍💻 Autora

**Cinthia Gonçalez**

Projeto desenvolvido como requisito parcial de atividade de extensão do curso de **Análise e Desenvolvimento de Sistemas** da **Universidade Positivo**.

---

## 📄 License

MIT License © 2026 Cinthia Gonçalez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
