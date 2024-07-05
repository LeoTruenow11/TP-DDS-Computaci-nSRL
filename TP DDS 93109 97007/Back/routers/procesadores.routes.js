import { Router } from 'express';
import procesadorService from '../src/services/procesadores.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const procesadores = await procesadorService.getProcesadores(req.query);
        console.log(procesadores);
        res.json(procesadores);
    } catch (error) {
        console.error("Error fetching procesadores:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const procesador = await procesadorService.getProcesadorById(id);
        if (!procesador) {
            return res.status(404).json({ error: "Procesador not found" });
        }

        res.json(procesador);
    } catch (error) {
        console.error("Error fetching procesador by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('/', async (req, res) => {
    try {
        const nuevoProcesador = req.body;
        const insertedProcesador = await procesadorService.insertarProcesador(nuevoProcesador);
        res.status(201).json(insertedProcesador);
    } catch (error) {
        console.error("Error inserting procesador:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('', async (req, res) => {
    try {
        const procesador = await procesadorService.editarProcesador(req.body);
        if (!procesador) {
            return res.status(404).json({ error: "Procesador not found" });
        }

        return res.json(procesador);
    } catch (error) {
        console.error("Error editing procesador:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/', async (req, res) => {
    try {
        const nombre = req.query.nombre; // Obtener el nombre del filtro desde query
        const procesadores = await procesadorService.getProcesadores(nombre);
        res.json(procesadores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const idProcesador = parseInt(req.params.id, 10);
        console.log('Procesador ID recibido en router:', idProcesador);

        const procesadorData = { IdProcesador: idProcesador };
        const deletedProcesador = await procesadorService.eliminarProcesador(procesadorData);

        if (!deletedProcesador) {
            return res.status(404).json({ error: "Procesador no encontrado" });
        }

        
        res.json({ message: "Procesador eliminado correctamente", deletedProcesador });
    } catch (error) {
        console.error("Error eliminando procesador:", error.message);
        if (error.message.includes('No se puede eliminar el procesador porque está asociado a una o más notebooks.')) {
            res.status(400).json({ error: "No es posible eliminar el procesador, está vinculado a una notebook" });
        } else {
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
});

export default router;
