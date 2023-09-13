import React, { useEffect, useState } from "react";

const Table = ({
  contacts,
  filteredContacts,
  setContacts,
  setToggleModal,
  setContact,
}) => {
  const editContact = async (contact) => {
    setContact({ ...contact });
    setToggleModal((prev) => !prev);
  };

  const deleteContact = async (contactID) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/contacts/${contactID}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        const deletedContact = await response.json();
        const nextContacts = [...contacts];
        const filter = nextContacts.filter(
          (contact) => contact._id !== contactID
        );
        setContacts(filter);
        //console.log(filter);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" bg-white mx-8 mt-10 rounded-xl shadow-lg">
      <table className="w-full">
        <thead className="uppercase text-gray-800">
          <tr className=" bg-gray-100">
            <td className=" py-3.5 px-4">name</td>
            <td className=" py-3.5 px-4">phone</td>
            <td className=" py-3.5 px-4">email</td>
            <td className=" py-3.5 px-4">address</td>
            <td className=" py-3.5 px-4">actions</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-300">
          {filteredContacts.map((contact, index) => (
            <tr key={contact._id} className=" hover:bg-gray-200 px-5">
              <td className=" py-4 px-4">{contact.name}</td>
              <td className=" py-4 px-4">{contact.phone}</td>
              <td className=" py-4 px-4">{contact.email}</td>
              <td className=" py-4 px-4">{contact.address}</td>
              <td className=" py-4 px-4">
                <div className="flex gap-x-3 items-center">
                  <button
                    className="  text-blue-500"
                    onClick={() => editContact(contact)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteContact(contact._id)}
                    className=" text-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
