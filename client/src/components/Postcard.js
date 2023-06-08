import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
// import Card from "../data/cards.json";

export const PostCard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="py-6 text-gray-800 w-auto h-auto sm:px-6">
        <img
          src={post.postimg}
          className="mb-3"
          alt="..."
          width={50}
          height={10}
        />
        <h5 className="mb-2 text-lg font-bold">{post.title}</h5>
        <p className="text-sm mb-6">{post.desc}</p>
        <Link
          to={`/post/${post.id}`}
          className="border border-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Read More{" "}
          <span className="ml-2" aria-hidden="true">
            &rarr;
          </span>
        </Link>
      </div>
    </>
  );
};
// export const PostCard = (props) => {
//   const { Image, Title, BodyText, id } = props;

//   return (
//     <>
//       <div className="py-6 text-gray-800 w-auto h-auto sm:px-6">
//         <img src={Image} className="mb-3" alt="..." />
//         <h5 className="mb-2 text-lg font-bold">{Title}</h5>
//         <p className="text-sm mb-6">{BodyText}</p>
//         <a
//           href={`/post/${id}`}
//           className="border border-indigo-600 px-3.5 py-3.5 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//         >
//           Read More{" "}
//           <span className="ml-2" aria-hidden="true">
//             &rarr;
//           </span>
//         </a>
//       </div>
//     </>
//   );
// };

export const PostCardMapping = () => {
  return (
    <>
      <div className="mx-auto grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 mt-2 lg:mt-6 justify-center">
        {posts.map((post) => {
          return (
            <>
              <div key={post.id}>
                <PostCard {...post} />
              </div>
            </>
          );
        })}
      </div>
    </>
  );
};

// export const PostCardMapping = () => {
//   return (
//     <>
//       <div className="mx-auto grid gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 mt-2 lg:mt-6 justify-center">
//         {Card.BlogPosts.map((item) => {
//           return (
//             <>
//               <div key={item.id}>
//                 <PostCard {...item} />
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </>
//   );
// };
