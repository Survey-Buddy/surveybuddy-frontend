import { useUserData } from "@/context/userContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { removeToken } from "@/utils/jwtToken";
import { useNavigate } from "react-router-dom";

const AccountPage = () => {
  const userData = useUserData();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeToken();

    alert(
      `Successfully logged out of ${userData?.username}'s account. We hope to see you again soon!`
    );
    userData = null;
    navigate("/");
  };

  return (
    <>
      <div className="mt-[20%]">
        {userData ? `${userData.username}'s Account` : "Loading..."}
      </div>
      <Button onClick={handleLogOut}>Logout</Button>
    </>
  );
};

export default AccountPage;
