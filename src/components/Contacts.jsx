import React, { useState, useContext, useEffect } from "react";
import Table from "./Table";
import { Modal } from "@mui/material";
import { closeIcon } from "../assets/svgIcons";
import { contactsContext } from "../../ContactsContextProvider";

/*const DEFAULT_CONTACT_STATE = {
  name: "",
  phone: "",
  email: "",
  address: "",
};*/

const Contacts = () => {
  //const [toggleModal, setToggleModal] = useState(false);
  //const [contact, setContact] = useState(DEFAULT_CONTACT_STATE);
  const [searchInput, setSearchInput] = useState("");
  const {
    DEFAULT_CONTACT_STATE,
    contacts,
    setContacts,
    contact,
    setContact,
    addContact,
    toggleModal,
    setToggleModal,
  } = useContext(contactsContext);
  //const [filteredContacts, setFilteredContacts] = useState([]);

  /*const [contacts, setContacts] = useState([
    {
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
    },
  ]);*/

  //handle form inputs
  const handleContactInput = async (e) => {
    const nextContact = { ...contact };
    nextContact[e.target.name] = e.target.value;

    setContact(nextContact);
    console.log(contact);
  };

  //add contact
  /*const addContact = () => {
    //const defaultContactInputs = { ...DEFAULT_CONTACT_STATE };
    //setContact({ ...defaultContactInputs });
    const id = crypto.randomUUID();
    const contactsCopy = [...contacts];
    contactsCopy.unshift({ ...contact, id }); //similar to push

    setContacts(contactsCopy);
  };*/

  //edit contact
  /*const editContact = (contact) => {
    const currentContact = { ...contact };
    setContact({ ...currentContact });
    setToggleModal(true);
  };*/

  //update edited contact
  const updateContact = (id) => {
    const indexOfEditedContact = contacts.findIndex(
      (contact) => contact.id == id
    );

    const nextContacts = [...contacts];
    nextContacts[indexOfEditedContact] = contact;
    setContacts(nextContacts);
    localStorage.setItem("contacts", JSON.stringify(nextContacts));
  };

  //delete contact
  /*const deleteContact = (id) => {
    const currentContacts = [...contacts];

    const newContacts = currentContacts.filter((contact) => contact.id !== id);

    setContacts(newContacts);
  };*/

  //submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contact.id) {
      //update edited contact
      updateContact(contact.id);
      setToggleModal(false);
    } else {
      addContact();
      //console.log(contacts);
      setToggleModal(false);
    }
  };

  const handleSearchInput = (e) => setSearchInput(e.target.value);

  const filteredContacts = contacts.filter((contact) => {
    const contactItem = JSON.stringify(contact);
    return contactItem.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-8">
        <div className=" uppercase">all contacts</div>
        <input
          value={searchInput}
          onChange={handleSearchInput}
          type="text"
          placeholder="search contact..."
          className=" p-3 bg-gray-200"
        />
        <button
          className=" text-white py-3 px-5 bg-blue-800 rounded-md uppercase"
          onClick={() => {
            setToggleModal(true), setContact({ ...DEFAULT_CONTACT_STATE });
          }}
        >
          new contact
        </button>
      </div>

      <Modal
        className=" flex justify-center items-center"
        open={toggleModal}
        onClose={() => setToggleModal(!toggleModal)}
      >
        <div className=" w-2/5">
          <div className=" bg-white flex-1 p-5">
            <div className=" flex justify-between items-start text-lg uppercase font-semibold border-b py-3">
              <h1>New Contact</h1>
              <button onClick={() => setToggleModal(false)}>{closeIcon}</button>
            </div>
            <form onSubmit={(e) => handleFormSubmit(e)} className="py-5">
              <div className="mb-5">
                <label htmlFor="name" className=" text-lg text-gray-600 ">
                  Name
                </label>
                <br />
                <input
                  value={contact.name}
                  onChange={(e) => handleContactInput(e)}
                  type="text"
                  name="name"
                  id="name"
                  className="mt-3 py-2 px-2 text-lg w-full text-gray-600 bg-gray-100 focus:outline-none focus:ring-4 ring-gray-300"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="phone" className=" text-lg text-gray-600 ">
                  Phone
                </label>
                <br />
                <input
                  value={contact.phone}
                  onChange={(e) => handleContactInput(e)}
                  type="tel"
                  name="phone"
                  id="phone"
                  className="mt-3 py-2 px-2 text-lg w-full text-gray-600 bg-gray-100 focus:outline-none focus:ring-4 ring-gray-300"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="email" className=" text-lg text-gray-600 ">
                  Email
                </label>
                <br />
                <input
                  value={contact.email}
                  onChange={(e) => handleContactInput(e)}
                  type="email"
                  name="email"
                  id="email"
                  className="mt-3 py-2 px-2 text-lg w-full text-gray-600 bg-gray-100 focus:outline-none focus:ring-4 ring-gray-300"
                />
              </div>
              <div className="mb-5">
                <label htmlFor="address" className=" text-lg text-gray-600 ">
                  Address
                </label>
                <br />
                <textarea
                  value={contact.address}
                  onChange={(e) => handleContactInput(e)}
                  type="text"
                  name="address"
                  id="address"
                  className="mt-3 py-2 px-2 text-lg w-full text-gray-600 bg-gray-100 focus:outline-none focus:ring-4 ring-gray-300"
                />
              </div>
              <div className="flex justify-end items-center border-t py-3">
                <div className="flex gap-x-2 ">
                  <button className=" bg-slate-950 text-white px-5 py-3 uppercase">
                    Save
                  </button>
                  <button
                    className=" px-5 py-3 uppercase"
                    onClick={() => setToggleModal(true)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Table
        filteredContacts={filteredContacts}
        /*contacts={contacts}
        editContact={editContact}
        deleteContact={deleteContact}*/
      />
    </div>
  );
};

export default Contacts;
