const { expressjwt: jwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa')

const authConfig = {
    domain: 'dev-1kxktm1vmfs66y7l.us.auth0.com',
    audience: 'https://dev-1kxktm1vmfs66y7l.us.auth0.com/api/v2/'
};

const checkJwt = jwt({
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
    }),
    audience: authConfig.audience,
    issuer: `https://${authConfig.domain}/`,
    algorithms: ['RS256'],
  });

module.exports = checkJwt;
  