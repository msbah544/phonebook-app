import React, { useState, useContext, useEffect } from "react";
import Table from "./Table";
import { Modal } from "@mui/material";
import { closeIcon } from "../assets/svgIcons";

const DEFAULT_FORM_STATE = {
  name: "",
  phone: "",
  email: "",
  address: "",
};

const Contacts = () => {
  const [searchInput, setSearchInput] = useState("");
  const [toggleModal, setToggleModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [contact, setContact] = useState(DEFAULT_FORM_STATE);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/contacts/", {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();

          setContacts(data);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchContacts();
  }, []);

  const handleFormInput = (e) => {
    const nextContact = { ...contact };
    nextContact[e.target.name] = e.target.value;
    setContact({ ...nextContact });
    console.log(contact);
  };

  //update contact
  const updateContact = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contacts", {
        method: "PATCH",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const editedContact = await response.json();
        const nextContacts = [...contacts];
        const index = nextContacts.findIndex(
          (contact) => contact._id === editedContact._id
        );
        nextContacts[index] = editedContact;
        setContacts([...nextContacts]);
        //console.log(editedContact);
        setToggleModal((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //add new contact

  const addNewContact = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contacts/", {
        method: "POST",
        body: JSON.stringify(contact),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        const newContact = await response.json();
        const nextContacts = [...contacts];
        //nextContacts.push(newContact);
        setContacts([newContact, ...nextContacts]);
        setToggleModal((prev) => !prev);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (contact._id) {
      return updateContact();
    }
    return addNewContact();
  };

  /*const handleSearchInput = (e) => setSearchInput(e.target.value);

  const filteredContacts = contacts.filter((contact) => {
    const contactItem = JSON.stringify(contact);
    return contactItem.toLowerCase().includes(searchInput.toLowerCase());
  });*/

  return (
    <div>
      <div className="flex justify-between items-center pt-10 px-8">
        <div className=" uppercase">all contacts</div>
        <input
          //value={searchInput}
          //onChange={handleSearchInput}
          type="text"
          placeholder="search contact..."
          className=" p-3 bg-gray-200"
        />
        <button
          onClick={() => {
            setToggleModal((prevState) => !prevState),
              setContact(DEFAULT_FORM_STATE);
          }}
          className=" text-white py-3 px-5 bg-blue-800 rounded-md uppercase"
        >
          new contact
        </button>
      </div>
      <div>
        <Modal
          className=" flex justify-center items-center"
          open={toggleModal}
          onClose={() => setToggleModal((prevState) => !prevState)}
        >
          <div className=" w-2/5">
            <div className=" bg-white flex-1 p-5">
              <div className=" flex justify-between items-start text-lg uppercase font-semibold border-b py-3">
                <h1>New Contact</h1>
                <button
                  onClick={() => setToggleModal((prevState) => !prevState)}
                >
                  {closeIcon}
                </button>
              </div>
              <form className="py-5" onSubmit={(e) => handleFormSubmit(e)}>
                <div className="mb-5">
                  <label htmlFor="name" className=" text-lg text-gray-600 ">
                    Name
                  </label>
                  <br />
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={(e) => handleFormInput(e)}
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
                    type="tel"
                    name="phone"
                    value={contact.phone}
                    onChange={(e) => handleFormInput(e)}
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
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={(e) => handleFormInput(e)}
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
                    type="text"
                    name="address"
                    value={contact.address}
                    onChange={(e) => handleFormInput(e)}
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
                      onClick={() => setToggleModal((prevState) => !prevState)}
                      className=" px-5 py-3 uppercase"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </div>

      <Table
        contacts={contacts}
        setContacts={setContacts}
        setToggleModal={setToggleModal}
        contact={contact}
        setContact={setContact}
      />
    </div>
  );
};

export default Contacts;
