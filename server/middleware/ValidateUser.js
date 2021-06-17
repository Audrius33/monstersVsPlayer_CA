const symbols = "!@#$%^&*()_>?,.';ąčėįšųūž][\/*"
const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

module.exports = {
    ValidateUser: async (req, res, next) => {
        const {
            username,
            password1,
            password2,
        } = req.body

        function errorSend(error, message) {
            res.send({error: error, message: message})
        }

        if (username.length < 4 || username.length > 20) {
            return errorSend(true, 'Username length is not valid')
        }
        for (let i = 0; i < symbols.length; i++) {
            if (username.includes(symbols[i])) {
                return errorSend(true, "Cant use symbols")
            }
        }
        if (!password1) {
            return errorSend(true, 'password is not valid')
        }
        if (!password2) {
            return errorSend(true, 'password 2 is not valid')
        }
        if (password1.length < 4 || password1.length > 20 ) {
            return errorSend(true, 'Password must min 4 symbols length and max 20 length')
        }
        if (password2.length < 4 || password2.length > 20) {
            return errorSend(true, 'Second password must min 4 symbols length and max 20 length')
        }
        if (!validPassword.test(password1)) {
            return errorSend(true, 'password must contain at least 1 number')
        }
        if (!validPassword.test(password2)) {
            return errorSend(true, 'second password must contain at least 1 number')
        }
        if (password1 !== password2) {
            return errorSend(true, 'passwords dont match')
        }
        next()
    }
}