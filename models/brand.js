import sequelize from "../sequelizeConfig.js";
import { Model, DataTypes } from "sequelize";

export class Brand extends Model{}

Brand.init({
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    logo:{
        type:DataTypes.STRING,
        allowNull:false
    }},
    {sequelize,
    modelName: "brand",
    underscored: true,
    freezeTableName: false,
    createdAt: true,
    updatedAt: true,
    }
)