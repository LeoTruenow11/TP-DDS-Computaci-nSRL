import { DataTypes } from 'sequelize'

const ProcesadoresAttributes ={
        IdProcesador: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
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
        FechaRecibido: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Disponible: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }

const ProcesadoresOptions = {
    timestamps: false,
}

const ProcesadorModel = {
    ProcesadoresAttributes,
    ProcesadoresOptions
}

export default ProcesadorModel