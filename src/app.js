const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const YAML = require('yaml');
const fishRoutes = require('./routes/fish.routes');

const app = express();
const swaggerDocument = YAML.parse(fs.readFileSync(path.join(__dirname, '../resources/swagger.yaml'), 'utf8'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/fish', (req, res, next) => {
  if (req.method === 'POST' && !req.is('application/json')) {
    return res.status(415).json({ success: false, error: { code: 'UNSUPPORTED_MEDIA_TYPE', message: 'Use Content-Type application/json.' } });
  }
  return next();
});
app.use('/api/fish', fishRoutes);
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({ success: false, error: { code: 'INVALID_JSON', message: 'JSON inválido.' } });
  }
  return next(err);
});
app.use((req, res) => res.status(404).json({ success: false, error: { code: 'ROUTE_NOT_FOUND', message: 'Rota não encontrada.' } }));

module.exports = app;
