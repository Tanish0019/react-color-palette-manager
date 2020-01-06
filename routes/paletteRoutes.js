const router = require('express').Router();
const paletteController = require('../controllers/paletteController');

router.get('/:userID/fetchAll', paletteController.fetchAll);
router.get("/:paletteID", paletteController.fetchOne);

router.post('/:userID/new', paletteController.newPalette);

router.delete('/:userID/:paletteID', paletteController.deletePalette);

module.exports = router;