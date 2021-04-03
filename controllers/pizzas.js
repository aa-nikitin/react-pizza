const { v4: uuidv4 } = require('uuid');
const handleFormData = require('../libs/handleFormData');
const Pizzas = require('../models/pizzas');

module.exports.getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizzas.find({});
    res.json(pizzas);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
};

module.exports.setPizza = async (req, res) => {
  try {
    const fieldsFormData = await handleFormData(req);
    const { filePath, fields } = fieldsFormData;
    const {
      name,
      priceThick,
      priceThin,
      priceSize26,
      priceSize30,
      priceSize40,
      categoryPizza,
      raitingPizza,
      description
    } = fields;
    const pizza = new Pizzas({
      imageUrl: filePath,
      name: name,
      types: [
        {
          id: 0,
          price: Number(priceThin)
        },
        {
          id: 1,
          price: Number(priceThick)
        }
      ],
      sizes: [
        {
          id: 26,
          price: Number(priceSize26)
        },
        {
          id: 30,
          price: Number(priceSize30)
        },
        {
          id: 40,
          price: Number(priceSize40)
        }
      ],
      price: 300,
      category: categoryPizza,
      rating: raitingPizza,
      description: description,
      id: uuidv4()
    });
    await pizza.save();
    await res.json({ message: pizza });
    // res.json({});
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
