import mysql from "mysql2";

const pool = mysql.createPool({
    host:process.env.host!,
    port:Number(process.env.port!),
    user:process.env.user!,
    password:process.env.password!,
    database:process.env.database!

}).promise();

export default pool;