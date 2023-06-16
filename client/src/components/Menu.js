import React, { useEffect, useState } from "react";
// import Card from "../data/cards.json";
import axios from "axios";
import { Link } from "react-router-dom";
// import moment from "moment";

export default function Menu({ cat }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat]);

  return (
    <>
      {posts.map((post) => (
        <div className="text-justify flex gap-5 mt-5" key={post.id}>
          <div>
            <img
              src={`../upload/${post.postimg}`}
              className="mb-3 w-32 h-24"
              alt="..."
            />
          </div>
          <div className="mt-4">
            <Link to={`/post/${post.id}`}>
              <h5 className="text-sm font-medium">{post.title}</h5>
            </Link>
            <time
              dateTime={post.date}
              className="text-gray-500 font-extralight text-sm"
            >
              {post.date}
            </time>
          </div>
        </div>
      ))}
    </>
  );
  // return (
  //   <>
  //     <div>
  //       {Card.OtherPosts.map((item) => {
  //         return (
  //           <>
  //             <div className="text-justify flex gap-5 mt-5" key={item.id}>
  //               <div>
  //                 <img src={item.Image} className="mb-3 w-32 h-24" alt="..." />
  //               </div>
  //               <div className="mt-4">
  //                 <a href={`/post/${item.id}`}>
  //                   <h5 className="text-sm font-medium">{item.Title}</h5>
  //                 </a>
  //                 <time
  //                   dateTime={item.Datetime}
  //                   className="text-gray-500 font-extralight text-sm"
  //                 >
  //                   {item.Date}
  //                 </time>
  //               </div>
  //             </div>
  //           </>
  //         );
  //       })}
  //     </div>
  //   </>
  // );
}
