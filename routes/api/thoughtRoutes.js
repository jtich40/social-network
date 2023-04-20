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
// POST and DELETE at /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/reactionId').post(addReaction).delete(deleteReaction);

module.exports = router