import jwt from 'jsonwebtoken';

const posts = [{
  _id: 1,
  title: 'testpost',
  content: 'testcontent'
}];

export function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'testSecret', function(err, user) {
      if (err) {
        res.status(401).send({
          error: err
        });
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    res.status(400);
  }
}

export function allPosts(req, res) {
  res.status(200).send(posts);
}
