const config = {
  port: process.env.PORT || 3000,
  pg: {
    max: 10,
    idleTimeoutMillis: 30000
  }
};

export default config;
