const Koa = require("koa");
const serve = require("koa-static");
const json = require("koa-json");
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const router = require('./routes');
const PORT = process.env.PORT || 3000;

const app = new Koa();
app.use(serve(__dirname + "/dist"));
// делаем json опрятнее
app.use(json());
// чтобы не ругался на cors policy. передаем необходимые заголовки
app.use(cors());
// парсить приходящие данные
app.use(bodyParser());
// регистрируем роуты
app.use(router.routes()).use(router.allowedMethods());
// устанавливаем порт
app.listen(PORT, () => console.log("Server Started..."));

