import express from "express";
import contactsService from "../../models/contacts.js";
import Joi from "joi";

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(new RegExp("^[0-9]{3}-[0-9]{3}-[0-9]{4}$"))
    .required(),
});

const router = express.Router();
const STATUS_CODES = {
  success: 200,
  deleted: 204,
  notFound: 404,
  error: 500,
};
// GET localhost:3000/api/contacts
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();

    console.dir(contacts);

    res
      .status(STATUS_CODES.success)
      .json({ message: "Lista a fost returnata cu succes", data: contacts });
  } catch (error) {
    res.status(STATUS_CODES.error).json({ message: `${error}` });
  }
});

// GET localhost:3000/api/contacts/:id
router.get("/:id", async (req, res, next) => {
  try {
    const contact = await contactsService.getContactById(req.params.id);

    if (!contact) {
      res
        .status(STATUS_CODES.notFound)
        .json({ message: "Contactul nu a fost gasit" });
      return;
    }

    console.dir(contact);

    res
      .status(STATUS_CODES.success)
      .json({ message: "Contactul a fost returnat cu succes", data: contact });
  } catch (error) {
    res.status(STATUS_CODES.error).json({ message: `${error}` });
  }
});

// POST localhost:3000/api/contacts/
router.post("/", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await contactsService.addContact(value);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


// DELETE localhost:3000/api/contacts/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await contactsService.removeContact(id);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});

// PUT localhost:3000/api/contacts/:id
router.put("/:id", async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body, {
      presence: "optional"
    });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const updatedContact = await contactsService.updateContact(req.params.id, value);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact updated", data: updatedContact });
  } catch (error) {
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


export default router;
