import React, { useContext } from "react";
import { contactsContext } from "../../ContactsContextProvider";

const Table = ({ filteredContacts }) => {
  const { contacts, editContact, deleteContact } = useContext(contactsContext);
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
            <tr key={contact.id} className=" hover:bg-gray-200 px-5">
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
                    className=" text-red-500"
                    onClick={() => deleteContact(contact.id)}
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
