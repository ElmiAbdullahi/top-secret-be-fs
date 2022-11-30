const { Router } = require('express');
const UserService = require('../services/UserService.js');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    console.log('yoo');
    const user = await UserService.create(req.body);
    console.log(user);
    res.json(user);
  } catch (e) {
    next(e);
  }
});
