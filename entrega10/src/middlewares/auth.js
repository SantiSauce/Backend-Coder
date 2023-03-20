
export const reqAdmin = (req, res, next) => {
    if (req.user && (req.user.rol === 'admin')) {
        next();
      } else {
        res.status(403).send({error: 'Access denied'});
      }
    }


export const reqAuth = (req, res, next) => {
    if(req.user) {
        next()
    } else{
        res.redirect('/login')
    }
}
    



    