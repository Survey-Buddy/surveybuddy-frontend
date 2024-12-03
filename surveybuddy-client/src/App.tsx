import "./App.css";
import { Button } from "@/components/ui/button";
import { Menubar } from "./components/ui/menubar";
import Surveys from "./pages/surveys";

function App() {
  return (
    <>
      <h1>SurveyBuddy</h1>
      <Surveys></Surveys>
    </>
  );
}

export default App;
