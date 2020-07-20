const Router = require("koa-router");
let hbooker = new Router();

const login = require("./apis/login");
const bookshelves = require("./apis/bookshelves");

hbooker
  .get("/bookshelves", async (ctx) => {
    let res = await bookshelves();
    ctx.body = res;
  })
  .post("/login", async (ctx) => {
    let postData = ctx.request.body;
    let name = postData.name;
    let passwd = postData.passwd;
    let res = await login(name, passwd);
    ctx.body = res;
  })
  .post("/demoPost", async (ctx) => {
    console.log(ctx);
    let postData = ctx.request.body;
    ctx.body = postData;
  })
  .get("/demoGet", async (ctx) => {
    let url = ctx.url;
    // 从上下文的 request 对象中获取
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    // 从上下文中直接获取
    let ctx_query = ctx.query;
    let ctx_querystring = ctx.querystring;
    ctx.body = {
      url,
      req_query,
      req_querystring,
      ctx_query,
      ctx_querystring,
    };
  });

module.exports = hbooker;
