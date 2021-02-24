const {Sequelize} = require("sequelize");
const {sqlLog}= require("../logger");

const sequelize = new Sequelize("数据库名称","用户","密码",{
    host:"url",
    dialect:"mysql",
    logging:(logs,a)=>{
        sqlLog.debug(logs)
    }
})

module.exports = sequelize;
