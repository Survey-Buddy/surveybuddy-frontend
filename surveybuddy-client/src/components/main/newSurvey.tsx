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

// NewSurveyCard props interface
interface NewSurveyCardProps {
  propsSurveyData?: Survey | null;
}

// Interface for survey form fields
interface SurveyFormFields {
  name: string;
  description: string;
  purpose: string;
  respondents: string;
  organisation: string;
  endDate: string;
}

// Creating or Editing Survey Component

// Extract and destructure propsSurveyData (instead of 'props') from NewSurveyCardProps
export const NewSurveyCard = ({ propsSurveyData }: NewSurveyCardProps) => {
  // Hook for navigating routes
  const navigate = useNavigate();
  // Hook to access location state
  const location = useLocation();
  // Get survey id from route params
  const { surveyId } = useParams<{ surveyId: string }>();

  // Get surveyData from props or location state or null (TS error fix)
  const surveyData = propsSurveyData || location.state?.surveyData || null;

  // Setup form with validation
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<SurveyFormFields>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  // Populate form fields if editing an existing survey
  useEffect(() => {
    if (surveyData) {
      // Populate fields with surveyData using setValue
      setValue("name", surveyData.name);
      setValue("description", surveyData.description || "");
      setValue("purpose", surveyData.purpose || "other");
      setValue("respondents", surveyData.respondents || "public");
      setValue("organisation", surveyData.organisation || "");
      setValue("endDate", surveyData.endDate || "Unknown");
    }
  }, [propsSurveyData, surveyData, setValue]);

  // Handle form submission
  const onSubmit = async (data: FieldValues) => {
    try {
      // Validate the form data
      schema.parse(data);

      if (surveyData && surveyId) {
        // Update an existing survey
        const updatedSurvey = await updateSurvey(surveyId, data);
        console.log("Survey updated successfully:", updatedSurvey);
        alert("Survey updated successfully!");
        navigate(`/surveys/${surveyId}`);
      } else {
        // Create a new survey
        // Format data to fix TS date errors
        const formattedData = {
          ...data,
          date: data.date ? data.date.toISOString() : new Date().toISOString(),
          endDate: data.endDate
            ? new Date(data.endDate).toISOString()
            : "Unknown",
        };
        const createdSurvey = await createSurvey(formattedData);
        console.log("Survey created successfully:", createdSurvey);
        alert("Survey created successfully!");

        if (createdSurvey?._id) {
          // Redirect user to create questions for the new survey
          navigate(`/surveys/${createdSurvey._id}/questions/1`);
        }
      }
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Card className="min-w-[40%]">
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
};
