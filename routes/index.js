const { Router } = require('express');
const { getPizzas, setPizza } = require('../controllers/pizzas');
const router = Router();

// let form = new formidable.IncomingForm();

router.get('/pizzas', getPizzas);
router.post('/pizzas', setPizza);

module.exports = router;
