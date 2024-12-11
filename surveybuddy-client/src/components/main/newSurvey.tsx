import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Link, useNavigate } from "react-router-dom";
import { optional, z } from "zod";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { getToken, isTokenExpired, removeToken } from "../../utils/jwtToken.js";

const schema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  description: z
    .string()
    .min(5, { message: "Description must be at least 5 characters long." })
    .optional(),
  purpose: z
    .enum(["work", "research", "school", "fun", "other"])
    .default("other"),
  respondents: z.enum(["public", "registered", "inviteOnly"]).default("public"),
  organisation: z
    .string()
    .min(3, { message: "Organisation must be at least 3 characters long." })
    .optional(),
  completionDate: z
    .date()
    .refine((date) => date > new Date(), {
      message: "Completion date must be in the future.",
    })
    .optional(),
});

export function NewSurveyCard() {
  const token = getToken();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange" });

  const onSubmit = async (data: FieldValues) => {
    try {
      schema.parse(data);
      console.log("Validation Passed");
    } catch (error) {
      console.error("Validation Error:", error);
    }

    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8080/surveys/",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response) {
        throw new Error("Error submitting survey.");
      }

      // Exract _id to use in url params
      const { name, _id } = response.data.survey;
      // Navigate to create questions
      navigate(`/surveys/${_id}/questions/1`);
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create New Survey</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Survey name..."
                {...register("name")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              {/* <Input id="description" placeholder="Survey description..." 
              className="border border-gray-300 rounded p-2 h-16 w-full"/> */}
              <textarea
                className="border border-gray-300 rounded p-2 w-full h-32"
                placeholder="Enter your text here"
                rows={5} // Optional, defines the number of visible rows
                id="description"
                {...register("description")}
              />
            </div>
            <div className="flex flex-col space-y-1.5 ">
              <Label htmlFor="purpose">Purpose</Label>
              <Select
                onValueChange={(value) => setValue("purpose", value)}
                defaultValue=""
              >
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="school">School</SelectItem>
                  <SelectItem value="fun">Fun</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="respondents">Respondents</Label>
              <Select onValueChange={(value) => setValue("respondents", value)}>
                <SelectTrigger id="respondents">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="registered">Registered</SelectItem>
                  <SelectItem value="inviteOnly">Invite Only</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="organisation">Organisation</Label>
                <Input
                  id="organisation"
                  placeholder="Organisation..."
                  type="text"
                  {...register("organisation")}
                />
              </div>
            </div>
            <Label htmlFor="completionDate">Completion Date</Label>
            <DatePicker
              onChange={(date) =>
                setValue("completionDate", date, { shouldValidate: true })
              }
            ></DatePicker>
          </div>

          <CardFooter className="flex justify-between">
            <Link to="/surveys">
              <Button variant="outline">Back</Button>
            </Link>

            <Button type="submit" disabled={!isValid}>
              Continue
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
