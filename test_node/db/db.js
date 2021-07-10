const mysql = require('mysql');
const path = require('path')// 파일 경로 모듈
require('dotenv').config({ path: path.join(__dirname, './env/server.env') });//env 로드 모듈

const connection = { //database 접속 정보 입력
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    connectionLimit : 30
};
  
module.exports = mysql.createPool(connection);