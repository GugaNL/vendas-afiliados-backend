require('dotenv').config();
const express = require("express");
const bodyPaser = require("body-parser");
const app = express();
//const appWs = require('./src/websocket/ws');
const cors = require('cors');

//Middlewares
const handle404Error = require('./src/middlewares/handle404Error');

//Routes
const userRoute = require('./src/routers/user.route');
const productRoute = require('./src/routers/product.route');
const imageRoute = require('./src/routers/image.route');
const handleError = require('./src/middlewares/handleError');

app.use(cors());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use('/api/usuario', userRoute);
app.use('/api/produto', productRoute);
app.use('/api/imagem', imageRoute);
app.use(handle404Error);
app.use(handleError);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("rodando");
});

//Caso esteja rodando em canal HTTPS deve-se usar o protocolo wss:// para funcionar
//appWs(server);