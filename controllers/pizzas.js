// const { v4: uuidv4 } = require('uuid');
const handleFormData = require('../libs/handleFormData');
const createPizzaObj = require('../libs/createPizzaObj');
const Pizzas = require('../models/pizzas');

module.exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizzas.find({});
    console.log(req.query);
    res.json(pizzas);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

module.exports.setPizza = async (req, res) => {
  try {
    const fieldsFormData = await handleFormData(req);
    const newPizzaObj = createPizzaObj(fieldsFormData);
    const pizza = new Pizzas(newPizzaObj);

    await pizza.save();
    await res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.editPizza = async (req, res) => {
  try {
    const fieldsFormData = await handleFormData(req);
    const pizza = await Pizzas.findOne({ _id: req.params.id });
    const newPizzaObj = createPizzaObj(fieldsFormData);

    if (newPizzaObj.imageUrl) pizza.imageUrl = newPizzaObj.imageUrl;
    pizza.name = newPizzaObj.name;
    pizza.types = newPizzaObj.types;
    pizza.sizes = newPizzaObj.sizes;
    pizza.price = newPizzaObj.price;
    pizza.category = newPizzaObj.category;
    pizza.rating = newPizzaObj.rating;
    pizza.description = newPizzaObj.description;
    await pizza.save();
    res.json(pizza);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports.deletePizza = async (req, res) => {
  try {
    const resultDelete = await Pizzas.remove({ _id: req.params.id });

    res.json(resultDelete);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
