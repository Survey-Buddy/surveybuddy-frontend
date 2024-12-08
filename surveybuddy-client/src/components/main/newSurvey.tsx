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
import { Link } from "react-router-dom"

export function NewSurveyCard() {


  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Create New Survey</CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Survey name..." />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              {/* <Input id="description" placeholder="Survey description..." 
              className="border border-gray-300 rounded p-2 h-16 w-full"/> */}
              <textarea
                className="border border-gray-300 rounded p-2 w-full h-32"
                placeholder="Enter your text here"
                rows={5} // Optional, defines the number of visible rows
                />
            </div>
            <div className="flex flex-col space-y-1.5 ">
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
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="purpose">Respondents</Label>
              <Select>
                <SelectTrigger id="purpose">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Public</SelectItem>
                  <SelectItem value="registered">Registered Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Organisation</Label>
              <Input id="name" placeholder="Organisation..." />
            </div>
            </div>
            <Label htmlFor="purpose">Completion Date</Label>
            <DatePicker></DatePicker>
          </div>
        </form>
        
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link to="/surveys">
        <Button variant="outline">Back</Button>
        </Link>
        <Button>Continue</Button>
      </CardFooter>
    </Card>
  )
}
