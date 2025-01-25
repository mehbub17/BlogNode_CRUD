const JWT = require('jsonwebtoken');

const secret = "sumer@1232fi";


function createTokenForUser(user)
{
    const payload = {
        _id:user._id,
        email :user.email,
        profileImageURL:user.profileImageURL,
        role:user.roll,
    
    };

    const token = JWT.sign(payload,secret,{
        expiresIn:'7d',
    });
    return token;
}

function validateToken(token)
{
    const payload = JWT.verify(token,secret);
    return payload;
}


module.exports = {
    createTokenForUser,
    validateToken,
}