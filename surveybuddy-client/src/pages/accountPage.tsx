import { useUserData } from "@/context/userContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/utils/jwtToken";
import { useNavigate } from "react-router-dom";

const AccountPage: React.FC = () => {
  const { userData, updateUserData } = useUserData();
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      if (userData) {
        alert(
          `Successfully logged out of ${userData.username}'s account. We hope to see you again soon!`
        );
      } else {
        alert(`Successfully logged out. We hope to see you again soon!`);
      }

      // Remove the token and update user date
      removeToken();
      updateUserData();

      // Navigate to the landing page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("An error occurred while logging out. Please try again.");
    }
  };

  return (
    <>
      <div className="mt-[20%] flex flex-col items-center gap-4">
        <h1 className="text-2xl font-semibold">
          {userData
            ? `${userData.username}'s Account`
            : "Loading your account..."}
        </h1>
      </div>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
};

export default AccountPage;
