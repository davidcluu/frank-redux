const config = {
  mongoURL: process.env.MONGODB_URI || 'mongodb://localhost:27017/frank-redux',
  port: process.env.PORT || 3000
};

export default config;
