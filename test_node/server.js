const express = require('express'); 
const path = require('path')// 파일 경로 모듈
require('dotenv').config({ path: path.join(__dirname, './env/server.env') });//env 로드 모듈
const mysql = require('./db/db'); // 싱글톤 패턴

const app = express(); 

const port = process.env.PORT || 5000; 

mysql.getConnection(function(err, connection) {
    if(!err) {
      connection.query("SELECT user_email, user_name FROM user");
      console.log("DB Connection Pool Success");
    }
    connection.release();
});

app.get("/connection_pool/test",(req, res)=>{
    const sql = "SELECT user_email, user_name FROM user";
    try {
        mysql.getConnection((err, connection)=>{
            console.log("connection_pool GET");
            if(err) throw err;
            connection.query(sql, (err, result, fields)=>{
                if(err) {
                    console.error("connection_pool GET Error / "+err);
                    res.status(500).send("message : Internal Server Error");
                }
                else {
                    if(result.length === 0){
                        res.status(400).send({
                            success : false,
                            message : "DB response Not Found"
                        });
                    }
                    else{
                        res.status(200).send({
                            success : true,
                            result
                        });
                    }
                }
            });
            connection.release();
        });
    } catch (err) {
        console.error("connection_pool GET Error / "+err);
        res.status(500).send("message : Internal Server Error");
    }        
});


app.listen(port, () => console.log(`Server Start Listening on port ${port}`));
