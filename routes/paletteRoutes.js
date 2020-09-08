const router = require('express').Router();
const paletteController = require('../controllers/paletteController');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.get('/', isAuthenticated, paletteController.fetchAll);

router.get('/:paletteID', isAuthenticated, paletteController.fetchOne);

router.post('/new', isAuthenticated, paletteController.newPalette);

router.delete('/:paletteID', isAuthenticated, paletteController.deletePalette);

module.exports = router;
