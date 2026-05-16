// Projeto desenvolvido por Cinthia Gonçalez — Universidade Positivo
import type { WasteItem, ShoppingItem, QuizQuestion, WordCard, CityItem } from '../types';

export const WASTE_ITEMS: WasteItem[] = [
  { id: 'w1', name: 'Plastic Bottle', emoji: '🍶', binType: 'plastic', funFact: 'Plastic bottles take up to 450 years to break down in nature!' },
  { id: 'w2', name: 'Newspaper', emoji: '📰', binType: 'paper', funFact: 'Recycling newspapers uses about 30% less energy than making new paper!' },
  { id: 'w3', name: 'Glass Jar', emoji: '🫙', binType: 'glass', funFact: 'Glass can be recycled forever without losing quality!' },
  { id: 'w4', name: 'Aluminum Can', emoji: '🥫', binType: 'metal', funFact: 'Recycling aluminum uses 95% less energy than producing it from scratch!' },
  { id: 'w5', name: 'Apple Core', emoji: '🍎', binType: 'organic', funFact: 'Organic waste can be turned into rich compost that helps plants grow!' },
  { id: 'w6', name: 'Plastic Bag', emoji: '🛍️', binType: 'plastic', funFact: 'Plastic bags harm ocean animals and take 500 years to decompose!' },
  { id: 'w7', name: 'Cardboard Box', emoji: '📦', binType: 'paper', funFact: 'Cardboard is 100% recyclable and can be made into new boxes!' },
  { id: 'w8', name: 'Glass Bottle', emoji: '🍾', binType: 'glass', funFact: 'Recycling glass uses up to 50% less energy than making new glass!' },
  { id: 'w9', name: 'Soda Can', emoji: '🥤', binType: 'metal', funFact: 'A recycled aluminum can is back on the shelf in just 60 days!' },
  { id: 'w10', name: 'Banana Peel', emoji: '🍌', binType: 'organic', funFact: 'Banana peels decompose in 3 to 5 weeks and enrich the soil!' },
  { id: 'w11', name: 'Yogurt Cup', emoji: '🥛', binType: 'plastic', funFact: 'Always clean plastic containers before recycling them!' },
  { id: 'w12', name: 'Notebook', emoji: '📓', binType: 'paper', funFact: 'Recycling one ton of paper saves approximately 17 trees!' },
];

export const SHOPPING_ITEMS: ShoppingItem[] = [
  { id: 's1', name: 'Reusable Water Bottle', emoji: '🧴', isEcoFriendly: true, explanation: 'It saves hundreds of single-use plastic bottles every year!', category: 'drinks' },
  { id: 's2', name: 'Single-use Plastic Bag', emoji: '🛍️', isEcoFriendly: false, explanation: 'It pollutes the oceans and takes up to 500 years to decompose!', category: 'bags' },
  { id: 's3', name: 'Solar-powered Lamp', emoji: '🔆', isEcoFriendly: true, explanation: 'It uses free energy from the sun — no electricity bill needed!', category: 'energy' },
  { id: 's4', name: 'Recycled Paper Notebook', emoji: '📓', isEcoFriendly: true, explanation: 'Made from recycled materials, so no extra trees are cut down!', category: 'school' },
  { id: 's5', name: 'Disposable Styrofoam Cup', emoji: '☕', isEcoFriendly: false, explanation: 'Styrofoam never fully breaks down in nature and pollutes soil and water!', category: 'drinks' },
  { id: 's6', name: 'Cloth Shopping Bag', emoji: '👜', isEcoFriendly: true, explanation: 'It can be used over 700 times, replacing hundreds of plastic bags!', category: 'bags' },
  { id: 's7', name: 'Bamboo Toothbrush', emoji: '🪥', isEcoFriendly: true, explanation: 'Bamboo grows very fast and is biodegradable — unlike plastic!', category: 'personal' },
  { id: 's8', name: 'Plastic Straw', emoji: '🥤', isEcoFriendly: false, explanation: 'Plastic straws injure sea turtles and wash up on beaches worldwide!', category: 'drinks' },
  { id: 's9', name: 'Electric Bicycle', emoji: '🚲', isEcoFriendly: true, explanation: 'It produces no exhaust emissions and gives you great exercise too!', category: 'transport' },
  { id: 's10', name: 'Organic Cotton T-shirt', emoji: '👕', isEcoFriendly: true, explanation: 'Grown without harmful pesticides, protecting soil and water sources!', category: 'clothing' },
  { id: 's11', name: 'Fast Fashion Jeans', emoji: '👖', isEcoFriendly: false, explanation: 'The fashion industry is responsible for about 10% of global carbon emissions!', category: 'clothing' },
  { id: 's12', name: 'Reusable Metal Straw', emoji: '🥢', isEcoFriendly: true, explanation: 'Use it for years — it replaces thousands of disposable plastic straws!', category: 'drinks' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { id: 'q1', question: 'Which light bulb uses LESS energy?', options: ['LED bulb 💡', 'Incandescent bulb 🔴', 'Candle 🕯️', 'Torch 🔦'], correctIndex: 0, explanation: 'LED bulbs use up to 75% less energy than traditional incandescent bulbs!', emoji: '💡', difficulty: 'easy' },
  { id: 'q2', question: 'How can you save water while brushing your teeth?', options: ['Take a long shower 🚿', 'Turn off the tap while brushing 🪥', 'Water your plants at noon ☀️', 'Leave the tap running 💧'], correctIndex: 1, explanation: 'Turning off the tap while brushing can save up to 8 liters of water per minute!', emoji: '💧', difficulty: 'easy' },
  { id: 'q3', question: 'What is the MOST eco-friendly way to get to school?', options: ['By car 🚗', 'By airplane ✈️', 'Walking or cycling 🚲', 'By motorcycle 🏍️'], correctIndex: 2, explanation: 'Walking or cycling produces zero emissions and also keeps you fit and healthy!', emoji: '🚲', difficulty: 'easy' },
  { id: 'q4', question: 'What does "renewable energy" mean?', options: ['Energy that will eventually run out', 'Energy from the sun, wind, and water ☀️', 'Energy produced by burning coal', 'Energy produced by burning wood'], correctIndex: 1, explanation: 'Renewable energy comes from natural sources that are constantly replenished, like sunlight and wind!', emoji: '☀️', difficulty: 'medium' },
  { id: 'q5', question: 'Which gas is the main cause of climate change?', options: ['Oxygen 🌬️', 'Carbon dioxide (CO2) 🏭', 'Nitrogen', 'Hydrogen'], correctIndex: 1, explanation: 'Too much CO2 in the atmosphere traps the sun\'s heat, which slowly warms our planet!', emoji: '🌍', difficulty: 'medium' },
  { id: 'q6', question: 'What is composting?', options: ['Throwing food scraps in the trash 🗑️', 'Turning food scraps into natural fertilizer 🌱', 'Burning organic waste', 'Recycling plastic bottles'], correctIndex: 1, explanation: 'Composting turns food scraps and garden waste into rich soil that helps plants grow!', emoji: '🌿', difficulty: 'medium' },
  { id: 'q7', question: 'How much of Earth\'s water is fresh water?', options: ['75%', '50%', 'Only 3%! 💧', '25%'], correctIndex: 2, explanation: 'Only 3% of Earth\'s water is fresh water — and most of it is frozen in glaciers. We must protect it!', emoji: '🌊', difficulty: 'hard' },
  { id: 'q8', question: 'What is a carbon footprint?', options: ['A footprint left in the sand 👣', 'The total amount of CO2 your daily activities produce 🏭', 'A type of renewable fuel', 'A type of green energy source'], correctIndex: 1, explanation: 'Your carbon footprint measures how much CO2 is released into the atmosphere because of your daily choices!', emoji: '👣', difficulty: 'hard' },
  { id: 'q9', question: 'Which of these is NOT a source of clean energy?', options: ['Solar power ☀️', 'Wind power 💨', 'Burning coal 🏭', 'Hydroelectric power 💧'], correctIndex: 2, explanation: 'Burning coal releases large amounts of CO2 and toxic pollutants — it is a dirty energy source!', emoji: '⚡', difficulty: 'hard' },
  { id: 'q10', question: 'What do the 3 Rs of sustainability stand for?', options: ['Run, Rest, Relax', 'Reduce, Reuse, Recycle ♻️', 'Read, Write, Calculate', 'Red, Round, Right'], correctIndex: 1, explanation: 'Reduce, Reuse, Recycle — three simple actions that together make a huge difference for our planet!', emoji: '♻️', difficulty: 'easy' },
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
  { id: 'ci1', name: 'Solar Panel', emoji: '☀️', category: 'energy', ecoScore: 15, description: 'Generates clean electricity directly from sunlight!' },
  { id: 'ci2', name: 'Tree', emoji: '🌳', category: 'nature', ecoScore: 10, description: 'Trees absorb CO2 from the air and release the oxygen we breathe!' },
  { id: 'ci3', name: 'Wind Turbine', emoji: '🌬️', category: 'energy', ecoScore: 12, description: 'Converts the power of wind into clean, renewable electricity!' },
  { id: 'ci4', name: 'Bicycle Lane', emoji: '🚲', category: 'transport', ecoScore: 8, description: 'Encourages people to cycle instead of drive, reducing pollution!' },
  { id: 'ci5', name: 'Eco House', emoji: '🏡', category: 'building', ecoScore: 10, description: 'Built with sustainable materials and designed to save energy!' },
  { id: 'ci6', name: 'Garden', emoji: '🌸', category: 'nature', ecoScore: 7, description: 'Provides habitat and food for birds, bees, and butterflies!' },
  { id: 'ci7', name: 'Electric Bus', emoji: '🚌', category: 'transport', ecoScore: 11, description: 'Carries many passengers at once with zero direct emissions!' },
  { id: 'ci8', name: 'Recycling Center', emoji: '♻️', category: 'building', ecoScore: 13, description: 'Processes and sorts waste materials so they can be used again!' },
  { id: 'ci9', name: 'Park', emoji: '🌿', category: 'nature', ecoScore: 9, description: 'Green spaces improve air quality and provide a place to relax!' },
  { id: 'ci10', name: 'Community Garden', emoji: '🥕', category: 'nature', ecoScore: 8, description: 'Local people grow their own fresh vegetables and fruits together!' },
  { id: 'ci11', name: 'Rainwater Tank', emoji: '💧', category: 'building', ecoScore: 10, description: 'Collects and stores rainwater for watering plants and gardens!' },
  { id: 'ci12', name: 'Electric Car', emoji: '🚗', category: 'transport', ecoScore: 9, description: 'Runs on electricity with no exhaust fumes — cleaner streets!' },
];

export const BIN_COLORS: Record<string, { bg: string; border: string; label: string; emoji: string }> = {
  plastic: { bg: 'bg-red-100', border: 'border-red-400', label: 'Plastic', emoji: '🔴' },
  paper:   { bg: 'bg-blue-100', border: 'border-blue-400', label: 'Paper', emoji: '🔵' },
  glass:   { bg: 'bg-green-100', border: 'border-green-400', label: 'Glass', emoji: '🟢' },
  metal:   { bg: 'bg-yellow-100', border: 'border-yellow-400', label: 'Metal', emoji: '🟡' },
  organic: { bg: 'bg-amber-100', border: 'border-amber-500', label: 'Organic', emoji: '🟤' },
};
