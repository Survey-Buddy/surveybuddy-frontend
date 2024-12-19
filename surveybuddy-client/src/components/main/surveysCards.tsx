import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { format } from "date-fns";
import CopyToClipboard from "./copyToClipboard";
import BASE_URL from "@/config/apiConfig";

interface SurveyCardProps {
  _id: string;
  name: string;
  date: string;
  description: string;
  active: boolean;
  organisation: string;
  respondents: string;
  endDate: string;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({
  _id,
  name,
  description,
  active,
  organisation,
  respondents,
  endDate,
}) => (
  <div className="grid gap-8 ">
    <div className="flex flex-col gap-2">
      <Badge>{active ? "Active" : "Complete"}</Badge>
      <p>
        {endDate ? format(new Date(endDate), "MMMM dd, yyyy") : "No end date"}
      </p>

      <div className="bg-muted rounded-md aspect-video mb-1">
        <p>Respondents: {respondents}</p>
        <h3 className="text-xl tracking-tight">
          <Link
            to={`/surveys/${_id}`}
            className="text-blue-500 hover:underline"
          >
            {name}
          </Link>
        </h3>
        <div className="flex flex-row justify-center">
          <CopyToClipboard
            textToCopy={`${BASE_URL}/surveys/${_id}/response/1`}
          ></CopyToClipboard>
        </div>

        <h2>Organisation: {organisation}</h2>

        <p className="text-muted-foreground text-base">
          Description: {description}
        </p>
      </div>
      <Button>Results</Button>
    </div>
  </div>
);
