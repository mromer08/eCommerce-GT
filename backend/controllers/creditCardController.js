const CreditCard = require("../model/CreditCard");
const bcrypt = require("bcrypt");

const getAllCreditCards = async (req, res) => {
  // all the credit cards by a user
  const user = await CreditCard.exist({ username: req.user });
  const creditCard = await CreditCard.find({ user });
  if (!creditCard)
    return res.status(204).json({ message: "No credit card found" });
  res.json(creditCard);
};

const createNewCreditCard = async (req, res) => {
  if (
    !req?.body?.holderName ||
    !req?.body?.number ||
    !req?.body?.expirationDate ||
    !req?.body?.cvcCode
  ) {
    return res.status(400).json({
      message: "Holdername, number, expiration date and cvc code are required",
    });
  }

  try {
    const { holderName, number, expirationDate, cvcCode } = req.body;
    const lastDigits = number.substring(number.length - 4);
    const hashedNumber = await bcrypt.hash(number, 10);
    const hashedCvc = await bcrypt.hash(cvcCode, 10);
    const result = await CreditCard.create({
      holderName,
      lastDigits,
      number: hashedNumber,
      expirationDate,
      cvcCode: hashedCvc,
      user: req.userId,
    });

    res.status(201).json(result);
  } catch (err) {
    console.error(err);
  }
};

const deleteCreditCard = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Credit card ID required." });

  const creditCard = await CreditCard.findOne({ _id: req.body.id }).exec();
  if (!creditCard) {
    return res
      .status(204)
      .json({ message: `No credit card matches ID ${req.body.id}.` });
  }
  if (creditCard.user.toString() !== req.userId) {
    return res
      .status(401)
      .json({ message: `You cannot delete someone else's credit card` });
  }
  const result = await creditCard.deleteOne();
  res.json(result);
};

const getCreditCard = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "creditCard ID required" });
  const creditCard = await CreditCard.findOne({ _id: req.params.id }).exec();
  if (!creditCard) {
    return res
      .status(204)
      .json({ message: `Credit card ID ${req.params.id} not found` });
  }
  if (creditCard.user.toString() !== req.userId) {
    return res
      .status(401)
      .json({ message: `You cannot see someone else's credit card` });
  }
  res.json(creditCard);
};

module.exports = {
  getAllCreditCards,
  createNewCreditCard,
  deleteCreditCard,
  getCreditCard,
};
