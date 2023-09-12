import React, { useState, useContext, useEffect } from "react";
import Aside from "./components/Aside";
import Contacts from "./components/Contacts";
import ContactsContextProvider from "../ContactsContextProvider";

const App = () => {
  return (
    <ContactsContextProvider>
      <div className="flex min-h-screen w-full bg-gray-50">
        <Aside />
        <main className=" flex-1">
          <div className=" flex justify-end gap-x-4 items-center h-16 bg-white px-8 drop-shadow-sm ">
            <div className="">
              <h1>Momodou</h1>
            </div>
            <button className="">Logout</button>
          </div>
          <Contacts />
        </main>
      </div>
    </ContactsContextProvider>
  );
};

export default App;
