const express = require("express");
const {decrypt} = require("../utils/crypt");
const {getErr} = require("../utils/getResponse");
const router = express.Router();
const {getStudent, addStudent, deleteStudent, updateStudent} = require("../services/studentsService")

router.use(express.urlencoded({extended: true}));
router.use(express.json());

router.route("/:id")
    .delete(async function (req, res) {
        const id = req.params.id;
        const result = await deleteStudent(id);
        if (result != 0) {
            res.json({"status": "ok", "msg": `删除${result}条记录`})
        } else {
            res.json({"status": "error", "msg": `不存在该同学信息`});
        }
    })
    .patch(async function (req, res) {
        const id = req.params.id;
        const obj = req.body;
        const result = await updateStudent(id, obj);
        if (result != 0) {
            res.json({"status": "ok", "msg": `修改成功`})
        } else {
            res.json({"status": "error", "msg": `不存在该同学信息`});
        }
    })
router.route("/")
    .get(async function (req, res,next) {
            let obj = {
                page:1,
                pagesize:100,
            }
            obj = Object.assign({},obj,req.query);
            const query = Object.assign({},obj,req.query);
            const result = await getStudent(query.page, query.pagesize);
            res.json(result);
    })
    .post(async function (req, res) {
        const body = req.body;
        const result = await addStudent(body);
        res.json({"status": "ok", "msg": "创建成功", "data": result})
    });

router.route("/").post()
module.exports = router;
