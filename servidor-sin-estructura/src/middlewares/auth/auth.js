export function authMiddleware(req, res, next) {
    if (req.session.user) {
        return next()
    } else {
        return res.redirect('/api/session/login')
    }
}
