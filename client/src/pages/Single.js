import React, { useEffect, useState } from "react";
// import Card from "../data/cards.json";
import Menu from "../components/Menu";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
// import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";

export default function Single() {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3001/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  // const handleDelete = async () => {
  //   try {
  //     await axios.delete(`http://localhost:3001/api/posts/${postId}`);
  //     navigate("/");
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/api/posts/${postId}`, {
        withCredentials: true, // Includes cookies in the request
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
      <div className="container">
        <div className="pt-24">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 sm:flex border-t border-gray-200 gap-20 text-justify">
            <div className="mx-auto mt-6 grid max-w-2xl gap-x-8 gap-y-16 pt-6 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none">
              <article
                key={post.id}
                className="flex max-w-xl flex-col items-start justify-between"
              >
                <img
                  src={`../upload/${post.postimg}`}
                  className="mb-3"
                  alt="..."
                />
                <div className="flex items-center gap-x-4 text-xs">
                  <time dateTime={post.date} className="text-gray-500">
                    Last Updated: {post.date}
                  </time>
                  {/* <p>Posted {moment(post.date).fromNow()}</p> */}
                  <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                    {post.cat}
                  </p>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-indigo-600">
                    <span className="absolute inset-0" />
                    {post.title}
                  </h3>
                  <p className="mt-5 text-sm leading-6 text-gray-600">
                    {getText(post.desc)}
                  </p>
                </div>
                <div className="flex">
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {post.userImg && (
                      <img
                        src={post.userImg}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                    )}
                    <div className="text-sm leading-6 flex">
                      <div className="mr-9">
                        <p className="font-semibold text-indigo-700">
                          <span className="absolute inset-0" />
                          {post.authorname}
                        </p>
                        <p className="text-gray-600">{post.authorrole}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex mt-10">
                    {currentUser?.username === post.username && (
                      <>
                        <div>
                          <Link to={`/write/?edit=2`} state={post}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 stroke-indigo-600 mr-3"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                              />
                            </svg>
                          </Link>
                        </div>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 stroke-indigo-600"
                            onClick={handleDelete}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </article>

              {/* {Card.SinglePosts.map((SinglePost) => (
                <article
                  key={SinglePost.id}
                  className="flex max-w-xl flex-col items-start justify-between"
                >
                  <img src={SinglePost.image} className="mb-3" alt="..." />
                  <div className="flex items-center gap-x-4 text-xs">
                    <time
                      dateTime={SinglePost.datetime}
                      className="text-gray-500"
                    >
                      {SinglePost.date}
                    </time>
                    <p className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                      {SinglePost.category.title}
                    </p>
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-indigo-600">
                      <span className="absolute inset-0" />
                      {SinglePost.title}
                    </h3>
                    <p className="mt-5 text-sm leading-6 text-gray-600">
                      {SinglePost.description}
                    </p>
                  </div>
                  <div className="flex">
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <img
                        src={SinglePost.author.imageUrl}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                      />
                      <div className="text-sm leading-6 flex">
                        <div className="mr-9">
                          <p className="font-semibold text-indigo-700">
                            <span className="absolute inset-0" />
                            {SinglePost.author.name}
                          </p>
                          <p className="text-gray-600">
                            {SinglePost.author.role}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex mt-10">
                      <a href={SinglePost.href}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 stroke-indigo-600 mr-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                          />
                        </svg>
                      </a>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 stroke-indigo-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))} */}
            </div>
            <div className="mx-auto max-w-2xl lg:mx-0 mt-10 pt-10 sm:mt-8 sm:pt-6 hidden sm:block">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Recent Posts
              </h2>
              <p className="mt-2 text-sm leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
              <Menu cat={post.cat} />
            </div>
            <div className="block sm:hidden mx-auto max-w-2xl lg:mx-0 mt-10 pt-10 sm:mt-6 sm:pt-6 border-t border-gray-200">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Recent Posts
              </h2>
              <p className="mt-2 text-xs leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
              <Menu cat={post.cat} />
            </div>
          </div>
        </div>
      </div>
      {/* <div className="container mt-20 sm:flex px-6 sm:gap-96">
        <div className="postsection">C</div>
        <div className="sidepanel">
        <div className="mx-auto max-w-2xl lg:mx-0">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                From the blog
              </h2>
              <p className="mt-2 text-lg leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>
            </div></div>
      </div> */}
    </>
  );
}
