var express = require('express');
var router = express.Router();
var ctrComments = require('../controllers/comments');

/* Comments */
router.get('/comments', ctrComments.getAll);

router.post('/comments', ctrComments.createNew);

router.get('/comment/:idComment', ctrComments.getById);

router.delete('/comment/:idComment', ctrComments.deleteById);

/* Other */
//for now none

module.exports = router;