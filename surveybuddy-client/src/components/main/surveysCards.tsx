import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

interface SurveyCardProps {
  _id: string;
  name: string;
  description: string;
  active: boolean;
  organisation: string;
  respondents: string;
  endDate: Date | null;
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
      {endDate}
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
        <h2>Organisation: {organisation}</h2>

        <p className="text-muted-foreground text-base">
          Description: {description}
        </p>
      </div>
      <Button>Results</Button>
    </div>
  </div>
);
