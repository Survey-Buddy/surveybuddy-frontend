import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { GripVertical } from "lucide-react";

// About Page Component

export const AboutPage = () => {
  // State for percentage of image shown
  const [inset, setInset] = useState<number>(50);
  // Track if mouse down
  const [onMouseDown, setOnMouseDown] = useState<boolean>(false);

  // Shadcn click and drag image component logic
  const onMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!onMouseDown) return;

    const rect = e.currentTarget.getBoundingClientRect();
    let x = 0;

    if ("touches" in e && e.touches.length > 0) {
      x = e.touches[0].clientX - rect.left;
    } else if ("clientX" in e) {
      x = e.clientX - rect.left;
    }

    const percentage = (x / rect.width) * 100;
    // Update state with percentage of image
    setInset(percentage);
  };

  // Render content
  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto">
        <div className="flex flex-col gap-4">
          <div>
            <Badge>About</Badge>
          </div>
          <div className="flex gap-2 flex-col">
            <h2 className="text-3xl md:text-5xl tracking-tighter lg:max-w-xl font-regular">
              Our Journey!
            </h2>
            <p className="text-lg max-w-xl lg:max-w-xl leading-relaxed tracking-tight text-muted-foreground">
              SurveyBuddy began as a passion project, created for the final
              capstone assignment of the Coder Academy Full-Stack Web
              Development course. Built with a commitment to innovation and
              usability, it represents months of learning, problem-solving, and
              creative development. While its roots lie in an academic setting,
              the vision for SurveyBuddy goes far beyond the classroom. <br />{" "}
              Our mission is to provide individuals, teams, and businesses with
              a simple yet powerful tool for creating surveys, gathering
              feedback, and making informed decisions. Designed to streamline
              the survey process, SurveyBuddy is intuitive, user-friendly, and
              accessible for everyone, from students to professionals. <br />{" "}
              This app is more than a project—it’s a step towards helping people
              connect, understand, and grow through meaningful feedback. Whether
              you're refining a product, gathering team insights, or simply
              exploring new ideas, SurveyBuddy is here to make the process easy
              and efficient.
            </p>
          </div>
          {/* Shancn interactive image feature */}
          <div className="pt-12 w-full">
            <div
              className="relative aspect-video w-full h-full overflow-hidden rounded-2xl select-none"
              onMouseMove={onMouseMove}
              onMouseUp={() => setOnMouseDown(false)}
              onTouchMove={onMouseMove}
              onTouchEnd={() => setOnMouseDown(false)}
            >
              <div
                className="bg-muted h-full w-1 absolute z-20 top-0 -ml-1 select-none"
                style={{
                  left: inset + "%",
                }}
              >
                <button
                  className="bg-muted rounded hover:scale-110 transition-all w-5 h-10 select-none -translate-y-1/2 absolute top-1/2 -ml-2 z-30 cursor-ew-resize flex justify-center items-center"
                  onTouchStart={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onMouseDown={(e) => {
                    setOnMouseDown(true);
                    onMouseMove(e);
                  }}
                  onTouchEnd={() => setOnMouseDown(false)}
                  onMouseUp={() => setOnMouseDown(false)}
                >
                  <GripVertical className="h-4 w-4 select-none" />
                </button>
              </div>
              <img
                src="/assets/images/coral-reefs-2728211_16x9.avif"
                alt="feature8"
                width={1920}
                height={1080}
                className="absolute left-0 top-0 z-10 w-full h-full aspect-video rounded-2xl select-none border"
                style={{
                  clipPath: "inset(0 0 0 " + inset + "%)",
                  backgroundColor: "#94ED12",
                }}
              />
              <img
                src="/assets/images/Chamelon2_Reptile_Lizard.jpg"
                alt="darkmode-feature8.png"
                width={1920}
                height={1080}
                style={{ backgroundColor: "#94ED12" }}
                className="absolute left-0 top-0 w-full h-full aspect-video rounded-2xl select-none border"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
