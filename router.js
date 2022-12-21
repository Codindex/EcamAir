let express = require('express');

let router = express.Router();

let controller = require('./controllers/bookingController');

router.get('/', controller.booking);
router.post('/', controller.firstStep);

router.get('/persons', controller.travelersEncoding);
router.post('/persons', controller.secondStep);

router.get('/validation', controller.validationScreen);

router.get('/confirmation', controller.greetings);

module.exports = router;