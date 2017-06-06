module.exports = {
  database: 'mongodb://root:test123@ds119210.mlab.com:19210/ecommerce',
  port: 3000,
  secretKey: 'user1990',

  facebook: {
    clientID: process.env.FACEBOOK_ID || '426542304385201',
    clientSecret: process.env.FACEBOOK_SECRET || 'd21671b821ac1e0d2df994241f1f3410',
    profileFields: ['emails', 'displayName'],
    callbackURL: 'http://localhost:3000/auth/facebook/callback'
  }
};
