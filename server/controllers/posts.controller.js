import jwt from 'jsonwebtoken';

const posts = [{
  _id: 1,
  user: {
    username: 'username'
  },
  comments: [
  ],
  tags: [
    'clothing',
    'hair',
    'woman'
  ],
  image: 'https://s-media-cache-ak0.pinimg.com/originals/57/ec/d6/57ecd6482ca632318baf5ea8d5168b09.jpg',
  description:
    `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Praesent faucibus mi volutpat sem varius, ac condimentum ipsum fermentum.
    Phasellus condimentum tortor et dolor imperdiet, in facilisis urna mollis.
    Quisque fringilla dapibus augue, sed volutpat felis consequat eget.
    Nullam quis tortor tempus, mollis velit sed, facilisis nibh.
    Praesent non massa vel tortor mollis venenatis.
    Phasellus neque metus, imperdiet eu ante vel, rhoncus convallis nulla.
    Praesent lectus nulla, laoreet quis gravida ac, maximus eget odio.
    Nullam ipsum metus, venenatis sit amet lorem non, volutpat iaculis lacus.
    `,
  score: 100
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
    res.status(400).send({
      error: 'No token'
    });
  }
}

export function allPosts(req, res) {
  res.status(200).send(posts);
}
