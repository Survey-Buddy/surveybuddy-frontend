import "./App.css";
import { Button } from "@/components/ui/button";
import { Menubar } from "./components/ui/menubar";
import Surveys from "./pages/surveys";
import { ComboboxDemo } from "./pages/surveyLinks";
import { Footer1 } from "./components/main/footer";
import { Router } from "react-router-dom";
import { Register } from "./components/main/signinLogin";
import { Header1 } from "./components/main/navbar";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Header1></Header1>
        <main className="flex-grow">
          <div
            className="flex justify-center items-center h-full"
            style={{
              marginTop: "5%",
              backgroundImage: `url(/assets/images/8582990.jpg)`,
              height: "60%",
              width: "60%",
              margin: "0 auto",
            }}
          >
            <img
              className="max-w-full max-h-full object-contain"
              src="/assets/images/8582990.jpg"
              alt="Survey drawing image"
            ></img>
          </div>

          {/* <h1>SurveyBuddy</h1>
          <Surveys></Surveys>
          <Register></Register>
          <ComboboxDemo></ComboboxDemo> */}
        </main>
        <Footer1></Footer1>
      </div>
    </>
  );
}

export default App;
