import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormEvent, useState } from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  firstName: z.string().min(3, { message: "Name must be at least 3 characters."}),
  lastName: z.string().min(3, { message: "Name must be at least 3 characters."}),
  email: z.string().min(6),
  password: z.string().min(6, { message: "Password must be at least 3 characters."})
})

// Like interface
type FormaData = z.infer<typeof schema>;

export function RegisterForm() {

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
  } = useForm<FormData>({ resolver: zodResolver(schema) });


  // const [formData, setFormData] = useState({
  //   firstName: "",
  //   lastName: "",
  //   email: "",
  //   password: ""
  // });

  // const handleSubmit = async (event: FormEvent) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.get("http://localhost:8080/users/signup")
  //     const data = await response.json();
  //   } catch (error) {
  //     throw new Error("Error signing up user:", error);
  //   }
  // }

  const onSubmit = (data: FieldValues) => console.log(data)

  // if (data) {
  //   setToken(data.token);

  //   alert(`Welcome to SurveyBuddy ${data.firstName}, we hope you enjoy your experience with us.`)

  //   setFormData({ name: '', username: '', email: '', password: '' });
  // } else {

  // }

  return (
    <Card className="mx-auto max-w-sm" >
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your details to create a new account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              placeholder="First Name"
              
              { ...register("firstName")}
              // value={formData.firstName}
              // onChange={(event) => setFormData({
              //   ...formData, firstName: event.target.value
              // })}
            />

            { errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Last Name"
              
              { ...register("lastName") }
              // value={formData.lastName}
              // onChange={(event) => setFormData({
              //   ...formData, lastName: event.target.value
              // })}
            />
            { errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              { ...register("email", { required: true, minLength: 6 })}
              // value={formData.email}
              // onChange={(event) => setFormData({
              //   ...formData, email: event.target.value
              // })}
            />
            { errors.email && <p className="text-red-500">{errors.email.message}</p>}
            
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
            </div>
            <Input id="password" type="password" required 
            { ...register("password")}
              // value={formData.password}
              // onChange={(event) => setFormData({
              //   ...formData, password: event.target.value
              // })}
            />
            
            { errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>
          <Button disabled={!isValid} type="submit" className="w-full"   >
            Submit
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          {/* <Link href="#" className="underline">
            Sign up
          </Link> */}
        </div>
      </CardContent>
    </Card>
  );
}
