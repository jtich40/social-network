const { connect, connection } = require('mongoose');

const connectionString = process.env.MONGODB_URI || 'fill in atlas connection string here';
connect(connectionString)

module.exports = connection;