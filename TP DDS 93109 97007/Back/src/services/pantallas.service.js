import sequelize from "../models/database.js";
import { Op } from 'sequelize'

const getPantallas = async (filter) => {
    try {
        const whereQuery = {};

        if (filter.desc) {
            whereQuery.Descripcion = { [Op.like]: `%${filter.desc}%` };
        }

        const resultado = await sequelize.models.Pantallas.findAll({
            where: whereQuery,
            attributes: [
                'IdPantalla',
                'Descripcion',
                'Precio',
                'Stock',
                'FechaFabricacion',
                'EnVenta',
                'IdMarca'
            ],
            include: [{
                model: sequelize.models.Marcas,
                attributes: ['Nombre']
            }]
        });
        return resultado.map(pantalla => ({
            IdPantalla: pantalla.dataValues.IdPantalla,
            Descripcion: pantalla.dataValues.Descripcion,
            Precio: pantalla.dataValues.Precio,
            Stock: pantalla.dataValues.Stock,
            FechaFabricacion: pantalla.dataValues.FechaFabricacion,
            EnVenta: pantalla.dataValues.EnVenta,
            IdMarca: pantalla.dataValues.IdMarca,
            MarcaNombre: pantalla.Marca ? pantalla.Marca.Nombre : null
        }));
    } catch (error) {
        console.error("Error fetching pantallas:", error.message);
        throw error;
    }
};

const getPantallaById = async (idPantalla) => {
    try {
        const resultado = await sequelize.models.Pantallas.findOne({
            attributes: [
                'IdPantalla',
                'Descripcion',
                'Precio',
                'Stock',
                'FechaFabricacion',
                'EnVenta',
                'IdMarca'
            ],
            where: { IdPantalla: idPantalla },
            include: [{
                model: sequelize.models.Marcas,
                attributes: ['Nombre']
            }]
        });

        if (!resultado) {
            return null;
        }

        return {
            ...resultado.dataValues, 
            MarcaNombre: resultado.Marcas ? resultado.Marcas.Nombre : null}
    } catch (error) { 
        console.error("Error fetching pantalla by ID:", error.message);
        throw error;
    }
};

const insertarPantalla = async (newPantalla) => {
    try {
        const resultado = await sequelize.models.Pantallas.create({
            Descripcion: newPantalla.Descripcion,
            Precio: newPantalla.Precio,
            Stock: newPantalla.Stock,
            FechaFabricacion: newPantalla.FechaFabricacion,
            EnVenta: newPantalla.EnVenta, 
            IdMarca: newPantalla.IdMarca
        });

        return {
            IdPantalla: resultado.dataValues.IdPantalla,
            Descripcion: resultado.dataValues.Descripcion,
            Precio: resultado.dataValues.Precio,
            Stock: resultado.dataValues.Stock,
            FechaFabricacion: resultado.dataValues.FechaFabricacion,
            EnVenta: resultado.dataValues.EnVenta,
            IdMarca: resultado.dataValues.IdMarca
        };
    } catch (error) {
        console.error("Error inserting pantalla:", error.message);
        throw error;
    }
};

const editarPantalla = async (pantallaData) => {
    try {
        const pantallaExistente = await sequelize.models.Pantallas.findOne({
            where: { IdPantalla: pantallaData.IdPantalla }
        });

        if (!pantallaExistente) {
            return null; // Notebook no encontrado
        }

        const updatedPantalla = await pantallaExistente.update(
            {
                Descripcion: pantallaData.Descripcion,
                Precio: pantallaData.Precio,
                Stock: pantallaData.Stock,
                FechaFabricacion: pantallaData.FechaFabricacion,
                EnVenta: pantallaData.EnVenta,
                IdMarca: pantallaData.IdMarca
            })

            return updatedPantalla.dataValues;
            
    } catch (error) {
        console.error("Error editing pantalla:", error.message);
        throw error;
    }
};

const getPantallaByDesc = async (desc) => {
    try {
        const resultado = await sequelize.models.Pantallas.findOne({
            attributes: [
                'IdPantalla',
                'Descripcion',
                'Precio',
                'Stock',
                'FechaFabricacion',
                'EnVenta',
                'IdMarca'
            ],
            where: { Descripcion: { [Op.like]: `%${desc}%` } },
            include: [{
                model: sequelize.models.Marcas,
                attributes: ['Nombre']
            }]
        });

        if (!resultado) {
            return null;
        }

        return {
            ...resultado.dataValues,
            MarcaModel: resultado.Marcas ? resultado.Marcas.Nombre : null
        };
    } catch (error) {
        console.error("Error fetching notebook by descripcion:", error.message);
        throw error;
    }
};

const eliminarPantalla = async (pantallaData) => {
    try {
        const pantallaExistente = await sequelize.models.Pantallas.findOne({
            where: { IdPantalla: pantallaData.IdPantalla }
        });
        
        if (!pantallaExistente) {
            return null; // Película no encontrada
        }
        
        await pantallaExistente.destroy();
        return pantallaData;
    } catch (error) {
        console.error('Error al eliminar la pantalla:', error.message);
        throw error;
    }
};

const pantallasService = {
    getPantallas,
    getPantallaById,
    insertarPantalla,
    editarPantalla,
    getPantallaByDesc,
    eliminarPantalla
};

export default pantallasService;