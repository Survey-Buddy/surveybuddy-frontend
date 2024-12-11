import "./App.css";
import { Footer1 } from "./components/main/footer";
import { Header1 } from "./components/main/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import SurveysPage from "./pages/surveysPage";
import LoginPage from "./pages/loginSignup";
import RegisterPage from "./pages/registerPage";
import CommunityPage from "./pages/communityPage";
import TargetedPage from "./pages/targetedPage";
import ContactPage from "./pages/contactPage";
import HomePage from "./pages/homePage";
import MarketingPage from "./pages/marketingPage";
import NewSurveyPage from "./pages/NewSurveyPage";
import QuestionPage from "./pages/questionPage";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header1 />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/surveys/" element={<SurveysPage />} />
            <Route path="/surveys/newsurvey" element={<NewSurveyPage />} />
            <Route
              path="/surveys/:surveyId/questions/"
              element={<QuestionPage />}
            />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/targeted" element={<TargetedPage />} />
            <Route path="/marketing" element={<MarketingPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer1 />
      </div>
    </Router>
  );
}

export default App;
