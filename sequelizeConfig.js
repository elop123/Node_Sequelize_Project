import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config();

console.log('DB Config:', {
    DBNAME: process.env.DBNAME,
    DBUSER: process.env.DBUSER,
    DBPASSWORD: process.env.DBPASSWORD,
    DBHOST: process.env.DBHOST
});


const sequelize= new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWORD,
    {
        host:process.env.DBHOST,
        port:8081,
        dialect:'mysql'
    }
)

export default sequelize