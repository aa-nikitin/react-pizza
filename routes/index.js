const { Router } = require('express');
const { getPizzas, setPizza, editPizza } = require('../controllers/pizzas');
const router = Router();

// let form = new formidable.IncomingForm();

router.get('/pizzas', getPizzas);
router.post('/pizzas', setPizza);
router.put('/pizzas/:id', editPizza);

module.exports = router;
