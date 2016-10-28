import _ from 'lodash';
import jwt from 'jsonwebtoken';

const users = [{
  _id: 1,
  username: 'test',
  password: 'test'
}];

function getUserScheme(req) {
  var username = req.body.username;
  var userSearch = {username: username};

  return {
    username: username,
    userSearch: userSearch
  };
}

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), process.env.JWTSECRET, {
    expiresIn: 60 * 60 * 5
  });
}

export function login(req, res) {
  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    res.status(400).send({
      error: 'The Username and Password fields must be nonempty'
    });

    return;
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user || user.password !== req.body.password) {
    res.status(401).send({
      error: 'The Username or Password do not match'
    });

    return;
  }

  res.status(201).send({
    id_token: createToken(user)
  });
}
