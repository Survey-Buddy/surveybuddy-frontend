import { getToken } from "@/utils/jwtToken";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { optional, z } from "zod";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/components/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const schema = z.object({
  question: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  answer: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." }),
  questionFormat: z.enum(["multiChoice", "range", "writtenResponse"]),
});

export function NewQuestionCard() {
  const token = getToken();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
  } = useForm<FormData>({ resolver: zodResolver(schema), model: "onChange" });

  const onSubmit = async (data: FieldValues) => {
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
    } catch (error) {
      console.error("Error sending data", error);
    }
  };

  return (
    <Tabs defaultValue="multiChoice" className="w-[600px]">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="writtenResponse">Written Response</TabsTrigger>
        <TabsTrigger value="multiChoice">Multi Choice</TabsTrigger>
        <TabsTrigger value="range">Range Slider</TabsTrigger>
      </TabsList>
      <TabsContent value="writtenResponse">
        <Card>
          <CardHeader>
            <CardTitle>Written Response</CardTitle>
            <CardDescription>
              <Popover>
                <PopoverTrigger className="cursor-pointer hover:underline ">
                  Description
                </PopoverTrigger>
                <PopoverContent>
                  Written response survey questions are ideal for capturing
                  detailed, qualitative feedback. They allow respondents to
                  express thoughts in their own words, providing deeper
                  insights. While they lack immediate data analytics, the
                  responses can later be analysed for trends or key themes.
                </PopoverContent>
              </Popover>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="question">Question</Label>

              <textarea
                className="border border-gray-300 rounded p-2 w-full h-32"
                placeholder="Enter your question here..."
                rows={5} // Optional, defines the number of visible rows
                id="description"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit Survey</Button>
            <Button>New Question</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="multiChoice">
        <Card>
          <CardHeader>
            <CardTitle>Multiple Choice</CardTitle>
            <CardDescription>
              <Popover>
                <PopoverTrigger className="cursor-pointer hover:underline ">
                  Description
                </PopoverTrigger>
                <PopoverContent>
                  Multiple-choice survey questions are ideal for gathering
                  clear, quantifiable responses. They present a set of
                  predefined options, allowing respondents to select one or more
                  answers. This format simplifies data analysis, as responses
                  are easily categorised, but it limits the depth of feedback
                  compared to open-ended questions.
                </PopoverContent>
              </Popover>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="mcQuestion">Question</Label>
              <Input id="mcQuestion" type="text" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Answers</Label>

              <Input id="answerA" type="text" placeholder="Answer A" />
              <Input id="answerB" type="text" placeholder="Answer B" />
              <Input id="answerC" type="text" placeholder="Answer C" />
              <Input id="answerD" type="text" placeholder="Answer D" />
            </div>
            <div>
              <RadioGroup defaultValue="option-A">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-A" id="option-A" />
                  <Label htmlFor="option-A">{}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-B" id="option-B" />
                  <Label htmlFor="option-B"></Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-C" id="option-C" />
                  <Label htmlFor="option-C"></Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="option-D" id="option-D" />
                  <Label htmlFor="option-D"></Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
