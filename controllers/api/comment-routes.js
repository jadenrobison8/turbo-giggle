const router = require('express').Router();
const { Comment, Post } = require('../../models');
const withAuth = require('../../utils/auth');

//GET /api/comments
router.get('/', (req,res) => {
   console.log('============');
   Comment.findAll({
      //query config
      attributes: [
         'id',
         'comment_text',
         'post_id',
         'user_id',
         'created_at'
      ],
   })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

//POST /api/comments
router.post('/', (req,res) => {
   //check the session
   if (req.session) {
      Comment.create({
         comment_text: req.body.comment_text,
         user_id: req.body.user_id,
         post_id: req.body.post_id
      })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
         console.log(err);
         res.status(400).json(err);
      });
   }
});

//DELETE /api/comments
router.delete('/', (req,res) => {
   Comment.destroy({
      where: {
         id: req.params.id
      }
   })
      .then( dbCommentData => {
         if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id'});
            return;
         }
         res.json(dbCommentData);
      })
      .catch(err => {
         console.log(err);
         res.status(500).json(err);
      });
});

module.exports = router;