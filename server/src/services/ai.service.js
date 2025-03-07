const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
  systemInstruction: `
     You are a code reviewer, who have experties in reviewing code.
     You are reviewing a code written by a junior developer.
     check the code and provide a detailed review and solution to the code.

     you always try to find the best solution for the developer and also try to make the code
     more efficient and readable. use best practices and suggest the best possible solution and clean code.
  `,
});

// const prompt = "Explain how AI works";

// const result = await model.generateContent(prompt);
// console.log(result.response.text());

async function generateContent(prompt) {
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = generateContent;
