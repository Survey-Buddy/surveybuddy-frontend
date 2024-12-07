import { Badge } from "@/components/ui/badge";


interface SurveyCardProps {
    title: string,
    description: string,
    active: boolean
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ title, description, active }) => (
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="flex flex-col gap-2">
            <div className="bg-muted rounded-md aspect-video mb-2"></div>
            <h3 className="text-xl tracking-tight">{title}</h3>
            <Badge>{active ? "Active" : "Complete"}</Badge>
            <p className="text-muted-foreground text-base">
            {description}
            </p>
          </div>
        </div>
      
);