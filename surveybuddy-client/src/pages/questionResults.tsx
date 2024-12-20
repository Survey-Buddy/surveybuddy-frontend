import { Button } from "@/components/ui/button";
import { MultiChoicePieChart } from "@/components/visualAnalytics/multiChoicePieChart";
import { ResponseBarChart } from "@/components/visualAnalytics/responseBarChart";
import WrittenResponsesList from "@/components/visualAnalytics/writtenResponseCards";
import { Link, useLocation, useParams } from "react-router-dom";

const QuestionResultsPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const questionFormat = queryParams.get("questionFormat");
  const { surveyId } = useParams<{ surveyId: string }>();

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
      <Link to={`/surveys/${surveyId}`}>
        <Button className="m-[2%]">Back</Button>
      </Link>
    </>
  );
};

export default QuestionResultsPage;
