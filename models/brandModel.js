import sequelize from "../sequelizeConfig";
import { Model, DataTypes } from "sequelize";

export class brandModel extends Model{}

brandModel.init({
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
    modelName: 'brand',
    underscored: true,
    freezeTableName: false,
    timestamps: true
    }
)