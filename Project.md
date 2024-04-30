# Project Brief: Article Summarizer and Chat Interface
### Overview
Develop a full-stack application that allows an user to submit article URLs, receive summaries,
ask follow-up questions, and view chat histories. This project combines Node.js, React, and
OpenAI's API to create an engaging user experience.
### Technologies:
- Backend: Node.js with Express
- Frontend: React
- APIs: OpenAI (for summaries and chat interactions)
### Functional Requirements:
1. Article Submission: User submits URL and gets article summary.
2. Display Summary: User views the AI-generated summary.
3. Interactive Chat: User asks questions about the article and receives AI responses.
4. Chat History: For each article, display past questions and answers.
5. Previous Articles: The user is able to see and delete their previous articles
### Non-Functional Requirements:
   - Error Handling: The app should handle errors gracefully, especially for API interactions.
### Timeline and Workload:
   - Duration: Complete within two weeks from the start date.
   - Effort: Spend no more than 8 hours on the project. 
### Deliverables:
   - Source code for both frontend and backend published in Github
   - Basic setup and operation documentation.
### Evaluation Criteria:
   - Functionality
   - Code Quality
   - User Experience
   - Error Handling

   We look forward to seeing your innovative solutions and how you leverage AI to enhance user
   interactions. Good luck!

### Recommended Libraries and Resources
For those looking to get started quickly, we recommend using the following libraries:
- axios: For making HTTP requests
- cheerio: For parsing HTML content
```
const response = await axios.get(url);

const html = response.data;

const $ = cheerio.load(html);

const text = $("p").text(); // Get all <p><p/> tags from the article
```

These libraries are suggested because of their ease of use and robust community support.
However, feel free to use any other libraries or frameworks that you are comfortable with.
### Additional Guidance:
- For examples on how to send chat history and ask questions using the OpenAI API,
refer to the OpenAI documentation:
https://platform.openai.com/docs/quickstart?context=node

```
import OpenAI from "openai";
const openai = new OpenAI();
async function main() {
const completion = await openai.chat.completions.create({
messages: [{ role: "system", content: "You are a helpful assistant." }],
model: "gpt-3.5-turbo",
});
console.log(completion.choices[0]);
```

### API Access and Personal Keys
You have been added as a member of our OpenAI team. This membership allows you to create
and manage your own API key, which is essential for accessing the OpenAI services used in our
interview project.

**Check Your Email:** Please check your email for an invitation from OpenAI, which includes
important information about logging into the OpenAI platform.

**Create Your API Key:** After logging in, please create your API key by following these steps:

1. Navigate to the API section in your dashboard.
2. Follow the prompts to generate a new API key.
3. Keep your API key secure and confidential.
   
**Integrate Your API Key:** Add the API key to your environment variables to use it in your
   development environment:

``export OPENAI_API_KEY=your_api_key_here``
   
**Support and Questions:** If you have any questions about creating or using your API key, or if you encounter any issues, feel free to reach out via LinkedIn or email.