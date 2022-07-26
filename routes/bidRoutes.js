const express = require("express");
const bidController = require('../controllers/bidController');
const router = express.Router();


router.get('/all', bidController.bids);
router.post('/', bidController.bid_add);
router.get('/:id', bidController.bid_by_ID);
router.delete('/:id', bidController.bid_delete);

module.exports = router;