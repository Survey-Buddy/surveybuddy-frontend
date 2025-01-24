import React from "react";
import Lottie from "lottie-react";
import celebrationAnimation from "../../public/assets/images/animations/Animation - 1734324538876.json";

// Survey Completion Page Component

export const SurveyCompletionPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        {/* Celebration annimation of giraffe riding unicycle */}
        <Lottie
          animationData={celebrationAnimation}
          loop={true}
          className="h-13"
        />
      </div>
      <h1 className="text-3xl font-bold mt-4">Congratulations!</h1>
      <p className="text-lg mt-2">
        You have successfully completed the survey. Thank you for your
        responses!
      </p>
    </div>
  );
};

export default SurveyCompletionPage;
