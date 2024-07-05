import { DataTypes } from 'sequelize'

const PantallasAttributes ={
        IdPantalla: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Descripcion: {
            type: DataTypes.STRING(60),
            allowNull: false,            
        },
        Precio: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        Stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
        FechaFabricacion: {
            type: DataTypes.STRING,
            allowNull: false
        },
        EnVenta: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        IdMarca: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        }
    }

const PantallasOptions = {
    timestamps: false,
}

const PantallasModel = {
    PantallasAttributes,
    PantallasOptions
}

export default PantallasModel