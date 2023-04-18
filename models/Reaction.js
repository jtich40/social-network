const { Schema, Types } = require('mongoose');
const { format } = require('date-fns');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => {
            const formattedDate = format(createdAtVal, 'MM/dd/yyyy hh:mm a');
            return formattedDate;
        },
    }
},
{
    toJSON: {
        getters: true
    }
});

module.exports = reactionSchema;