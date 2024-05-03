# Summarizer

This project is a full-stack application that allows a user to submit article URLs, receive summaries, ask follow-up questions, and view chat histories. The project combines Node.js, React, and OpenAI's API to create an engaging user experience.

## Technologies and libraries used
- Backend:
  - node.js for running JavaScript code
  - express for creating the server
  - ts-node for running TypeScript code
  - openai for interacting with OpenAI's API
  - axios for making HTTP requests
  - cheerio for parsing HTML content
  - dotenv for managing environment variables
  - nodemon for hot-reloading at development
  - cors for enabling cross-origin requests
  - bcrypt for hashing passwords
  - jsonwebtoken for creating and verifying JWTs
  - mongoose for interacting with MongoDB
- Frontend:
  - React for building the user interface
  - Next.js as framework for React
  - next-mdx-remote for rendering markdown content
  - tailwindcss for styling

## Functional Requirements
1. Article Submission: User submits URL and gets article summary.
2. Display Summary: User views the AI-generated summary.
3. Interactive Chat: User asks questions about the article and receives AI responses.
4. Chat History: For each article, display past questions and answers.
5. Previous Articles: The user is able to see and delete their previous articles.

## Non-Functional Requirements
- Error Handling: The app should handle errors gracefully, especially for API interactions.

## Timeline and Workload
- Duration: Complete within two weeks from the start date.
- Effort: Spend no more than 8 hours on the project.

## Deliverables
- Source code for both frontend and backend published in GitHub
- Basic setup and operation documentation.

## Evaluation Criteria
- Functionality
- Code Quality
- User Experience
- Error Handling
---
## How to set up and run the project

### Prerequisites
- Node.js installed on your machine

### Steps
1. Clone the repository
2. Install dependencies at backend and frontend directories
      ```bash
      npm install
      ```
3. Create a `.env` file at the backend directory and add the following environment variables:
      ```bash
   PORT=PORT_OF_YOUR_CHOICE
   OPENAI_API_KEY=YOUR_OPENAI_API_KEY
   MONGODB_URI=YOUR_MONGODB_URI
   JWT_SECRET=YOUR_JWT_SECRET
   GMAIL_USER=YOUR_GMAIL_USER
   GMAIL_PASS=YOUR_GMAIL_PASSWORD_APP
   FRONT_END_URL=YOUR_FRONT_END_URL
   ```
4. Create a `.env.local` file at the frontend directory and add the following environment variables:
      ```bash
   NEXT_PUBLIC_API_URL=THE_NEXT_PUBLIC_API_URL
   ```
5. Run the backend server
      ```bash
      npm run dev
      ```
6. Run the frontend server
      ```bash
        npm run dev
      ```
7. Open your browser and navigate to `http://localhost:3000` or the link that you choose to view the application