const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router.route('/')
  .get(getAllThoughts)
  router.route('/:userId')
  .post(createThought);

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  router.route('/:thoughtId/:userId')
  .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);

module.exports = router;
