/**
* ProtectMiddleware
*/
module.exports = {

    // Default middleware action
    allow(http) {
        // run check here
        if (!http.req.user) {
            return http.res.json({
                error:'Not authorized to access this route'
            })

        }
        console.log('Protect meee')

        return http.next();
    }

};
