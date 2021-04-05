const { priceNoZiro } = require('../libs/commonFunctions');

module.exports = (fieldsFormData) => {
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
  const pizzaTypes = [
    {
      id: 0,
      price: Number(priceThin)
    },
    {
      id: 1,
      price: Number(priceThick)
    }
  ];
  const pizzaSizes = [
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
  ];
  const priceTypeFirst = priceNoZiro(pizzaTypes)[0].price;
  const priceSizeFirst = priceNoZiro(pizzaSizes)[0].price;
  const priceFilter = priceTypeFirst + priceSizeFirst;

  return {
    imageUrl: filePath,
    name: name,
    types: [...pizzaTypes],
    sizes: [...pizzaSizes],
    price: priceFilter,
    category: categoryPizza,
    rating: raitingPizza,
    description: description
  };
};
