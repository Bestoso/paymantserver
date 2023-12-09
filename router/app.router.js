const { Router } = require('express');

const router = Router();

router.use('/payments', require('./payments/payments.routes'));

module.exports = router;