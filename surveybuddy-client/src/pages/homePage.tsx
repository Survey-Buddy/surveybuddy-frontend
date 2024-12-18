import { useUserData } from "@/context/userContext";
import "../styles/homePage.css";
import { useEffect, useState } from "react";
// import Lottie from "lottie-react";
// import celebrationAnimation from "../../public/assets/images/animations/Animation - 1734325926955.json";

function HomePage() {
  const { userData } = useUserData();

  const [isLoading, setIsLoading] = useState(true);
  console.log(import.meta.env);
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
          {/* <div>
            <Lottie
              animationData={celebrationAnimation}
              loop={true}
              className="h-13"
            />
          </div> */}
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
