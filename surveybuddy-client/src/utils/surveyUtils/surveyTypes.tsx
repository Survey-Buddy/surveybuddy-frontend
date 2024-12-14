export interface Survey {
  _id: string;
  name: string;
  organisation: string;
  respondents: string;
  description: string;
  active?: boolean;
  date: Date | string | null;
  endDate?: Date | string | null;
  userId: string;
  purpose: string;
  completionDate?: Date | string | null;
  _v?: number;
}
