const auth =  (req, res, next) => {
    if(req.session?.user) return next()

    return res.redirect('sessions/login')
    //res.status(401).render('errors/error', {error: 'No autenticado'})
    
    };

    export default auth