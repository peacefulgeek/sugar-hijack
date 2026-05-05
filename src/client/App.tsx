import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ArticlesPage } from './pages/ArticlesPage';
import { ArticlePage } from './pages/ArticlePage';
import { AboutPage } from './pages/AboutPage';
import { RecommendedPage } from './pages/RecommendedPage';
import { AssessmentPage } from './pages/AssessmentPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { NotFoundPage } from './pages/NotFoundPage';
import './styles/tokens.css';

interface AppProps {
  ssrData?: any;
}

export function App({ ssrData }: AppProps) {
  return (
    <div className="app-root">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage ssrData={ssrData} />} />
          <Route path="/articles" element={<ArticlesPage ssrData={ssrData} />} />
          <Route path="/articles/:slug" element={<ArticlePage ssrData={ssrData} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/recommended" element={<RecommendedPage />} />
          <Route path="/assessment" element={<AssessmentPage />} />
          <Route path="/assessment/:slug" element={<AssessmentPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
