const router = require('express').Router();
const {
    getAllThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// GET all and POST at /api/thoughts
router.route('/').get(getAllThoughts).post(createThought);
// GET one, PUT, and DELETE at /api/thoughts/:thoughtId
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// POST at /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions/').post(addReaction)
// DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)

module.exports = router