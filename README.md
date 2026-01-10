# 🏥 MediScan - AI-Powered Medical Lab Report Analyzer

<div align="center">

[![React](https://img.shields.io/badge/React-19.2.0-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7.2.2-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.1.17-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

An intelligent, interactive dashboard for analyzing medical lab reports using artificial intelligence. MediScan transforms complex lab data into actionable health insights with clinical context and AI-powered interpretations.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- **📊 Comprehensive Lab Analysis**: Upload medical lab reports (PDF or Image) and get AI-powered analysis
- **🔬 Biomarker Insights**: Detailed analysis of blood counts, metabolic markers, lipid profiles, vitamins, and thyroid function
- **🫀 Organ Health Assessment**: Real-time monitoring of organ health status across multiple systems (heart, lungs, liver, kidneys, etc.)
- **📈 Trend Visualization**: Track biomarker trends over time with interactive sparklines and historical data
- **💊 Medication Tracking**: Monitor medications and potential interactions with biomarkers
- **🏃 Lifestyle Recommendations**: AI-generated lifestyle suggestions based on lab results and organ health status
- **⚠️ Risk Assessment**: Personalized risk scores for cardiovascular, metabolic, and other health conditions
- **🤖 AI-Powered Explanations**: Natural language interpretations of lab results in plain English
- **🚀 Fast Report Processing**: Rapid analysis using advanced machine learning models
- **🎯 Clinical Context**: Reference ranges, normal values, and clinical interpretations for every biomarker
- **♿ Accessible Design**: WCAG-compliant interface with keyboard navigation and screen reader support

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Usage](#-usage)
- [Key Components](#-key-components)
- [Data Flow](#-data-flow)
- [API Integration](#-api-integration)
- [Security & Privacy](#-security--privacy)
- [Development](#-development)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠 Tech Stack

### Frontend
- **React 19.2.0**: Modern UI framework with concurrent features
- **React Router 7.9.6**: Client-side routing for seamless navigation
- **Vite 7.2.2**: Next-generation frontend build tool with HMR (Hot Module Replacement)
- **Tailwind CSS 4.1.17**: Utility-first CSS framework for rapid UI development
- **JavaScript (ES Modules)**: Latest ECMAScript standards

### Development Tools
- **ESLint 9.39.1**: Code quality and style checking
- **React Refresh**: Fast refresh for components during development

---

## 📁 Project Structure

```
client/
├── public/                    # Static assets
├── src/
│   ├── assets/              # Images, icons, and media files
│   ├── pages/               # Page-level components
│   │   ├── landing.jsx          # Landing/upload page
│   │   ├── dashboard.jsx        # Main analysis dashboard
│   │   ├── loadingScreen.jsx    # Loading state UI
│   │   ├── medicalAILoader.jsx  # AI processing screen
│   │   └── components/          # Feature components
│   │       ├── overviewTab.jsx      # Patient summary overview
│   │       ├── biomarkersTab.jsx    # Biomarker analysis
│   │       ├── organTab.jsx         # Organ health status
│   │       ├── riskTab.jsx          # Risk assessment
│   │       ├── TrendsTab.jsx        # Trend visualization
│   │       ├── medicationTab.jsx    # Medication tracking
│   │       └── lifestyleTab.jsx     # Lifestyle recommendations
│   ├── App.jsx              # Main app component with routing
│   ├── App.css              # Global app styles
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── vite.config.js           # Vite configuration
├── eslint.config.js         # ESLint configuration
├── package.json             # Dependencies and scripts
└── README.md                # Documentation
```

---

## 📦 Installation

### Prerequisites
- **Node.js** 16.0+ 
- **npm** 8.0+ or **yarn**

### Clone the Repository

```bash
git clone https://github.com/yourusername/mediscan.git
cd mediscan/client
```

### Install Dependencies

```bash
npm install
```

---

## 🚀 Quick Start

### Development Mode

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

Create an optimized production build:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Lint Code

Check code quality with ESLint:

```bash
npm lint
```

---

## 💡 Usage

### 1. **Upload Medical Report**
   - Navigate to the landing page
   - Upload a medical lab report (PDF or Image format)
   - The AI processes the report and extracts biomarker data

### 2. **View Dashboard**
   - Access the comprehensive analysis dashboard
   - See patient overview and key metrics
   - Review organ health status

### 3. **Explore Biomarkers**
   - Click on the "Biomarkers" tab
   - View detailed biomarker values with reference ranges
   - See clinical flags (Low/Normal/High)
   - Review historical data and trends

### 4. **Check Organ Health**
   - Navigate to "Organs" tab
   - View health status for each organ system
   - Understand organ-specific insights

### 5. **Assess Risks**
   - Open the "Risks" tab
   - Review personalized risk assessments
   - Understand risk factors and contributing biomarkers

### 7. **Review Medications**
   - Check the "Medications" tab
   - See potential interactions
   - Track medication effectiveness

### 8. **Get Lifestyle Insights**
   - Access the "Lifestyle" tab
   - Get AI-powered recommendations
   - Understand lifestyle impact on biomarkers

---

## 🔧 Key Components

### Pages

#### `landing.jsx`
- Report upload interface
- File format validation (PDF/Image)
- Loading state management
- Sample report download
- FAQ section with clinical information

#### `dashboard.jsx`
- Main application dashboard
- Tab-based interface (Overview, Biomarkers, Organs, Risks, Trends, Medications, Lifestyle)
- Medical data state management
- Responsive layout

#### `medicalAILoader.jsx`
- AI processing progress visualization
- Loading animation
- Status messages

#### `loadingScreen.jsx`
- Fallback loading component
- Suspense boundary UI

### Component Library

#### `overviewTab.jsx`
Displays:
- Patient name and demographic info
- Key health metrics summary
- Top risk factors
- Quick action items

#### `biomarkersTab.jsx`
Features:
- Grouped biomarkers (Blood Count, Metabolic, Lipids, Vitamins, Thyroid)
- Values with units and reference ranges
- Clinical status indicators
- Historical sparklines
- Delta from prior visit

#### `organTab.jsx`
Shows:
- Multi-organ health visualization
- Organ-specific status (Healthy/Slight/Moderate/Critical)
- Associated biomarkers per organ
- Health score breakdown

#### `riskTab.jsx`
Includes:
- Personalized risk scores
- Risk category breakdowns
- Contributing factors
- Clinical recommendations
- Confidence levels

#### `medicationTab.jsx`
Contains:
- Current medication list
- Dosage and frequency
- Drug-biomarker interactions
- Side effect alerts
- Adherence tracking

#### `lifestyleTab.jsx`
Features:
- Lifestyle factor analysis (Diet, Exercise, Sleep, Stress)
- AI-generated recommendations
- Impact on specific biomarkers
- Improvement tracking
- Resource links

---

## 🔄 Data Flow

```
User Upload
    ↓
Landing Page (landing.jsx)
    ↓
AI Processing (Backend API Call)
    ↓
Loading Screen (medicalAILoader.jsx)
    ↓
Dashboard (dashboard.jsx)
    ↓
Session Storage
    ↓
Render Tabs (overviewTab, biomarkersTab, etc.)
    ↓
User Exploration & Interaction
```

### Data Persistence
- Medical data is stored in **sessionStorage** for the current session
- Data is cleared on logout or browser close for privacy
- No sensitive data is persisted to local storage

---

## 🔌 API Integration

The client communicates with the MediScan backend API for:

### Endpoints

#### `POST /api/uploads`
- **Purpose**: Upload and process medical lab reports
- **Body**: FormData with file
- **Response**: Parsed biomarker data, organ health, risks, and recommendations

#### `GET /api/patient/:id/summary`
- **Purpose**: Retrieve patient medical summary
- **Parameters**: Patient ID
- **Response**: Complete medical data with historical trends

#### `POST /api/prompt`
- **Purpose**: Send custom prompts for AI-powered analysis
- **Body**: Prompt text, context, patient ID
- **Response**: AI-generated explanation/insight

### Authentication
- All requests require **JWT token** or **session cookie**
- Include auth header: `Authorization: Bearer <token>`
- Tokens are managed at the app level via `App.jsx`

### Error Handling
- Network errors trigger retry logic
- API errors display user-friendly messages
- Failed uploads show validation errors

---

## 🔒 Security & Privacy

### Client-Side Security Measures

✅ **HTTPS Only**: All API communications use encrypted connections
✅ **Session Storage**: No PHI (Protected Health Information) stored in localStorage
✅ **Automatic Logout**: Session data cleared on browser close
✅ **CSRF Protection**: Token-based request validation
✅ **Content Security Policy**: Prevent XSS attacks
✅ **No Credentials in URL**: Patient IDs never exposed in URLs

### Privacy Best Practices

- ⚠️ **Sensitive Data**: Only transmitted during active sessions
- 👁️ **User Consent**: Explicit consent flows for PHI access
- 📋 **Audit Logging**: Track data access and modifications
- 🔐 **Encryption**: Data in transit and at rest encrypted
- 🚫 **Data Minimization**: Only request necessary information

### HIPAA Compliance Notes
- This application handles PHI and should be deployed in HIPAA-compliant environments
- Ensure backend API meets HIPAA requirements
- Use encrypted connections and proper access controls
- Implement appropriate logging and audit trails

---

## ♿ Accessibility

MediScan is built with accessibility in mind:

- **WCAG 2.1 AA Compliance**: Meets Web Content Accessibility Guidelines
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Text meets minimum contrast ratios
- **Focus Management**: Clear focus indicators on interactive elements
- **Alt Text**: All charts and images have text alternatives

---

## 🧪 Testing & Quality

### Running Tests

```bash
# Run ESLint
npm run lint

# Future: Unit tests
npm run test

# Future: E2E tests  
npm run test:e2e
```

### Test Coverage
- Unit tests for key components
- Integration tests for user flows
- E2E tests for critical paths

---

## 👨‍💻 Development

### Best Practices

1. **Component Structure**: Keep components focused and reusable
2. **State Management**: Use React hooks (useState, useEffect, useContext)
3. **Styling**: Use Tailwind CSS for consistency
4. **Performance**: Implement lazy loading and code splitting
5. **Error Handling**: Graceful error messages and fallbacks

### Adding New Features

1. Create new component in `src/pages/components/`
2. Import in the appropriate parent component
3. Add styling with Tailwind CSS
4. Integrate with API as needed
5. Test in dev mode with `npm run dev`
6. Run linter: `npm run lint`

### Hot Module Replacement (HMR)
- Changes are reflected instantly in the browser
- No need to refresh manually during development
- Preserves component state when possible

---

## 📚 Clinical Context

### Common Biomarkers

| Biomarker | Abbreviation | Normal Range | Unit |
|-----------|-------------|--------------|------|
| Hemoglobin A1c | HbA1c | < 5.7% | % |
| LDL Cholesterol | LDL-C | < 100 | mg/dL |
| Fasting Glucose | FG | 70-100 | mg/dL |
| Creatinine | Cr | 0.7-1.3 | mg/dL |
| TSH | TSH | 0.4-4.0 | mIU/L |

*Note: Reference ranges vary by laboratory and population*

### Organ Systems Monitored
- 🫀 Cardiovascular system
- 🫁 Respiratory system
- 🧠 Neurological function
- 🫘 Liver function
- 🫐 Kidney function
- 🩸 Blood chemistry
- 🧬 Metabolic markers

---

## 🐛 Troubleshooting

### Report Upload Issues
- **Problem**: File not recognized
- **Solution**: Ensure file is PDF or common image format (PNG, JPG)

### Slow Performance
- **Problem**: Dashboard sluggish with large datasets
- **Solution**: Clear browser cache, ensure sufficient RAM

### Authentication Errors
- **Problem**: 401 Unauthorized errors
- **Solution**: Check JWT token validity, re-login if needed

### Missing Data
- **Problem**: Biomarkers not displaying
- **Solution**: Verify backend API is running and accessible

---

## 📄 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_BASE_URL=http://localhost:3001
VITE_APP_NAME=MediScan
VITE_APP_VERSION=1.0.0
```

---

## 🤝 Contributing

We welcome contributions! Here's how:

### Steps to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request with detailed description

### Contribution Guidelines
- Follow existing code style and ESLint rules
- Write clear, descriptive commit messages
- Add tests for new features
- Update documentation as needed
- Ensure no console errors or warnings
- Test on multiple browsers

### Reporting Issues
- Use GitHub Issues for bug reports
- Include browser/OS information
- Provide steps to reproduce
- Share error logs if applicable

---

## 📖 Documentation

- [Backend Documentation](../backend/README.md) - API and AI model details
- [Architecture Guide](./Doc.md) - Detailed technical architecture
- [Clinical Guidelines](./src/pages/ReadMe.md) - Clinical context and interpretations
- [Component API](./docs/COMPONENTS.md) - Component prop documentation

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Roadmap

### Current Version (v1.0)
- ✅ Lab report analysis (PDF/Image)
- ✅ Biomarker extraction and analysis
- ✅ Organ health assessment
- ✅ Risk stratification
- ✅ Trend visualization

### Planned Features (v1.1)
- 🔄 Real-time biometric integration
- 📱 Mobile app (React Native)
- 📊 Advanced predictive analytics
- 🔔 Smart notifications and alerts
- 🌐 Multi-language support

### Future Features (v2.0)
- 💬 Enhanced AI chat interface
- 🏥 Integration with EHR systems
- 👥 Multi-user and family accounts
- 📈 Comparative population analytics
- 🎮 Gamified health coaching

---

## 📞 Support

For support and questions:
- 📧 Email: support@mediscan.ai
- 💬 Discord: [Join our community](https://discord.gg/mediscan)
- 🐦 Twitter: [@MediScanAI](https://twitter.com/mediscan)
- 📖 Wiki: [Detailed guides and FAQs](https://wiki.mediscan.ai)

---

## 🙏 Acknowledgments

- Built with [React](https://react.dev/) and [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Clinical insights powered by advanced AI models

---

<div align="center">

**Made with ❤️ for better healthcare**

[⬆ back to top](#-mediscan---ai-powered-medical-lab-report-analyzer)

</div>
