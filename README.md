# SurveyBuddy Client

## Part B

# Tech Stack

<details>
<summary>View</summary>
</br>

## Frontend

- **[Vite](https://vitejs.dev/)**: A fast and modern build tool that provides a seamless development experience with features like hot module replacement (HMR).
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces with a component-based architecture.
- **[ShadCN](https://shadcn.dev/)**: A component library that integrates Tailwind CSS and Radix UI primitives for building accessible and customizable UI elements.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for creating modern, responsive designs directly in your HTML and JSX.

## Backend

- **[Express](https://expressjs.com/)**: A lightweight and flexible Node.js framework for building APIs and server-side applications.
- **[Node.js](https://nodejs.org/)**: A JavaScript runtime that enables server-side scripting and efficient handling of asynchronous operations.

## Database

- **[MongoDB](https://www.mongodb.com/)**: A NoSQL database that stores data in flexible, JSON-like documents, ideal for dynamic and scalable applications.

## Other Tools

- **[Radix UI](https://www.radix-ui.com/)**: Accessible, unstyled UI components for building custom design systems.
- **[Framer Motion](https://www.framer.com/motion/)**: A declarative animation library for adding smooth and interactive animations to your app.
- **[React Hook Form](https://react-hook-form.com/)**: A lightweight library for managing form state and validation with excellent performance.
- **[Zod](https://zod.dev/)**: A TypeScript-first schema declaration and validation library for ensuring data consistency.
- **[Lottie React](https://github.com/LottieFiles/lottie-react)**: A library for rendering high-quality vector animations in your React application.
- **[Axios](https://axios-http.com/)**: A promise-based HTTP client for handling API requests efficiently.
- **[Recharts](https://recharts.org/)**: A React charting library for creating interactive data visualizations.
</details>

### **CMP1003-1.1: Demonstration of DRY (Don’t Repeat Yourself) Principles**

<details>
<summary>View</summary>
</br>

This project demonstrates excellent adherence to DRY principles by avoiding unnecessary repetition and ensuring all functionality is centralised and reusable. The following approaches were implemented:

---

#### **1. Reusable Components**

- Modular and reusable UI components, such as buttons, forms, modals, and navigation menus, were created.
- **ShadCN** was used to build a consistent set of components, allowing for easy reuse across the application with configurable props.

#### **2. Centralised Utility Functions**

- A centralised Axios wrapper was implemented to manage all API calls, handling base URLs, headers, and error responses in one place.
- Shared validation schemas using **Zod** ensured consistent and reusable validation for forms across the application.

#### **3. Context and Global State Management**

- Global state was managed using **React Context**, reducing the need for repeated state logic and simplifying component communication. This was applied to manage features such as user authentication and theme settings.

#### **4. Tailwind CSS and Styling**

- Conditional and dynamic class management was achieved with **class-variance-authority** and **clsx**, ensuring reusable and consistent styling across components.
- A single Tailwind CSS configuration file was used to enforce consistent use of colours, spacing, and typography throughout the application.

#### **5. Backend Code Reusability**

- Middleware functions were created for common tasks such as authentication, role validation, and error handling, ensuring they could be reused across multiple routes.
- Modular MongoDB models, such as `Survey` and `User`, served as single sources of truth for database schema definitions.
- Shared logic for CRUD operations was abstracted into helper functions, reducing repeated code in controllers.

#### **6. Form Management**

- **React Hook Form** was used to handle form state and validation in a consistent and reusable manner, improving code maintainability and reducing duplication.

#### **7. Routing**

- Dynamic and nested routes in **React Router** were utilised to avoid duplicating route definitions and ensure consistent parent-child relationships in the app's structure.

---

By following these approaches, the project ensures that every piece of functionality is centralised, unambiguous, and has a single authoritative representation. This makes the codebase easier to maintain, scalable, and efficient.

</details>

### CMP1003-1.2: Appropriate use of libraries used in the app

### Dependencies

<details>
<summary>View</summary>
</br>

#### **@heroicons/react**

- Provides a collection of pre-designed, optimized SVG icons as React components, simplifying the process of adding icons to your application.

#### **@hookform/resolvers**

- A set of validation resolvers for integrating validation libraries (e.g., Zod, Yup, Joi) with React Hook Form, enabling seamless schema-based form validation.

#### **@lottiefiles/dotlottie-react**

- Library for rendering `.lottie` animation files in React applications. `.lottie` files are optimized versions of Lottie JSON animations, providing better performance and smaller file sizes.

#### **@radix-ui**

- A collection of unstyled, accessible React UI primitives that allow developers to build custom, high-quality components. It includes:
  - `react-accordion`: For collapsible panels.
  - `react-dialog`: For modal dialogs.
  - `react-hover-card`: For hover-based interaction elements.
  - `react-label`: Accessible labels for form fields.
  - `react-menubar`: For menu bar navigation.
  - `react-navigation-menu`: For dropdown navigation menus.
  - `react-popover`: For lightweight, accessible popovers.
  - `react-radio-group`: For radio button groups.
  - `react-scroll-area`: For custom scrollable areas.
  - `react-select`: For accessible dropdown selects.
  - `react-slider`: For creating sliders.
  - `react-slot`: For managing slot-based components.
  - `react-tabs`: For creating tab-based navigation.

#### **axios**

- A powerful HTTP client for making API requests. Supports features like request cancellation, interceptors, and automatic JSON transformation.

#### **class-variance-authority**

- A utility for handling conditional and composable Tailwind CSS class names, enabling dynamic styling in your components.

#### **clsx**

- A utility for conditionally joining class names, simplifying the management of dynamic classes in React components.

#### **cmdk**

- A command menu library for React, often used for building quick search interfaces similar to command palettes in developer tools.

#### **d3**

- A versatile library for creating complex, interactive data visualizations using web standards like SVG, HTML, and CSS.

#### **date-fns**

- A lightweight, functional library for working with dates in JavaScript. It offers utilities for formatting, parsing, and manipulating dates.

#### **dotenv**

- Loads environment variables from a `.env` file into `process.env`, making it easy to manage sensitive configuration values (e.g., API keys).

#### **framer-motion**

- A declarative animation library for React that supports complex animations, gestures, and layout transitions with ease.

#### **js-cookie**

- A utility for managing browser cookies, including setting, getting, and deleting cookies with customizable options.

#### **jwt-decode**

- Decodes JSON Web Tokens (JWT) to extract payload data, such as user information or token expiration, without requiring a secret key.

#### **lottie-react**

- A library for rendering Lottie animations in React applications. Lottie animations are vector-based, allowing for high-quality, lightweight animations.

#### **lucide-react**

- A modern icon library for React, offering clean, customizable icons with minimalistic designs.

#### **react** & **react-dom**

- Core libraries for building user interfaces in React. `react` provides the component API, while `react-dom` enables rendering components in the DOM.

#### **react-day-picker**

- A highly customizable, accessible library for creating date pickers in React applications.

#### **react-hook-form**

- A lightweight library for managing forms in React with built-in performance optimizations and support for validation libraries.

#### **react-router-dom**

- A popular library for handling routing in React applications. It allows developers to define and manage routes, navigation, and URL parameters.

#### **recharts**

- A charting library for React that makes it simple to create interactive data visualizations, including bar charts, line charts, and pie charts.

#### **tailwind-merge**

- A utility for merging Tailwind CSS class names intelligently, ensuring the correct application of conditional and conflicting classes.

#### **tailwindcss-animate**

- A plugin that adds utility classes for animations in Tailwind CSS, making it easier to implement animations directly in your styles.

#### **zod**

- A TypeScript-first schema validation library for defining and validating data structures, providing detailed error messages and strong type inference.

---

### Dev Dependencies

#### **@eslint/js**

- Core package for ESLint, used for linting JavaScript and TypeScript code to ensure code quality and consistency.

#### **@types/** (e.g., `react`, `node`, `js-cookie`)

- TypeScript type definitions for various libraries, enabling autocomplete, type checking, and documentation in TypeScript projects.

#### **@vitejs/plugin-react**

- A Vite plugin that provides React-specific optimizations, including support for fast refresh and JSX transformation.

#### **autoprefixer**

- A PostCSS plugin that automatically adds vendor prefixes to CSS properties, ensuring cross-browser compatibility.

#### **eslint** & **eslint-plugin-react-hooks**

- Tools for identifying and fixing code quality issues in JavaScript and React applications, with specific rules for React Hooks.

#### **postcss**

- A tool for transforming CSS with plugins, often used in conjunction with Tailwind CSS for advanced styling workflows.

#### **tailwindcss**

- A utility-first CSS framework that provides pre-designed classes for building modern, responsive designs.

#### **typescript**

- A strongly typed programming language that builds on JavaScript, offering static type checking and improved developer tooling.

#### **vite**

- A fast, modern frontend build tool optimized for development and production. It supports hot module replacement and modern JavaScript features.
</details>

### Crucial Decisions

**Schema Design Options**
Here are the options I considered for structuring the database:

**Option 1: Separate Schemas for Surveys, Questions, and Answers**

- Surveys have their own schema with metadata (e.g., title, description).
- Questions are stored in a separate schema linked to surveys via surveyId.
- Answers are stored in another schema, linked to both surveyId and questionId.
  Best for scalability and flexibility.
- Allows easy querying of specific questions or answers.

**Option 2: Combined Schema for Surveys and Questions, Separate Schema for Answers:**

- Surveys and their associated questions are embedded in one schema.
- Answers have a separate schema with references to surveyId and questionId.
- Reduces database reads but makes adding or editing questions more complex.

**Option 3: Single Schema for Surveys, Questions, and Answers:**

- Everything is stored in one schema with nested arrays.
- Simplifies initial setup but leads to large, complex documents.
- Poor scalability and performance for larger surveys.
  Decision to Use Option 1

I chose Option 1 because it’s the most efficient and professional design for a real-world app. It separates concerns, making it easier to add features or scale the app later. It also demonstrates my ability to design a well-structured, normalised, and scalable database, which is an important skill in full-stack development. This approach is ideal for a school project where I want to showcase my expertise.

### Trello Board Tracking

#### 25th of November - Let The Build Begin!

- Set up the backend skeleton and connected to MongoDB Atlas.
- Created User Schema, Model, and Signup Controller route.
- Implemented password services (hashing and comparison) and user services (check for existing username/email).
- Developed JWT functions for token generation.
- Tested signup functionality using Insomnia.

![25th Nov Trelllo](/surveybuddy-client/src/assets/trello/trello_25:11.png)

#### 27th of November

- Built middleware to validate question and answer inputs.
- Created newQuestion endpoint to add new questions to the database.
- Implemented editQuestion endpoint to update specific fields of an existing question.
- Fixed issue where updates were not saving correctly by adjusting findByIdAndUpdate logic.
- Developed deleteQuestion endpoint to remove a question by ID.
- Enhanced error handling with detailed response messages and server-side logging.
- Tested all question-related endpoints for proper functionality.

![27th Nov Trelllo](/surveybuddy-client/src/assets/trello/trello_27:11.png)

#### 28th of November

- Implemented middleware to check if a question belongs to a specific survey (questionBelongsToSurvey).
- Updated survey and question schemas to better handle relationships between surveys and questions.
- Added logic to handle the question format validation within the editQuestion route.
- - Used findByIdAndUpdate to update questions with new data (question format, question text, and answer).
- Added validation checks to ensure data integrity when editing questions (checking for missing fields).
- Implemented checks to verify if a question exists before updating or deleting it.
- Debugged and tested the functionality of updating and deleting questions with the correct logic in place.
- Moved all MVP backend cards to the **DONE** column, will revisit in a few days to optimise code and introduce further middleware.

Due to underestimating how long building the backend MVP would take, the frontend cards due today were assigned a new due date of the 4th of Decemeber. After finishing the backend the next sprint will be to get these cards complete. Since I am behind schedule and working hard on getting the backend complete, the time extension is in no way an issue.

![28th Nov Trello Update](/surveybuddy-client/src/assets/trello/trello_28:11.png)

#### 1st of December

**Debugged and Fixed Middleware Issues:**

- Troubleshooted issues with the isCreator middleware.
- Ensured proper user validation for both Survey and Question models.
- Corrected the handling of user ownership checks for different models.

**Refactored isCreator Middleware:**

- Improved the isCreator middleware to handle dynamic model and field checking.
- Enhanced logic for checking the creator of a Question through the associated Survey.

**Tested and Ensured Proper Model Checks:**

- Made sure the middleware works correctly for both Survey and Question routes.
- Verified that only the creator (based on userId) can perform specific actions.

![1st Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_1:12.png)

#### 2nd of December

### Frontend:

- **Investigated Chakra UI**:

  - Researched Chakra UI as a UI component library.
  - Resolved errors related to ChakraProvider by including the `value` prop.

- **Explored ShadCN**:

  - Researched ShadCN for UI component options.
  - Decided to use ShadCN to build a responsive navbar.

- **Navbar Development**:

  - Created a simple, responsive navbar using ShadCN components (`Box`, `Flex`, `Text`, and `Button`).
  - Implemented a mobile-friendly design with a toggleable menu using state.

- **Fixed Client Errors**:
  - Addressed and resolved various client-side errors, ensuring smoother functionality.

### Backend:

- **Survey and Answer Routes**:

  - Developed backend routes for managing surveys and answers.
  - Created routes for adding answers to specific survey questions and handling answer data.

- **Testing with Insomnia**:

  - Tested the survey API endpoints using Insomnia to ensure correct functionality.
  - Checked responses, ensured data validation, and confirmed that routes worked as expected.

- **Middleware Setup**:

  - Applied dynamic middleware to validate IDs in request parameters (e.g., `surveyId`, `questionId`, `answerId`, `userId`).

- **Database Integration**:
  - Integrated MongoDB (or another database) to store survey data, answers, and user-related information.

![2nd Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_2:12.png)

#### 2nd of December

### Frontend:

- **Investigated Chakra UI**:

  - Researched Chakra UI as a UI component library.
  - Resolved errors related to ChakraProvider by including the `value` prop.

- **Explored ShadCN**:

  - Researched ShadCN for UI component options.
  - Decided to use ShadCN to build a responsive navbar.

- **Navbar Development**:

  - Created a simple, responsive navbar using ShadCN components (`Box`, `Flex`, `Text`, and `Button`).
  - Implemented a mobile-friendly design with a toggleable menu using state.

- **Fixed Client Errors**:
  - Addressed and resolved various client-side errors, ensuring smoother functionality.

### Backend:

- **Survey and Answer Routes**:

  - Developed backend routes for managing surveys and answers.
  - Created routes for adding answers to specific survey questions and handling answer data.

- **Testing with Insomnia**:

  - Tested the survey API endpoints using Insomnia to ensure correct functionality.
  - Checked responses, ensured data validation, and confirmed that routes worked as expected.

- **Middleware Setup**:

  - Applied dynamic middleware to validate IDs in request parameters (e.g., `surveyId`, `questionId`, `answerId`, `userId`).

- **Database Integration**:
  - Integrated MongoDB (or another database) to store survey data, answers, and user-related information.

![2nd Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_2:12.png)

#### 3rd of December

- Created a basic landing page for your app.
- Developed signup and login components using ShadCN.
- Researched ShadCN to understand its capabilities and integrate it effectively.
- Troubleshot and implemented a responsive footer that stays at the bottom of the page and spans the full width of the screen.
- Resolved layout issues with images, ensuring proper scaling (e.g., setting an image to 70% size without pushing the footer).
- Ensured consistent margins for grid components, maintaining balanced layouts.
- Refined your app's router setup, making navigation seamless for future development.

![3rd Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_3:12.png)

#### 5th of December

- Completed the setup for routing and navigation across all pages.
- Implemented links to the respective pages (e.g., Home, Surveys, Analytics, Targeted, etc.) using React Router.
- Ensured that all pages are connected properly, and links are functioning as expected on the client-side.
- Verified that navigation items in the header (e.g., Survey, About, Community) lead to the correct pages.
- Created a responsive navigation menu with ShadCN and lucide-react icons for improved user interaction.

![5th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_5:12.png)

#### 6th December

- Created a combined login and registration form using React, TypeScript, and react-hook-form.
- Implemented form validation using zod and integrated it with react-hook-form via zodResolver.
- Sent POST requests to backend /signup and /login endpoints using axios.
- Displayed success or error alerts upon form submission based on response status.
- Implemented conditional rendering for login/register forms based on the isRegister state.
- Managed form field validation errors and displayed relevant error messages on the UI.
- Dynamically switched form header and button texts based on the isRegister flag.
- Navigated to /home page upon successful form submission using useNavigate.
- Integrated react-router-dom for navigation and passed query parameters (isRegister=true/false) to manage form state.
- Used useLocation to extract URL query parameters for dynamic form switching.
- Designed a responsive, user-friendly registration/login form with card-based layout.
- Explored how to handle API response data types in TypeScript when using axios.
- Researched how to use URLSearchParams to manage form state via URL parameters.
- Applied TypeScript types for API responses and react-hook-form data to ensure type safety.

![6th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_6:12.png)

#### 7th December

- Implemented and completed user client authentication.
- Set up storing JWT tokens in cookies for enhanced security and ease of use.
- Created a new SurveyCard component to dynamically display survey details.
- Integrated the SurveyCard component with fetched survey data for better UI presentation.
- Improved application logic by handling API responses and managing state effectively.

![7th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_7:12.png)

#### 8th December

- Implemented survey list and card displays for better layout and presentation.
- Created a Zod schema to validate survey inputs.
- Integrated and imported Framer Motion for animations.
- Completed a single community page.
- Troubleshot UI issues with Tailwind.

![8th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_8:12.png)

#### 9th December

- Implemented a tabbed interface for survey question types (Written Response and Multiple Choice).
- Added input fields for Written Response question type.
- Added input fields for Multiple Choice question type (radio buttons).
- Integrated basic tab functionality to switch between Written Response, Range Slider and Multiple Choice question inputs.
- Applied Tailwind CSS for styling the tabs and inputs.

![9th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_9:12.png)

#### 11th December

- Completed new Survey and Question forms that send data successfully to backend.
- Completed survey completion page that dynamically maps questions to accordions to view. Will complete styling tomorrow and move card to done.
- Fixed backend mongoose bugs so question data is stored properly.

#### 12th December

- Completed survey completion card.
- Fixed userContext not fetching user data before rendering.
- Moved TypeScript learning into the _Done_ column.
- Continued with Survey CRUD card and start on backend MVP testing.
- Created account page skeleton and logout button to test signin and register userData functionality.
- Gave Trello cards labels based on difficulty so level was visiable from a high level.
- Gave Trello cards coloured covers based on frontend, backend, and logic.

![12th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_12:12.png)

#### 13th December

- Completed Survey CRUD card.
- Completed DRY Survey CRUD endpoints.
- Created DRY survey card that can handle new survey creation and editable auto populated survey data to update.
- Continued with backend MVP testing with Jest.
- Extended the time on all remaining cards due to unforeseeable commitments that slowed development.

![13th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_13:12.png)

#### 14th December

- Implemented Jest and Superdry set up, DB connect, trial tests and teardown.
- Create new MongoDB local database for testing and test environment.
- Implemented POST, PATCH, DELETE and GET survey tests with edge cases.
- Implemented signup testing with edge cases.
- Fixed 40 TypeScript errors.

![14th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_14:12.png)

#### 15th December

- Fixed all TypeScript errors.
- Completed 'Deploy Frontend' card and moved to _Done_ column.
- Added header data and logo.
- Tested some basic colour and text size change on hover.
- Tested colour pallets.

![15th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_15:12.png)

#### 17th December

- Completed Survey Generation URL card and moved to _Done_ column. Implemented a link icon that auto copies the survey url when clicked.
- Completed Survey Response Page card and moved it to the _Done_ column. This was extremely rewarding as it was difficult was produced lots of bugs.
- Moved cards some cards in the _Done_ column to signed off, still keeping most in _Done_ because I plan to revisit them if I have time before submission.

![17th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_17:12.png)

#### 18th December

- Completed survey response data collection card and moved to _Done_ column.
- Due to time constraints graphs and charts will be build with Shadcn, learning a new data visualisation technology would be detrimental to testing time.
- Completed the range slider graph, question data still needs to be fetched and displayed.

![18th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_18:12.png)

#### 19th December

- Deployed teh backend on Render and moved the card to _Done_.
- Fixed many cross deployment bugs.
- Build multi choice answer pie graphs using Shadcn and written response answer list of cards. Moved Result data visualisation card to _Done_.
- Conpleted a very simple contacts page (still needs email registration), and moved the card to _Done_.
- Continued with Insomnia route testing and taking screenshots of responses for readme.

![19th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_19:12.png)
