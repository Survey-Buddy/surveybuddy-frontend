interface Survey {
  name: string;
  description: string;
  date: Date | string;
  completionDate: Date | string;
  organisation: string;
  purpose: string;
  _id: string;
  userId: string;
  respondents: string;
  _v: number;
}

export default function sortSurveys(
  surveys: Survey[],
  order: "asc" | "desc" = "asc"
): Survey[] {
  return surveys.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}
