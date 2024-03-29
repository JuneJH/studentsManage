const express = require("express");
const path = require("path");
const app = express();
const student = require("./student");
const admin = require("./admin");
const book = require("./book")
// const session = require("express-session");
const cookieParser = require("cookie-parser");
const port = 9537
// 加入session
// app.use(session({
//     secret:"June",
//     name:"sessionid"
// }))
//检查是否为跨域访问
// app.use(require("../api/middleware/corsMiddleware"))
// 使用cookie解析中间件
app.use(cookieParser())
//验证权限
app.use(require("../api/middleware/tokenMiddleware"))
//中间件 使用静态资源
app.use(express.static(path.resolve(__dirname, "../public")))
//中间件 对body参数进行处理
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// app.get("/test/:id", function (req, res) {
//     console.log("请求头", req.headers);
//     console.log("请求路径", req.path);
//     console.log("query", req.query);
//     console.log("params", req.params);
//     console.log("body", req.body);
//     res.setHeader("my-header", "this is my");
//     res.send("ok")
// })

// app.get("/middleware", function (req, res, next) {
//     console.log("中间件1");
//     next();
// });
// app.use("/middleware", function (req, res, next) {
//     console.log("中间件3");
//     throw new Error("中间3抛出一个错误");
// })


//接口

app.use("/student",student);
app.use(admin);
app.use("/book",book)
// 自定义错误中间件
app.use((err, req, res, next) => {
    if (err) {
        const errObj = {
            code: 500,
            msg: err instanceof Error ? err.message : err       };
         //发生了错误
        res.status(500).send(errObj);
    } else {
        next();
    }
})


app.listen(port, () => {
    console.log("server start at "+port)
})

