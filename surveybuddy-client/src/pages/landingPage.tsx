import { useUserData } from "@/context/userContext";
import "../styles/landingPage.css";

function LandingPage() {
  const userData = useUserData();
  return (
    <>
      {/* <div className="flex flex-col min-h-screen"> */}
      {/* <Header1></Header1> */}
      <main>
        <div className="landing-image-container">
          <h1 className="mt-[20%]">
            {userData ? `Welcome back ${userData.username} 👋` : "Loading..."}
          </h1>
          <img
            className="max-w-full max-h-full object-contain mt-[5%]"
            src="/assets/images/8582990.jpg"
            alt="Survey image designed by Freepik”"
          ></img>
        </div>

        {/* <h1>SurveyBuddy</h1>
          
          <Register></Register>
          <ComboboxDemo></ComboboxDemo> */}
      </main>
    </>
  );
}

export default LandingPage;
