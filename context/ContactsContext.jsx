import React from "react";
import { createContext } from "react";

export const contactsContext = createContext();

const contacts = [1, 2, 3, 4, 5];

const ContactsContext = ({ children }) => {
  return (
    <contactsContext.Provider
      value={{
        contacts,
      }}
    >
      {children}
    </contactsContext.Provider>
  );
};

export default ContactsContext;
