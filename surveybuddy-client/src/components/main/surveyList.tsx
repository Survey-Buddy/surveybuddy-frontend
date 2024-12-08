

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Survey {
    id: string,
    title: string,
    description: string,
    active: boolean,
    organisation: string,
    respondents: string,
    endDate: Date,
    link: string,
}

interface SurveyListProps {
    surveys: Survey[];
}

 
export const SurveyList: React.FC<SurveyListProps> = ({ surveys }) => {
   

  return (
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
        {surveys.map((survey) =>(
          <TableRow key={survey.id}>
            <TableCell className="font-medium">{survey.title}</TableCell>
            <TableCell>{survey.active ? "Active" : "Completed"}</TableCell>
            <TableCell>{survey.organisation}</TableCell>
            <TableCell>{survey.respondents}</TableCell>
            <TableCell className="text-right">{survey.endDate}</TableCell>
            <TableCell>{survey.link}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        
      </TableFooter>
    </Table>
  )
}