const router = require('express').Router();
const userRoutes = require('./userRoutes');
const ForumRoutes = require('./forumRoutes');


router.use('/users', userRoutes);
router.use('/forums', ForumRoutes);


module.exports = router;
