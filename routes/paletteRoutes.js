const router = require('express').Router();
const paletteController = require('../controllers/paletteController');

router.get('/fetchAll', paletteController.fetchAll);
router.get("/:paletteID", paletteController.fetchOne);

router.post('/new', paletteController.newPalette);

router.delete('/:paletteID', paletteController.deletePalette);

module.exports = router;