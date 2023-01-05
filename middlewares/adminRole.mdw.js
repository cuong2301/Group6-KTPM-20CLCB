export default function (req, res, next) {
    if (req.session.auth) {

        if(req.session.authUser.permission == 0)
            next();
        else   {
            res.render('permission',{layout:false});
        }
    } else {
        res.redirect("/account/login");
    }
}