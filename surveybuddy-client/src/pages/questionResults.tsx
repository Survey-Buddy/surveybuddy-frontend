import { Button } from "@/components/ui/button";
import { MultiChoicePieChart } from "@/components/visualAnalytics/multiChoicePieChart";
import { ResponseBarChart } from "@/components/visualAnalytics/responseBarChart";
import WrittenResponsesList from "@/components/visualAnalytics/writtenResponseCards";
import { Link, useLocation, useParams } from "react-router-dom";

// Display Specific Question Results Page

const QuestionResultsPage = () => {
  // Get current location
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  // Get question format from query params
  const questionFormat = queryParams.get("questionFormat");
  // Get the survey id from the route params
  const { surveyId } = useParams<{ surveyId: string }>();

  return (
    <>
      <div className="mt-[10%] ">Question Results</div>
      {/* Render different components based on question format */}
      {questionFormat === "rangeSlider" ? (
        <ResponseBarChart></ResponseBarChart>
      ) : questionFormat === "writtenResponse" ? (
        <WrittenResponsesList></WrittenResponsesList>
      ) : (
        <MultiChoicePieChart></MultiChoicePieChart>
      )}
      {/* Display an error message if question format is missing or invalid */}
      {!questionFormat && (
        <p className="text-red-500">Invalid or missing question format.</p>
      )}
      {/* Button back to specific survey page */}
      <Link to={`/surveys/${surveyId}`}>
        <Button className="m-[2%]">Back</Button>
      </Link>
    </>
  );
};

export default QuestionResultsPage;
