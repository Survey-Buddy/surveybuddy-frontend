interface Survey {
  name: string;
  description: string;
  date: string;
  endDate: string;
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
    const dateA = new Date(a.date).getTime(); // Already a number
    const dateB = new Date(b.date).getTime(); // Already a number

    // Check for invalid dates
    if (isNaN(dateA) || isNaN(dateB)) {
      console.error("Invalid date value detected", { a, b });
      return 0; // Keep original order for invalid dates
    }

    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}
