import sequelize from "../models/database.js";
import { Op } from "sequelize";

// ====================GET====================
const getProcesadores = async (filter) => {
    try {
        const whereQuery = {}

        if (filter.nombre) {
            whereQuery.nombre = { [Op.like]: `%${filter.nombre}%` };
        }

        const resultado = await sequelize.models.Procesadores.findAll({
            where: whereQuery,
            attributes: [
                'IdProcesador',
                'Nombre',
                'Precio',
                'Stock',
                'FechaRecibido',
                'Disponible'
            ],            
        })
        return resultado.map(p => {
            return {
                IdProcesador: p.dataValues.IdProcesador,
                Nombre: p.dataValues.Nombre,
                Precio: p.dataValues.Precio,
                Stock: p.dataValues.Stock,
                FechaRecibido: p.dataValues.FechaRecibido,
                Disponible: p.dataValues.Disponible
            }
        })
    } catch (error) {
        console.error("Error fetching procesadores:", error.message);
        throw error;
    }
}

// ====================GETBYID====================
const getProcesadorById = async (idProcesador) => {
    try {
        const resultado = await sequelize.models.Procesadores.findOne({
            attributes: [
                'IdProcesador',
                'Nombre',
                'Precio',
                'Stock',
                'FechaRecibido',
                'Disponible'
            ],
            where: { IdProcesador: idProcesador }
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues;
    } catch (error) {
        console.error('Error fetching Procesador by ID:', error.message);
        throw error;
    }
};

// ====================POST====================
const insertarProcesador = async (newProcesador) => {
    try {
        const resultado = await sequelize.models.Procesadores.create({
            Nombre: newProcesador.Nombre,
            Precio: newProcesador.Precio,
            Stock: newProcesador.Stock,
            FechaRecibido: newProcesador.FechaRecibido,
            Disponible: newProcesador.Disponible
        });
        return {
            IdProcesador: resultado.dataValues.IdProcesador,
            Nombre: resultado.dataValues.Nombre,
            Precio: resultado.dataValues.Precio,
            Stock: resultado.dataValues.Stock,
            FechaRecibido: resultado.dataValues.FechaRecibido,
            Disponible: resultado.dataValues.Disponible
        };
    } catch (error) {
        console.error("Error inserting procesador:", error.message);
        throw error;
    }
};

// ====================PUT====================
const editarProcesador = async (procesadorData) => {
    try {
        // Buscar el procesador existente por su ID
        const procesadorExistente = await sequelize.models.Procesadores.findOne({
            where: { IdProcesador: procesadorData.IdProcesador }
        });

        // Si no se encuentra el procesador, retornar null
        if (!procesadorExistente) {
            return null;
        }

        // Actualizar el procesador con el nuevo nombre
        const updatedProcesador = await procesadorExistente.update(
            {
                Nombre: procesadorData.Nombre,
                Precio: procesadorData.Precio,
                Stock:  procesadorData.Stock,
                FechaRecibido: procesadorData.FechaRecibido,
                Disponible: procesadorData.Disponible
            }
        )
        // Retornar el ID del procesador actualizado
        return updatedProcesador.dataValues;
        
    } catch (error) {
        // Manejar y mostrar cualquier error que ocurra
        console.error("Error updating procesador:", error.message);
        throw error;
    }
};

const getProcesadorByName = async (nombre) => {
    try {
        const resultado = await sequelize.models.Procesadores.findOne({
            attributes: [
                'IdProcesador',
                'Nombre',
                'Precio',
                'Stock',
                'FechaRecibido',
                'Disponible'
            ],
            where: { Nombre: { [Op.like]: `%${nombre}%` } }
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues;
    } catch (error) {
        console.error("Error fetching procesador by name:", error.message);
        throw error;
    }
};


// ====================DELETE====================
const eliminarProcesador = async (procesadorData) => {
    try {
        console.log('Datos recibidos para eliminar:', procesadorData);
        
        // Verificar si hay notebooks asociadas con el procesador
        const notebooksAsociadas = await sequelize.models.Notebooks.findAll({
            where: { IdProcesador: procesadorData.IdProcesador }
        });

        if (notebooksAsociadas.length > 0) {
            // No permitir eliminar el procesador si hay notebooks asociadas
            throw new Error('No se puede eliminar el procesador porque está asociado a una o más notebooks.');        }
        
        
        const procesadorExistente = await sequelize.models.Procesadores.findOne({
            where: { IdProcesador: procesadorData.IdProcesador }
        });
        
        if (!procesadorExistente) {
            console.log('Procesador no encontrado');
            return null; // Película no encontrada
        }
        
        await procesadorExistente.destroy();
        return procesadorData;
    } catch (error) {
        console.error('Error al eliminar el procesador:', error.message);
        throw error;
    }
};


const procesadorService = {
    getProcesadores,
    getProcesadorById,
    insertarProcesador,
    editarProcesador,
    getProcesadorByName,
    eliminarProcesador
}

export default procesadorService