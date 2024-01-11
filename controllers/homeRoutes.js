const router = require('express').Router();
const { User, Forum} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const forumData = await Forum.findAll({
      include: [
        {
            model: User,
            attributes: ['name']
        }
      ]
    });

    const forums = forumData.map((forum) => forum.get({ plain: true }));

    res.render('blog_content', {
      forums,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog_post/:id', withAuth, async (req, res) => {
  try {
    const forumData = await Forum.findByPk(req.params.id,{
      include: [
        {
            model: User,
            attributes: ['name']
        }
      ]
    });

    const forums = forumData.get({ plain: true });
    // const commentData = await Comment.findByPk(req.params.id, { 
    //   include: [{model: Comment}],
    //   attributes: {exclude:['password']},
    // });

    // const comments = commentData.get({ plain: true });

    res.render('blog_post', {
      ...forums,
      // ...comments,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog_post/:id', withAuth, async (req, res) => {
  console.log('getRoute');
  try {
    const forumData = await Forum.findByPk(req.params.id,{
      include: [
        {
            model: User,
            attributes: ['name']
        }
      ]
    });


    const forums = forumData.get({ plain: true });
    console.log(forums.id);

    res.render('blog_post', {
      forums: forums.id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/blog_new_post', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id,{
      attributes: { exclude: ['password'] },
      include: [ { model: Forum }]
    });

    const user = userData.get({ plain: true });

    res.render('blog_new_post', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/register', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('register');
});

module.exports = router;
