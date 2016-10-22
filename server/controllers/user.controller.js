import _ from 'lodash';
import jwt from 'jsonwebtoken';

// TODO: Replace with database, add hashing + salting
const users = [{
  _id: 1,
  username: 'test',
  password: 'test'
}];

function getUserScheme(req) {
  var username = req.body.username;
  var userSearch = { username: username };

  return {
    username: username,
    userSearch: userSearch
  };
}

function createToken(user) {
  jwt.sign(_.omit(user, 'password'), 'testSecret', { expiresIn: 60*60*5 });
}

export function login(req, res) {
  var userScheme = getUserScheme(req);

  if (!userScheme.username || !req.body.password) {
    return res.status(400).send("The username and Password fields must be nonempty");
  }

  var user = _.find(users, userScheme.userSearch);

  if (!user || user.password !== req.body.password) {
    return res.status(401).send("The username or password don't match");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
}