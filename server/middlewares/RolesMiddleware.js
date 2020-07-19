/**
 * IsEditorMiddleware
 */
module.exports = {

    // Default middleware action
    editor({ res, req, next }) {
        // run check here
        const roles = ["admin", "publisher"];
        if (!roles.includes(req.user.role)) {
            return res.json({
                error: `User role ${req.user.role} is not authorized to access this route`

            });
        }

        return next();

    },
    owner({ res, req, next }) {
        // run check here
        const roles = ["admin","user"];
        if (!roles.includes(req.user.role)) {
            return res.json({
                error: `User role ${req.user.role} is not authorized to access this route ??`

            });

        }

        return next();
    },


};
