import sequelize from "../models/database.js";
import { Op } from 'sequelize'

const getNotebooks = async (filter) => {
    try {
        const whereQuery = {};

        if (filter.nombre) {
            whereQuery.nombre = { [Op.like]: `%${filter.nombre}%` };
        }

        const resultado = await sequelize.models.Notebooks.findAll({
            where: whereQuery,
            attributes: [
                'IdNotebook',
                'Nombre',
                'Precio',
                'Stock',
                'FechaAlta',
                'Activo',
                'IdProcesador'
            ],  
            include: [{
                model: sequelize.models.Procesadores, // El modelo relacionado
                attributes: ['Nombre'], // Atributos que quieres obtener del modelo relacionado
                as: 'Procesadore'
            }],         
            order: [
                ['Nombre', 'ASC'] // Ordenar alfabéticamente por Nombre
            ],
        });
        console.log(resultado)
        return resultado.map(notebook => ({
            IdNotebook: notebook.dataValues.IdNotebook,
            Nombre: notebook.dataValues.Nombre,
            Precio: notebook.dataValues.Precio,
            Stock: notebook.dataValues.Stock,
            FechaAlta: notebook.dataValues.FechaAlta,
            Activo: notebook.dataValues.Activo,
            IdProcesador: notebook.dataValues.IdProcesador,  
            ProcesadorNombre: notebook.dataValues.Procesadore ? notebook.dataValues.Procesadore.Nombre : null // Acceso a los datos del modelo relacionado         
        }));
    } catch (error) {
        console.error("Error fetching notebooks:", error.message);
        throw error;
    }
};

const getNotebookById = async (idNotebook) => {
    try {
        const resultado = await sequelize.models.Notebooks.findOne({
            attributes: [
                'IdNotebook',
                'Nombre',
                'Precio',
                'Stock',
                'FechaAlta',
                'Activo',
                'IdProcesador'
            ],
            where: { IdNotebook: idNotebook },
            
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues
            
    } catch (error) { 
        console.error("Error fetching notebook by ID:", error.message);
        throw error;
    }
};

const insertarNotebook = async (newNotebook) => {
    try {
        const resultado = await sequelize.models.Notebooks.create({
            Nombre: newNotebook.Nombre,
            Precio: newNotebook.Precio,
            Stock: newNotebook.Stock,
            FechaAlta: newNotebook.FechaAlta,
            Activo: newNotebook.Activo, 
            IdProcesador: newNotebook.IdProcesador
        });

        return {
            IdNotebook: resultado.dataValues.IdNotebook,
            Nombre: resultado.dataValues.Nombre,
            Precio: resultado.dataValues.Precio,
            Stock: resultado.dataValues.Stock,
            FechaAlta: resultado.dataValues.FechaAlta,
            Activo: resultado.dataValues.Activo,
            IdProcesador: resultado.dataValues.IdProcesador
        };
    } catch (error) {
        console.error("Error inserting notebook:", error.message);
        throw error;
    }
};

const editarNotebook = async (notebookData) => {
    try {
        const notebookExistente = await sequelize.models.Notebooks.findOne({
            where: { IdNotebook: notebookData.IdNotebook }
        });

        if (!notebookExistente) {
            return null; // Notebook no encontrado
        }

        const updatedNotebook = await notebookExistente.update(
            {
                Nombre: notebookData.Nombre,
                Precio: notebookData.Precio,
                Stock: notebookData.Stock,
                FechaAlta: notebookData.FechaAlta,
                Activo: notebookData.Activo,
                IdProcesador: notebookData.IdProcesador
            })

            return updatedNotebook.dataValues;
            
    } catch (error) {
        console.error("Error editing notebook:", error.message);
        throw error;
    }
};

const getNotebookByName = async (nombre) => {
    try {
        const resultado = await sequelize.models.Notebooks.findOne({
            attributes: [
                'IdNotebook',
                'Nombre',
                'Precio',
                'Stock',
                'FechaAlta',
                'Activo',
                'IdProcesador'
            ],
            where: { Nombre: { [Op.like]: `%${nombre}%` } },
            
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues;
    } catch (error) {
        console.error("Error fetching notebook by name:", error.message);
        throw error;
    }
};

const eliminarNotebook = async (notebookData) => {
    try {
        const notebookExistente = await sequelize.models.Notebooks.findOne({
            where: { IdNotebook: notebookData.IdNotebook }
        });
        
        if (!notebookExistente) {
            return null; // Película no encontrada
        }
        
        await notebookExistente.destroy();
        return notebookData;
    } catch (error) {
        console.error('Error al eliminar la notebook:', error.message);
        throw error;
    }
};

const notebookService = {
    getNotebooks,
    getNotebookById,
    insertarNotebook,
    editarNotebook,
    getNotebookByName,
    eliminarNotebook
};

export default notebookService;
