import { useState } from 'react';
import { ChevronRight, CheckCircle, ArrowRight, Star } from 'lucide-react';
import './index.css';

interface Question {
  id: number;
  question: string;
  answers: string[];
  category: string;
}

interface Result {
  score: number;
  level: string;
  title: string;
  description: string;
  recommendations: string[];
  color: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Wie viel Umsatz machst du monatlich?',
    answers: ['< 5.000€', '5.000€ - 25.000€', '25.000€ - 100.000€', '> 100.000€'],
    category: 'revenue'
  },
  {
    id: 2,
    question: 'Wie viele Stunden pro Woche investierst du in dein Business?',
    answers: ['< 10h', '10-20h', '20-40h', '> 40h'],
    category: 'time'
  },
  {
    id: 3,
    question: 'Wie viele Leads generierst du monatlich?',
    answers: ['0-10', '10-50', '50-200', '> 200'],
    category: 'leads'
  },
  {
    id: 4,
    question: 'Wie ist deine aktuelle Conversion-Rate?',
    answers: ['< 1%', '1-3%', '3-10%', '> 10%'],
    category: 'conversion'
  },
  {
    id: 5,
    question: 'Nutzt du bereits Marketing-Automation?',
    answers: ['Nein, gar nicht', 'Minimal', 'Teilweise', 'Vollständig'],
    category: 'automation'
  },
  {
    id: 6,
    question: 'Wie zufrieden bist du mit deinem aktuellen Geschäftswachstum?',
    answers: ['Sehr unzufrieden', 'Unzufrieden', 'Zufrieden', 'Sehr zufrieden'],
    category: 'satisfaction'
  }
];

const getResults = (scores: number[]): Result => {
  const totalScore = scores.reduce((a, b) => a + b, 0);
  const avgScore = totalScore / scores.length;

  if (avgScore < 1.5) {
    return {
      score: totalScore,
      level: 'Starter',
      title: '🚀 Starter Phase',
      description: 'Du hast großes Potenzial! Jetzt ist der richtige Zeitpunkt, um die Grundlagen zu optimieren.',
      recommendations: [
        'Implementiere ein Lead-Capture-System',
        'Erstelle deine erste Sales Funnel',
        'Automatisiere deine E-Mail-Kommunikation',
        'Definiere deine Zielgruppe klar'
      ],
      color: 'from-blue-500 to-cyan-500'
    };
  } else if (avgScore < 2.5) {
    return {
      score: totalScore,
      level: 'Growth',
      title: '📈 Growth Phase',
      description: 'Du machst gute Fortschritte! Fokussiere dich auf Skalierung und Optimierung.',
      recommendations: [
        'Optimiere deine Conversion-Funnels',
        'Implementiere A/B-Testing',
        'Skaliere deine Marketing-Ausgaben',
        'Baue ein Team auf'
      ],
      color: 'from-purple-500 to-pink-500'
    };
  } else if (avgScore < 3.5) {
    return {
      score: totalScore,
      level: 'Scale',
      title: '⚡ Scale Phase',
      description: 'Beeindruckend! Du bist bereit, dein Business zu skalieren.',
      recommendations: [
        'Implementiere erweiterte Analytics',
        'Automatisiere deine gesamte Funnel',
        'Skaliere dein Team und Prozesse',
        'Erkunde neue Märkte und Produkte'
      ],
      color: 'from-orange-500 to-red-500'
    };
  } else {
    return {
      score: totalScore,
      level: 'Enterprise',
      title: '👑 Enterprise Level',
      description: 'Du bist ein Top-Performer! Fokussiere dich auf Innovation und Marktführerschaft.',
      recommendations: [
        'Entwickle ein Signature-System',
        'Baue dein Personal Brand auf',
        'Investiere in strategische Partnerschaften',
        'Schaffe ein Vermächtnis'
      ],
      color: 'from-yellow-500 to-orange-500'
    };
  }
};

export default function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const [email, setEmail] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    const newScores = [...scores, answerIndex];
    setScores(newScores);

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleSubmitResults = (e: React.FormEvent) => {
    e.preventDefault();
    const result = getResults(scores);
    const leadData = {
      email,
      level: result.level,
      score: result.score,
      timestamp: new Date().toISOString(),
      answers: QUESTIONS.map((q, i) => ({
        question: q.question,
        answer: q.answers[scores[i]]
      }))
    };
    console.log('Lead submitted:', leadData);
    setSubmitted(true);
  };

  const result = getResults(scores);
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="max-w-md text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-500/20 rounded-full p-4">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
          </div>
          <h2 className="text-3xl font-bold mb-2">Danke!</h2>
          <p className="text-gray-300 mb-6">
            Dein personalisierter Bericht wird in Kürze an {email} versendet.
          </p>
          <button 
            onClick={() => {
              setCurrentQuestion(0);
              setScores([]);
              setEmail('');
              setShowResults(false);
              setSubmitted(false);
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Quiz erneut starten
          </button>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Dein Ergebnis</h1>
            <p className="text-gray-300">Basierend auf deinen Antworten</p>
          </div>

          {/* Result Card */}
          <div className={`bg-gradient-to-br ${result.color} rounded-2xl p-1 mb-8`}>
            <div className="bg-slate-900 rounded-2xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-5xl font-bold mb-2">{result.title}</h2>
                <p className="text-gray-300 text-lg">{result.description}</p>
              </div>

              <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
                <div className="text-center mb-4">
                  <p className="text-gray-400 text-sm mb-2">Dein Score</p>
                  <p className="text-5xl font-bold">{result.score}/24</p>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3">
                  <div 
                    className={`bg-gradient-to-r ${result.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${(result.score / 24) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Deine Empfehlungen:</h3>
                <ul className="space-y-3">
                  {result.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lead Capture */}
              <form onSubmit={handleSubmitResults} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Erhalte deinen detaillierten Bericht
                  </label>
                  <input
                    type="email"
                    placeholder="deine@email.de"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-slate-800 border border-purple-500/30 rounded-lg px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                >
                  Bericht erhalten <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              <p className="text-xs text-gray-400 text-center mt-4">
                Wir respektieren deine Privatsphäre. Keine Spam.
              </p>
            </div>
          </div>

          {/* Additional CTA */}
          <div className="bg-slate-800/50 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Bereit für die nächsten Schritte?</h3>
            <p className="text-gray-300 mb-4">
              Buche ein kostenloses Strategie-Gespräch mit einem unserer Experten
            </p>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              Termin buchen
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-4 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-500/50">
            <span className="text-sm font-semibold text-purple-300">📊 Kostenlos & Unverbindlich</span>
          </div>
          <h1 className="text-4xl font-bold mb-4">
            Finde dein Business-Wachstumspotential
          </h1>
          <p className="text-gray-300 text-lg">
            Beantworte 6 Fragen und erhalte personalisierte Empfehlungen für dein Business
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-400">Frage {currentQuestion + 1} von {QUESTIONS.length}</span>
            <span className="text-sm text-purple-400 font-semibold">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-purple-500/30 p-1 mb-8 animate-slide-up">
          <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-8">{QUESTIONS[currentQuestion].question}</h2>

            <div className="space-y-3">
              {QUESTIONS[currentQuestion].answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-4 rounded-lg border-2 border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/10 transition group cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium group-hover:text-purple-300 transition">{answer}</span>
                    <ChevronRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-1" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Social Proof */}
        <div className="text-center">
          <p className="text-gray-400 text-sm mb-4">Vertraut von über 1000 Unternehmern</p>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-400 ml-2">4.9/5 Bewertung</span>
          </div>
        </div>
      </div>
    </div>
  );
}

