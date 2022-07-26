const express = require("express");
const locationController = require('../controllers/locationController');
const router = express.Router();


router.get('/all', locationController.locations);

router.post('/', locationController.location_add);
router.get('/:id', locationController.location_by_ID);

router.patch('/:id', locationController.location_update);
router.delete('/:id', locationController.location_delete);

module.exports = router;