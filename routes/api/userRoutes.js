const router = require('express').Router();
const { 
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/userController');

// GET all and POST at /api/users
router.route('/').get(getAllUsers).post(createUser);
// GET one, PUT, and DELETE at /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router