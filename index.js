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
const categoryRoute = require('./src/routers/category.route');
const productRoute = require('./src/routers/product.route');
const handleError = require('./src/middlewares/handleError');

app.use(cors());
app.use(bodyPaser.urlencoded({ extended: true }));
app.use(bodyPaser.json());
app.use('/api/usuario', userRoute);
app.use('/api/categoria', categoryRoute);
app.use('/api/produto', productRoute);
app.use(handle404Error);
app.use(handleError);

const server = app.listen(process.env.PORT || 5000, () => {
  console.log("rodando");
});

//Caso esteja rodando em canal HTTPS deve-se usar o protocolo wss:// para funcionar
//appWs(server);