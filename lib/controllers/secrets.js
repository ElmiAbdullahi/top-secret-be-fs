const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secrets');

module.exports = Router().get('/', [authenticate], async (req, res, next) => {
  try {
    // get the list of secrets from the database
    const secrets = await Secret.getAll();
    // return the list of secrets
    res.json(secrets);
  } catch (e) {
    next(e);
  }
});
