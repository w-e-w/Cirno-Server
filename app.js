const Koa = require("koa");
const cors = require("koa2-cors");
const app = new Koa();
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const path = require("path");
const static = require("koa-static");
const fs = require("fs");
const open = require("open");

console.log("https://github.com/zsakvo/Cirno\nhttps://github.com/zsakvo/Cirno-Server");
console.log("Cirno 是一个第三方的刺猬猫（欢乐书客）小说阅读器。\n作者本人并不提倡盗版书籍，也并不希望本项目被用于侵权。\n创建本项目一方面是因为在特定情况下并不方便使用 App 进行阅读，但是其网页又有严重的功能缺失；另一方面，其 App 的体验也不是很好。\n其中的接口均来自于官方 App，理论上并不会导致您的个人信息泄露（但是会把 token 保存在 .token 文件中，这么做是因为调试比较方便），如若介意，请自行修改代码或者在您的计算机上移除本项目，谢谢合作。\n此視窗為程序本體，使用網頁閱讀時，請誤關閉此視窗");

//允许跨域
app.use(cors());
app.use(bodyParser());

const staticPath = "/static";
app.use(static(path.join(__dirname, staticPath)));

//读取 tokens
allTokens = {};
let tokenExist = fs.existsSync(path.join(process.cwd(), "./.token"));
if (tokenExist) {
  let token = fs.readFileSync(path.join(process.cwd(), "./.token"), "utf8");
  allTokens = JSON.parse(token);
} else {
  allTokens = {};
}

//刺猬猫路由
const hbooker = require("./routers/hbooker");

//装载子路由
let router = new Router();
router.use("/hbooker", hbooker.routes(), hbooker.allowedMethods());

//加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

//开始监听
app.listen(9096, () => {
  console.log("程序启动成功，请在浏览器中访问 http://localhost:9096");
});

(async () => {
  await open("http://localhost:9096");
})();

module.exports = app;
