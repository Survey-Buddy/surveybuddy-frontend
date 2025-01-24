import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { isAxiosError } from "axios";
import { setToken } from "@/utils/jwtToken";
import { useUserData } from "../../context/userContext";
import { User } from "@/utils/userUtils/userTypes";
import { loginSchema, registerSchema } from "@/utils/userUtils/userSchema";
import BASE_URL from "@/config/apiConfig";

// Registration and Login Component

export const RegisterForm = () => {
  // Get current URL and query params
  const location = useLocation();
  // Hook to navigate to different routes
  const navigate = useNavigate();
  // Parse query params
  const urlParams = new URLSearchParams(location.search);
  // Fetches the value of the 'isRegister' query param and checks if truthy
  const isRegister = urlParams.get("isRegister") === "true";
  // Update user data in context
  const { updateUserData } = useUserData();

  // If registered use register shema, if not, use login schema
  const schema = isRegister ? registerSchema : loginSchema;

  // Initialise form with validation
  // Type check using User interface
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<User>({ resolver: zodResolver(schema), mode: "onChange" });

  // Handle form submission
  const onSubmit = async (data: User) => {
    try {
      // Endpoint based on if user is registered
      const endpoint = isRegister
        ? `${BASE_URL}/users/signup`
        : `${BASE_URL}/users/login`;
      // POST request
      const response = await axios.post(endpoint, data);
      if (!response) {
        throw new Error("Client did not recieve a response.");
      }

      // Extract username and token by destructuring
      const { username, token } = response.data;
      // Store username in localstorage
      localStorage.setItem("Username", username);

      // Save token and update user
      setToken(token, updateUserData);

      const message = isRegister
        ? // New user
          `Welcome to SurveyBuddy, ${username}!`
        : // Returning user
          `Welcome back to SurveyBuddy, ${username}!`;

      alert(message);
      // Navigate to user home page
      navigate("/home");
    } catch (error) {
      if (isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred. Please try again.";
        console.error("Error during submission:", errorMessage);
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      {/* Header */}
      <CardHeader>
        <CardTitle className="text-2xl">
          {isRegister ? "Register" : "Login"}
        </CardTitle>
        <CardDescription>
          {isRegister
            ? "Enter your details to create a new account."
            : "Enter your login details."}
        </CardDescription>
      </CardHeader>

      {/* Form Content */}
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("username")}
                  />

                  {errors.username && (
                    <p className="text-red-500">{errors.username.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="First Name"
                    {...register("firstName")}
                  />

                  {errors.firstName && (
                    <p className="text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName")}
                  />
                  {errors.lastName && (
                    <p className="text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </>
            )}

            {/* Common fields for both registration and login */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...register("email", { required: true, minLength: 6 })}
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {/* Future Feature */}
                {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link> */}
              </div>
              <Input
                id="password"
                type="password"
                required
                {...register("password")}
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <Button disabled={!isValid} type="submit" className="w-full">
              Submit
            </Button>
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link
            to={`/register?isRegister=${!isRegister}`}
            className="underline text-blue-600 hover:text-blue-800"
          >
            {isRegister ? "Login" : "Register"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};
