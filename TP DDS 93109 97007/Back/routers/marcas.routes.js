import { Router } from 'express';
import marcaService from '../src/services/marcas.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const marcas = await marcaService.getMarcas(req.query);
        console.log(marcas);
        res.json(marcas);
    } catch (error) {
        console.error("Error fetching marcas:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const marca = await marcaService.getMarcaById(id);
        if (!marca) {
            return res.status(404).json({ error: "Marca not found" });
        }

        res.json(marca);
    } catch (error) {
        console.error("Error fetching marca by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoMarca = req.body;
        const insertedMarca = await marcaService.insertarMarca(nuevoMarca);
        res.status(201).json(insertedMarca);
    } catch (error) {
        console.error("Error inserting marca:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('', async (req, res) => {
    try {
        const marca = await marcaService.editarMarca(req.body);
        if (!marca) {
            return res.status(404).json({ error: "Marca not found" });
        }

        return res.json(marca);
    } catch (error) {
        console.error("Error editing marca:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const nombre = req.query.nombre; // Obtener el nombre del filtro desde query
        const marcas = await marcaService.getMarcas(nombre);
        res.json(marcas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const idMarca = parseInt(req.params.id, 10);
        console.log('Marca ID recibido en router:', idMarca);

        const marcaData = { IdMarca: idMarca };
        const deletedMarca = await marcaService.eliminarMarca(marcaData);

        if (!deletedMarca) {
            return res.status(404).json({ error: "Marca not found" });
        }

        res.json({ message: "Procesador deleted successfully", deletedMarca });
    } catch (error) {
        console.error("Error eliminando procesador:", error.message);
        if (error.message.includes('pantallas asociadas')){
            res.status(400).json({ error: "No es posible eliminar la marca, está asociada a una pantalla"})
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

export default router;