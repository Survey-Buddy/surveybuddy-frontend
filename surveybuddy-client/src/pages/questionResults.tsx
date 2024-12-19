import { MultiChoicePieChart } from "@/components/visualAnalytics/multiChoicePieChart";
import { ResponseBarChart } from "@/components/visualAnalytics/responseBarChart";
import WrittenResponsesList from "@/components/visualAnalytics/writtenResponseCards";
import { useLocation } from "react-router-dom";

const QuestionResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionFormat = queryParams.get("questionFormat");

  return (
    <>
      <div className="mt-[10%] ">Question Results</div>
      {questionFormat === "rangeSlider" ? (
        <ResponseBarChart></ResponseBarChart>
      ) : questionFormat === "writtenResponse" ? (
        <WrittenResponsesList></WrittenResponsesList>
      ) : (
        <MultiChoicePieChart></MultiChoicePieChart>
      )}
      {!questionFormat && (
        <p className="text-red-500">Invalid or missing question format.</p>
      )}
    </>
  );
};

export default QuestionResultsPage;
