const express = require('express');
const { redisClient } = require('../redisClient');
const { userSchema } = require('../schema/userSchema');
const jwt = require('jsonwebtoken');

const userRepository = redisClient.fetchRepository(userSchema);
(async () => {
    await userRepository.createIndex();
})();

const createToken = (id) => {
    const token = jwt.sign({ id: id }, 'hellothisisankit', { expiresIn: '3000d' });
    return token;
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        // const userID = uuidv4();

        let user = userRepository.createEntity({
            // id: userID,
            name: name,
            password: password,
            email: email,

            score: 0,
        });

        const id = await userRepository.save(user);
        console.log(id);
        // console.log(userO.entityId)

        const token = createToken(id);

        res.status(200).json({
            name: name,
            email: email,
            token: token,
        });
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
};

const signInUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const userSearch = await userRepository.search().where('email').eq(email)
            .where('password').eq(password)
            .return.first();

        if (!userSearch) {
            return res.status(401).json({
                msg: 'invalid email or password',
            });
        }

        const token = createToken(userSearch?.entityId);

        res.status(200).json({
            email: userSearch.email,
            token: token,
        });
    } catch (err) {
        res.status(401).json({ err: err.message });
    }
};

const updateScores = async (req, res) => {
    const user = await userRepository.fetch(req.currUserId);
    // const user = await userRepository.search().where('id').eq(id).return.all()

    console.log('user is as follows', user);

    user.score = user.score + 1;
    await userRepository.save(user);

    res.send(user);
};

//exists just for tests
const getAllUsers = async (req, res) => {
    res.send(await userRepository.search().returnAll());
};

const getHighScores = async (req, res) => {
    // const limit = 3
    const users = await userRepository.search()
        .sortDescending('score')
        .return.page(0, 10);  //page(offset, count) i.e start from 0 and go till 2 i.e returns 2 user highscores

    res.send(users);
};

module.exports = { createUser, updateScores, signInUser, getHighScores, userRepository };
