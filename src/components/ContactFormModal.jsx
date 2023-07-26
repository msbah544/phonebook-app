import React, { useState } from "react";
import { Modal } from "@mui/material";
import { closeIcon } from "../assets/svgIcons";

const ContactFormModal = ({
  toggleModal,
  handleModalDisplay,
  contacts,
  setContacts,
  contact,
  setContact,
}) => {
  //handle form inputs
  const handleContactInput = async (e) => {
    const nextContact = { ...contact };
    nextContact[e.target.name] = e.target.value;

    setContact(nextContact);
    console.log(contact);
  };

  //add contact
  const addContact = () => {
    const id = crypto.randomUUID();
    const contactsCopy = [...contacts];
    contactsCopy.unshift({ ...contact, id }); //similar to push

    setContacts(contactsCopy);
  };

  //submit form
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (contact.id) {
      //editContact(contact.id);
      return handleModalDisplay();
    }
    addContact();
    //console.log(contacts);
    handleModalDisplay();
  };

  return (
    <div>
      <Modal className=" flex justify-center items-center" open={toggleModal}>
        <div className=" w-2/5">
          <div className=" bg-white flex-1 p-5">
            <div className=" flex justify-between items-start text-lg uppercase font-semibold border-b py-3">
              <h1>New Contact</h1>
              <button onClick={handleModalDisplay}>{closeIcon}</button>
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
                    onClick={handleModalDisplay}
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
  );
};

export default ContactFormModal;
