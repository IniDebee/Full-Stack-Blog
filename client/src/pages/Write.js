import React from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

export default function Write() {
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [authorName, setAuthorName] = useState(state?.authorname || "");
  const [authorRole, setAuthorRole] = useState(state?.authorrole || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:3001/api/upload",
        formData
      );
      return res.data;
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    upload();
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(
            `http://localhost:3001/api/posts/${state.id}`,
            {
              title,
              desc: value,
              cat,
              authorname: authorName,
              authorrole: authorRole,
              postimg: file ? imgUrl : "",
            },
            {
              withCredentials: true, // Includes cookies in the request
            }
          )
        : await axios.post(
            `http://localhost:3001/api/posts/`,
            {
              title,
              desc: value,
              cat,
              authorname: authorName,
              authorrole: authorRole,
              postimg: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
              withCredentials: true, // Includes cookies in the request
            }
          );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="py-12 sm:py-8">
          <div className="justify-center mx-auto max-w-7xl px-6 lg:px-8 xl:flex border-t border-gray-200 mt-10 sm:mt-12 xl:gap-20 text-justify">
            <div className="mx-auto mt-6 grid max-w-2xl gap-x-8 gap-y-16 pt-6 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none justify-center">
              {/* <input
                id="text"
                name="text"
                type="text"
                autoComplete="text"
                required
                className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              /> */}
              <article className="hidden md:block max-w-xl flex-col items-start justify-between pt-24">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                      for="grid-author-name"
                    >
                      Author Name
                    </label>
                    <input
                      class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-author-name"
                      type="text"
                      value={authorName}
                      placeholder="Inioluwa"
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                      for="grid-author-role"
                    >
                      Author Role
                    </label>
                    <input
                      class="appearance-none block w-full text-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="grid-author-role"
                      type="text"
                      value={authorRole}
                      placeholder="CEO"
                      onChange={(e) => setAuthorRole(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2 cursor-pointer">
                  <label
                    htmlFor="text"
                    className="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="text"
                    name="text"
                    type="text"
                    value={title}
                    placeholder="Medical Science"
                    autoComplete="text"
                    required
                    className="appearance-none block w-full text-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-6">
                  <label
                    htmlFor="text"
                    className="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                  >
                    Write Up
                  </label>
                  <div className="ql-container">
                    <ReactQuill
                      value={value}
                      onChange={setValue}
                      className="mt-2"
                      theme="snow"
                    />
                  </div>
                </div>
              </article>
              <article className="block md:hidden max-w-xs flex-col items-start justify-between pt-24">
                <div class="flex flex-wrap -mx-3 mb-6">
                  <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                      for="grid-author-name"
                    >
                      Author Name
                    </label>
                    <input
                      class="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                      id="grid-author-name"
                      value={authorName}
                      type="text"
                      placeholder="Inioluwa"
                      onChange={(e) => setAuthorName(e.target.value)}
                    />
                  </div>
                  <div class="w-full md:w-1/2 px-3">
                    <label
                      class="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                      for="grid-author-role"
                    >
                      Author Role
                    </label>
                    <input
                      class="appearance-none block w-full text-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                      id="grid-author-role"
                      type="text"
                      value={authorRole}
                      placeholder="CEO"
                      onChange={(e) => setAuthorRole(e.target.value)}
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <label
                    htmlFor="text"
                    className="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                  >
                    Title
                  </label>
                  <input
                    id="text"
                    name="text"
                    type="text"
                    value={title}
                    autoComplete="text"
                    placeholder="Medical Science"
                    required
                    className="appearance-none block w-full text-gray-600 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="text"
                    className="block uppercase tracking-wide text-indigo-600 text-sm font-bold mb-2"
                  >
                    Write Up
                  </label>
                  <div className="ql-container">
                    <ReactQuill
                      value={value}
                      onChange={setValue}
                      className="mt-2"
                      theme="snow"
                    />
                  </div>
                </div>
              </article>
            </div>
            <div className="mx-auto max-w-2xl mt-10 pt-10 sm:mt-10 sm:pt-10 xl:pt-24 hidden sm:block items-center justify-center text-center">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Publish Post
              </h2>
              <p className="mt-2 text-sm leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>

              <div className="flex text-center justify-center mx-auto">
                <div className="flex mt-2">
                  <span
                    htmlFor="text"
                    className="mr-5 mt-2 block text-md font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Status:</b> Draft
                  </span>
                </div>
                <div className="flex mt-2">
                  <span
                    htmlFor="text"
                    className="mt-2 block text-md font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Visibility:</b> Public
                  </span>
                </div>
              </div>
              <div className="text-center justify-center mx-auto">
                <label
                  htmlFor="text"
                  className="mt-4 block text-md font-medium leading-6 text-indigo-600"
                >
                  Add Featured Image
                </label>
                <input
                  // style={{ display: "none" }}
                  type="file"
                  name="file"
                  id="file"
                  className="mt-4 ml-20"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div className="mt-6 flex justify-center text-center mx-auto">
                <div className="mr-3">
                  <Link
                    to={`#`}
                    className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Save as draft
                  </Link>
                </div>
                <div className="mr-3">
                  <Link
                    to={`#`}
                    className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </Link>
                </div>
                <div>
                  <Link
                    to={`#`}
                    onClick={handleSubmit}
                    className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Publish
                  </Link>
                </div>
              </div>

              <div className="mt-8 text-center justify-center mx-auto items-center">
                <h2 className="text-xl mb-2 font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                  Select Category
                </h2>
                <div className="cat mr-14">
                  <input
                    type="radio"
                    name="science"
                    id="science"
                    value="Science"
                    className="mr-5"
                    checked={cat === "Science"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science">Science</label>
                  <br />
                </div>
                <div className="cat mr-16">
                  <input
                    type="radio"
                    name="design"
                    id="design"
                    value="Design"
                    className="mr-5"
                    checked={cat === "Design"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                  <br />
                </div>
                <div className="cat mr-8">
                  <input
                    type="radio"
                    name="technology"
                    id="technology"
                    value="Technology"
                    className="mr-5"
                    checked={cat === "Technology"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>
                  <br />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-2xl mt-10 pt-10 sm:mt-10 sm:pt-10 block sm:hidden justify-center items-center text-center">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Publish Post
              </h2>
              <p className="mt-2 text-sm leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>

              <div className="text-center justify-center mx-auto">
                <div className="flex mt-3 text-center justify-center">
                  <span
                    htmlFor="text"
                    className="mr-3 mt-2 block text-sm font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Status:</b> Draft
                  </span>
                </div>
                <div className="flex mt-3 text-center justify-center mx-auto">
                  <span
                    htmlFor="text"
                    className="mr-3 mt-2 block text-sm font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Visibility:</b> Public
                  </span>
                </div>
                <div className="text-center items-center justify-center mx-auto">
                  <label
                    htmlFor="text"
                    className="mt-5 block text-sm font-medium leading-6 text-indigo-600"
                  >
                    Add Featured Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    id="file"
                    className="mt-4 ml-16"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <div className="mt-6 flex justify-center text-center mx-auto">
                  <div className="mr-3">
                    <Link
                      to={`#`}
                      className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Save as draft{" "}
                    </Link>
                  </div>
                  <div>
                    <Link
                      to={`#`}
                      className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Update{" "}
                    </Link>
                  </div>
                </div>
                <div className="justify-center text-center items-center mx-auto mt-6">
                  <Link
                    to={`#`}
                    onClick={handleSubmit}
                    className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Publish{" "}
                  </Link>
                </div>

                <div className="mt-8 text-center items-center justify-center mx-auto">
                  <h2 className="text-xl mb-2 font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                    Select Category
                  </h2>
                  <div className="cat mr-14">
                    <input
                      type="radio"
                      name="science"
                      id="science"
                      className="mr-5"
                      value="Science"
                      checked={cat === "Science"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="science">Science</label>
                    <br />
                  </div>
                  <div className="cat mr-16">
                    <input
                      type="radio"
                      name="design"
                      id="design"
                      className="mr-5"
                      value="Design"
                      checked={cat === "Design"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="design">Design</label>
                    <br />
                  </div>
                  <div className="cat mr-8">
                    <input
                      type="radio"
                      name="technology"
                      id="technology"
                      className="mr-5"
                      value="Technology"
                      checked={cat === "Technology"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="technology">Technology</label>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
