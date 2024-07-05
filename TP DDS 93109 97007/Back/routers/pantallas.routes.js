import { Router } from 'express';
import pantallaService from '../src/services/pantallas.service.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const pantallas = await pantallaService.getPantallas(req.query);
        res.json(pantallas);
    } catch (error) {
        console.error("Error fetching pantallas:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            return res.status(400).json({ error: "Invalid ID format" });
        }

        const pantalla = await pantallaService.getPantallaById(id);
        if (!pantalla) {
            return res.status(404).json({ error: "Pantalla not found" });
        }

        res.json(pantalla);
    } catch (error) {
        console.error("Error fetching pantalla by ID:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post('', async (req, res) => {
    try {
        const newPantalla = req.body;
        const insertedPantalla = await pantallaService.insertarPantalla(newPantalla);
        res.status(201).json(insertedPantalla);
    } catch (error) {
        console.error("Error inserting pantalla:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.put('', async (req, res) => {
    try {
        const pantalla = await pantallaService.editarPantalla(req.body);
        if (!pantalla) {
            return res.status(404).json({ error: "Pantalla not found" });
        }

        return res.json(pantalla);
    } catch (error) {
        console.error("Error editing pantalla:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*router.get('/nombre/:nombre', async (req, res) => {
    try {
        const nombre = req.params.nombre;
        const notebook = await pantallaService.getNotebookByName(nombre);
        if (!notebook) {
            return res.status(404).json({ error: 'Notebook not found' });
        }

        res.json(notebook);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});*/

router.get('/', async (req, res) => {
    try {
        const desc = req.query.desc; // Obtener el nombre del filtro desde query
        const pantallas = await pantallaService.getPantallas(desc);
        res.json(pantallas);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const idPantalla = parseInt(req.params.id, 10);

        const pantallaData = { IdPantalla: idPantalla };
        const deletedPantalla = await pantallaService.eliminarPantalla(pantallaData);

        if (!deletedPantalla) {
            return res.status(404).json({ error: "Pantalla not found" });
        }

        res.json({ message: "Pantalla deleted successfully", deletedPantalla });
    } catch (error) {
        console.error("Error deleting pantalla:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;