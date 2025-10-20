# 📊 Business Potential Quiz - Interactive Lead Funnel

Ein hochkonvertierendes interaktives Quiz-Tool für Lead-Generierung, entwickelt mit React, TypeScript und Tailwind CSS.

## Features

✨ **Interaktive Quiz-Funktion**
- 6 Fragen zur Analyse des Business-Potentials
- Echtzeit-Scoring und Fortschrittsanzeige
- Personalisierte Ergebnisse basierend auf Antworten

🎯 **Lead-Capture-Optimiert**
- Nahtlose Email-Erfassung nach Quiz-Abschluss
- UTM-Parameter-Tracking
- Lead-Daten-Logging für CRM-Integration

🎨 **Modern & Responsive**
- Dark Mode Design mit Gradient-Effekten
- Vollständig responsive für alle Geräte
- Smooth Animations und Übergänge

📈 **Conversion-Fokussiert**
- Social Proof Integration
- Multi-Step Funnel Design
- Clear Call-to-Action Buttons

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4
- **Build Tool**: Vite
- **Icons**: Lucide React

## Installation & Setup

```bash
# Dependencies installieren
pnpm install

# Development Server starten (Port 3001)
pnpm dev

# Production Build erstellen
pnpm build

# Build Preview
pnpm preview
```

## Projektstruktur

```
quiz-funnel-tool/
├── src/
│   ├── App.tsx          # Hauptkomponente mit Quiz-Logik
│   ├── main.tsx         # React Entry Point
│   └── index.css        # Globale Styles
├── index.html           # HTML Template
├── vite.config.ts       # Vite Konfiguration
├── tailwind.config.js   # Tailwind Konfiguration
└── package.json         # Dependencies
```

## Verwendung

### Quiz-Fragen anpassen

Bearbeite das `QUESTIONS` Array in `src/App.tsx`:

```typescript
const QUESTIONS: Question[] = [
  {
    id: 1,
    question: 'Deine Frage?',
    answers: ['Antwort 1', 'Antwort 2', 'Antwort 3', 'Antwort 4'],
    category: 'kategorie'
  },
  // ... weitere Fragen
];
```

### Ergebnisse anpassen

Modifiziere die `getResults()` Funktion für benutzerdefinierte Ergebnisse:

```typescript
const getResults = (scores: number[]): Result => {
  // Deine Logik hier
};
```

### Lead-Daten verarbeiten

Die erfassten Lead-Daten werden in der `handleSubmitResults()` Funktion geloggt:

```typescript
const leadData = {
  email,
  level: result.level,
  score: result.score,
  timestamp: new Date().toISOString(),
  answers: QUESTIONS.map((q, i) => ({...}))
};
```

Integriere hier dein CRM oder Email-Service (Zapier, Make, etc.)

## Deployment

### Netlify

1. Repository auf GitHub pushen
2. Netlify mit GitHub verbinden
3. Build Command: `pnpm build`
4. Publish Directory: `dist`

### Andere Plattformen

Das Projekt kann auf jeder Plattform deployed werden, die Node.js und npm/pnpm unterstützt:
- Vercel
- GitHub Pages
- Firebase Hosting
- AWS Amplify

## Customization

### Farben anpassen

Bearbeite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#8b5cf6',
      secondary: '#ec4899',
    }
  }
}
```

### Fragen-Kategorien

Das System unterstützt verschiedene Kategorien für erweiterte Analysen:
- `revenue` - Umsatz
- `time` - Zeit-Investment
- `leads` - Lead-Generierung
- `conversion` - Conversion-Rate
- `automation` - Marketing-Automation
- `satisfaction` - Zufriedenheit

## Performance

- Optimiert für schnelle Ladezeiten
- Lazy Loading für Bilder
- Minimale Bundle-Size durch Vite
- Responsive Design für alle Bildschirmgrößen

## Browser-Unterstützung

- Chrome (neueste)
- Firefox (neueste)
- Safari (neueste)
- Edge (neueste)

## Lizenz

MIT

## Support

Für Fragen oder Probleme, erstelle bitte ein Issue im GitHub Repository.

---

**Entwickelt als Portfolio-Projekt für Web Developer / Funnel Builder Position**

