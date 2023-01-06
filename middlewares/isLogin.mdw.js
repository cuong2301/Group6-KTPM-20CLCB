export default function (req, res, next) {
    if (req.session.auth === true) {
        return res.redirect('/');
    }
    next();
}