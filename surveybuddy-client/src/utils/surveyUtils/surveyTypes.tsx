export interface Survey {
  _id: string;
  name: string;
  organisation: string;
  respondents: string;
  description: string;
  active?: boolean;
  date: string;
  endDate: string;
  userId: string;
  purpose: string;
  _v?: number;
  formattedEndDate?: string;
}
