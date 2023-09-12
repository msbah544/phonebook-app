import React, { createContext, useState, useEffect } from "react";

export const contactsContext = createContext();

const DEFAULT_CONTACT_STATE = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const ContactsContextProvider = ({ children }) => {
  const [toggleModal, setToggleModal] = useState(false);

  const [contact, setContact] = useState(DEFAULT_CONTACT_STATE);

  const [contacts, setContacts] = useState([
    /*{
      name: "Momodou",
      phone: "3981289",
      email: "msbah@gmail.com",
      address: "kotu layout",
      id: "87fgz12",
    },
    {
      name: "Musa",
      phone: "3981212",
      email: "musa@gmail.com",
      address: "Manjie",
      id: "23hdf333",
    },*/
  ]);

  //get all contacts from backend
  //useEffect(() => {
  const getContacts = async () => {
    const response = await fetch("http://localhost:3000/api/contacts");
    if (!response.ok) return console.log("failed to fetch data");

    const data = await response.json();
    console.log("data", data);
    setContacts(data);
  };
  //getContacts();
  // }, []);
  //local storage
  /* useEffect(() => {
    if (localStorage.getItem("contacts")) {
      const locContacts = JSON.parse(localStorage.getItem("contacts"));
      setContacts(...locContacts);
    } else {
      JSON.stringify(localStorage.setItem("contacts", []));
    }
  }, []);*/

  //edit contact
  const editContact = (contact) => {
    const currentContact = { ...contact };
    setContact({ ...currentContact });
    setToggleModal(true);
  };

  //delete contact
  const deleteContact = (id) => {
    const currentContacts = [...contacts];

    const newContacts = currentContacts.filter((contact) => contact.id !== id);

    setContacts(newContacts);
    localStorage.setItem("contacts", JSON.stringify(newContacts));
  };

  //add new contact
  const addContact = () => {
    //const defaultContactInputs = { ...DEFAULT_CONTACT_STATE };
    //setContact({ ...defaultContactInputs });
    const id = crypto.randomUUID();
    const contactsCopy = [...contacts];
    contactsCopy.unshift({ ...contact, id }); //similar to push

    setContacts(contactsCopy);
    localStorage.setItem("contacts", JSON.stringify(contactsCopy));
  };

  /* useEffect(() => {
    const lsExists = localStorage.getItem("contacts");
    if (lsExists) {
      //console.log("contacts exists #local_storage");
      const locContacts = JSON.parse(localStorage.getItem("contacts"));
      console.log(locContacts);
      setContacts([...locContacts]);
    } else {
      //console.log("contacts does not exists #local_storage");
      const contacts = [];
      localStorage.setItem("contacts", JSON.stringify(contacts));
      console.log(JSON.stringify(localStorage.getItem("contacts")));
    }
  }, []);*/

  return (
    <contactsContext.Provider
      value={{
        DEFAULT_CONTACT_STATE,
        getContacts,
        contacts,
        setContacts,
        editContact,
        contact,
        setContact,
        setToggleModal,
        toggleModal,
        deleteContact,
        addContact,
      }}
    >
      {children}
    </contactsContext.Provider>
  );
};

export default ContactsContextProvider;
