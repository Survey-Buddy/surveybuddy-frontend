import "./App.css";
import { Footer1 } from "./components/main/footer";
import { Header1 } from "./components/main/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Home from "lucide-react";
import SurveysPage from "./pages/surveysPage";
import LoginPage from "./pages/loginSignup";
import RegisterPage from "./pages/registerPage";
import CommunityPage from "./pages/communityPage";
import TargetedPage from "./pages/targetedPage";
import ContactPage from "./pages/contactPage";
import HomePage from "./pages/homePage";
import MarketingPage from "./pages/marketingPage";

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

// return (
//   <>
//     <div className="flex flex-col min-h-screen">
//       <Header1></Header1>
//       <main className="flex-grow">
//         <div
//           className="flex justify-center items-center h-full"
//           style={{
//             marginTop: "5%",
//             backgroundImage: `url(/assets/images/8582990.jpg)`,
//             height: "60%",
//             width: "60%",
//             margin: "0 auto",
//           }}
//         >
//           <img
//             className="max-w-full max-h-full object-contain"
//             src="/assets/images/8582990.jpg"
//             alt="Survey image designed by Freepik”"
//           ></img>
//         </div>

//         {/* <h1>SurveyBuddy</h1>
//         <Surveys></Surveys>
//         <Register></Register>
//         <ComboboxDemo></ComboboxDemo> */}
//       </main>
//       <Footer1></Footer1>
//     </div>
//   </>
// );
