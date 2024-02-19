const { Client } = require('redis-om');
const { config } = require('dotenv');
config();

const redisClient = new Client();

(async () => {
    try {
        await redisClient.open(`redis://${process.env.USER}:${process.env.PASS}@${process.env.URL}`);
        console.log('Connected to Redis server');
    } catch (error) {
        console.error('Error connecting to Redis server:', error);
    }
})();

module.exports = { redisClient };
