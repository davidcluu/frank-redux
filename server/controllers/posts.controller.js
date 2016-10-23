import jwt from 'jsonwebtoken';

export function verifyToken(req, res) {
  var token = req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'testSecret', function(err, decoded) {
      if (err) {
        res.status(401).send({
          error: err
        });
      } else {
        decoded.es = 'nope';
        res.status(200);
      }
    });
  } else {
    res.status(400);
  }
}
