import React from "react";
import "./App.css";
import Surveys from "./pages/surveys";
import { Footer1 } from "./components/main/footer";
import { Header1 } from "./components/main/navbar";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import { Home } from "lucide-react";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header1 />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home/:userId" element={<Home />} />
            <Route path="/surveys/:userId" element={<Surveys />} />
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
