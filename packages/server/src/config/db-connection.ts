import mysql from "mysql2";


// export const dbConnection = mysql.createPool({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE_NAME,
//     port: process.env.DATABASE_PORT
// })

 const dbConnection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "test",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  export default dbConnection;