// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import { Leaf } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-green-800 text-green-100 py-6 mt-auto">
      <div className="max-w-6xl mx-auto px-4 text-center space-y-2">
        <div className="flex items-center justify-center gap-2 text-green-300">
          <Leaf size={18} />
          <span className="font-display text-lg">Eco English</span>
          <Leaf size={18} />
        </div>
        <p className="text-sm text-green-200 leading-relaxed max-w-xl mx-auto">
          © {year} <strong>Cinthia Gonçalez</strong> — projeto desenvolvido como requisito parcial de atividade
          de extensão do curso de <em>Análise e Desenvolvimento de Sistemas</em> da{' '}
          <strong>Universidade Positivo</strong>.
        </p>
        <p className="text-xs text-green-400">
          🌍 Learning English while saving our planet! 🌱
        </p>
      </div>
    </footer>
  );
}
