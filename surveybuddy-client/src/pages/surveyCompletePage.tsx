import { Check, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useParams } from "react-router-dom";
import { getToken } from "@/utils/jwtToken";
import { useEffect, useState } from "react";

interface Survey {
  name: string;
  description: string;
  date: Date;
  completionDate: Date;
  organisation: string;
  purpose: string;
  _id: string;
  userId: string;
  respondents: string;
  _v: number;
}

function SurveyCompletePage() {
  const { surveyId } = useParams();
  const token = getToken();
  const [surveyData, setSurveyData] = useState<Survey | null>(null);

  async function getSurveyData(): Promise<void> {
    try {
      const response = await axios.get(
        `http://localhost:8080/surveys/${surveyId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      setSurveyData(response.data.data);
    } catch (error) {
      console.error("Error fetch survey data", error);
    }
  }

  useEffect(() => {
    getSurveyData();
  }, [surveyId]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline">FAQ</Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular">
                  Congratulations, You've created a new survey...
                  {surveyData?.name ? ` ${surveyData.name}!` : ""}
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-muted-foreground  text-left">
                  {surveyData?.description}
                </p>
              </div>
              <div className="">
                <Button className="gap-4" variant="outline">
                  Any questions? Reach out <PhoneCall className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {Array.from({ length: 8 }).map((_, index) => (
              <AccordionItem key={index} value={"index-" + index}>
                <AccordionTrigger>
                  This is the start of something new
                </AccordionTrigger>
                <AccordionContent>
                  Managing a small business today is already tough. Avoid
                  further complications by ditching outdated, tedious trade
                  methods. Our goal is to streamline SMB trade, making it easier
                  and faster than ever.
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
export default SurveyCompletePage;
