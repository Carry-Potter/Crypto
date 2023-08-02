const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  // Proxy requests to the target backend server
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://api-pub.bitfinex.com',
      changeOrigin: true,
      secure: true,
    })
  );
};