import { Link } from "react-router-dom";

export const Footer1 = () => {
  const navigationItems = [
    {
      title: "Home",
      to: "/",
      description: "",
    },
    {
      title: "Our Surveys",
      description:
        "SurveyBuddy is a simple and intuitive full-stack web application designed to streamline survey creation, sharing, and data collection.",
      items: [
        {
          title: "Analytics",
          to: "/analytcis",
        },
        {
          title: "Use Cases",
          to: "/usecases",
        },
        {
          title: "Respondents",
          to: "/respondents",
        },
      ],
    },
    {
      title: "Company",
      description: "Managing a small business today is already tough.",
      items: [
        {
          title: "About us",
          to: "/about",
        },
        {
          title: "Contact us",
          to: "/contact",
        },
      ],
    },
  ];

  return (
    <div className="w-full py-10 lg:py-150 bg-foreground text-background ">
      <div className="container mx-auto max-w-screen-xl">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="flex gap-8 flex-col items-start">
            <div className="flex gap-2 flex-col">
              <h3 className="text-3xl md:text-3xl  tracking-tighter max-w-xl font-regular text-left duration-300">
                SurveyBuddy™
              </h3>
              <p className="text-m max-w-lg leading-relaxed tracking-tight text-[#91AFF4] text-background/75 text-left">
                Simple, beautiful, and intuitive surveys made easy.
              </p>
            </div>
            <div className="flex gap-20 flex-row">
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left ">
                <p></p>

                <p>hello@surveybuddy.com</p>
              </div>
              <div className="flex flex-col text-sm max-w-lg leading-relaxed tracking-tight text-background/75 text-left">
                <Link to="/">Terms of service</Link>
                <Link to="/">Privacy Policy</Link>
                <p>Bowden, South Australia</p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-10 items-start">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="flex text-base gap-1 flex-col items-start "
              >
                <div className="flex flex-col gap-2 ">
                  {/* <div>
                    <p>Contact</p>
                    <p>About</p>
                  </div> */}

                  {item.to ? (
                    <Link
                      to={item.to}
                      className="flex justify-between items-center"
                    >
                      <span className="text-xl">{item.title}</span>
                    </Link>
                  ) : (
                    <p className="text-xl  ">{item.title}</p>
                  )}
                  {item.items &&
                    item.items.map((subItem) => (
                      <Link
                        key={subItem.title}
                        to={subItem.to}
                        className="flex justify-between items-center "
                      >
                        <span className="text-background/75">
                          {subItem.title}
                        </span>
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
