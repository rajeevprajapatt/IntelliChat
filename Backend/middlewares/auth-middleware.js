import jwt from 'jsonwebtoken';


export const authUser = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header('Authorization').split(' ')[1];

        if (!token) {
            return res.status(400).send({ error: "Please authenticate" });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (err) {
        res.status(400).send({ error: "Please authenticate" });
    }

}
