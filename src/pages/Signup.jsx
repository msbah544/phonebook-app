import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <form className=" flex flex-col justify-center items-center sm:h-screen ">
      <div className="relative flex items-center text-center text-2xl uppercase h-16 px-5 bg-indigo-600 text-white sm:w-[40%] w-full">
        <h1>Phonebook App</h1>
      </div>
      <div className="relative sm:w-[40%] w-full p-5 sm:p-10  rounded-lg shadow-lg">
        <h1 className="flex justify-start items-start font-[400] text-3xl">
          Signup
        </h1>
        <div className="py-5">
          <label htmlFor="email" className=" text-lg">
            Email
          </label>
          <br className="" />
          <input
            className="border-2 w-full p-5 text-black outline-none rounded-md text-lg"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div className="py-5">
          <label htmlFor="password" className=" text-lg">
            Password
          </label>
          <br className="" />
          <input
            className="border-2 w-full p-5 text-black outline-none rounded-md"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className=" flex justify-between items-center">
          <button className="px-10 py-3 border-2 font-bold shadow-md">
            Signup
          </button>
          <Link to={`/login`} className="font-[400]">
            Login ?
          </Link>
        </div>
      </div>
    </form>
  );
};

export default Signup;
