import { useState } from 'react';
import { CheckCircle, ArrowRight, Zap, Target, Clock, Sparkles } from 'lucide-react';
import './index.css';

interface Question {
  id: number;
  question: string;
  options: string[];
  scores: number[];
}

interface Result {
  level: string;
  title: string;
  description: string;
  recommendations: string[];
  color: string;
}

const questions: Question[] = [
  {
    id: 1,
    question: "Wie viele Besucher hat deine Website monatlich?",
    options: ["< 1.000", "1.000 - 10.000", "10.000 - 100.000", "> 100.000"],
    scores: [1, 2, 3, 4]
  },
  {
    id: 2,
    question: "Wie ist deine aktuelle Konversionsrate?",
    options: ["Keine Ahnung", "< 1%", "1-3%", "> 3%"],
    scores: [1, 2, 3, 4]
  },
  {
    id: 3,
    question: "Hast du einen Sales Funnel?",
    options: ["Nein", "Teilweise", "Ja, aber nicht optimiert", "Ja, und gut optimiert"],
    scores: [1, 2, 3, 4]
  },
  {
    id: 4,
    question: "Nutzt du Email-Marketing?",
    options: ["Nein", "Gelegentlich", "Regelmäßig", "Automatisiert & optimiert"],
    scores: [1, 2, 3, 4]
  },
  {
    id: 5,
    question: "Wie viel Budget für Marketing?",
    options: ["Kein Budget", "< 500€/Monat", "500-2000€/Monat", "> 2000€/Monat"],
    scores: [1, 2, 3, 4]
  },
  {
    id: 6,
    question: "Dein Geschäftsziel?",
    options: ["Lernen", "Wachstum", "Skalierung", "Marktführerschaft"],
    scores: [1, 2, 3, 4]
  }
];

const results: Record<number, Result> = {
  6: {
    level: "Anfänger",
    title: "Du fängst gerade an 🌱",
    description: "Du hast großes Potenzial! Mit den richtigen Strategien kannst du schnell wachsen.",
    recommendations: [
      "Starte mit einer einfachen Landing Page",
      "Baue eine Email-Liste auf",
      "Implementiere Basis-Analytics",
      "Lerne die Funnel-Grundlagen"
    ],
    color: "from-blue-500 to-cyan-500"
  },
  12: {
    level: "Fortgeschritten",
    title: "Du machst gute Fortschritte 📈",
    description: "Du hast bereits eine solide Basis. Jetzt geht es um Optimierung und Skalierung.",
    recommendations: [
      "Optimiere deine Konversionsrate",
      "Teste verschiedene Messaging-Varianten",
      "Automatisiere deine Prozesse",
      "Skaliere deine Kampagnen"
    ],
    color: "from-purple-500 to-pink-500"
  },
  18: {
    level: "Experte",
    title: "Du bist auf dem richtigen Weg 🚀",
    description: "Du hast bereits gute Systeme. Fokussiere dich auf Skalierung und Automatisierung.",
    recommendations: [
      "Implementiere Advanced-Analytics",
      "Nutze AI für Personalisierung",
      "Skaliere auf mehrere Kanäle",
      "Baue ein Team auf"
    ],
    color: "from-green-500 to-emerald-500"
  },
  24: {
    level: "Master",
    title: "Du bist ein Funnel-Master! 👑",
    description: "Beeindruckend! Du hast ein hochoptimiertes System. Jetzt geht es um Marktführerschaft.",
    recommendations: [
      "Entwickle proprietary Strategien",
      "Mentoriere andere Marketer",
      "Baue ein 7-stelliges Business",
      "Werden Sie Thought Leader"
    ],
    color: "from-yellow-500 to-orange-500"
  }
};

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newScores = [...scores, score];
    setScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const getTotalScore = () => scores.reduce((a, b) => a + b, 0);
  const getResult = (): Result => {
    const total = getTotalScore();
    if (total <= 6) return results[6];
    if (total <= 12) return results[12];
    if (total <= 18) return results[18];
    return results[24];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lead captured:", { email, score: getTotalScore() });
    setCurrentQuestion(0);
    setScores([]);
    setEmail('');
    setShowResult(false);
  };

  if (showResult) {
    const result = getResult();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
          <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-12 text-center mb-8 shadow-2xl`}>
            <div className="mb-6 flex justify-center">
              <div className="bg-white/20 rounded-full p-6 backdrop-blur-sm">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-4">{result.title}</h1>
            <p className="text-xl text-white/90 mb-8">{result.description}</p>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
              <p className="text-sm text-white/80 mb-2">Dein Level:</p>
              <p className="text-3xl font-bold text-white">{result.level}</p>
              <p className="text-sm text-white/80 mt-2">Score: {getTotalScore()}/24</p>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Deine nächsten Schritte:</h2>
            <ul className="space-y-4">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <ArrowRight className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                  <span className="text-gray-200">{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Erhalte dein personalisiertes Aktionsplan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="deine@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-800/50 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-500/50"
              >
                Aktionsplan erhalten
              </button>
            </form>
            <p className="text-sm text-gray-400 mt-4 text-center">
              ✓ Kostenlos • ✓ Keine Spam • ✓ Sofort Zugriff
            </p>
          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setScores([]);
                setEmail('');
                setShowResult(false);
              }}
              className="text-purple-400 hover:text-purple-300 transition flex items-center gap-2 mx-auto"
            >
              <ArrowRight className="w-4 h-4" />
              Quiz neu starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-purple-500/20 border border-purple-500/50 text-purple-300 text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Funnel Potential Quiz
            </span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Wie bereit bist du für <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Skalierung?</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Finde in 2 Minuten heraus, auf welchem Level du bist
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Frage {currentQuestion + 1} von {questions.length}</span>
            <span className="text-sm font-semibold text-purple-400">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-800/50 border border-purple-500/30 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold mb-8">{question.question}</h2>
          
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(question.scores[index])}
                className="w-full text-left p-4 rounded-lg border border-purple-500/30 hover:border-purple-500/60 bg-slate-700/30 hover:bg-slate-700/60 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg group-hover:text-purple-300 transition">{option}</span>
                  <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition" />
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center text-sm">
          <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4">
            <Clock className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-400">2 Minuten</p>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4">
            <Target className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-400">6 Fragen</p>
          </div>
          <div className="bg-slate-800/50 border border-purple-500/30 rounded-lg p-4">
            <Zap className="w-5 h-5 text-purple-400 mx-auto mb-2" />
            <p className="text-gray-400">Kostenlos</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
