import React, { useState, useContext, useEffect } from "react";
import Aside from "../components/Aside";
import Contacts from "../components/Contacts";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(localStorage.getItem("userToken"))
  );
  const navigate = useNavigate();

  useEffect(() => {
    !isLoggedIn && navigate("/login");
  }, [isLoggedIn]);

  const signOut = () => {
    localStorage.removeItem("userToken");
    setIsLoggedIn(false);
    //return navigate('')
  };

  return (
    <div className="sm:flex min-h-screen w-full bg-gray-50">
      <Aside />
      <main className=" sm:flex-1">
        {isLoggedIn && (
          <div className=" flex justify-between sm:justify-end sm:gap-x-4 items-center h-16 bg-white px-8 drop-shadow-sm">
            <div className="">
              <h1>{isLoggedIn.email}</h1>
            </div>
            <button className="" onClick={() => signOut()}>
              Logout
            </button>
          </div>
        )}
        {false && (
          <div className=" flex justify-between sm:justify-end sm:gap-x-4 items-center h-16 bg-white px-8 drop-shadow-sm">
            <button className=" px-5 py-2 bg-[#4338CA] rounded-sm text-white">
              Login
            </button>
            <button>Signup</button>
          </div>
        )}
        <Contacts />
      </main>
    </div>
  );
};

export default Home;
