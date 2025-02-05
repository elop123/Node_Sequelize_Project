import { Sequelize } from 'sequelize'
import dotenv from 'dotenv'
dotenv.config();

// if(!process.env.DBNAME || !process.env.DBUSER || !process.env.DBPASSWORD || !process.env.DHBHOST)
//    console.log('Error: Can not connect to database because of missing credentials');
//    process.exit(true);
   
const sequelize= new Sequelize(
    process.env.DBNAME,
    process.env.DBUSER,
    process.env.DBPASSWORD,
    {
        host: process.env.DBHOST,
        port: 3306,
        // port:process.env.DBPORT || 3306,
        dialect:'mysql'
    }
)

sequelize.authenticate()
  .then(() => console.log('Connection to database is established'))
  .catch(error => console.error(`Could not connect to database: ${error}`));


export default sequelize