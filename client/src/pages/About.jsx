// import React from "react";
// import aboutImg from "../assets/images/about_img.png";
// // import { FaExternalLinkAlt } from "react-icons/fa";
// import { IoLogoInstagram } from "react-icons/io5";
// import { FaGithub } from "react-icons/fa";

// const About = () => {
//   const year = new Date().getFullYear();
//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-3 flex flex-col gap-3">
//         <h1 className="text-4xl text-center font-semibold">About</h1>
//         <div className="w-max flex flex-col">
//           <img src={aboutImg} className="w-40 h-40" alt="Image" />
//           <h1 className="text-xl font-semibold text-center">Singh Anshuman</h1>
//         </div>
//         <ul className="list-disc w-max mx-5">
//           <li className="hover:underline hover:text-blue-600 cursor-pointer">
//             <a
//               className="flex items-center gap-2"
//               href="https://github.com/SinghAnshuman26"
//               target="_blank"
//             >
//               {/* Git-Hub <FaExternalLinkAlt /> */}
//               Git-Hub <FaGithub />
//             </a>
//           </li>
//           <li className="hover:underline hover:text-pink-600 cursor-pointer">
//             <a
//               className="flex items-center gap-2"
//               // href="https://www.instagram.com/sanjay_ng_125/"
//               target="_blank"
//             >
//               Instagram <IoLogoInstagram />
//             </a>
//           </li>
//         </ul>
//         <p>
//           Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quidem
//           aliquam voluptatibus odit, saepe exercitationem autem molestias
//           asperiores dolores sit corrupti molestiae ea, facere, totam
//           necessitatibus enim quod aliquid. Quisquam, dolor. aliquam
//           voluptatibus odit, saepe exercitationem autem molestias asperiores
//           dolores sit corrupti molestiae ea, facere, totam necessitatibus enim
//           quod aliquid. Quisquam, dolor.
//         </p>
//       </div>
//       <div lg='12' className="text-center pt-5 absolute bottom-0 lg:w-full text-center pt-5">
//             <p className="copyright">Copyright {year} , design and develop by Anshuman & Teams. All rights reserved.</p>
//       </div>
//     </div>
//   );
// };

// export default About;
import React, { useState, useEffect } from "react";
import aboutImg from "../assets/images/about_img.png";
import { IoLogoInstagram } from "react-icons/io5";
import { FaGithub } from "react-icons/fa";
import axios from 'axios';

const About = () => {
  const [aboutContent, setAboutContent] = useState('');
  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchAboutContent = async () => {
      try {
        const response = await axios.get('/api/user/about-content');
        setAboutContent(response.data.about);
      } catch (error) {
        console.error('Error fetching about content:', error);
      }
    };

    fetchAboutContent();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[90%] max-w-2xl rounded-xl shadow-xl p-3 flex flex-col gap-3">
        <h1 className="text-4xl text-center font-semibold">About</h1>
        <div className="w-max flex flex-col">
          <img src={aboutImg} className="w-40 h-40" alt="Image" />
          <h1 className="text-xl font-semibold text-center">Singh Anshuman</h1>
        </div>
        <ul className="list-disc w-max mx-5">
          <li className="hover:underline hover:text-blue-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              href="https://github.com/SinghAnshuman26"
              target="_blank"
              rel="noopener noreferrer"
            >
              Git-Hub <FaGithub />
            </a>
          </li>
          <li className="hover:underline hover:text-pink-600 cursor-pointer">
            <a
              className="flex items-center gap-2"
              // href="https://www.instagram.com/sanjay_ng_125/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram <IoLogoInstagram />
            </a>
          </li>
        </ul>
        <p>{aboutContent}
        <p className="copyright">Copyright {year} , design and develop by Anshuman & Teams. All rights reserved.</p>
        </p>
        
      </div>
      {/* <div lg='12' className="text-center pt-5 absolute bottom-0 lg:w-full text-center pt-5">
        <p className="copyright">Copyright {year} , design and develop by Anshuman & Teams. All rights reserved.</p>
      </div> */}
    </div>
  );
};

export default About;
