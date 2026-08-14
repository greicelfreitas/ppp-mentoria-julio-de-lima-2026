const playgroundHtml = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>API GraphQL de Espécies de Peixes</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 960px; margin: 40px auto; padding: 0 20px; color: #172033; }
    textarea { box-sizing: border-box; width: 100%; min-height: 220px; padding: 16px; font: 15px/1.5 monospace; }
    button { margin: 12px 0; padding: 10px 18px; cursor: pointer; }
    pre { min-height: 120px; padding: 16px; overflow: auto; color: #e8eef8; background: #172033; }
  </style>
</head>
<body>
  <h1>API GraphQL de Espécies de Peixes</h1>
  <p>Edite a operação abaixo e clique em Executar.</p>
  <textarea id="query" aria-label="Operação GraphQL">query {
  fishes {
    id
    commonName
    scientificName
    regions
  }
}</textarea>
  <button id="execute" type="button">Executar</button>
  <pre id="result">O resultado será exibido aqui.</pre>
  <script>
    document.getElementById('execute').addEventListener('click', async () => {
      const result = document.getElementById('result');
      result.textContent = 'Executando...';
      try {
        const response = await fetch('/graphql', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ query: document.getElementById('query').value })
        });
        result.textContent = JSON.stringify(await response.json(), null, 2);
      } catch (error) {
        result.textContent = 'Não foi possível executar a operação: ' + error.message;
      }
    });
  </script>
</body>
</html>`;

function showPlayground(req, res, next) {
  if (req.accepts('html') && !req.query.query) {
    return res.type('html').send(playgroundHtml);
  }
  return next();
}

module.exports = { showPlayground };
