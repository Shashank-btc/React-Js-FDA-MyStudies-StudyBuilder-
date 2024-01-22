// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',  // Specify the API route or base URL to proxy
    createProxyMiddleware({
      target: 'http://localhost:3001',  // Specify the address of your backend server
      changeOrigin: true,
    })
  );
};
