// const { Schema, model } = require('mongoose');

// const schema = new Schema({
//   name: { type: String, require: true }
// });

// module.exports = model('pizzas', schema);

const { Schema, model } = require('mongoose');

const schema = new Schema({
  imageUrl: { type: String, default: '' },
  name: { type: String, require: true },
  types: [
    { id: { type: Number, require: true }, price: { type: Number, require: true } },
    { id: { type: Number, require: true }, price: { type: Number, require: true } }
  ],
  sizes: [
    { id: { type: Number, require: true }, price: { type: Number, require: true } },
    { id: { type: Number, require: true }, price: { type: Number, require: true } },
    { id: { type: Number, require: true }, price: { type: Number, require: true } }
  ],
  price: { type: Number, require: true },
  category: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  description: { type: String, default: '' },
  id: { type: String, require: true, unique: true }
});

module.exports = model('pizzas', schema);
