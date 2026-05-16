// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { Leaf, GitFork } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-green-800 text-green-100 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-green-300">
          <Leaf size={18} />
          <span className="font-display text-lg">Eco English</span>
          <Leaf size={18} />
        </div>
        <p className="text-sm text-green-200 leading-relaxed max-w-xl mx-auto">
          © {year} <strong>Cinthia Gonçalez</strong> — project developed as a partial requirement
          for an extension activity in the <em>Systems Analysis and Development</em> program at{' '}
          <strong>Universidade Positivo</strong>.
        </p>
        <a
          href="https://github.com/cinthiagon/eco-english"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-green-300 hover:text-white transition-colors text-sm font-semibold group"
        >
          <GitFork size={16} />
          <span className="group-hover:underline">github.com/cinthiagon/eco-english</span>
        </a>
        <p className="text-xs text-green-400">
          🌍 Learning English while saving our planet! 🌱
        </p>
      </div>
    </footer>
  );
}
