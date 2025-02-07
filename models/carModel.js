import sequelize from '../sequelizeConfig.js'
import { Model, DataTypes } from 'sequelize'


export class carModel extends Model{}

carModel.init({
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    model:{
        type:DataTypes.STRING,
        allowNull:false
    },
    year:{
        type:DataTypes.DATE,
        allowNull:false
    },
    color:{
        type:DataTypes.STRING,
        allowNull:false
    },
    price:{
        type:DataTypes.DOUBLE,
        allowNull:false,
        defaultValue:0.00
    },
    fueltype:{
        type:DataTypes.STRING,
        allowNull:false
    }
}, {
    sequelize,
    modelName:"car",
    underscored:true,
    freezeTableName:false,
    createdAt:true,
    updatedAt:true
})


