const express = require('express');
const dotenv = require('dotenv');
const { createProxyMiddleware } = require('http-proxy-middleware');
const verifyToken = require('./middleware/auth.middleware');
const roleGuard = require('./middleware/role.middleware');
const app = express();

dotenv.config();
app.use(express.json());

app.use('/api/briefs', verifyToken, roleGuard(['ADMIN']), createProxyMiddleware({
  target: 'http://brief-service:5002',
  changeOrigin: true,
  pathRewrite: { '^/api/briefs': '/' }
}));

app.use('/api/apprenants', verifyToken, roleGuard(['APPRENANT', 'ADMIN']), createProxyMiddleware({
  target: 'http://apprenant-service:5003',
  changeOrigin: true,
  pathRewrite: { '^/api/apprenants': '/' }
}));

app.listen(process.env.GATEWAY_PORT, () => {
  console.log(`API Gateway running on port ${process.env.GATEWAY_PORT}`);
});
                                                                                                                                                                                                                                                                                                                                                                                                            