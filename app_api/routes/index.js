var express = require('express');
var router = express.Router();
var ctrComments = require('../controllers/comments');
var ctrlUsers = require('../controllers/users');

/* Comments */
router.get('/comments', ctrComments.getAll);
router.post('/comments/new', ctrComments.createNew);
router.post('/comments/edit/:idComment',
                ctrComments.editComment);
router.get('/comments/:idComment', ctrComments.getCommentById);
router.get('/comments/search', ctrComments.getCommentByName);
router.delete('/comments/:idComment', ctrComments.deleteCommentById);

/* User */
router.get('/users', ctrlUsers.getAll);
router.get('/users/:idUser', ctrlUsers.getUserById);
router.delete('/users/:idUser', ctrlUsers.deleteUserById);

module.exports = router;