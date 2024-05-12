import contacts from "./contacts.json" assert { type: "json" };

import crypto from "crypto";

const contactsService = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};

export default contactsService;

export async function listContacts() {
  return contacts;
}

export async function getContactById(id) {
  return contacts.find((el) => el.id === id);
}

export async function addContact(body) {
  const newContact = {
    id: crypto.randomUUID(), // Generează un ID unic pentru fiecare contact nou
    ...body,
  };
  contacts.push(newContact);
  return newContact;
}

// Ștergerea unui contact
export async function removeContact(contactId) {
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    return contacts.splice(index, 1)[0];
  }
  return null;
}

// Actualizarea unui contact
export async function updateContact(contactId, body) {
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index !== -1) {
    const updatedContact = { ...contacts[index], ...body };
    contacts[index] = updatedContact;
    return updatedContact;
  }
  return null;
}
