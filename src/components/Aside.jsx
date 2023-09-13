import React, { useContext } from "react";

const Aside = () => {
  /* const { contacts } = useContext(contactsContext);

  const allContacts = contacts.length;
  const favContacts = contacts.filter((contact) => contact.favourite).length;
  const colleagueContacts = contacts.filter(
    (contact) => contact.group === "colleagues"
  ).length;*/
  return (
    <aside className=" bg-indigo-700 w-64 text-center text-gray-100">
      <div className="  flex items-center text-center text-2xl uppercase h-16 px-5 bg-indigo-800">
        <h1>Phonebook App</h1>
      </div>
      <nav className="px-5 text-left">
        <ul className=" pt-8 space-y-8">
          <li>
            <a href="/dashboard">Dashboard</a>
          </li>
          <li>
            <a href="/contacts">All Contacts (5)</a>
          </li>
          <li>
            <a href="/users">Favourite Contacts (0)</a>
          </li>
          <li>
            <a href="/users">Colleagues (0)</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Aside;
