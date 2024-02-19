const { Entity, Schema } = require("redis-om");

class User extends Entity {}

const userSchema = new Schema(User, {
    name: { type: 'string' },
    password: { type: 'string' },
    email: { type: 'string' },
    score: {
        type: 'number',
        sortable: true
    }
}, {
    dataStructure: 'JSON'
});

module.exports = { User, userSchema };
