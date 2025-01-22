import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

// Landing Page Component

const LandingPage = () => {
  // State to track rotating title from titles array
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["amazing", "new", "simple", "beautiful", "smart", "intuiative"],
    [] // Initalise once
  );

  // Change title every two seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        // reset to start when reaches end
        setTitleNumber(0);
      } else {
        // Move to next title
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);

    // Clean up timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  // Render landing page
  return (
    <div className="w-full">
      <div className="container mx-auto">
        <div className="flex gap-8 py-20 lg:py-40 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col">
            <h1 className="text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
              <span className="text-spektr-cyan-50 text-pink-600">
                SurveyBuddy
              </span>

              {/* Shadcn rotating title annimation */}
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold"
                    initial={{ opacity: 0, y: "-100" }}
                    transition={{ type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-muted-foreground max-w-2xl text-center">
              Collecting valuable feedback shouldn't be a hassle. SurveyBuddy
              simplifies the process, replacing cumbersome methods with an
              intuitive platform that empowers you to gather insights
              effortlessly.
            </p>
          </div>
          {/* Buttons for contact and signup */}
          <div className="flex flex-row gap-3">
            <Link to="/contact">
              <Button size="lg" className="gap-4" variant="outline">
                Contact <Mail className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/register?isRegister=true">
              <Button size="lg" className="gap-4">
                Sign up <MoveRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
