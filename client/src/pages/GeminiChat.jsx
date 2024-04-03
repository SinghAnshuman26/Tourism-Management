// import React, { useState } from "react";
// // import "./styles/Home.css";
import runChat from "../gemini"; // Assuming you have imported the runChat function from your Gemini file

// const GeminiChat = () => {
//   const [prompt, setPrompt] = useState("");
//   const [response, setResponse] = useState("");

//   const handlePromptChange = (event) => {
//     setPrompt(event.target.value);
//   };

//   const handleSendMessage = async () => {
//     try {
//       const result = await runChat(prompt);
//       setResponse(result);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <div className="gemini-chat">
//       <input
//         type="text"
//         value={prompt}
//         onChange={handlePromptChange}
//         placeholder="Type your message..."
//       />
//       <button onClick={handleSendMessage}>Send</button>
//       {response && <div className="response">{response}</div>}
//     </div>
//   );
// };

// export default GeminiChat;


import React, { useState } from "react";

const GeminiChat = ({ updateResponse }) => {
  const [prompt, setPrompt] = useState("");

  const handleSendMessage = async () => {
    try {
      const result = await runChat(prompt); // Replace with your function to call Gemini
      updateResponse(result); // Call the callback function to update response in Home.js
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="gemini-chat">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your prompt for Gemini"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default GeminiChat;
