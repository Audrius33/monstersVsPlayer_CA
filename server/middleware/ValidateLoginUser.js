module.exports = {
    validateLogin: async (req, res, next) => {
        const {
            user,
            password,
        } = req.body

        function errorSend(error, message) {
            res.send({error: error, message: message})
        }

        if (user.length < 4 || user.length > 20) {
            return errorSend(true, 'Username length is not valid')
        }
        if (password.length < 4 || password.length > 20) {
            return errorSend(true, 'password length is not valid')
        }
        next()
    }
}