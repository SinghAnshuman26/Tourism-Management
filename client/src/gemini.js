// import {
//     GoogleGenerativeAI,
//     HarmCategory,
//     HarmBlockThreshold,
//   }  from "@google/generative-ai";
  
//   const MODEL_NAME = "gemini-1.0-pro";

//   const API_KEY = import.meta.env.VITE_API_KEY;

// //   const prompt = "Hello, how are you?";
  
//   async function runChat(prompt) {
//     const genAI = new GoogleGenerativeAI(API_KEY);
//     const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
//     const generationConfig = {
//       temperature: 0.9,
//       topK: 1,
//       topP: 1,
//       maxOutputTokens: 2048,
//     };
  
//     const safetySettings = [
//       {
//         category: HarmCategory.HARM_CATEGORY_HARASSMENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//       {
//         category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
//         threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
//       },
//     ];
  
//     const chat = model.startChat({
//       generationConfig,
//       safetySettings,
//       history: [
//       ],
//     });
  
//     const result = await chat.sendMessage(prompt);
//     const response = result.response;
//     console.log(response.text());
//     return response.text();
//   }
// //   const result = await chat.sendMessage(prompt);
// //     const response = result.response;
// //     return response.text(); // Return the response text
// //   } catch (error) {
// //     console.error('Error:', error);
// //     throw error;
  
//   export default runChat;
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  }  from "@google/generative-ai";
  
const MODEL_NAME = "gemini-1.0-pro";
const API_KEY = import.meta.env.VITE_API_KEY;

async function runChat(prompt) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
  
    const generationConfig = {
      temperature: 0.9,
      topK: 1,
      topP: 1,
      maxOutputTokens: 2048,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];
  
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [],
    });
  
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    const formattedResponse = formatResponse(response.text());
    console.log(response.text());
    return formattedResponse;
}

function formatResponse(text) {
    const sections = text.split("**");
    const formattedSections = sections.map(section => {
        if (section.trim() !== "") {
            const lines = section.trim().split("\n");
            const title = lines[0];
            const content = lines.slice(1).map(line => line.trim()).join("\n- ");
            return `**${title}**\n- ${content}`;
        }
        return "";
    });
    return formattedSections.filter(section => section !== "").join("\n\n");
}

export default runChat;