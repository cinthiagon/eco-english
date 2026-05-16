// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import type { WasteItem, ShoppingItem, QuizQuestion, WordCard, CityItem } from '../types';

export const WASTE_ITEMS: WasteItem[] = [
  { id: 'w1', name: 'Plastic Bottle', emoji: '🍶', binType: 'plastic', funFact: 'Plastic bottles take 450 years to break down!' },
  { id: 'w2', name: 'Newspaper', emoji: '📰', binType: 'paper', funFact: 'Recycling one newspaper saves 30% energy!' },
  { id: 'w3', name: 'Glass Jar', emoji: '🫙', binType: 'glass', funFact: 'Glass can be recycled forever!' },
  { id: 'w4', name: 'Tin Can', emoji: '🥫', binType: 'metal', funFact: 'Recycling aluminum uses 95% less energy!' },
  { id: 'w5', name: 'Apple Core', emoji: '🍎', binType: 'organic', funFact: 'Organic waste becomes great compost!' },
  { id: 'w6', name: 'Plastic Bag', emoji: '🛍️', binType: 'plastic', funFact: 'Plastic bags harm ocean animals!' },
  { id: 'w7', name: 'Cardboard Box', emoji: '📦', binType: 'paper', funFact: 'Cardboard is 100% recyclable!' },
  { id: 'w8', name: 'Wine Bottle', emoji: '🍾', binType: 'glass', funFact: 'Glass recycling saves 50% energy!' },
  { id: 'w9', name: 'Soda Can', emoji: '🥤', binType: 'metal', funFact: 'A recycled can is back on shelf in 60 days!' },
  { id: 'w10', name: 'Banana Peel', emoji: '🍌', binType: 'organic', funFact: 'Banana peels decompose in 3-5 weeks!' },
  { id: 'w11', name: 'Yogurt Cup', emoji: '🥛', binType: 'plastic', funFact: 'Clean plastic containers before recycling!' },
  { id: 'w12', name: 'Notebook', emoji: '📓', binType: 'paper', funFact: 'Paper recycling saves 17 trees per ton!' },
];

export const SHOPPING_ITEMS: ShoppingItem[] = [
  { id: 's1', name: 'Reusable Water Bottle', emoji: '🧴', isEcoFriendly: true, explanation: 'Saves hundreds of plastic bottles!', category: 'drinks' },
  { id: 's2', name: 'Single-use Plastic Bag', emoji: '🛍️', isEcoFriendly: false, explanation: 'Pollutes oceans and takes 500 years to decompose!', category: 'bags' },
  { id: 's3', name: 'Solar-powered Lamp', emoji: '🔆', isEcoFriendly: true, explanation: 'Uses free solar energy — no electricity needed!', category: 'energy' },
  { id: 's4', name: 'Recycled Paper Notebook', emoji: '📓', isEcoFriendly: true, explanation: 'Made from recycled materials — saves trees!', category: 'school' },
  { id: 's5', name: 'Disposable Styrofoam Cup', emoji: '☕', isEcoFriendly: false, explanation: 'Styrofoam never breaks down in nature!', category: 'drinks' },
  { id: 's6', name: 'Cloth Shopping Bag', emoji: '👜', isEcoFriendly: true, explanation: 'Can be used 700+ times instead of plastic bags!', category: 'bags' },
  { id: 's7', name: 'Bamboo Toothbrush', emoji: '🪥', isEcoFriendly: true, explanation: 'Bamboo grows super fast and is biodegradable!', category: 'personal' },
  { id: 's8', name: 'Plastic Straw', emoji: '🥤', isEcoFriendly: false, explanation: 'Straws injure sea turtles and pollute beaches!', category: 'drinks' },
  { id: 's9', name: 'Electric Bicycle', emoji: '🚲', isEcoFriendly: true, explanation: 'Zero emissions and great exercise!', category: 'transport' },
  { id: 's10', name: 'Organic Cotton T-shirt', emoji: '👕', isEcoFriendly: true, explanation: 'Grown without harmful chemicals!', category: 'clothing' },
  { id: 's11', name: 'Fast Fashion Jeans', emoji: '👖', isEcoFriendly: false, explanation: 'Fashion industry creates 10% of global pollution!', category: 'clothing' },
  { id: 's12', name: 'Reusable Metal Straw', emoji: '🥢', isEcoFriendly: true, explanation: 'Use it forever — saves thousands of plastic straws!', category: 'drinks' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', question: 'Which light bulb uses LESS energy?', options: ['LED bulb 💡', 'Incandescent bulb 🔴', 'Candle 🕯️', 'Torch 🔦'], correctIndex: 0, explanation: 'LED bulbs use 75% less energy than regular bulbs!', emoji: '💡', difficulty: 'easy' },
  { id: 'q2', question: 'How can you save water at home?', options: ['Take a long shower 🚿', 'Turn off the tap while brushing 🪥', 'Water plants at noon ☀️', 'Leave the tap running 💧'], correctIndex: 1, explanation: 'Turning off the tap while brushing saves up to 8 liters per minute!', emoji: '💧', difficulty: 'easy' },
  { id: 'q3', question: 'What is the BEST way to go to school?', options: ['Car 🚗', 'Airplane ✈️', 'Walking or cycling 🚲', 'Motorcycle 🏍️'], correctIndex: 2, explanation: 'Walking or cycling creates zero emissions and keeps you healthy!', emoji: '🚲', difficulty: 'easy' },
  { id: 'q4', question: 'What does "renewable energy" mean?', options: ['Energy that runs out', 'Energy from the sun, wind and water ☀️', 'Energy from coal', 'Energy from fire'], correctIndex: 1, explanation: 'Renewable energy comes from sources that never run out, like sun and wind!', emoji: '☀️', difficulty: 'medium' },
  { id: 'q5', question: 'Which gas causes climate change?', options: ['Oxygen 🌬️', 'Carbon dioxide CO2 🏭', 'Nitrogen', 'Hydrogen'], correctIndex: 1, explanation: 'Too much CO2 traps heat in our atmosphere, warming the planet!', emoji: '🌍', difficulty: 'medium' },
  { id: 'q6', question: 'What is composting?', options: ['Throwing food away 🗑️', 'Turning food scraps into natural fertilizer 🌱', 'Burning waste', 'Recycling plastic'], correctIndex: 1, explanation: 'Composting turns organic waste into rich soil that helps plants grow!', emoji: '🌿', difficulty: 'medium' },
  { id: 'q7', question: 'How much of Earth\'s water is drinkable?', options: ['75%', '50%', 'Only 3%! 💧', '25%'], correctIndex: 2, explanation: 'Only 3% of Earth\'s water is fresh water — we must protect it!', emoji: '🌊', difficulty: 'hard' },
  { id: 'q8', question: 'What is a carbon footprint?', options: ['A footprint in sand 👣', 'Amount of CO2 your activities produce 🏭', 'A type of fuel', 'A green energy source'], correctIndex: 1, explanation: 'Your carbon footprint is how much CO2 your daily activities create!', emoji: '👣', difficulty: 'hard' },
  { id: 'q9', question: 'Which is NOT a source of clean energy?', options: ['Solar power ☀️', 'Wind power 💨', 'Coal burning 🏭', 'Hydroelectric 💧'], correctIndex: 2, explanation: 'Burning coal releases CO2 and pollution — it\'s a dirty energy source!', emoji: '⚡', difficulty: 'hard' },
  { id: 'q10', question: 'What do the 3 Rs stand for?', options: ['Run, Rest, Relax', 'Reduce, Reuse, Recycle ♻️', 'Read, Write, Calculate', 'Red, Round, Right'], correctIndex: 1, explanation: 'Reduce, Reuse, Recycle — three ways to protect our planet!', emoji: '♻️', difficulty: 'easy' },
];

export const WORD_CARDS: WordCard[] = [
  { id: 'wc1', word: 'TREE', emoji: '🌳', category: 'nature', translation: 'Árvore' },
  { id: 'wc2', word: 'RIVER', emoji: '🏞️', category: 'nature', translation: 'Rio' },
  { id: 'wc3', word: 'RECYCLE', emoji: '♻️', category: 'sustainability', translation: 'Reciclar' },
  { id: 'wc4', word: 'BICYCLE', emoji: '🚲', category: 'transport', translation: 'Bicicleta' },
  { id: 'wc5', word: 'SOLAR', emoji: '☀️', category: 'energy', translation: 'Solar' },
  { id: 'wc6', word: 'FLOWER', emoji: '🌸', category: 'nature', translation: 'Flor' },
  { id: 'wc7', word: 'OCEAN', emoji: '🌊', category: 'nature', translation: 'Oceano' },
  { id: 'wc8', word: 'WIND', emoji: '💨', category: 'energy', translation: 'Vento' },
  { id: 'wc9', word: 'EARTH', emoji: '🌍', category: 'nature', translation: 'Terra' },
  { id: 'wc10', word: 'RAIN', emoji: '🌧️', category: 'nature', translation: 'Chuva' },
  { id: 'wc11', word: 'BEE', emoji: '🐝', category: 'nature', translation: 'Abelha' },
  { id: 'wc12', word: 'COMPOST', emoji: '🌱', category: 'sustainability', translation: 'Composto' },
  { id: 'wc13', word: 'BUTTERFLY', emoji: '🦋', category: 'nature', translation: 'Borboleta' },
  { id: 'wc14', word: 'MOUNTAIN', emoji: '⛰️', category: 'nature', translation: 'Montanha' },
  { id: 'wc15', word: 'SEED', emoji: '🌰', category: 'nature', translation: 'Semente' },
  { id: 'wc16', word: 'WATER', emoji: '💧', category: 'nature', translation: 'Água' },
];

export const CITY_ITEMS: CityItem[] = [
  { id: 'ci1', name: 'Solar Panel', emoji: '⚡', category: 'energy', ecoScore: 15, description: 'Generates clean electricity from the sun!' },
  { id: 'ci2', name: 'Tree', emoji: '🌳', category: 'nature', ecoScore: 10, description: 'Trees absorb CO2 and give us oxygen!' },
  { id: 'ci3', name: 'Wind Turbine', emoji: '💨', category: 'energy', ecoScore: 12, description: 'Turns wind into clean electricity!' },
  { id: 'ci4', name: 'Bicycle Lane', emoji: '🚲', category: 'transport', ecoScore: 8, description: 'Encourages people to cycle instead of drive!' },
  { id: 'ci5', name: 'Eco House', emoji: '🏡', category: 'building', ecoScore: 10, description: 'Built with sustainable materials!' },
  { id: 'ci6', name: 'Garden', emoji: '🌸', category: 'nature', ecoScore: 7, description: 'Provides habitat for birds and bees!' },
  { id: 'ci7', name: 'Electric Bus', emoji: '🚌', category: 'transport', ecoScore: 11, description: 'Carries many people with zero emissions!' },
  { id: 'ci8', name: 'Recycling Center', emoji: '♻️', category: 'building', ecoScore: 13, description: 'Processes waste so it can be reused!' },
  { id: 'ci9', name: 'Park', emoji: '🌿', category: 'nature', ecoScore: 9, description: 'Green spaces improve air quality!' },
  { id: 'ci10', name: 'Community Garden', emoji: '🥕', category: 'nature', ecoScore: 8, description: 'People grow their own vegetables!' },
  { id: 'ci11', name: 'Rainwater Tank', emoji: '💧', category: 'building', ecoScore: 10, description: 'Collects rainwater for watering plants!' },
  { id: 'ci12', name: 'Electric Car', emoji: '🚗', category: 'transport', ecoScore: 9, description: 'Zero emissions transportation!' },
];

export const BIN_COLORS: Record<string, { bg: string; border: string; label: string; emoji: string }> = {
  plastic: { bg: 'bg-red-100', border: 'border-red-400', label: 'Plastic', emoji: '🔴' },
  paper:   { bg: 'bg-blue-100', border: 'border-blue-400', label: 'Paper', emoji: '🔵' },
  glass:   { bg: 'bg-green-100', border: 'border-green-400', label: 'Glass', emoji: '🟢' },
  metal:   { bg: 'bg-yellow-100', border: 'border-yellow-400', label: 'Metal', emoji: '🟡' },
  organic: { bg: 'bg-amber-100', border: 'border-amber-500', label: 'Organic', emoji: '🟤' },
};
