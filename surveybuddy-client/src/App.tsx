import "./App.css";
import { Button } from "@/components/ui/button";
import { Menubar } from "./components/ui/menubar";
import Surveys from "./pages/surveys";
import { ComboboxDemo } from "./pages/surveyLinks";
import { Footer1 } from "./components/main/footer";
import { Router } from "react-router-dom";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <h1>SurveyBuddy</h1>
          <Surveys></Surveys>
          <ComboboxDemo></ComboboxDemo>
        </main>
        <Footer1></Footer1>
      </div>
    </>
  );
}

export default App;
