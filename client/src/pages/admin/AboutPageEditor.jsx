// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AboutPageEditor = () => {
//   const [aboutContent, setAboutContent] = useState("");
//   const [newContent, setNewContent] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     // Fetch the current About page content from the backend
//     const fetchAboutContent = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get("/api/user/update-about-content");
//         setAboutContent(response.data.content);
//         setLoading(false);
//       } catch (error) {
//         setError("Error fetching About page content");
//         setLoading(false);
//       }
//     };

//     fetchAboutContent();
//   }, []);

//   const handleContentChange = (e) => {
//     setNewContent(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       // Send a request to the backend to update the About page content
//       const response = await axios.put("/api/user/update-about-content", { content: newContent });
//       setAboutContent(newContent);
//       setLoading(false);
//       alert("About page content updated successfully!");
//     } catch (error) {
//       setError("Error updating About page content");
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Edit About Page Content</h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>{error}</p>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <textarea
//             value={newContent}
//             onChange={handleContentChange}
//             rows={8}
//             cols={50}
//           />
//           <button type="submit">Save Changes</button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default AboutPageEditor;
import React, { useState, useEffect } from "react";
import axios from "axios";

const AboutPageEditor = () => {
  const [aboutContent, setAboutContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the current About page content from the backend
    const fetchAboutContent = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/user/about-content"); // Update the route to fetch about content
        setAboutContent(response.data.about); // Accessing `about` field from the response data
        setLoading(false);
      } catch (error) {
        setError("Error fetching About page content");
        setLoading(false);
      }
    };

    fetchAboutContent();
  }, []);

  const handleContentChange = (e) => {
    setNewContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Send a request to the backend to update the About page content
      const response = await axios.put("/api/user/update-about-content", { content: newContent });
      setAboutContent(newContent);
      setLoading(false);
      alert("About page content updated successfully!");
    } catch (error) {
      setError("Error updating About page content");
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Edit About Page Content</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newContent}
            onChange={handleContentChange}
            rows={8}
            cols={50}
          />
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default AboutPageEditor;
