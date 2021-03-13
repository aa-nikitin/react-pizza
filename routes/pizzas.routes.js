const { Router } = require('express');
const formidable = require('formidable');
const Pizzas = require('../models/pizzas');
const router = Router();

router.get('/pizzas', async (req, res) => {
  try {
    const pizzas = await Pizzas.find({});

    res.json(pizzas);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

// const aaa = (req) => {
//   const form = formidable({ multiples: true });
//   return new Promise((resolve, reject) => {
//     form.parse(req, (err, fields, files) => {
//       if (err) {
//         return reject(err);
//       }

//       resolve({ fields, files });
//     });
//   });
// };

const aaa = (req) => {
  const form = formidable({ multiples: true });
  const ccc = form.parse(req, async (err, fields, files) => {
    if (err) {
      Promise.reject(err);
    }

    Promise.resolve({ fields, files });
  });
  console.log(ccc);
};

router.post('/pizzas', async (req, res) => {
  try {
    // const { name } = req.body;
    const bbb = await aaa(req);
    console.log(bbb.files.images);
    // form.parse(req, (err, fields, files) => {
    //   if (err) {
    //     next(err);
    //     return;
    //   }

    //   console.log(fields, files);
    //   res.json({});
    // });
    // const pizza = new Pizzas({
    //   name: name
    // });

    // await pizza.save();
    // res.json({ message: pizza });
    res.json({});
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

module.exports = router;
