const { Thought, Reaction, User } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find()
            res.json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thoughtData = await Thought.findOne({ _id: req.params.thoughtId})
                .select('-__v')
                .populate('reactions')

                if (!thoughtData) {
                    return res.status(404).json({ message: `No thought with that ID found!` })
                }
                res.json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thoughtData = await Thought.create(req.body)
            const userData = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$addToSet: {thoughts: thoughtData._id}},
                {new: true}

            )

            if (!userData) {
                return res.status(404).json({ message: 'Thought created but no user found!' })
            }
            res.json('Created the thought and added it to the user!')
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true, runValidators: true }
            )

            if (!thoughtData) {
                return res.status(404).json({ message: `No thought with that ID found!` })
            }
            res.json(thoughtData)
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            const userData = await User.findOneAndUpdate(
                {_id: req.body.userId},
                {$pull: {thoughts: thoughtData._id}},
                {new: true}
            )

            if (!thoughtData) {
                return res.status(404).json({ message: `No thought with that ID found!` })
            }
            res.json({ message: `Thought and associated reactions deleted!` })
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async addReaction(req, res) {
        try {
            const reactionData = await Reaction.create(req.body)
            const thoughtData = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                {$addToSet: {reactions: reactionData._id}},
                {new: true}
            )

            if (!thoughtData) {
                return res.status(404).json({ message: 'Reaction created but no thought found!' })
            }
            res.json('Created the reaction and added it to the thought!')
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async deleteReaction(req, res) {
        try {
            const reactionData = await Reaction.findOneAndDelete({ _id: req.params.reactionId })
            const thoughtData = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: {reactions: reactionData._id }},
                { new: true }
            )

            if (!thoughtData) {
                return res.status(404).json({ message: `No thought with that ID found!` })
            }
            res.json({ message: `Reaction deleted!` })
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
