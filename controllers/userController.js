const { User, Thought } = require('../../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const userData = await User.find()
            res.json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleUser(req, res) {
        try {
            const userData = await User.findOne({ _id: req.params.id })
                .select('-__v')
                .populate('friends', 'thoughts')

            if (!userData) {
                return res.status(404).json({ message: `No user with that ID found!` })
            }

            res.json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body)
            res.json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true, runValidators: true }
            )

            if (!userData) {
                return res.status(404).json({ message: `No user with that ID found!` })
            }
            res.json(userData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const userData = await User.findOneAndDelete({ _id: req.params.id })

            if (!userData) {
                return res.status(404).json({ message: `No user with that ID found!` })
            }

            await Thought.deleteMany({ _id: { $in: userData.thoughts } })
            res.json({ message: `User and associated thoughts deleted!` })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}