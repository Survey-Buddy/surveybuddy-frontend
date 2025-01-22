import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// Props for the DatePicker component
interface DatePickerProps {
  onChange: (date: Date | undefined) => void;
}

// Select Date Component

export function DatePicker({ onChange }: DatePickerProps) {
  // Store selected date in state
  const [date, setDate] = React.useState<Date>();

  // Function to handle date change and to lift state to parent
  // using the onChange call back function
  const handleDateChange = (selectedDate: Date | undefined) => {
    console.log(selectedDate);
    // Update state
    setDate(selectedDate);
    // Call parent call back function
    onChange(selectedDate);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon />
          {/* Display the selected date or a placeholder if no date is selected */}
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {/* Shadcn Calender */}
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleDateChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
