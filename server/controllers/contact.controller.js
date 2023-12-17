import ContactModel from "../models/contact.model.js";

const contact = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are mandatory",
    });
  }

  try {
    const query = await ContactModel.create({
      name,
      email,
      message,
    });

    await query.save();

    res.status(200).json({
      success: true,
      message: "Query sent successfully",
      query,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default contact;
