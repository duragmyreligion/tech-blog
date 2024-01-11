const router = require('express').Router();
const { Forum } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const newForum = await Forum.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newForum);
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;