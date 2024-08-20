const jwksRsa = require('jwks-rsa');
const express = require('express')
const { expressjwt: jwt } = require('express-jwt');

// Middleware to validate the JWT and extract the user info
const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the signing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-1kxktm1vmfs66y7l.us.auth0.com/.well-known/jwks.json', // Replace with your Auth0 domain 
  }),

  // Validate the audience and the issuer
  audience: 'nextgencoding', // Replace with your API identifier
  issuer: `https://dev-1kxktm1vmfs66y7l.us.auth0.com/`, // Replace with your Auth0 domain
  algorithms: ['RS256'], 
});


module.exports = {checkJwt}