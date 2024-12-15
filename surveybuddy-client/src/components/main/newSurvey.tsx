import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./datePicker";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createSurvey,
  updateSurvey,
} from "@/utils/surveyUtils/surveyFunctions.js";
import { Survey } from "../../utils/surveyUtils/surveyTypes";
import schema from "@/utils/surveyUtils/surveySchema";

interface NewSurveyCardProps {
  propsSurveyData?: Survey | null;
}

interface SurveyFormFields {
  name: string;
  description?: string;
  purpose: string;
  respondents: string;
  organisation?: string;
  endDate?: string;
}

export function NewSurveyCard({ propsSurveyData }: NewSurveyCardProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { surveyId } = useParams<{ surveyId: string }>();

  // Get surveyData from props or location state
  const surveyData = propsSurveyData || location.state?.surveyData || null;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<SurveyFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    if (surveyData) {
      console.log("Populating form with survey data:", surveyData);
      // Populate fields with surveyData
      setValue("name", surveyData.name);
      setValue("description", surveyData.description);
      setValue("purpose", surveyData.purpose || "other");
      setValue("respondents", surveyData.respondents || "public");
      setValue("organisation", surveyData.organisation || "");
      setValue("endDate", surveyData.endDate);
    }
  }, [propsSurveyData, surveyData, setValue]);

  const onSubmit = async (data: FieldValues) => {
    try {
      schema.parse(data); // Validate the form data
      console.log("Validation Passed:", data);

      if (surveyData && surveyId) {
        // Update an existing survey
        const updatedSurvey = await updateSurvey(surveyId, data);
        console.log("Survey updated successfully:", updatedSurvey);
        alert("Survey updated successfully!");
        navigate(`/surveys/${surveyId}`);
      } else {
        // Create a new survey
        const formattedData = {
          ...data,
          endDate: data.endDate
            ? new Date(data.endDate).toISOString()
            : undefined,
        };
        const createdSurvey = await createSurvey(formattedData);
        console.log("Survey created successfully:", createdSurvey);
        alert("Survey created successfully!");

        if (createdSurvey?._id) {
          // Redirect to create questions for the new survey

          navigate(`/surveys/${createdSurvey._id}/questions/1`);
        }
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>
          {propsSurveyData ? "Edit Survey" : "Create New Survey"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            {/* Name Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Survey name..."
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            {/* Description Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                placeholder="Survey description..."
                rows={5}
                {...register("description")}
                className="border border-gray-300 rounded p-2 w-full h-32"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            {/* Purpose Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="purpose">Purpose</Label>
              <Select
                onValueChange={(value) => setValue("purpose", value)}
                defaultValue={propsSurveyData?.purpose || ""}
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select Purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="fun">Fun</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Respondents Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="respondents">Respondents</Label>
              <Select
                onValueChange={(value) => setValue("respondents", value)}
                defaultValue={propsSurveyData?.respondents || ""}
              >
                <SelectTrigger id="respondents">
                  <SelectValue placeholder="Select Respondents" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="inviteOnly">Invite Only</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Organisation Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="organisation">Organisation</Label>
              <Input
                id="organisation"
                placeholder="Organisation..."
                {...register("organisation")}
              />
            </div>

            {/* Completion Date Field */}
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="endDate">Completion Date</Label>
              <DatePicker
                onChange={(date) =>
                  setValue("endDate", date?.toISOString() || "", {
                    shouldValidate: true,
                  })
                }
              />
            </div>
          </div>

          <CardFooter className="flex justify-between">
            <Link to={surveyData ? `/surveys/${surveyId}` : "/surveys"}>
              <Button variant="outline">Back</Button>
            </Link>
            <Button type="submit" disabled={!isValid}>
              {propsSurveyData ? "Update" : "Create"}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
