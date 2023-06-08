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
  const [value, setValue] = useState(state?.title || "");
  const [title, setTitle] = useState(state?.desc || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");

  const navigate = useNavigate();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const imgUrl = await upload();

    try {
      state
        ? await axios.put(`/posts/${state.id}`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
          })
        : await axios.post(`/posts/`, {
            title,
            desc: value,
            cat,
            img: file ? imgUrl : "",
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container">
        <div className="bg-white py-12 sm:py-8">
          <div className="justify-center mx-auto max-w-7xl px-6 lg:px-8 xl:flex border-t border-gray-200 mt-10 sm:mt-12 xl:gap-20 text-justify">
            <div className="mx-auto mt-6 grid max-w-2xl gap-x-8 gap-y-16 pt-6 sm:mt-6 sm:pt-6 lg:mx-0 lg:max-w-none justify-center">
              <article className="hidden md:block max-w-xl flex-col items-start justify-between">
                <label
                  htmlFor="text"
                  className="block text-lg font-medium text-center leading-6 text-indigo-600"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="text"
                    name="text"
                    type="text"
                    value={title}
                    autoComplete="text"
                    required
                    className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="text"
                    className="block text-lg font-medium text-center leading-6 text-indigo-600"
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
              <article className="block md:hidden max-w-xs flex-col items-start justify-between">
                <label
                  htmlFor="text"
                  className="block text-lg font-medium text-center leading-6 text-indigo-600"
                >
                  Title
                </label>
                <div className="mt-2">
                  <input
                    id="text"
                    name="text"
                    type="text"
                    value={title}
                    autoComplete="text"
                    required
                    className="block w-full border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="mt-6">
                  <label
                    htmlFor="text"
                    className="block text-lg font-medium text-center leading-6 text-indigo-600"
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
            <div className="mx-auto max-w-2xl mt-10 pt-10 sm:mt-5 sm:pt-5 hidden sm:block justify-center text-center">
              <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                Publish Post
              </h2>
              <p className="mt-2 text-sm leading-8 text-gray-600">
                Learn how to grow your business with our expert advice.
              </p>

              <div className="flex text-center justify-center mx-auto ">
                <div className="flex mt-2">
                  <span
                    htmlFor="text"
                    className="mr-5 mt-2 block text-md font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Status:</b> Draft
                  </span>
                  {/* <p className="mt-2 text-md leading-8 text-gray-600">Draft</p> */}
                  {/* <select id="status" name="status" className="h-12 rounded-lg">
                    <option value="draft">Draft</option>
                    <option value="archive">Archives</option>
                  </select> */}
                </div>
                <div className="flex mt-2">
                  <span
                    htmlFor="text"
                    className="mt-2 block text-md font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Visibility:</b> Public
                  </span>
                  {/* <p className="mt-2 text-md leading-8 text-gray-600">Draft</p> */}
                  {/* <select id="status" name="status" className="h-12 rounded-lg">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select> */}
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="text"
                  className="mt-4 block text-md font-medium leading-6 text-indigo-600"
                >
                  Add Featured Image
                </label>
                <input
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

              <div className="mt-8">
                <h2 className="text-xl mb-2 font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                  Select Category
                </h2>
                <div className="cat">
                  <input
                    type="radio"
                    name="science"
                    id="science"
                    value="science"
                    className="mr-2"
                    checked={cat === "science"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="science">Science</label>
                  <br />
                </div>
                <div className="cat">
                  <input
                    type="radio"
                    name="design"
                    id="design"
                    value="design"
                    className="mr-2"
                    checked={cat === "design"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="design">Design</label>
                  <br />
                </div>
                <div className="cat ml-8">
                  <input
                    type="radio"
                    name="technology"
                    id="technology"
                    value="technology"
                    className="mr-2"
                    checked={cat === "technology"}
                    onChange={(e) => setCat(e.target.value)}
                  />
                  <label htmlFor="technology">Technology</label>
                  <br />
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-2xl mt-10 pt-10 sm:mt-5 sm:pt-5 block sm:hidden justify-center text-center">
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
                  {/* <p className="mt-2 text-md leading-8 text-gray-600">Draft</p> */}
                  {/* <select id="status" name="status" className="h-12 rounded-lg">
                    <option value="draft">Draft</option>
                    <option value="archive">Archives</option>
                  </select> */}
                </div>
                <div className="flex mt-3 text-center justify-center">
                  <span
                    htmlFor="text"
                    className="mr-3 mt-2 block text-sm font-medium leading-6 text-indigo-600"
                  >
                    <b className="text-gray-600">Visibility:</b> Public
                  </span>
                  {/* <p className="mt-2 text-md leading-8 text-gray-600">Draft</p> */}
                  {/* <select id="status" name="status" className="h-12 rounded-lg">
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                  </select> */}
                </div>
                <div className="">
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
                <div className="justify-center text-center mx-auto mt-6">
                  <Link
                    to={`#`}
                    className="border border-indigo-600 px-2 py-2 text-sm font-semibold text-indigo-600 shadow-sm hover:text-white hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Publish{" "}
                  </Link>
                </div>

                <div className="mt-8">
                  <h2 className="text-xl mb-2 font-bold tracking-tight text-gray-900 sm:text-2xl lg:text-3xl">
                    Select Category
                  </h2>
                  <div className="cat">
                    <input
                      type="radio"
                      name="science"
                      id="science"
                      className="mr-2"
                      value="science"
                      checked={cat === "science"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="science">Science</label>
                    <br />
                  </div>
                  <div className="cat">
                    <input
                      type="radio"
                      name="design"
                      id="design"
                      className="mr-2"
                      value="design"
                      checked={cat === "design"}
                      onChange={(e) => setCat(e.target.value)}
                    />
                    <label htmlFor="design">Design</label>
                    <br />
                  </div>
                  <div className="cat ml-8">
                    <input
                      type="radio"
                      name="technology"
                      id="technology"
                      className="mr-2"
                      value="technology"
                      checked={cat === "technology"}
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