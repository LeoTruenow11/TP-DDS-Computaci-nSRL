import { DataTypes } from 'sequelize'

const NotebooksAttributes ={
        IdNotebook: {
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
        FechaAlta: {
            type: DataTypes.STRING,
            allowNull: false
        },
        Activo: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        IdProcesador: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }

const NotebooksOptions = {
    timestamps: false,
}

const NotebookModel = {
    NotebooksAttributes,
    NotebooksOptions
}

export default NotebookModel