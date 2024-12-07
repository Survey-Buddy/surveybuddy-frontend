import Cookies from "js-cookie";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
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

import { FieldValues, useForm } from "react-hook-form";
import { optional, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// import { useUserData } from "../../context/userContext";

// Login Schema Validation
const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const registerSchema = loginSchema.extend({
  username: z.string().min(3, { message: "Username must be at least 3 characters" }),
  firstName: z.string().min(3, { message: "Name must be at least 3 characters" }),
});

export function RegisterForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(location.search);
  const isRegister = urlParams.get("isRegister") === "true";
  // const { setToken, userData } = useUserData();
  const schema = isRegister ? registerSchema : loginSchema;

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid }, 
  } = useForm<FormData>({ resolver: zodResolver(schema), mode: "onChange"
   });

  const onSubmit = async (data: FieldValues) => {
  
    try {
      const endpoint = isRegister ?
      "http://localhost:8080/users/signup" :
      "http://localhost:8080/users/login"

      const response = await axios.post(endpoint, data);
      if (!response) {
        throw new Error("Client did not recieve a response.")
      }

      console.log(response);

      const { username, token } = response.data;
      localStorage.setItem("Username", username);

      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });

      const message = isRegister ?
      `Welcome to SurveyBuddy, ${username}!` :
       `Welcome back to SurveyBuddy, ${username}!`
      
      alert(message);
      navigate("/home");
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An error occurred. Please try again.";
      alert(errorMessage);
    }
  }

  return (
    <Card className="mx-auto max-w-sm" >
      <CardHeader>
        <CardTitle className="text-2xl">{isRegister ? "Register" : "Login"}</CardTitle>
        <CardDescription>
          {isRegister ? "Enter your details to create a new account." : "Enter your login details."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} >
        <div className="grid gap-4">

          {/* Register only fields */}
        {isRegister && (
          <>
        <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              placeholder="Username"
              
              { ...register("username")}
              // value={formData.userName}
              // onChange={(event) => setFormData({
              //   ...formData, userName: event.target.value
              // })}
            />

            { errors.username && <p className="text-red-500">{errors.username.message}</p>}
            
          </div>
          <div className="grid gap-2">
            <Label htmlFor="firstName">Name</Label>
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
          {/* <div className="grid gap-2">
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
            
          </div> */}
          </>
        )}

        {/* Common Fields */}
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
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={`/register?isRegister=${!isRegister}`}
            className="underline text-blue-600 hover:text-blue-800"
            >
              {isRegister ? "Login" : "Register"}
          </Link>
          {/* <Link href="#" className="underline">
            Sign up
          </Link> */}
          
        </div>
      </CardContent>
    </Card>
  );
}
