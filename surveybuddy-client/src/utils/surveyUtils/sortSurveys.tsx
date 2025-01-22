// Define structure of Survey object

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

// Function to sort array of surveys by date

export default function sortSurveys(
  surveys: Survey[],
  // asc for ascending, desc for descending
  order: "asc" | "desc" = "asc"
): Survey[] {
  return surveys.sort((a, b) => {
    // Convert to date for time stamp
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();

    // Check for invalid dates
    if (isNaN(dateA) || isNaN(dateB)) {
      // Keep original order for invalid dates
      return 0;
    }
    // Sort in asc or desc based on order param
    return order === "asc" ? dateA - dateB : dateB - dateA;
  });
}
