const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        console.log("no authorization header");
        return res.status(401).json({ error: "Authorization token not present" });
    }

    const token = authorization.split(' ')[1];

    try {
        const { id } = jwt.verify(token, process.env.SECRET);
        req.currUserId = id; // setting currUserId in order to fetch the user from Redis using entityId
        console.log("curr user is - ", req.currUserId);
        next();
    } catch (err) {
        res.status(401).json({ error: "Token not verified" });
    }
};

module.exports = { checkAuth };
