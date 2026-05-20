// Projeto desenvolvido por Cinthia Gonçalez — Cruzeiro do Sul Virtual / Universidade Positivo
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SoundUnlockBanner from './components/SoundUnlockBanner';
import HomePage from './pages/HomePage';
import GamesPage from './pages/GamesPage';
import AchievementsPage from './pages/AchievementsPage';
import ProfilePage from './pages/ProfilePage';
import RecyclingGame from './games/RecyclingGame';
import ShoppingGame from './games/ShoppingGame';
import EnergyQuiz from './games/EnergyQuiz';
import WordMatchGame from './games/WordMatchGame';
import GreenCityGame from './games/GreenCityGame';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GamesPage />} />
            <Route path="/games/recycling" element={<RecyclingGame />} />
            <Route path="/games/shopping" element={<ShoppingGame />} />
            <Route path="/games/quiz" element={<EnergyQuiz />} />
            <Route path="/games/wordmatch" element={<WordMatchGame />} />
            <Route path="/games/greencity" element={<GreenCityGame />} />
            <Route path="/achievements" element={<AchievementsPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
        <SoundUnlockBanner />
      </div>
    </BrowserRouter>
  );
}

export default App;
