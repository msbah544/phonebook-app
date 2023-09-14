import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CREDS_DEFAULT_STATE = {
  email: "",
  password: "",
};
const Signup = () => {
  const [creds, setCreds] = useState(CREDS_DEFAULT_STATE);
  const navigate = useNavigate();

  //handel user input
  const handleUserInput = (e) => {
    const nextCreds = { ...creds };
    nextCreds[e.target.name] = e.target.value;
    setCreds({ ...nextCreds });
  };

  //signup user
  const signupUser = async (e) => {
    e.preventDefault();
    const { email, password } = creds;
    try {
      const response = await fetch("http://localhost:3000/api/user/signup", {
        method: "POST",
        body: JSON.stringify({ email: email, password: password }),
        headers: { "Content-Type": "application/json" },
      });

      const user = await response.json();
      console.log("user", user);
      //store token to localStorage
      if (user.email) {
        localStorage.setItem(
          "userToken",
          JSON.stringify({ email: user.email, token: user.token })
        );
        navigate("/");
        console.log(user);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <form
      onSubmit={(e) => signupUser(e)}
      className=" flex flex-col justify-center items-center sm:h-screen "
    >
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
            onChange={(e) => handleUserInput(e)}
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
            onChange={(e) => handleUserInput(e)}
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
