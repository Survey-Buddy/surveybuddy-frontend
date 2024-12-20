import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Survey } from "../../utils/surveyUtils/surveyTypes";
import CopyToClipboard from "./copyToClipboard";

interface SurveyListProps {
  surveys: Survey[];
}

export const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
  return (
    <ScrollArea className="h-[auto] w-[600px] rounded-md border p-4">
      <Table className="mt-10">
        <TableCaption>A list of your recent surveys.</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="">Name</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Organisation</TableHead>
            <TableHead>Respondents</TableHead>
            <TableHead className="text-right">End Date</TableHead>
            <TableHead>Link</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {surveys.map((survey) => (
            <TableRow key={survey._id}>
              <TableCell>
                <Link
                  to={`/surveys/${survey._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {survey.name}
                </Link>
              </TableCell>

              <TableCell>{survey.active ? "Active" : "Completed"}</TableCell>
              <TableCell>{survey.organisation}</TableCell>
              <TableCell>{survey.respondents}</TableCell>
              <TableCell className="text-right">
                {survey.endDate
                  ? format(new Date(survey.endDate), "MMMM dd, yyyy")
                  : "No end date"}
              </TableCell>
              <TableCell>
                <CopyToClipboard
                  textToCopy={`https://surveybuddy.tech/surveys/${survey._id}/response/1`}
                ></CopyToClipboard>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter></TableFooter>
      </Table>
    </ScrollArea>
  );
};
