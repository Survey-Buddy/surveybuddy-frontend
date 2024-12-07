import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DatePicker } from "./datePicker"

export function NewSurveyCard() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Survey Name</Label>
              <Input id="name" placeholder="Name of your survey" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Input id="description" placeholder="Description of your survey" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="purpose">Purpose</Label>
              <Select>
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Work</SelectItem>
                  <SelectItem value="sveltekit">Research</SelectItem>
                  <SelectItem value="astro">School</SelectItem> 
                  <SelectItem value="nuxt">Fun</SelectItem>
                  <SelectItem value="nuxt">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <DatePicker></DatePicker>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button>Deploy</Button>
      </CardFooter>
    </Card>
  )
}
