# SurveyBuddy Client

## Part B

---

## CMP1003-1.2: Appropriate use of libraries used in the app

<details>
<summary>View</summary>
</br>

### Frontend

- **[Vite](https://vitejs.dev/):** A fast build tool that improves development with instant updates and great performance.
- **[React](https://reactjs.org/):** A JavaScript library for creating user interfaces in a reusable, component-based way.
- **[ShadCN](https://shadcn.dev/):** A utility library combining Tailwind CSS and Radix UI components for accessible, responsive design.
- **[Tailwind CSS](https://tailwindcss.com/):** A CSS framework for designing modern, responsive layouts using utility classes.

## Backend

- **[Express](https://expressjs.com/):** A lightweight framework for building server-side APIs and applications in Node.js.
- **[Node.js](https://nodejs.org/):** A JavaScript runtime environment for running server-side code.

### Database

- **[MongoDB](https://www.mongodb.com/):** A NoSQL database for storing flexible, JSON-like documents that scale easily.

### Additional Libraries

#### UI & Animations

- **[Radix UI](https://www.radix-ui.com/):** Provides accessible, customisable, and unstyled components for building design systems.
- **[Framer Motion](https://www.framer.com/motion/):** Adds smooth, declarative animations to your React app.
- **[React Hook Form](https://react-hook-form.com/):** A lightweight library for managing forms and validations efficiently.
- **[Zod](https://zod.dev/):** A schema validation library to ensure data consistency.
- **[Lottie React](https://github.com/LottieFiles/lottie-react):** Displays vector animations for enhancing visual appeal.

#### Charts & Visualization

- **[Recharts](https://recharts.org/):** A library for creating interactive data visualisations in React.

#### HTTP & State Management

- **[Axios](https://axios-http.com/):** A promise-based HTTP client for handling API requests.
- **[JS-Cookie](https://github.com/js-cookie/js-cookie):** A simple way to manage browser cookies.
- **[jwt-decode](https://github.com/auth0/jwt-decode):** Decodes JSON Web Tokens (JWT) for authentication.

---

### Testing

- **[Vitest](https://vitest.dev/):** A fast test runner and assertion library built for Vite and modern web apps.
- **[Testing Library](https://testing-library.com/docs/react-testing-library/intro):** Provides utilities for testing React components by simulating user interactions.
- **[JSDOM](https://github.com/jsdom/jsdom):** Emulates a browser environment in Node.js for testing purposes.
- **[Mock Service Worker (MSW)](https://mswjs.io/):** Intercepts network requests for testing APIs without relying on real servers.
- **[Axios Mock Adapter](https://github.com/ctimmerm/axios-mock-adapter):** Mocks Axios requests and responses for reliable API testing.

---

### Development Tools

- **[TypeScript](https://www.typescriptlang.org/):** A strongly typed superset of JavaScript for catching bugs early and improving code quality.
- **[ESLint](https://eslint.org/):** A tool for identifying and fixing coding issues to ensure consistent code quality.
- **[Prettier](https://prettier.io/):** Automatically formats code for better readability and consistency.

### Build & Deployment

- **[Vite](https://vitejs.dev/):** Also handles production builds with optimised performance.
- **[Tailwind CSS](https://tailwindcss.com/):** Uses PostCSS to generate efficient styles for production.
</details>

# **CMP1003-1.1: Demonstration of DRY (Don’t Repeat Yourself) Principles**

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

<details>
<summary>View</summary>
</br>

### Dependencies

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

<details>
<summary>View</summary>
</br>

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

</details>

### **CMP1002-2.1: Demonstration of Code Flow Control**

<details>
<summary>View</summary>
</br>

The application effectively demonstrates code flow control by utilising conditional logic, loops, error handling, and asynchronous operations to manage how the application processes data and handles various scenarios. The following examples highlight how this is achieved:

---

#### **1. Conditional Logic**

- Conditional statements are used to handle various application states and behaviours. Examples include:
  - Checking if required fields are provided in the backend before processing API requests.
  - Verifying user authentication and authorisation using middleware before allowing access to protected routes.
  - Dynamically rendering UI elements based on user roles or data availability.

#### **2. Loops and Iteration**

- Iterative logic is applied in key areas of the application, such as:
  - Mapping over datasets to dynamically generate UI elements (e.g., survey lists, form inputs).
  - Iterating over responses from the database to format or filter data for specific frontend needs.

#### **3. Error Handling**

- Try-catch blocks are implemented to manage errors in both synchronous and asynchronous operations. For example:
  - API calls include error handling to provide meaningful feedback to the user in case of failures.
  - Validation errors in forms and database operations are caught and appropriately handled to prevent application crashes.

#### **4. Asynchronous Operations**

- Asynchronous code is used extensively to handle operations like:
  - Fetching data from external APIs or the database using `async/await`.
  - Updating the UI in real-time after receiving responses from the server.
  - Managing race conditions by awaiting specific operations before proceeding (e.g., user authentication before accessing dashboard data).

#### **5. Middleware for Controlled Flow**

- Middleware is used in the backend to control the flow of requests:
  - Authenticating users and rejecting unauthorised access.
  - Validating request data and blocking invalid inputs before they reach the main logic.

#### **6. Frontend State Control**

- React's state management is used to handle UI and data flow efficiently:
  - Loading states are implemented to control what is displayed while awaiting API responses.
  - Context is used to manage global states, such as user data and theme preferences, ensuring a consistent flow of information across components.

---

By implementing these strategies, the application ensures controlled, predictable, and efficient execution of code, meeting the requirements for demonstrating code flow control.

</details>

### **CMP1002-2.2: Application of Object-Oriented Principles/Patterns**

<details>
<summary>View</summary>
</br>

The application demonstrates superior use of object-oriented principles and patterns to enhance maintainability, scalability, and serviceability. The following object-oriented principles and patterns are applied throughout the app:

---

#### **1. Encapsulation**

- **Database Models**: Encapsulation is applied through modular MongoDB models (`Survey`, `User`, etc.), where each model defines its own properties and methods, ensuring a clear separation of concerns.
- **Controllers**: Backend logic is encapsulated into controller functions that handle specific responsibilities, such as creating, updating, or deleting resources. This structure prevents duplication and keeps related logic together.

#### **2. Inheritance**

- Shared middleware functions (e.g., for authentication and role validation) act as a base layer for route-specific middleware, following an inheritance-like structure. For example:
  - `isCreator` middleware extends basic authentication checks by adding role-specific logic.

#### **3. Polymorphism**

- Polymorphism is demonstrated in:
  - **Frontend Reusability**: Reusable React components (e.g., buttons, modals, forms) adapt to different contexts using props, allowing a single component to handle multiple use cases.
  - **Backend Methods**: Overriding default Mongoose schema methods (e.g., `toJSON`) for formatting database output to suit the application's requirements.

#### **4. Abstraction**

- **Utilities and Services**: Common logic, such as validation, API requests, and error handling, is abstracted into utility functions and shared services. This abstraction hides implementation details while exposing clear, reusable interfaces.
- **Routes**: Backend routing uses layered abstraction:
  - Routes define the entry points.
  - Middleware handles common processing (e.g., validation, authentication).
  - Controllers handle the core business logic.

#### **5. Modular Design**

- The project is structured into self-contained modules:
  - Models, controllers, and routes are separated to ensure a clear and maintainable architecture.
  - Shared components, utilities, and constants are stored in dedicated folders to promote reuse and consistency.

#### **6. Single Responsibility Principle (SRP)**

- Each class, function, and module is designed to perform a single responsibility:
  - Controllers focus solely on business logic.
  - Middleware handles authentication, validation, and error checking.
  - React components handle specific UI elements without coupling logic.

#### **7. Dependency Injection**

- The app follows dependency injection principles:
  - Middleware injects required data (e.g., `req.user`) into controllers.
  - Components receive data and actions as props, promoting testability and flexibility.

#### **8. Positive Impact on Maintainability and Serviceability**

- The use of these object-oriented principles has the following benefits:
  - **Maintainability**: Clear separation of concerns ensures that changes can be made in one area without affecting others.
  - **Scalability**: Modular design and reusable patterns make it easy to add new features or expand existing functionality.
  - **Serviceability**: Abstraction and encapsulation reduce code complexity, making debugging and updates straightforward.

---

By incorporating these object-oriented principles and patterns throughout the application, the project ensures high code quality, maintainability, and scalability while adhering to professional development standards.

</details>

### **CMP1002-4.1: Employ and Utilise Proper Source Control Methodology**

<details>
<summary>View</summary>
</br>

This project demonstrates excellent use of source control methodology, with consistent and thorough application of version control practices throughout its development. As a solo project, all source control activities were performed by a single developer, ensuring clear documentation and management of the entire codebase.

---

#### **1. Frequent and Consistent Commits**

- Over 150 commits were made across the frontend and backend repositories, reflecting consistent and focused development efforts.
- Commits were made on nearly every day of the project, with only two days without commits, highlighting sustained progress and commitment.
- Each commit represented a specific task or feature, ensuring clarity and traceability.

#### **2. Structured Branching and Merging**

- Feature branches were created for new functionality, and all changes were merged into the main branch upon completion and testing.
- A clear branching strategy was used to separate work on features, fixes, and enhancements, ensuring the stability of the main branch.
- Merges were performed regularly to keep the main branch up to date and to prevent conflicts.

#### **3. Use of Pull Requests**

- Pull requests were created for all significant updates, providing a structured way to review and test changes before merging into the main branch.
- This practice ensured code quality and maintained the integrity of the project even as a solo developer.

#### **4. Meaningful Commit Messages**

- Commit messages were detailed, describing the purpose of each change. This ensured a clear and understandable Git history.
  - Example: "Implement user authentication with JWT," "Fix responsive design for survey dashboard," "Add validation to survey creation form."

#### **5. Frontend and Backend Source Control**

- Commits were evenly distributed between the frontend and backend, with both repositories showing consistent activity and progress.
- Version control practices were applied uniformly across both sections, ensuring the same level of organisation and quality.

#### **6. Source Control for Collaboration and Recovery**

- Although this was a solo project, best practices for collaborative workflows were applied:
  - Clear commit messages and pull requests provided documentation suitable for team environments.
  - Git history served as a reliable backup, enabling recovery or rollbacks if needed.

---

#### **Impact on Project Development**

- **Consistency**: Frequent commits and a disciplined workflow ensured steady progress throughout the project.
- **Traceability**: The Git history provided a clear record of changes, making it easy to track progress and debug issues.
- **Maintainability**: Structured use of branches, pull requests, and clear commit messages resulted in a clean and maintainable codebase.

This project demonstrates superior source control methodology, meeting the requirements for CMP1002-4.1 through consistent commits, structured workflows, and detailed documentation of development activities.

</details>

### **CMP1003-6.2: Employ and Utilise Project Management Methodology**

<details>
<summary>View</summary>
</br>

This project demonstrates the effective use of project management methodology by implementing a structured and organised workflow using a Trello board. Clear standards for planning and task management were defined and consistently adhered to throughout the development process.

---

#### **1. Use of Trello Board**

- A Trello board was employed to manage the project, ensuring tasks were clearly defined, prioritised, and tracked.
- Cards represented individual tasks, features, or requirements, with detailed descriptions, labels, and covers for easy identification.

#### **2. Task Labels for Difficulty**

- Tasks were labelled based on their difficulty to aid prioritisation and planning:
  - **Green**: Easy tasks.
  - **Yellow**: Medium difficulty tasks.
  - **Red**: Hard tasks.

#### **3. Card Covers for Build Areas**

- Card covers were colour-coded to section tasks into specific areas of the build:
  - **Green**: Testing.
  - **Purple**: Frontend development.
  - **Pink**: User interface (UI) design.
  - **Light Blue**: Backend development.
  - **Blue**: Other tasks.

#### **4. Columns for Workflow Management**

- The board included columns for:
  - **Doing**: Tasks actively being worked on.
  - **Done**: Completed tasks.
  - **Signed Off**: Tasks reviewed and approved.
- These columns helped visualise the project's progress and ensured tasks moved through a structured workflow.

#### **5. Sprint Organisation**

- Tasks were grouped into sprints, providing a clear timeline for achieving specific goals within defined timeframes.
- This approach ensured the project remained on track and progress could be easily monitored.

---

#### **Impact on Project Development**

- **Organisation**: The Trello board provided a clear and structured overview of the project, making it easy to track progress and manage tasks effectively.
- **Clarity**: Labels and colour-coded covers enhanced the visibility of task priorities and build areas.
- **Accountability**: The workflow columns ensured tasks were completed and signed off systematically, reducing the risk of missed requirements.
- **Efficiency**: Sprint planning allowed for focused and manageable work cycles, leading to consistent and measurable progress.

This project showcases the successful use of a project management methodology with well-defined standards, ensuring clarity, organisation, and adherence to planning throughout the development process.

</details>

### **CMP1002-3.1: App Functionality**

<details>
<summary>View</summary>
</br>

The application demonstrates outstanding functionality, meeting and exceeding client and user needs by delivering an intuitive and feature-rich experience. The following features highlight how the app achieves this:

---

#### **1. Easy Navigation**

- The app is designed with a clean and straightforward user interface, allowing users to easily access all functionalities without confusion.
- A tab-based single-page system ensures a seamless and efficient workflow for survey creation and management.

#### **2. Survey Creation**

- Users can create new surveys with minimal effort, supported by a simple and intuitive process.
- The use of a single-page tab system allows users to:
  - Add questions directly to a survey without navigating away from the current page.
  - View and manage all survey details in one place.

#### **3. Visual Data Representation**

- The app includes visual tools for analysing survey responses:
  - **Pie Chart**: Displays results for multiple-choice questions, offering a clear and engaging way to visualise response distribution.
  - **Bar Graph**: Represents responses from range slider questions (e.g., 0-10 ratings), enabling users to easily identify trends.
  - **List View**: Displays written responses in a clear, readable format, ensuring all data types are accessible.

#### **4. Editable and Deletable Surveys**

- Surveys can be edited and updated, allowing users to adjust questions or settings after creation.
- Surveys are also deletable, providing flexibility in managing survey data.

#### **5. Copy Link Functionality**

- The app includes auto-click link icons to copy survey URLs directly, making it effortless for users to share surveys with participants.

---

#### **Impact on User Experience**

- **Ease of Use**: Intuitive design ensures users can navigate and use the app without requiring training or documentation.
- **Efficiency**: Single-page tabs streamline survey creation and management, reducing the time and effort needed for these tasks.
- **Data Analysis**: Built-in visualisations and response lists exceed expectations by offering powerful insights into survey results in a user-friendly manner.
- **Flexibility**: The ability to edit, delete, and easily share surveys ensures the app adapts to the dynamic needs of its users.

This application not only meets client and user expectations but also exceeds them by providing a feature-rich, intuitive, and visually appealing solution for survey creation and analysis.

</details>

### **CMP1002-4.2: Deployment**

<details>
<summary>View</summary>
</br>

The application demonstrates a successful and professional deployment process, meeting all requirements for CMP1002-4.2 by using cloud hosting services, environment variables, a custom domain name, and consistent database types across environments.

---

#### **1. Cloud Hosting Services**

- The frontend was successfully deployed on **Netlify**, ensuring fast, reliable, and globally distributed delivery of the application.
- The backend was deployed on **Render**, providing a scalable and secure platform for handling API requests and server-side functionality.

#### **2. Custom Domain Name**

- A custom domain name, **surveybuddy.tech**, was configured and integrated with the deployment to provide a professional and easily recognisable web address.

#### **3. Consistent Database Usage**

- The application uses the same **MongoDB** database for both production and testing environments, ensuring consistency and reliability in data handling.
- A separate test database was used for local development and testing, maintaining a clean separation from production data.

#### **4. Use of Environment Variables**

- **Environment variables** were utilised to securely manage sensitive information such as:
  - Database connection strings.
  - API keys.
  - Authentication secrets.
- This approach ensures the secure and seamless management of configuration settings across different environments.

---

#### **Impact on Project Development**

- **Reliability**: Cloud hosting on Netlify and Render ensures the app is highly available and performant for end users.
- **Professionalism**: The custom domain name enhances the app’s credibility and branding.
- **Consistency**: Using the same database type across production, testing, and development environments minimises discrepancies and ensures predictable behaviour.
- **Security**: Environment variables protect sensitive information and make the deployment process more secure and adaptable.

The successful deployment of the application with a custom domain and consistent production practices demonstrates a high level of technical proficiency and professionalism.

</details>

### **CMP1002-3.2: User Interface**

<details>
<summary>View</summary>
</br>

The application features a highly intuitive user interface, ensuring smooth and effortless user flow. The following elements demonstrate how the interface supports and enhances the user experience:

---

#### **1. Navigation Bar**

- A clearly designed navigation bar provides users with easy access to all key areas of the application.
- The navigation options are straightforward and labelled appropriately, ensuring users can move between sections without confusion.

#### **2. Back Buttons**

- Back buttons are consistently placed and function as expected, enabling users to return to the previous step or page with ease.
- This reduces cognitive load and allows users to navigate the app fluidly.

#### **3. Seamless User Flow**

- The interface is structured logically, guiding users through tasks like creating surveys, adding questions, and reviewing responses without unnecessary steps.
- A consistent design language ensures users intuitively understand how to interact with the app, even on their first use.

#### **4. Simplicity and Clarity**

- The interface prioritises simplicity, avoiding clutter or overly complex elements.
- Clear labels, buttons, and prompts ensure users know what actions to take at every step.

---

#### **Impact on User Experience**

- **Ease of Use**: The intuitive navigation bar and back buttons eliminate barriers, making the app accessible to all users.
- **Efficiency**: The straightforward design allows users to complete tasks quickly and without frustration.
- **Consistency**: The consistent placement of UI elements builds user confidence and trust in the app's functionality.

The user interface is highly intuitive, with no impediments to user flow, ensuring an exceptional experience for all users.

</details>

### **CMP1002-5.1: Development Testing**

<details>
<summary>View</summary>
</br>

The application demonstrates extensive development testing, ensuring all features are robust and reliable. Both the frontend and backend were thoroughly tested using appropriate tools and methodologies.

---

#### **1. Backend Testing with Insomnia**

- **Insomnia** was utilised to test all backend API endpoints during development:
  - Endpoints were tested with various scenarios, including valid, invalid, and edge-case inputs.
  - Responses were verified to ensure they returned the expected data, status codes, and error messages.
  - Testing included user authentication, survey creation, question handling, and response retrieval.
  - Database interactions were validated to ensure no data inconsistencies occurred.

#### **2. Frontend Testing with Vite**

- **Vite's development server** was used extensively for frontend testing:
  - User flows were tested, such as survey creation, question addition, editing, and response viewing.
  - Browser testing ensured the app performed consistently across different environments.

#### **3. Combined Testing**

- Frontend and backend interactions were tested together to simulate real-world use cases:
  - Surveys were created, edited, and deleted through the frontend, with results verified in both the UI and database.
  - Form validation was tested to ensure error messages displayed appropriately for invalid inputs.
  - Data visualisations, such as pie charts and bar graphs, were tested with dynamic datasets to ensure accuracy.

---

#### **Impact on Application Quality**

- **Reliability**: Thorough testing ensured all features worked as intended, even under edge-case scenarios.
- **User Experience**: Continuous testing during development led to a seamless and bug-free experience for users.
- **Consistency**: Backend and frontend testing guaranteed reliable communication between components, preventing data inconsistencies.

This extensive testing process demonstrates a commitment to delivering a high-quality application that meets user expectations.

# Local Host Development Testing with Insomnia

## Users

### Signup / Register

**Method:** POST  
**Authorization:** NA  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/users/signup`  
![Signup test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/SignUp_LH.png)

---

### Login

**Method:** POST  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/users/login`  
![Login test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/Login_LH.png)

---

## Surveys

### New Survey

**Method:** POST  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/surveys`  
![New Survey test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/NewSurvey_LH.png)

---

### Get Survey

**Method:** GET  
**Authorization:** NA (for unregistered surveys)  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys/:surveyId`  
![Get Survey test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetSurvey_LH.png)

---

### Get Surveys

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys`  
![Get Surveys test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetSurveys_LH.png)

---

### Update Survey

**Method:** PATCH  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/surveys/:surveyId/editSurvey`  
![Update Survey test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/UpdatedSurvey_LH.png)

---

### Delete Survey

**Method:** DELETE  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys/:surveyId/deleteSurvey`  
![Delete Survey test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/DeleteSurvey_LH.png)

---

## Questions

### New Question

**Method:** POST  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/surveys/:surveyId/questions`  
![New Question test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/NewQuestion_LH.png)

---

### Get Question

**Method:** GET  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys/:surveyId/questions/:questionId`  
![Get Question test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetQuestion_LH.png)

---

### Get Questions

**Method:** GET  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys/:surveyId/questions/:questionId/editQuestion`  
![Get Questions test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetQuestions_LH.png)

---

### Update Question

**Method:** PATCH  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/surveys/:surveyId`  
![Update Question test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/UpdateQuestion_LH.png)

---

### Delete Question

**Method:** DELETE  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/surveys/:surveyId/questions/:questionId/deleteQuestion`  
![Delete Question test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/DeleteQuestion_LH.png)

---

## Answers

### New Answer

**Method:** POST  
**Authorization:** NA  
**Status:** 201 Created  
**URL Path:** `http://localhost:8080/answers/:surveyId/:questionId`  
![New Answer test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/NewAnswer_LH.png)

---

### Get Question Answers

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/answers/:surveyId/:questionId`  
![Get Question Answers test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetQuestionAnswers_LH.png)

---

### Get Survey Answers

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `http://localhost:8080/answers/:surveyId`  
![Get Survey Answers test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/GetSurveyAnswers_LH.png)

---

## Authentication

### Invalid Username or Password

**Method:** POST  
**Authorization:** NA  
**Status:** 400 Bad Request  
**URL Path:** `http://localhost:8080/userLogin`  
![Invalid Username or Password test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/InvalidUsernameOrPw_LH.png)

---

### Missing Token

**Method:** POST  
**Authorization:** JWT Token (missing)  
**Status:** 400 Bad Request  
**URL Path:** `http://localhost:8080/user/Login`  
![Missing Token test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/MissingToken_LH.png)

---

### Invalid Token

**Method:** POST  
**Authorization:** JWT Token (invalid)  
**Status:** 403 Forbidden  
**URL Path:** `http://localhost:8080/surveys`  
![Invalid Token test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/InvalidToken_LH.png)

---

### Missing Required Field (email)

**Method:** POST  
**Authorization:** NA  
**Status:** 400 Bad Request  
**URL Path:** `http://localhost:8080/users/signup`  
![Missing Required Field test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/MissingRequiredField_LH.png)

---

### Not The Creator

**Method:** PATCH  
**Authorization:** JWT Token (not creator)  
**Status:** 403 Forbidden  
**URL Path:** `http://localhost:8080/surveys/:surveyId`  
![Not The Creator test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/NotTheCreator_LH.png)

---

### No Surveys Found

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 404 Not Found  
**URL Path:** `http://localhost:8080/surveys`  
![No Surveys Found test](surveybuddy-client/src/assets/testScreenShots/developmentInsomnia/NoSurveysFound_LH.png)

</details>

## CMP1002-5.2: Production Testing

<details>
<summary>View</summary>
</br>

Below is an overview of the production testing process for the SurveyBuddy application, with accompanying Loom videos showcasing each step:

### Overall Run Through of SurveyBuddy Application

[Watch the video](https://www.loom.com/share/01e4867c9b7748bfbf22be6763a2e492?sid=058e5a46-2a0c-426d-8e0e-923f7591fd5b)

---

### Features Demonstrated

#### 1. **Creating an Account**

[Watch the video](https://www.loom.com/share/f0a9f47af11c4bd3996b5558d07644a8?sid=8c6d30b6-801c-4df8-934a-fb2e6050bc5b)

#### 2. **Creating a New Survey**

[Watch the video](https://www.loom.com/share/175fc01102fa4a898906612e27e88ffb?sid=639a2a35-07b9-41bb-8ca8-d109331014cd)

#### 3. **Finding the Survey Link and Emailing It to a Friend**

[Watch the video](https://www.loom.com/share/ce14812aee9a40ca8c3e1039c927b5a1?sid=2008d406-ec74-4c22-8769-c4fbb64aacaf)

#### 4. **Completing a Survey**

[Watch the video](https://www.loom.com/share/0ff506bbb09444358d8bd2a5942286db?sid=bb36d6e7-cce7-4e04-9e56-1bc8be40c6db)

#### 5. **Navigating and Viewing Question Results**

[Watch the video](https://www.loom.com/share/76822412231b4efa999be1bbde40b7e2?sid=4028379b-4526-4911-bb78-5cd41ef019f5)

#### 6. **Logging Out of the Account**

[Watch the video](https://www.loom.com/share/fa261e012942422c80df88d74175085f?sid=ce0b8cd4-d0a8-44ef-9f8f-dbd788827044)

#### 7. **Signing In to an Account**

[Watch the video](https://www.loom.com/share/390a8c0ebb6141978f878f6286fa905a?sid=04050a00-3a4f-4b89-a3a2-83e1058d20e2)

---

Each video provides a step-by-step demonstration of the corresponding feature to ensure clarity and ease of understanding for users and stakeholders.

# Insomnia Production API Tests for SurveyBuddy

Not all development routes are currently available in production, therefore only available routes will be displayed.

## Users

### Signup / Register

**Method:** POST  
**Authorization:** NA  
**Status:** 201 Created  
**URL Path:** `https://surveybuddy-backend.onrender.com/users/signup`  
![Signup test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/SignUp_SB.png)

---

### Login

**Method:** POST  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/users/login`  
![Login test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/Login_SB.png)

---

## Surveys

### New Survey

**Method:** POST  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys`  
![New Survey test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/NewSurvey_SB.png)

---

### Get Survey

**Method:** GET  
**Authorization:** NA (for unregistered surveys)  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId`  
![Get Survey test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetSurvey_SB.png)

---

### Get Surveys

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys`  
![Get Surveys test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetSurveys_SB.png)

---

### Update Survey

**Method:** PATCH  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/editSurvey`  
![Update Survey test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/UpdateSurvey_SB.png)

---

### Delete Survey

**Method:** DELETE  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/deleteSurvey`  
![Delete Survey test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/DeleteSurvey_SB.png)

---

## Questions

### New Question

**Method:** POST  
**Authorization:** JWT Token  
**Status:** 201 Created  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/questions`  
![New Question test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/NewQuestion_SB.png)

---

### Get Question

**Method:** GET  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/questions/:questionId`  
![Get Question test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetQuestion_SB.png)

---

### Get Survey Questions

**Method:** GET  
**Authorization:** NA  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/questions`  
![Get Survey Questions test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetSurveyQuestions_SB.png)

---

## Answers

### New Answer

**Method:** POST  
**Authorization:** NA  
**Status:** 201 Created  
**URL Path:** `https://surveybuddy-backend.onrender.com/answers/:surveyId/:questionId`  
![New Answer test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/NewAnswer_SB.png)

---

### Get Question Answers

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/answers/:surveyId/:questionId`  
![Get Question Answers test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetQuestionAnswers_SB.png)

---

### Get Survey Answers

**Method:** GET  
**Authorization:** JWT Token  
**Status:** 200 OK  
**URL Path:** `https://surveybuddy-backend.onrender.com/answers/:surveyId`  
![Get Survey Answers test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/GetSurveyAnswers_SB.png)

---

## Auth

### Auth: Not Creator Response

**Method:** DELETE  
**Authorization:** JWT Token  
**Status:** 403 Forbidden  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId`  
![Not Creator Response test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/Auth_NotCreator_SB.png)

---

### Auth: Invalid Username or Password

**Method:** POST  
**Authorization:** NA  
**Status:** 400 Bad Request  
**URL Path:** `https://surveybuddy-backend.onrender.com/users/login`  
![Invalid Username or Password test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/Auth_invalidUsernameOrPW.png)

---

### Auth: Invalid or Missing Token

**Method:** POST  
**Authorization:** JWT (Invalid)  
**Status:** 403 Forbidden  
**URL Path:** `https://surveybuddy-backend.onrender.com/surveys/:surveyId/editSurvey`  
![Invalid or Missing Token test](surveybuddy-client/src/assets/testScreenShots/productionInsomniaTests/Auth_InvalidToken_SB.png)

</details>

## Trello Board Tracking

<details>
<summary>View</summary>
</br>

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

#### 20th December

- Fixed deployed back and front end bugs.
- Added rubric documentation to readme.
- Prepared presentation.
- Registered a custom domain name for the app - surveybuddy.tech
- Fixed survey link copy and paste bug.

![20th Dec Trello Update](/surveybuddy-client/src/assets/trello/trello_20:12.png)

</details>
