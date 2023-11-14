const { sign } = require('jsonwebtoken'); 

const createAccessToken = userId => {
    return sign({userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15m'
    })
}

const createRefreshToken = userId => {
    return sign({userId}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    })
}

const sendAccessToken = (req, res, accessToken, isAdmin) => {
    res.send({
        accessToken,
        email: req.body.email,
        role: isAdmin
    })
}

// il refreshtoken lo inviamo come cookie in quanto non vogliamo inviarlo
// al client 
const sendRefreshToken = (res, refreshtoken) => {
    res.cookie('refreshtoken', refreshtoken, {
        httpOnly: true, // così non possiamo accedere al client e modificare con js
        path: '/refresh_token', // per inviare il cookie solo quando andiamo sul path refreshtoken
        domain: 'http://127.0.0.1:3000',

    })
    console.log("Refresh token cookie inviato con successo!");

}
module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}