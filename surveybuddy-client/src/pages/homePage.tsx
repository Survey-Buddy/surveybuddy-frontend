import { useUserData } from "@/context/userContext";
import "../styles/homePage.css";
import { useEffect, useState } from "react";

function HomePage() {
  const { userData } = useUserData();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userData) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
  }, [userData]);

  if (isLoading) {
    return (
      <main>
        <div className="landing-image-container">
          <h1 className="mt-[20%]">Loading your profile...</h1>
        </div>
      </main>
    );
  }

  return (
    <>
      <main>
        <div className="landing-image-container">
          <h1 className="mt-[20%]">
            {/* {userData ? `Welcome back ${userData.username} 👋` : "Loading..."} */}
          </h1>
          <img
            className="max-w-full max-h-full object-contain mt-[5%]"
            src="/assets/images/8582990.jpg"
            alt="Survey image designed by Freepik”"
          ></img>
        </div>
      </main>
    </>
  );
}

export default HomePage;
