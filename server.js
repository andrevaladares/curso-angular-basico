// importar o express
const express = require("express");

//iniciar o express
const app = express();

// nome da pasta de build dentro de dist. OLhar em angular.json
const appName = "curso-angular-basico";

// local onde será feito o build
const outputPath = `${__dirname}/dist/${appName}`;

// setar o diretório para ser servido o conteúdo estático via express
app.use(express.static(outputPath));

// qualquer requisição será direcionada para index.html
app.get("/*", (req, res) => {
  res.sendFile(`${outputPath}/index.html`)
});

// definir a porta que o express terá. O Heroku que fornece
app.listen(process.env.PORT);
