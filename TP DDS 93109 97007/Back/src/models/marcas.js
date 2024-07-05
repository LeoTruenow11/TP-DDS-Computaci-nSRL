import { DataTypes } from 'sequelize'

const MarcasAttributes ={
        IdMarca: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(60),
            allowNull: false,            
        },

        Proveedor: {
            type: DataTypes.INTEGER(30),
            allowNull: false
        }
        
        
    }       


const MarcasOptions = {
    timestamps: false,
}

const MarcasModel = {
    MarcasAttributes,
    MarcasOptions
}

export default MarcasModel