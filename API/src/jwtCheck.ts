const { expressjwt: expressjwt } = require('express-jwt');
const jwks = require('jwks-rsa');

export const jwtCheck = expressjwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://dev-gdm-hbgx.us.auth0.com/.well-known/jwks.json'
}),
audience: 'https://pf-henry-05.onrender.com',
issuer: 'https://dev-gdm-hbgx.us.auth0.com/',
algorithms: ['RS256']
});

module.exports = {
  jwtCheck
}