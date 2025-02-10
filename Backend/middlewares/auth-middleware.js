import jwt from 'jsonwebtoken';
import redisClient from '../services/redis-service.js';

export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').split(' ')[1];

        if (!token) {
            return res.status(400).send({ error: "Please authenticate" });
        }

        const isTokenInRedis = await redisClient.get(token);

        if (isTokenInRedis !== null) {
            res.cookie('token', '', { expires: new Date(0) });
            return res.status(400).send({ error: "Please authenticate" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send({ error: "Please authenticate" });
    }
};