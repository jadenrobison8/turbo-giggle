const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


//GET api/posts
router.get('/', (req,res) => {
   Post.findAll({
      order: [['created_at', 'DESC']],
      attributes: [
         'id',
         'title',
         'created_at'
      ],
      include: [
         {
            model: User,
            attributes: ['username']
         }
      ]
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

//GET /api/posts/id
router.get('/:id', (req,res) => {
   Post.findOne({
      where: {
         id: req.params.id
      },
      attributes: [
         'id',
         'title',
         'post_content',
         'created_at'
      ],
      include: [
         {
            model: User,
            atttributes: ['username']
         }
      ]
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

//POST /api/posts/
router.post('/', (req,res) => {
   Post.create({
      title: req.body.title,
      post_content: req.body.post_content,
      user_id: req.session.user_id
   })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

//PUT /api/posts/id
router.put('/:id', (req,res) => {
   Post.update(
      {
         title: req.body.title,
         post_content: req.body.post_content
      },
      {
         where: {
            id: req.params.id
         }
      }
   )
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id '});
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

//DELETE /api/posts/id
router.delete('/:id', (req,res) => {
   Post.destroy({
      where: {
         id: req.params.id
      }
   })
      .then(dbPostData => {
         if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
         }
         res.json(dbPostData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});


module.exports = router;