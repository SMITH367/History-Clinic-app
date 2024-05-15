// Veryfing the token for auth
const verifyToken = (req, res, next) => {
    const header = req.headers['Authorization']
    if (header != undefined) {
        const token = header
        req.auth = token
        next();
    } else {
        res.sendStatus(403)
    }
}

module.exports = verifyToken