import { useUserData } from "@/context/userContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/utils/jwtToken";
import { useNavigate } from "react-router-dom";

// Account page component

const AccountPage: React.FC = () => {
  // Get user data from user context
  const { userData, updateUserData } = useUserData();
  // UseNavigation hook for navigating routes
  const navigate = useNavigate();

  // Handles logout process
  const handleLogOut = () => {
    try {
      if (userData) {
        alert(
          `Successfully logged out of ${userData.username}'s account. We hope to see you again soon!`
        );
      } else {
        alert(`Successfully logged out. We hope to see you again soon!`);
      }

      // Remove the stored auth token
      removeToken();
      // Clear the userData context
      updateUserData();

      // Navigate to the landing page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  // Render Account Page
  return (
    <>
      <div className="mt-[10%] flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {userData
            ? `${userData.username}'s Account`
            : "Loading your account..."}
        </h1>
      </div>
      <Button className={"mt-[10%]"} onClick={handleLogOut}>
        Logout
      </Button>

      {/* Future features to implement */}
      {/* <Button>Update Info</Button>
      <Button>Reset Password</Button> */}
    </>
  );
};

export default AccountPage;
