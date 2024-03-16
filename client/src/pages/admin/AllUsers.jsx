// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { FaTrash } from "react-icons/fa";

// const AllUsers = () => {
//   const [allUser, setAllUsers] = useState([]);
//   const [search, setSearch] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(false);

//   const getUsers = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`/api/user/getAllUsers?searchTerm=${search}`);
//       const data = await res.json();

//       if (data && data?.success === false) {
//         setLoading(false);
//         setError(data?.message);
//       } else {
//         setLoading(false);
//         setAllUsers(data);
//         setError(false);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   useEffect(() => {
//     getUsers();
//     if (search) getUsers();
//   }, [search]);

//   const handleUserDelete = async (userId) => {
//     const CONFIRM = confirm(
//       "Are you sure ? the account will be permenantly deleted!"
//     );
//     if (CONFIRM) {
//       setLoading(true);
//       try {
//         const res = await fetch(`/api/user/delete-user/${userId}`, {
//           method: "DELETE",
//         });
//         const data = await res.json();
//         if (data?.success === false) {
//           setLoading(false);
//           alert("Something went wrong!");
//           return;
//         }
//         setLoading(false);
//         alert(data?.message);
//         getUsers();
//       } catch (error) {}
//     }
//   };

//   return (
//     <>
//       <div className="w-full flex justify-center">
//         <div className="w-full shadow-lg rounded-lg p-2">
//           <h1 className="text-2xl text-center">
//             {loading ? "Loading..." : "All Users"}
//           </h1>
//           {error && <h1 className="text-center text-2xl">{error}</h1>}
//           <div>
//             <input
//               type="text"
//               className="my-3 p-2 rounded-lg border"
//               placeholder="Search name,email or phone..."
//               onChange={(e) => {
//                 setSearch(e.target.value);
//               }}
//             />
//           </div>
//           {allUser ? (
//             allUser.map((user, i) => {
//               return (
//                 <div
//                   className="flex overflow-auto justify-between p-2 px-3 border-y-2 gap-3"
//                   key={i}
//                 >
//                   <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
//                     {user._id}
//                   </h5>
//                   <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
//                     {user.username}
//                   </h5>
//                   <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
//                     {user.email}
//                   </h5>
//                   <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
//                     {user.address}
//                   </h5>
//                   <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
//                     {user.phone}
//                   </h5>
//                   <div className="flex flex-col flex-1 justify-center items-center p-[5px]">
//                     <button
//                       disabled={loading}
//                       className="p-2 text-red-500 hover:cursor-pointer hover:scale-125 disabled:opacity-80"
//                       onClick={() => {
//                         handleUserDelete(user._id);
//                       }}
//                     >
//                       <FaTrash />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })
//           ) : (
//             <></>
//           )}
//         </div>
//       </div>
//     </>
//   );
// };

// export default AllUsers;


import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaTrash, FaUserShield } from "react-icons/fa";

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_REPLIT_URL}/api/user/getAllUsers?searchTerm=${search}`);
      const data = await res.json();

      if (data && data.success === false) {
        setLoading(false);
        setError(data.message);
      } else {
        setLoading(false);
        setAllUsers(data);
        setError(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const handleUserDelete = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_REPLIT_URL}/api/user/delete-user/${userId}`, {
          method: "DELETE",
        });
        const data = await res.json();
        setLoading(false);
        alert(data.message);
        getUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
        setLoading(false);
        alert("Something went wrong while deleting user");
      }
    }
  };

  const handlePromoteUser = async (userId) => {
    const confirmPromote = window.confirm("Are you sure you want to promote this user to admin?");
    if (confirmPromote) {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_REPLIT_URL}/api/user/promote/${userId}`, {
          method: "PUT",
        });
        alert("User promoted to admin successfully");
        setLoading(false);
        getUsers();
      } catch (error) {
        console.error("Error promoting user:", error);
        setLoading(false);
        alert("Something went wrong while promoting user");
      }
    }
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <div className="w-full shadow-lg rounded-lg p-2">
          <h1 className="text-2xl text-center">{loading ? "Loading..." : "All Users"}</h1>
          {error && <h1 className="text-center text-2xl">{error}</h1>}
          <div>
            <input
              type="text"
              className="my-3 p-2 rounded-lg border"
              placeholder="Search name,email or phone..."
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
          {allUser.length > 0 ? (
            allUser.map((user) => (
              <div
                className="flex overflow-auto justify-between p-2 px-3 border-y-2 gap-3"
                key={user._id}
              >
                <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                  {user._id}
                </h5>
                <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                  {user.username}
                </h5>
                <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                  {user.email}
                </h5>
                <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                  {user.address}
                </h5>
                <h5 className="flex flex-1 justify-center items-center text-ellipsis p-[5px]">
                  {user.phone}
                </h5>
                <div className="flex flex-col flex-1 justify-center items-center p-[5px]">
                  <button
                    disabled={loading}
                    className="p-2 text-red-500 hover:cursor-pointer hover:scale-125 disabled:opacity-80"
                    onClick={() => handleUserDelete(user._id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    disabled={loading}
                    className="p-2 text-blue-500 hover:cursor-pointer hover:scale-125 disabled:opacity-80"
                    onClick={() => handlePromoteUser(user._id)}
                  >
                    <FaUserShield />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h2 className="text-center">No users found</h2>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUsers;
