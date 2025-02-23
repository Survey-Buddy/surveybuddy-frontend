import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useUserData } from "@/context/userContext";
import { Menu, MoveRight, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

// Define structure for navigation items
type NavigationItem = {
  title: string;
  description?: string;
  href?: string;
  items?: { title: string; href: string }[];
};

// Navbar Componet
// ** Section into smaller components

export const Header1 = () => {
  // Get user data from context
  const { userData } = useUserData();

  // Nav items for signed in and not signed in users
  const signedInNavigationItems: NavigationItem[] = [
    {
      title: "Home",
      href: "/home",
      description: "",
    },
    {
      title: "Surveys",
      description: "Simple, beautiful, and intuitive surveys made easy.",
      items: [
        {
          title: "Surveys",
          href: "/surveys",
        },
        {
          title: "New Survey",
          href: "/surveys/newsurvey",
        },
      ],
    },
    {
      title: "About",
      description: "Simple, beautiful, and intuitive surveys made easy.",
      items: [
        {
          title: "About Us",
          href: "/about",
        },

        {
          title: "Contact",
          href: "/contact",
        },
      ],
    },
  ];
  const notSignedInNavigationItems: NavigationItem[] = [
    {
      title: "About",
      description: "Simple, beautiful, and intuitive surveys made easy.",
      items: [
        {
          title: "About Us",
          href: "/about",
        },
        {
          title: "Contact",
          href: "/contact",
        },
      ],
    },
  ];

  // State to toggle the hamburger menu
  const [isOpen, setOpen] = useState(false);

  // Dynamically set nav items based on if user is signed in
  const navigationItems = userData
    ? signedInNavigationItems
    : notSignedInNavigationItems;

  return (
    <header className="w-full z-40 fixed top-0 left-0 bg-background ">
      <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
        {/* Desktop navigation menu */}
        <div className="justify-start items-center gap-4 lg:flex hidden flex-row">
          <NavigationMenu className="flex justify-start items-start">
            <NavigationMenuList className="flex justify-start gap-4 flex-row">
              {navigationItems.map((item) => (
                <NavigationMenuItem key={item.title}>
                  {item.href ? (
                    <Link to={item.href} className="no-underline">
                      <Button variant="ghost">{item.title}</Button>
                    </Link>
                  ) : (
                    <>
                      <NavigationMenuTrigger className="font-medium text-sm">
                        {item.title}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="!w-[450px] p-4">
                        <div className="flex flex-col lg:grid grid-cols-2 gap-4">
                          <div className="flex flex-col h-full justify-between">
                            <div className="flex flex-col">
                              <p className="text-base">{item.title}</p>
                              <p className="text-muted-foreground text-sm">
                                {item.description}
                              </p>
                            </div>
                            {userData ? (
                              <Link to="/surveys/newsurvey">
                                <Button size="sm" className="mt-10 ">
                                  New Survey
                                </Button>
                              </Link>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="flex flex-col text-sm h-full justify-end">
                            {item.items?.map((subItem) => (
                              <NavigationMenuLink
                                href={subItem.href}
                                key={subItem.title}
                                className="flex flex-row justify-between items-center hover:bg-muted py-2 px-4 rounded"
                              >
                                <span>{subItem.title}</span>
                                <MoveRight className="w-4 h-4 text-muted-foreground" />
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      </NavigationMenuContent>
                    </>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex lg:justify-center">
          <Link to={userData ? "/home" : "/"}>
            <h1 className="font-semibold text-2xl transition-all duration-500">
              SurveyBuddy
            </h1>
          </Link>
        </div>
        <div className="flex justify-end w-full gap-4">
          <Link to="/about">
            <Button
              variant="ghost"
              className="hidden md:inline hover:text-[#2B3594] transition-all duration-500"
            >
              Our Journey
            </Button>
          </Link>

          <div className="border-r hidden md:inline"></div>
          {userData ? (
            <Link to="/account">
              <Button>Account</Button>
            </Link>
          ) : (
            <div>
              <Link to="/register?isRegister=false">
                <Button variant="outline">Sign in</Button>
              </Link>
              <Link to="/register?isRegister=true">
                <Button>Register</Button>
              </Link>
            </div>
          )}
        </div>
        {/* Mobile navigation menu */}
        <div className="flex w-12 shrink lg:hidden items-end justify-end">
          <Button variant="ghost" onClick={() => setOpen(!isOpen)}>
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          {isOpen && (
            <div className="absolute top-20 border-t flex flex-col w-full right-0 bg-background shadow-lg py-4 container gap-8 ">
              {navigationItems.map((item) => (
                <div key={item.title}>
                  <div className="flex flex-col gap-2 ">
                    {item.href ? (
                      <Link
                        to={item.href}
                        className="flex justify-between items-center"
                      >
                        <span className="text-lg">{item.title}</span>
                        <MoveRight className="w-4 h-4 stroke-1 text-muted-foreground" />
                      </Link>
                    ) : (
                      <p className="text-lg">{item.title}</p>
                    )}
                    {item.items &&
                      item.items.map((subItem) => (
                        <Link
                          key={subItem.title}
                          to={subItem.href}
                          className="flex justify-between items-center "
                        >
                          <span className="text-muted-foreground">
                            {subItem.title}
                          </span>
                          <MoveRight className="w-4 h-4 stroke-1" />
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
