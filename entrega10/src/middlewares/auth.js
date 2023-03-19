
    export const authPolicies = (policies) => (req, res, next) => {
        const userRole = req.user.rol
        console.log(userRole);
        if(policies === 'public') return next()
        if(policies.includes(userRole) === false) return res.status(403).send({
                error: 'Not Auth'
            })
        return next()
        }
    //     if(policies === 'public') return next()
    //     console.log(policies.includes(userRole));
    //     if(policies.includes(userRole) === false ){
    //         return res.redirect('/login')
    //         // res.status(403).send({error: 'Not auth'})
    //         // return next()
    //     }
    // }
 



    



    