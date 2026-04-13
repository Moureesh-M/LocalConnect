const express = require('express');
const router = express.Router();
const helpRequestsController = require('../controllers/helpRequests');

router.get('/', helpRequestsController.getHelpRequests);
router.post('/', helpRequestsController.createHelpRequest);
router.patch('/:id', helpRequestsController.updateHelpRequest);

module.exports = router;
