import sequelize from "../models/database.js";
import { Op } from "sequelize";

// ====================GET====================
const getMarcas = async (filter) => {
    try {
        const whereQuery = {}

        if (filter.nombre) {
            whereQuery.nombre = { [Op.like]: `%${filter.nombre}%` };
        }

        const resultado = await sequelize.models.Marcas.findAll({
            where: whereQuery,
            attributes: [
                'IdMarca',
                'Nombre',
                'Proveedor'
            ],            
        })
        return resultado.map(p => {
            return {
                IdMarca: p.dataValues.IdMarca,
                Nombre: p.dataValues.Nombre,
                Proveedor: p.dataValues.Proveedor
            }
        })
    } catch (error) {
        console.error("Error fetching marcas:", error.message);
        throw error;
    }
}

// ====================GETBYID====================
const getMarcaById = async (idMarca) => {
    try {
        const resultado = await sequelize.models.Marcas.findOne({
            attributes: [
                'IdMarca',
                'Nombre',
                'Proveedor'
            ],
            where: { IdMarca: idMarca }
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues;
    } catch (error) {
        console.error('Error fetching Marca by ID:', error.message);
        throw error;
    }
};

// ====================POST====================
const insertarMarca = async (newMarca) => {
    try {
        const resultado = await sequelize.models.Marcas.create({
            Nombre: newMarca.Nombre,
            Proveedor: newMarca.Proveedor
        });
        return {
            IdMarca: resultado.dataValues.IdMarca,
            Nombre: resultado.dataValues.Nombre,
            Proveedor: resultado.dataValues.Proveedor
        };
    } catch (error) {
        console.error("Error inserting marca:", error.message);
        throw error;
    }
};

// ====================PUT====================
const editarMarca = async (marcaData) => {
    try {
        // Buscar la marca existente por su ID
        const marcaExistente = await sequelize.models.Marcas.findOne({
            where: { IdMarca: marcaData.IdMarca }
        });

        // Si no se encuentra el procesador, retornar null
        if (!marcaExistente) {
            return null;
        }

        // Actualizar el procesador con el nuevo nombre
        const updatedMarca = await marcaExistente.update(
            {
                Nombre: marcaData.Nombre,
                Proveedor: marcaData.Proveedor
            }
        )
        // Retornar el ID del procesador actualizado
        return updatedMarca.dataValues;
        
    } catch (error) {
        // Manejar y mostrar cualquier error que ocurra
        console.error("Error updating marca:", error.message);
        throw error;
    }
};

const getMarcaByName = async (nombre) => {
    try {
        const resultado = await sequelize.models.Marcas.findOne({
            attributes: [
                'IdMarca',
                'Nombre',
                'Proveedor'
            ],
            where: { Nombre: { [Op.like]: `%${nombre}%` } }
        });

        if (!resultado) {
            return null;
        }

        return resultado.dataValues;
    } catch (error) {
        console.error("Error fetching marca by name:", error.message);
        throw error;
    }
};


// ====================DELETE====================
const eliminarMarca = async (marcaData) => {
    try {
        console.log('Datos recibidos para eliminar:', marcaData);

        const pantallasAsociadas = await sequelize.models.Pantallas.findAll({
            where: { IdMarca: marcaData.IdMarca }
        })

        if (pantallasAsociadas.length > 0 ) {
            throw new Error('No se puede eliminar la Marca porque tiene una pantallas asociada')
        }

        const marcaExistente = await sequelize.models.Marcas.findOne({
            where: { IdMarca: marcaData.IdMarca }
        });
        
        if (!marcaExistente) {
            console.log('Marca no encontrado');
            return null; // Película no encontrada
        }
        
        await marcaExistente.destroy();
        return marcaData;
    } catch (error) {
        console.error('Error al eliminar la marca:', error.message);
        throw error;
    }
};


const marcaService = {
    getMarcas,
    getMarcaById,
    insertarMarca,
    editarMarca,
    getMarcaByName,
    eliminarMarca
}

export default marcaService